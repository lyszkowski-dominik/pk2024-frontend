import api from '../../../services/axiosInstance';

export type UploadFileProps = {
  request: {
    tableName: string;
    recordId: number;
    file: File;
  };
  setProgress?: (progress: number) => void;
};

export const UploadFile = async (props: UploadFileProps) => {
  return await api.post('/storage/files/', props.request, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (ev) => {
      if (!ev.total || !ev.progress || !props.setProgress) {
        return;
      }
      props.setProgress(Math.round((ev.loaded * 100) / ev.total));
    },
  });
};
