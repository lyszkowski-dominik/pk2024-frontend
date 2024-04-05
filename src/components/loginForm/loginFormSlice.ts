import { createAppSlice } from "../../app/createAppSlice"
import type { LogInPayload, Token, UserData } from "../../types/loginFormTypes"
import { jwtDecode } from "jwt-decode"

export interface LoginSliceState {
  isLoggedIn: boolean,
  userData: UserData | null
}

const initialState: LoginSliceState = {
  isLoggedIn: false,
  userData: null
}

export const loginFormSlice = createAppSlice({
  name: "login",
  initialState,
  reducers: create => ({
    logIn: create.reducer((state, action: { payload: LogInPayload }) => {
      const token: Token = jwtDecode(action.payload.access)
      state.userData = {
        name: token.first_name,
        surname: token.last_name,
        id: token.user_id,
        access_token: action.payload.access,
        refresh_token: action.payload.refresh
      }
      state.isLoggedIn = true
    }),
    logOut: create.reducer(state => {
      state.isLoggedIn = false
    })
  }),
  selectors: {
    selectLogInStatus: login => login.isLoggedIn,
    selectUserData: login => login.userData
  }
})
export const { logIn, logOut } =
  loginFormSlice.actions

export const { selectLogInStatus, selectUserData } = loginFormSlice.selectors