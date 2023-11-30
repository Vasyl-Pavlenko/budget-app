import { createSlice } from '@reduxjs/toolkit';

const storedAuth = localStorage.getItem('isAuth') === 'true';

const initialState = {
  isAuth: storedAuth,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state) => {
      state.isAuth = true;
    },
    logout: (state) => {
      state.isAuth = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;