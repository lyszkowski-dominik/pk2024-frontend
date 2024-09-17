import type React from 'react';
import { useState } from 'react';
import { uploadFile } from '../../../utils/downloadFile';
import styles from './FileUploadForm.module.scss';
import {
  Button,
  FormControl,
  Input,
} from '@mui/material';
import { useNotifications } from '../../notifications/NotificationContext';

type FileUploadformProps = {
  url: string;
  title?: string;
  setModalOn?: (value: boolean) => void;
  refreshPage?: () => void;
};

const FileUploadForm = ({ url, setModalOn, refreshPage }: FileUploadformProps) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile((e.target.files || [null])[0]);
  };
  const { addNotification } = useNotifications();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (file) {
      const response = await uploadFile(url, file) as any;
      if (response.data.errors) {
        for (const error of response.data.errors){
          addNotification(error, 'error');
        }
      }
      if (setModalOn) {
        setModalOn(false);
      }
      refreshPage && refreshPage();
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <Input type="file" onChange={handleFileChange} />
        </FormControl>
        <div className={styles.buttons}>
          <Button
            className={styles.change}
            type="submit"
            color="primary"
            variant="contained"
          >
            Importuj
          </Button>
          <Button
            className={styles.cancel}
            type="reset"
            onClick={() => {
              setModalOn && setModalOn(false);
            }}
          >
            Anuluj
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FileUploadForm;
