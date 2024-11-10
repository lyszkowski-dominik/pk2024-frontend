import { GetToken } from '../auth/GetToken';


const AddExistingUser = async ({ role, hoaID, userID }: {role:string, hoaID: number, userID: string}) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/hoas/hoas/${hoaID}/${role}s/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GetToken()}`,
        },
        body: JSON.stringify({
          user: userID,
        }),
      },
    );
    if (response.ok) {
      return response.json();
    } else {
      return {message: "Nie udało się dodać użytkownika"};
      // throw new Error('Failed to fetch owners');
    }
  } catch (err) {
    return {message: "Nie udało się dodać użytkownika"};
  }
};

export default AddExistingUser;
