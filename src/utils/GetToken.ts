/**
 * The function `GetToken` retrieves a token from the browser's local storage and returns it.
 * @returns the token value stored in the localStorage. If the token exists, it is parsed from a JSON
 * string and returned. If the token does not exist, null is returned.
 */
export const GetToken = () => {
  const rawToken = localStorage.getItem("accessToken")
  return rawToken ? rawToken : null
}