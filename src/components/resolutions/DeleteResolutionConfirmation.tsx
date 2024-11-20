import { useAppSelector } from '../../app/hooks';
import { selectSelectedCommunity } from '../../features/communities/sharedDataSlice';
import { useNotifications } from '../alerts/NotificationContext';
import DeleteConfirmation from '../common/confirmationModals/DeleteConfirmation';
import { useDeleteResolution } from '../../features/resolutions/useDeleteResolution';
import { Resolution } from '../../features/resolutions/resolutionsTypes';

const DeleteResolutionConfirmation = ({
  resolution,
  onClose,
}: {
  resolution: Resolution;
  onClose: () => void;
}) => {
  const { addNotification } = useNotifications();
  const hoaId = useAppSelector(selectSelectedCommunity) || -1;
  const deleteResolution = useDeleteResolution(hoaId);

  const onDelete = () =>
    deleteResolution.mutate(resolution.id, {
      onSuccess: () => {
        onClose();
        addNotification('Uchwała została usunięta.', 'success');
      },
      onError: (error: any) => {
        onClose();
        addNotification(
          `Uchwała nie została usunięta. Błąd: ${error.details}`,
          'error',
        );
      },
    });

  return (
    <DeleteConfirmation
      header={`Czy na pewno chcesz usunąć uchwałę "${resolution?.title}"?`}
      isLoading={deleteResolution.isPending}
      onConfirm={onDelete}
      onCancel={onClose}
    />
  );
};

export default DeleteResolutionConfirmation;
