import { jwtDecode } from "jwt-decode"
import type { Token } from "../features/auth/loginFormTypes"
/**
 * The function `validateToken` checks if the stored access token is valid by comparing its expiration
 * time with the current time.
 * @returns The `validateToken` function is returning a boolean value. It checks if there is a valid
 * access token stored in the local storage and if the token has not expired based on the expiration
 * time (exp) in the token payload. If a valid token is found and it has not expired, the function
 * returns `true`, indicating that the token is still valid. Otherwise, it returns `false`, indicating
 * that the token is invalid or has expired.
 */

export const validateToken = () => {
  const token = localStorage.getItem("accessToken")
  if (token) {
    const parsedToken : Token = jwtDecode(token)
    return Date.now() < parsedToken.exp * 1000
  }
  return false
}