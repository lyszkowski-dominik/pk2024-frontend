import { createAppSlice } from "../../app/createAppSlice"
import type { LogInPayload } from "../../types/loginFormPayloads"

export interface LoginSliceState {
  isLoggedIn: boolean
}

const initialState: LoginSliceState = {
  isLoggedIn: false
}

export const loginFormSlice = createAppSlice({
  name: "login",
  initialState,
  reducers: create => ({
    logIn: create.reducer((state, action: { payload: LogInPayload }) => {
      localStorage.setItem("refreshToken", action.payload.refresh)
      localStorage.setItem("accessToken", action.payload.access)
      state.isLoggedIn = true
    }),
    logOut: create.reducer(state => {
      state.isLoggedIn = false
      localStorage.removeItem("refreshToken")
      localStorage.removeItem("accessToken")
    })
  }),
  selectors: {
    selectLogInStatus: login => login.isLoggedIn
  }
})
export const { logIn, logOut } =
  loginFormSlice.actions

export const { selectLogInStatus } = loginFormSlice.selectors