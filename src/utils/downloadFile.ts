import axiosInstance from './axiosInstance';

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
