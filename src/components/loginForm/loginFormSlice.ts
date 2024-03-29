import { createAppSlice } from "../../app/createAppSlice"

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
    logIn: create.reducer(state => {
      state.isLoggedIn = true
    }),
    logOut: create.reducer(state => {
      state.isLoggedIn = false
    })
  }),
  selectors: {
    selectLogInStatus: login => login.isLoggedIn
  }
})
export const { logIn, logOut } =
  loginFormSlice.actions

export const { selectLogInStatus } = loginFormSlice.selectors