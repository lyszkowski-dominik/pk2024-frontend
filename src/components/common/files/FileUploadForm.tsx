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
  setUploadStatus: (status: string) => void;
};

export const FileUploadForm = ({
  invalidateQuery,
  tableName,
  recordId,
  setFileName,
  setUploadStatus,
}: FileUploadFormProps) => {
  const [file, setFile] = useState<File>();
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadFile = useUploadFile(invalidateQuery);
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
    setUploadStatus(uploadFile.status);
  }, [uploadFile.status, setUploadStatus]);

  return (
    <div className={styles['file-form-wrapper']}>
      <b>Prześlij plik</b>
      <form onSubmit={handleSubmit} className={styles['file-form']}>
        <input
          disabled={uploadFile.status === 'pending'}
          type="file"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
        <Button
          disabled={!file || uploadFile.status === 'pending'}
          type="submit"
          variant="contained"
        >
          {uploadFile.status !== 'pending' && 'Prześlij'}
          {uploadFile.status === 'pending' &&
            `Przesyłanie... ${uploadProgress}%`}
        </Button>
      </form>
    </div>
  );
};
