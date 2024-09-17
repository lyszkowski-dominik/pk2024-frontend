import axios from 'axios';
import { GetToken } from './GetToken';

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