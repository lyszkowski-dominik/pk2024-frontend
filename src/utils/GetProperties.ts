import axios from 'axios';
import { GetToken } from './GetToken';
import type { PropertiesRequest } from '../types/propertiesTypes';

const GetProperties = async ({ page, pageSize, hoaId }: PropertiesRequest) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/hoas/properties/?page=${page}&page_size=${pageSize}&hoa=${hoaId}`, {
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

export default GetProperties;