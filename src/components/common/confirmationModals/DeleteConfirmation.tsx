import ConfirmationModal, { ConfirmationModalProps } from './ConfirmationModal';

const DeleteConfirmation = (
  props: Omit<ConfirmationModalProps, 'confirmButtonLabel'>,
) => {
  return <ConfirmationModal confirmButtonLabel="Usuń" {...props} />;
};

export default DeleteConfirmation;
