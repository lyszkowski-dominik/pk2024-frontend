import axiosInstance from '../services/axiosInstance';

/**
 * The `downloadFile` function in TypeScript downloads a file from a given URL and saves it with a
 * specified filename.
 * @param {string} fileURL - The `fileURL` parameter is a string that represents the URL from which the
 * file will be downloaded.
 * @param {string} filename - The `filename` parameter is a string that represents the name you want to
 * give to the downloaded file. It is used when setting the `download` attribute of the anchor element
 * (`<a>`) that triggers the download.
 */
export const downloadFile = async (fileURL: string, filename: string) => {
  try {
    const response = await axiosInstance.get(fileURL, { responseType: 'blob' });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();

    link.parentNode?.removeChild(link);
  } catch (error) {
    console.log(error);
  }
};

/**
 * The `uploadFile` function in TypeScript uploads a file using FormData and axios, handling success
 * and error cases.
 * @param {string} fileURL - The `fileURL` parameter in the `uploadFile` function is a string that
 * represents the URL where the file will be uploaded to. This URL is typically an endpoint on a server
 * that accepts file uploads.
 * @param {File} file - The `file` parameter in the `uploadFile` function is of type `File`, which
 * represents a file from the user's system that can be uploaded. It is used to create a FormData
 * object and append the file to it before sending it to the server using a POST request.
 * @returns The `uploadFile` function is returning the response from the axios POST request if the
 * status is 200 (indicating success). If there is an error during the request, it will return the
 * error object.
 */
export const uploadFile = async (
  fileURL: string,
  file: File,
) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axiosInstance.post(fileURL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 200) {
      console.log('Plik przesłany i dane zaimportowane');
    }
    return response;
  } catch (error) {
    console.error('Błąd podczas przesyłania pliku:', error);
    return error;
  }
};
