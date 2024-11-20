import { Button } from '@mui/material';

import styles from './Form.module.scss';
import Spinner from '../../../ui/spinner/Spinner';

const FormButtons = ({
  submitLabel = 'Zapisz',
  submitDisabled,
  cancelDisabled,
  isLoading,
}: {
  submitLabel?: string;
  submitDisabled: boolean;
  cancelDisabled: boolean;
  isLoading: boolean;
}) => {
  return (
    <div className={styles.buttons}>
      <Button
        variant="contained"
        className={styles.change}
        type="submit"
        disabled={submitDisabled}
      >
        {isLoading ? <Spinner /> : submitLabel}
      </Button>
      <Button
        color="secondary"
        className={styles.cancel}
        type="reset"
        disabled={cancelDisabled}
      >
        Anuluj
      </Button>
    </div>
  );
};

export default FormButtons;
