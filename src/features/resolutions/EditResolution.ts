import axios from 'axios';
import { GetToken } from '../auth/GetToken';
import { localDateToISO } from '../../utils/date';

/**
 * The `FormData` interface defines the structure of the data object that will be used to update a resolution.
 * @property {string} title - The `title` property in the `FormData` interface represents the title of the resolution.
 * @property {string} description - The `description` property in the `FormData` interface represents the description of the resolution.
 * @property {string} start_date - The `start_date` property in the `FormData` interface represents the start date of the resolution.
 * @property {string} end_date - The `end_date` property in the `FormData` interface represents the end date of the resolution.
 * @property {number} hoa - The `hoa` property in the `FormData` interface represents the HOA associated with the resolution.
 */
interface FormData {
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  hoa: number;
}

const EditResolution = async (id: number, data: FormData) => {
  const patchData = {
    title: data.title,
    description: data.description,
    start_date: new Date(localDateToISO(data.start_date)),
    end_date: new Date(localDateToISO(data.end_date)),
    hoa: data.hoa,
  };
  
  try {
    const { data: responseData } = await axios.patch(
      `${import.meta.env.VITE_APP_API_URL}/resolutions/resolutions/${id}/`,
      patchData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GetToken()}`,
        },
      },
    );
    return responseData;
  } catch (err: any) {
    return err.response;
  }
};

export { EditResolution };
