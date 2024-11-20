import { createAppSlice } from '../../app/createAppSlice';
import type { LogInPayload, Token } from '../../features/auth/loginFormTypes';
import { jwtDecode } from 'jwt-decode';
import { validateToken } from '../../utils/ValidateToken';
import { UserRole } from '../../types/types';

export interface LoginSliceState {
  isLoggedIn: boolean;
  tokenData: Token | null;
}

const initialState: LoginSliceState = {
  isLoggedIn: validateToken(),
  tokenData: localStorage.getItem('accessToken')
    ? jwtDecode(localStorage.getItem('accessToken') as string)
    : null,
};

export const loginFormSlice = createAppSlice({
  name: 'auth',
  initialState,
  reducers: (create) => ({
    logIn: create.reducer((state, action: { payload: LogInPayload }) => {
      localStorage.setItem('accessToken', action.payload.access);
      localStorage.setItem('refreshToken', action.payload.refresh);

      state.isLoggedIn = true;
      state.tokenData = jwtDecode(
        localStorage.getItem('accessToken') as string,
      );
    }),
    logOut: create.reducer((state) => {
      state.isLoggedIn = false;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }),
  }),
  selectors: {
    selectLogInStatus: (login) => login.isLoggedIn,
    selectRoles: (login) => login.tokenData?.user_permissions[0] as UserRole,
  },
});
export const { logIn, logOut } = loginFormSlice.actions;
export const { selectLogInStatus, selectRoles } = loginFormSlice.selectors;
