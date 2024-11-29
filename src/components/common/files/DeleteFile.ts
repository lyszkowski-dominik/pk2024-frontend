import api from '../../../services/axiosInstance';

type FileId = number;

export const DeleteFile = async (id: FileId) => {
  return await api.delete(`/storage/files/${id}/`);
};
