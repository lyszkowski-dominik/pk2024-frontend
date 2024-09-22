import axios from "axios"
import { GetToken } from "../features/auth/GetToken"

/**
 * This function retrieves user data from an API endpoint using an authorization token.
 * @returns The `GetUserData` function is returning the data fetched after making a GET request with the necessary
 * headers including the Authorization token obtained from the `GetToken()` function. If the request is
 * successful, the data is returned. If there is an error during the request, the error is logged to
 * the console.
 */
export const GetUserData = async () => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_APP_API_URL}/auth/current/`,
      {
        headers: {
          "Content-Type": "application/json",
          // Accept: "application/json",
          Authorization: `Bearer ${GetToken()}`
        }
      }
    )
    return data
  } catch (err: any) {
    console.log(err)
  }
}