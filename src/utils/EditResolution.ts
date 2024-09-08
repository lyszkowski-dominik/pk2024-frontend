import axios from 'axios';
import { GetToken } from './GetToken';
import { localDateToISO } from './date';

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
    describe: data.description,
    start_date: new Date(localDateToISO(data.start_date)),
    end_date: new Date(localDateToISO(data.end_date)),
    hoa: data.hoa,
  };
  console.log(patchData)
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
