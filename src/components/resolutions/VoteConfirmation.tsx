import { useAppSelector } from '../../app/hooks';
import { selectSelectedCommunity } from '../../features/communities/sharedDataSlice';
import { useVoteResolution } from '../../features/resolutions/useVoteResolution';
import {
  Vote,
  voteDisplayMap,
} from '../../features/resolutions/resolutionsTypes';
import { useNotifications } from '../alerts/NotificationContext';
import ConfirmationModal from '../common/confirmationModals/ConfirmationModal';

const VoteConfirmation = ({
  resolutionId,
  choice,
  onClose,
}: {
  resolutionId: number;
  choice: Vote;
  onClose: () => void;
}) => {
  const { addNotification } = useNotifications();

  const hoaId = useAppSelector(selectSelectedCommunity) || -1;
  const voteResolution = useVoteResolution(hoaId, resolutionId);

  const onVoteHandler = () =>
    voteResolution.mutate(
      { id: resolutionId, choice },
      {
        onSuccess: () => {
          onClose();
          addNotification('Oddano głos.', 'success');
        },
        onError: (error: any) => {
          onClose();
          addNotification(
            `Nie można oddać głosu, sprawdź swoje połączenie.`,
            'error',
          );
        },
      },
    );

  return (
    <ConfirmationModal
      header="Czy potwierdzasz swój wybór?"
      content={
        <>
          <p>Głos:</p>
          <p style={{ fontWeight: 500 }}> {voteDisplayMap[choice]}</p>
        </>
      }
      isLoading={voteResolution.isPending}
      onConfirm={onVoteHandler}
      onCancel={onClose}
    />
  );
};

export default VoteConfirmation;
