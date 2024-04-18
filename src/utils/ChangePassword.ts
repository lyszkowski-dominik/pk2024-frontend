import axios from "axios"
import { GetToken } from "./GetToken"

type Payload = {
  old_password: string,
  new_password1: string,
  new_password2: string
}

export const ChangePassword = async ({old_password, new_password1, new_password2}: Payload) => {
  console.log(old_password, new_password1, new_password2);
  const formData = new FormData()
  formData.append('old_password', old_password)
  formData.append('new_password1', new_password1)
  formData.append('new_password2', new_password2)
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_APP_API_URL}/auth/password_change/`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          // Accept: "application/json",
          Authorization: `Bearer ${GetToken()}`
        }
      }
    )
    console.log(data)
    return data
  } catch (err: any) {
    console.log(err)
    return err.response
  }
}