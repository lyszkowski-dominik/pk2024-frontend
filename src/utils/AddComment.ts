import axios from 'axios';
import { GetToken } from './GetToken';

type CreateCommentData = {
  request: number;
  hoa: number;
  text: string;
};

const AddComment = async (data: CreateCommentData) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_APP_API_URL}/requests/comments/`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GetToken()}`,
        },
      },
    );
    return res;
  } catch (err: any) {
    return err.response;
  }
};

export { AddComment };
