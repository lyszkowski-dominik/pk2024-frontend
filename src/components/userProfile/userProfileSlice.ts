import { createAppSlice } from "../../app/createAppSlice"
import { GetUserData } from "../../utils/GetUserData"
import type { DetailedUserData } from "../../types/userProfileTypes"

export interface UserProfileSliceState {
  userData: DetailedUserData | null,
  status: "idle" | "loading" | "failed"
}

const initialState: UserProfileSliceState = {
  userData: null,
  status: "idle",
}

// If you are not using async thunks you can use the standalone `createSlice`.
export const userProfileSlice = createAppSlice({
  name: "userProfile",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: create => ({
    getCurrentUserData: create.asyncThunk(
      async () => {
        // The value we return becomes the `fulfilled` action payload
        return await GetUserData()
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          console.log(action.payload, "action.payload")
          state.userData = action.payload
        },
        rejected: state => {
          state.status = "failed"
        },
      },
    ),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectCurrentUserData: userProfile => userProfile.userData,
    selectStatus: userProfile => userProfile.status,
  },
})

// Action creators are generated for each case reducer function.
export const { getCurrentUserData } =
  userProfileSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectCurrentUserData, selectStatus } = userProfileSlice.selectors

