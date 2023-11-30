import { createSlice } from '@reduxjs/toolkit';

const localTransactions = localStorage.getItem('transactions');

const initialState = {
  transactions: localTransactions ? JSON.parse(localTransactions) : [],
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      const existingIndex = state.transactions.findIndex((transaction) => transaction.id === action.payload.id);

      if (existingIndex !== -1) {
        state.transactions[existingIndex] = { ...state.transactions[existingIndex], ...action.payload };
      } else {
        state.transactions.unshift(action.payload);
      }
    },
    
    deleteTransaction: (state, action) => {
      state.transactions = state.transactions.filter(t => t.id !== action.payload.id);
    },
    deleteTransactionByMonth: (state, action) => {
      return {
        ...state,
        transactions: state.transactions.filter(t => t.month !== action.payload),
      };
    }
  },
});

export const { addTransaction, deleteTransaction, deleteTransactionByMonth } = transactionSlice.actions;
export default transactionSlice.reducer;
