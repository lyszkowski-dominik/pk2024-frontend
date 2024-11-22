import { useParams } from 'react-router';
import styles from './RequestDetails.module.scss';
import { Button } from '@mui/material';
import { selectRoles } from '../../components/loginForm/loginFormSlice';
import { useAppSelector } from '../../app/hooks';
import Modal from '../../components/ui/modal/Modal';
import { useState } from 'react';
import { selectSelectedCommunity } from '../../features/communities/sharedDataSlice';
import { useNotifications } from '../../components/alerts/NotificationContext';
import Spinner from '../../components/ui/spinner/Spinner';
import { useGetRequest } from '../../features/requests/useGetRequest';
import Comments from '../../components/requests/Comments';
import { useGetUserData } from '../../features/auth/useGetUserData';
import Details from '../../components/requests/Details';
import { useEditRequest } from '../../features/requests/useEditRequest';
import { UserRole } from '../../types/types';
import { RequestState } from '../../features/requests/requestTypes';
/**
 *
 * @returns {React.FunctionComponent} The `ReqeustDetails` component is a functional component that displays the details of a request.
 */
const ReqeustDetails = () => {
  const [isCloseModalOpen, setCloseModalOpen] = useState(false);
  const [isClosingError, setIsClosingError] = useState(false);
  const [isAssignError, setIsAssignError] = useState(false);

  const { addNotification } = useNotifications();
  const requestId = parseInt(useParams().requestId || '');
  const hoaId = useAppSelector(selectSelectedCommunity) || -1;
  const role = useAppSelector(selectRoles);
  const isManager = role === UserRole.Manager;

  const { data: request, isLoading } = useGetRequest(requestId);
  const editRequest = useEditRequest(hoaId, requestId);
  const { data: userData, isLoading: loadingUserData } = useGetUserData();
  const isClosed = request?.state === RequestState.closed;

  const onAssignToMe = async () => {
    if (!requestId || !userData) {
      return;
    }

    editRequest.mutate(
      { id: requestId, editedData: { assigned_to: { id: userData.id } } },
      {
        onSuccess: () => {
          setIsAssignError(false);
          addNotification('Przypisano do ciebie.', 'success');
        },
        onError: () => {
          setIsAssignError(true);
        },
      },
    );
  };

  const onCloseHandler = async () => {
    if (!requestId) {
      return;
    }

    editRequest.mutate(
      { id: requestId, editedData: { state: RequestState.closed } },
      {
        onSuccess: () => {
          setCloseModalOpen(false);
          setIsClosingError(false);
          addNotification('Zgłoszenie zostało zamknięte.', 'success');
        },
        onError: () => {
          setIsClosingError(true);
        },
      },
    );
  };

  if (isLoading || loadingUserData || editRequest.isPending) {
    return <Spinner />;
  }
  return (
    request && (
      <>
        <div className={styles.propertiesContainer}>
          <div className={styles.content}>
            <div className={styles.header}>
              <div className={styles.actions}>
                {isManager && (
                  <>
                    {!request?.assigned_to && !isClosed && (
                      <Button
                        variant="outlined"
                        type="button"
                        onClick={onAssignToMe}
                      >
                        <span>Przypisz do mnie</span>
                      </Button>
                    )}
                  </>
                )}
                {!isClosed && (
                  <>
                    <Button
                      variant="outlined"
                      type="button"
                      color="warning"
                      onClick={() => setCloseModalOpen(true)}
                    >
                      <span>Zamknij</span>
                    </Button>
                  </>
                )}
              </div>
              {isAssignError && (
                <p className={styles.error}>Nie udało się przypisać zadania.</p>
              )}
            </div>
            <Details request={request} />
            <br />
            <Comments
              comments={request?.comments || []}
              isDisabled={isClosed}
              requestId={requestId}
            />
          </div>
        </div>
        {isCloseModalOpen && (
          <Modal>
            {editRequest.isPending ? (
              <Spinner />
            ) : (
              <div>
                <p>
                  Czy na pewno chcesz zamknąć <b>{request?.title}</b>?
                </p>
                <br />
                {isClosingError && (
                  <>
                    <p className={styles.error}>
                      Nie udało się zamknąć rekordu.
                    </p>
                    <br />
                  </>
                )}
                <div>
                  <Button
                    onClick={() => onCloseHandler()}
                    color="error"
                    variant="contained"
                  >
                    Zamknij
                  </Button>
                  <Button
                    onClick={() => {
                      setCloseModalOpen(false);
                      setIsClosingError(false);
                    }}
                    color="secondary"
                  >
                    Anuluj
                  </Button>
                </div>
              </div>
            )}
          </Modal>
        )}
      </>
    )
  );
};

export default ReqeustDetails;
