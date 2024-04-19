import axios from "axios"

type Payload = {
  email: string,
}

export const ResetPassword = async ({email}: Payload) => {
  const formData = new FormData()
  formData.append('email', email)
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_APP_API_URL}/auth/password_reset/`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
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