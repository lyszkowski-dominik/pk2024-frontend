import axios from 'axios';
import { GetToken } from './GetToken';

/**
 * The type `CreateCommentData` defines the structure of data required to create a comment, including
 * request and hoa numbers along with the comment text.
 * @param {number} request - The `request` property in the `CreateCommentData` type represents a
 * number that likely corresponds to a specific request or identifier.
 * @param {number} hoa - The `hoa` property in the `CreateCommentData` type represents the
 * Homeowners Association (HOA) number associated with the comment being created.
 * @param {string} text - The `text` property in the `CreateCommentData` type represents the actual
 * comment text that a user wants to submit. It is a string type, which means it can contain any
 * sequence of characters, such as words, numbers, symbols, and spaces. This property is used to store
 * the content
 */
export type CreateCommentData = {
  request: number;
  hoa: number;
  text: string;
};

/**
 * The `AddComment` function in TypeScript sends a POST request to a specific API endpoint to create a
 * new comment with the provided data.
 * @param {CreateCommentData} data - The `data` parameter in the `AddComment` function is of type
 * `CreateCommentData`. It is used to pass the data needed to create a new comment.
 * @remarks
 * - `request` is the request number associated with the comment.
 * - `hoa` is the Homeowners Association (HOA) number associated with the comment.
 * - `text` is the actual comment text that the user wants to submit.
 * @returns The `AddComment` function is returning either the response from the POST request made to
 * the API endpoint for creating a comment, or the error response if there was an error during the
 * request.
 */
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
