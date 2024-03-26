import axios from "axios"
import { GetToken } from "./GetToken"
import { jwtDecode } from "jwt-decode"

/**
 * The function RefreshToken sends a request to refresh a user's token, handling errors and updating
 * the token data accordingly.
 * @example
 * ```ts
 * const { user_id, token } = await RefreshToken();
 * ```
 * @returns The `RefreshToken` function is returning the data object received from the axios POST
 * request if successful. If there is an error during the request, it will throw an error message based
 * on the response data or a custom error message if the data object contains an error property.
 */
export const RefreshToken = async () => {
  const formData = new FormData()
  let customError = false
  try {
    // TRY TO MAKE REQUEST
    const { data } = await axios.post(
      `${process.env.REACT_APP_REFRESH_TOKEN_URL}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${GetToken()}`,
          "Content-Type": "application/json"
        }
      }
    )

    if (data.error) {
      customError = true
      throw new Error(data.message)
    }

    const tokenData: { user: number } = jwtDecode(data.token)
    localStorage.removeItem("token")
    localStorage.setItem(
      "token",
      JSON.stringify({ user_id: tokenData.user, token: data.token })
    )
    return data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (customError) {
      throw new Error(err.message)
    }
    throw new Error(
      `Problem refreshing token data: ${err.response.data.message}`
    )
  }
}
