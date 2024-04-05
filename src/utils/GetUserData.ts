import axios from "axios"
import { GetToken } from "./GetToken"

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