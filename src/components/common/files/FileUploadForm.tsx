import { useEffect, useRef, useState } from 'react';
import styles from './FileList.module.scss';
import { useUploadFile } from './useFileUpload';
import { useNotifications } from '../../alerts/NotificationContext';
import { Button } from '@mui/material';

type FileUploadFormProps = {
  tableName: string;
  recordId: number;
  readonly invalidateQuery: readonly (number | string)[];
  setFileName: (name: string) => void;
  setIsPendingUpload: (isPending: boolean) => void;
};

export const FileUploadForm = ({
  invalidateQuery,
  tableName,
  recordId,
  setFileName,
  setIsPendingUpload,
}: FileUploadFormProps) => {
  const [file, setFile] = useState<File>();
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadFile = useUploadFile(invalidateQuery);
  const { isPending } = uploadFile;
  const { addNotification } = useNotifications();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      addNotification(
        'Wybrany plik jest za duży, maksymalny dozwolony rozmiar to 10MB',
        'error',
      );
      return;
    }

    uploadFile.mutate(
      {
        request: {
          tableName: tableName,
          recordId: recordId,
          file: file,
        },
        setProgress: setUploadProgress,
      },
      {
        onSuccess() {
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
            setFile(undefined);
          }
        },
      },
    );
  };

  useEffect(() => {
    setIsPendingUpload(isPending);
  }, [isPending, setIsPendingUpload]);

  return (
    <div className={styles['file-form-wrapper']}>
      <b>Prześlij plik</b>
      <form onSubmit={handleSubmit} className={styles['file-form']}>
        <input
          disabled={isPending}
          type="file"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
        <Button disabled={!file || isPending} type="submit" variant="contained">
          {!isPending && 'Prześlij'}
          {isPending && `Przesyłanie... ${uploadProgress}%`}
        </Button>
      </form>
    </div>
  );
};
