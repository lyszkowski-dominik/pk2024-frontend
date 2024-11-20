import { Button } from '@mui/material';
import { ReactNode } from 'react';

import styles from './ConfirmationModal.module.scss';
import Modal from '../../ui/modal/Modal';
import Spinner from '../../ui/spinner/Spinner';

export type ConfirmationModalProps = {
  header?: string;
  content?: ReactNode;
  confirmButtonLabel?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmationModal = ({
  header,
  content,
  confirmButtonLabel = 'Potwierdź',
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) => {
  return (
    <Modal>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h2>{header}</h2>
          <div>{content}</div>
          <div className={styles.modalButtons}>
            <Button variant="outlined" color="error" onClick={onConfirm}>
              {confirmButtonLabel}
            </Button>
            <Button color="secondary" onClick={onCancel}>
              Anuluj
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default ConfirmationModal;
