import { jwtDecode } from "jwt-decode"
import type { Token } from "../types/loginFormTypes"

export const validateToken = () => {
  const token = localStorage.getItem("accessToken")
  if (token) {
    const parsedToken : Token = jwtDecode(token)
    return Date.now() < parsedToken.exp * 1000
  }
  return false
}