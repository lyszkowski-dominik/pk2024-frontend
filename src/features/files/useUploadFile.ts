import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadFile } from '../../utils/downloadFile';

export const useUploadFile = (queryKeys: QueryKey[]) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadFile,
    onSuccess: () => {
      queryKeys.map((qk) =>
        queryClient.invalidateQueries({
          queryKey: qk,
        }),
      );
    },
    retry: false,
  });
};
