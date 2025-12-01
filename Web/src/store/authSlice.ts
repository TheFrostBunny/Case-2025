import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  kundenummer: number | null;
  epost: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('auth_token'),
  kundenummer: localStorage.getItem('kundenummer') ? Number(localStorage.getItem('kundenummer')) : null,
  epost: localStorage.getItem('auth_epost'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ token: string; kundenummer: number; epost: string }>) {
      state.token = action.payload.token;
      state.kundenummer = action.payload.kundenummer;
      state.epost = action.payload.epost;
      localStorage.setItem('auth_token', action.payload.token);
      localStorage.setItem('kundenummer', String(action.payload.kundenummer));
      localStorage.setItem('auth_epost', action.payload.epost);
    },
    logout(state) {
      state.token = null;
      state.kundenummer = null;
      state.epost = null;
      localStorage.removeItem('auth_token');
      localStorage.removeItem('kundenummer');
      localStorage.removeItem('auth_epost');
    }
  }
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
