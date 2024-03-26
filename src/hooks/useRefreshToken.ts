import { useQuery } from "@tanstack/react-query"
import { RefreshToken } from "../utils/RefreshToken"

/**
 * The useRefreshToken function uses useQuery to refresh a token every 50 minutes in the
 * background.
 * @remarks - queryKey: ["refetchToken"] - The `queryKey` is an array of strings that is used to identify the query in order to be able to refetch it easily.
 * - queryFn: () => RefreshToken() - The `queryFn` is a function that is used to perform the query. In this case, the `queryFn` is calling the `RefreshToken` function.
 * - refetchInterval: 1000 * 60 * 50 - The `refetchInterval` option is set to `1000 * 60 * 50` which means that the query will be refreshed every 50 minutes.
 * - refetchIntervalInBackground: true - The `refetchIntervalInBackground` option is set to `true` which means that the query will be refreshed in the background.
 * - refetchOnMount: false - The `refetchOnMount` option is set to `false` which means that the query will not run when the component mounts.
 * - refetchOnWindowFocus: false - The `refetchOnWindowFocus` option is set to `false` which means that the query will not run when the window is focused.
 * @example
 * You can destructure different properties according to TanStack ReactQuery documentation.
 * The basic example is just calling this function in root component which needs to refresh token like this:
 * ```ts
 * useRefreshToken();
 * ```
 * Or like this:
 * ```ts
 * const { data, error, isLoading, refetch } = useRefreshToken();
 * ```
 * @link https://tanstack.com/query/v3/docs/framework/react/guides/queries
 * @returns The `useRefreshToken` function returns the result of a `useQuery` hook with specific
 * configurations for refreshing a token.
 */
export const useRefreshToken = () => {
  return useQuery({
    queryKey: ["refetchToken"],
    queryFn: () => RefreshToken(),
    // refresh every 50 minutes
    refetchInterval: 1000 * 60 * 50,
    refetchIntervalInBackground: true,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false
  })
}
