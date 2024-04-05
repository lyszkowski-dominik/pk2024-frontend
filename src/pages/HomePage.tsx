import { useGetUserDataQuery } from "../components/userProfile/userDataApiSlice"


const HomePage = () => {
  const { data: userData, isError, isLoading, isSuccess } = useGetUserDataQuery()

  return (
    <div>
      {!userData && <h1>Witaj w aplikacji E-Wspólnota</h1>}
      {isLoading && <div>Ładowanie danych...</div>}
      {userData && <h1>Witaj {userData.first_name} {userData.last_name}</h1>}
    </div>
  )
}

export default HomePage
