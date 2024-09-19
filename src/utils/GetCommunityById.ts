import axios from 'axios';
import { GetToken } from './GetToken';

/**
 * The function `GetCommunityById` asynchronously fetches data from an API endpoint using axios in a
 * TypeScript environment.
 * @param {string} id - The `id` parameter in the `GetCommunityById` function is a string that
 * represents the unique identifier of a community. This function is designed to fetch community data
 * from an API based on the provided `id`.
 * @returns The function `GetCommunityById` is returning the data from the API response if the request
 * is successful. If there is an error, it will log the error to the console.
 */
export const GetCommunityById = async (id: string) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/hoas/hoas/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${GetToken()}`
        }});

        return response.data
    }
    catch(err: any){
        console.log(err)
    }
}

export default GetCommunityById;