import { useAppSelector } from '../../app/hooks';
import { selectSelectedCommunity } from '../../features/communities/sharedDataSlice';
import { useNotifications } from '../alerts/NotificationContext';
import { useRemoveRate } from '../../features/rates/useRemoveRate';
import DeleteConfirmation from '../common/confirmationModals/DeleteConfirmation';
const RemoveRateConfirmation = ({
  rateId,
  onClose,
}: {
  rateId: number;
  onClose: () => void;
}) => {
  const { addNotification } = useNotifications();
  const hoaId = useAppSelector(selectSelectedCommunity) || -1;
const removeRate = useRemoveRate(hoaId);
  const onDelete = () => 
    removeRate.mutate(
      { rateId },
      {
        onSuccess: () => {
          onClose();
          addNotification('Stawka została usunięta.', 'success');
        },
        onError: (error: any) => {
          onClose();
          addNotification(
            `Stawka nie została usunięta. Błąd: ${error.details}`,
            'error',
          );
        },
      },
    );
    return (
      <DeleteConfirmation
        header="Czy na pewno chcesz usunąć tę stawkę?"
        isLoading={removeRate.isPending}
        onConfirm={onDelete}
        onCancel={onClose}
      />
    );
};
export default RemoveRateConfirmation;