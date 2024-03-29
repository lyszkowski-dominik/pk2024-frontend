import axios from "axios";
import { jwtDecode } from "jwt-decode";

export type LoginCheckData = {
  username: string;
  password: string;
};
/**
 * The function `LoginCheck` is an asynchronous function that sends a POST request to a specified URL
 * with username and password data, retrieves a token, decodes it, and returns the user ID and token.
 * @param {LoginCheckData}  data - Takes an
 * object as a parameter with `username` and `password` properties. It sends a POST request to the
 * specified URL using Axios to authenticate the user credentials. If the request is successful, it
 * decodes the JWT token received in the response
 * @example
 * ```ts
 * const { user_id, token } = await LoginCheck({ username: "user", password: "password" });
 * ```
 * @returns The `LoginCheck` function is returning an object with the properties `user_id` and `token`.
 * The `user_id` is extracted from the decoded token data and the `token` is the token received from
 * the API response.
 */

export const LoginCheck = async ({ username, password }: LoginCheckData) => {

  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_APP_API_URL}/auth/token`,
      axios.toFormData({ username, password }),
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const tokenData: { user: number; iat: number } = jwtDecode(data.token);
    return { user_id: tokenData.user, token: data.token };
  } catch (err: any) {
    throw new Error(`${err.response.data.message}`);
  }
};
