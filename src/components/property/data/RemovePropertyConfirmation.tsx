import { useNavigate, useParams } from 'react-router';
import { useAppSelector } from '../../../app/hooks';
import { selectSelectedCommunity } from '../../../features/communities/sharedDataSlice';
import { useDeleteProperty } from '../../../features/properties/useDeleteProperty';
import { useNotifications } from '../../alerts/NotificationContext';
import DeleteConfirmation from '../../common/confirmationModals/DeleteConfirmation';

const RemovePropertyConfirmation = ({
  propertyId,
  parentId,
  onClose,
}: {
  propertyId: number;
  parentId?: number | null;
  onClose: () => void;
}) => {
  const navigate = useNavigate();
  const { addNotification } = useNotifications();
  const hoaId = useAppSelector(selectSelectedCommunity) || -1;
  const removeProperty = useDeleteProperty(hoaId, parentId);
  const currentProperty = parseInt(useParams().propertyId || '');

  const onDelete = () =>
    removeProperty.mutate(propertyId, {
      onSuccess: () => {
        onClose();
        addNotification('Lokal został usunięty.', 'success');
        if (currentProperty === propertyId) {
          navigate('..');
        }
      },
      onError: (error: any) => {
        onClose();
        addNotification(
          `Lokal nie został usunięty. Błąd: ${error.details}`,
          'error',
        );
      },
    });

  return (
    <DeleteConfirmation
      header="Czy na pewno chcesz usunąć ten lokal?"
      isLoading={removeProperty.isPending}
      onConfirm={onDelete}
      onCancel={onClose}
    />
  );
};

export default RemovePropertyConfirmation;
