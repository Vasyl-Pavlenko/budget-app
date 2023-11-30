import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import transactionReducer from './slices/transactionsSlice'
import exchangeRatesReducer from './slices/exchangeRatesSlice'


export const store = configureStore({
  reducer: {
    user: userReducer,
    transactions: transactionReducer,
    exchangeRates: exchangeRatesReducer
  },
})