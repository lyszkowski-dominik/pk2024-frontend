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

/**
 * The type `FileUploadformProps` defines props for a file upload form component in TypeScript React.
 * @param {string} url - The `url` property in the `FileUploadformProps` type represents the URL
 * where the file will be uploaded.
 * @param {string} title - The `title` property in the `FileUploadformProps` type is an optional
 * string that represents the title of the file upload form. It is not required for the
 * `FileUploadformProps` object to have a `title` value, as indicated by the `?` symbol after the
 * property
 * @param setModalOn - The `setModalOn` property in the `FileUploadformProps` type is a function
 * that takes a boolean value as an argument and does not return anything (`void`). It is used to
 * control the visibility of a modal or dialog box in the component.
 * @param refreshPage - The `refreshPage` property in the `FileUploadformProps` type is a function
 * that does not take any arguments and does not return anything (`void`). It is used to trigger a
 * refresh action, such as reloading the page or fetching updated data after a file upload.
 */
export type FileUploadformProps = {
  url: string;
  title?: string;
  setModalOn?: (value: boolean) => void;
  refreshPage?: () => void;
};

/**
 * 
 * @param {FileUploadformProps} params
 * @returns {JSX.Element} The `FileUploadForm` component returns a form for uploading a file. The form includes an input field for selecting a file, buttons for submitting the form and canceling the upload, and error handling for displaying notifications to the user.
 */
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
      } else {
        addNotification("Dane zostały zaimportowane.", "success");
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
            color="secondary"
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
