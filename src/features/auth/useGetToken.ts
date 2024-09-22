import { useQuery } from "@tanstack/react-query"
import { LoginCheck } from "./LoginCheck"

export type LoginCheckData = {
  username: string;
  password: string;

};

/**
 * The function `useGetToken` is a custom hook that uses `useQuery` to perform a login check with the
 * provided username and password.
 * @param {LoginCheckData}  data - The `useGetToken` function takes an object as a parameter with the
 * following properties:  `username` and `password`.
 * @remarks - queryKey: ["loginCheck"] - The `queryKey` is an array of strings that is used to identify the query in order to be able to refetch it easily.
 * - queryFn: () => LoginCheck({ username, password }) - The `queryFn` is a function that is used to perform the query. In this case, the `queryFn` is calling the `LoginCheck` function with the provided `username` and `password` parameters.
 * - retry: false - The `retry` option is set to `false` which means that the query will not automatically retry on error.
 * - enabled: false - The `enabled` option is set to `false` which means that the query will not run when the component mounts. It is only going to run when the `refetch` function is called.
 * - gcTime: 1000 - The `gcTime` option is set to `1000` which means that the query will be garbage collected after 1000 milliseconds.
 * @example
 * You can destructure different properties according to TanStack ReactQuery documentation.
 * ```ts
 * const { data, error, isLoading, refetch } = useGetToken();
 * ```
 * @link https://tanstack.com/query/v3/docs/framework/react/guides/queries
 * @returns The `useGetToken` function is returning the result of the `useQuery` hook. This hook is
 * making a query to check the login credentials using the `LoginCheck` function with the provided
 * `username` and `password` parameters. The `useQuery` hook is configured with specific options such
 * as `queryKey`, `queryFn`, `retry`, `enabled`, and `gcTime

 */
export const useGetToken = ({
                              username,
                              password

                            }: LoginCheckData) => {

  return useQuery({
    queryKey: ["loginCheck"],
    queryFn: () =>
      LoginCheck({
        username,
        password

      }),
    retry: false,
    enabled: false,
    gcTime: 1000
  })
}
