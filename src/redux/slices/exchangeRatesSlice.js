import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchExchangeRates = createAsyncThunk('exchangeRates/fetchExchangeRates', async () => {
  try {
    const response = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');

    const data = await response.json();

    return data;
  } catch (error) {
    throw Error('Failed to fetch exchange rates');
  }
});

const localRates = localStorage.getItem('exchangeRates');

const exchangeRatesSlice = createSlice({
  name: 'exchangeRates',
  initialState: {
    rates: localRates ? JSON.parse(localRates) : {},
    status: 'loading',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExchangeRates.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchExchangeRates.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.rates = action.payload;
      })
      .addCase(fetchExchangeRates.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const exchangeRatesActions = exchangeRatesSlice.actions;
export default exchangeRatesSlice.reducer;
