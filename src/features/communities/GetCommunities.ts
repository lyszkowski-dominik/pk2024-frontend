import axios from 'axios';
import { GetToken } from '../auth/GetToken';

/**
 * The function `GetCommunities` makes an asynchronous request to a specified API endpoint to retrieve
 * a list of communities while handling any potential errors.
 * @returns The `GetCommunities` function is returning the data received from the API endpoint
 * `${import.meta.env.VITE_APP_API_URL}/hoas/hoas/` after making a GET request with the appropriate
 * headers including the authorization token obtained from the `GetToken()` function. If the request is
 * successful, it returns the response data. If there is an error, it logs the error to the console
 */
export const GetCommunities = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/hoas/hoas/`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${GetToken()}`
            }
        });

        return response.data
    }
    catch (err: any) {
        console.log(err)
    }
}

export default GetCommunities;