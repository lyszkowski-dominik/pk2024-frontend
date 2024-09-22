import { createAsyncThunk } from "@reduxjs/toolkit";
import type { PropertiesRequest } from './propertiesTypes';
import axios from "axios";
import { GetToken } from "../auth/GetToken";

export const getProperties = createAsyncThunk("propertiesState/getProperties",
    async ({ page, pageSize, hoaId }: PropertiesRequest) => {
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
)