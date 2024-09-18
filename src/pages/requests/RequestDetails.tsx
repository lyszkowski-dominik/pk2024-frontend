import { useNavigate, useParams } from 'react-router';
import styles from './RequestDetails.module.scss';
import { Button, CircularProgress, Typography } from '@mui/material';
import { selectRoles } from '../../components/loginForm/loginFormSlice';
import { useAppSelector } from '../../app/hooks';
import Modal from '../../components/ui/modal/Modal';
import { useEffect, useState } from 'react';
import { selectSelectedCommunity } from '../../app/slices/sharedDataSlice';
import { useNotifications } from '../../components/notifications/NotificationContext';
import Spinner from '../../components/ui/spinner/Spinner';
import { useGetRequest } from '../../hooks/useGetRequest';
import { EditRequest } from '../../utils/EditRequest';
import { useGetUserDataQuery } from '../../components/userProfile/userDataApiSlice';
import Comments from '../../components/requests/Comments';

const ReqeustDetails = () => {
  const [isCloseModalOpen, setCloseModalOpen] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [isError, setIsError] = useState(false);

  const { addNotification } = useNotifications();
  const { requestID } = useParams();

  const {
    data,
    refetch: refreshPage,
    isLoading,
  } = useGetRequest({
    id: parseInt(requestID || ''),
  });

  const { data: userData, isSuccess } = useGetUserDataQuery();
  const navigate = useNavigate();

  const hoaID = useAppSelector(selectSelectedCommunity);
  const role = useAppSelector(selectRoles);
  const isManager = role === 'manager';
  const isOwner = role === 'owner';
  const canEdit = isManager;
  const isClosed = data?.state === 'closed';

  useEffect(() => {
    refreshPage();
  }, [refreshPage, data]);

  const onAssignToMe = async () => {
    if (!requestID) {
      return;
    }
    setIsWaiting(true);
    const res = await EditRequest(Number(requestID), {
      assigned_to: userData?.id,
    });

    setIsWaiting(false);
    if (res.status === 400) {
      // setErrorMessages(res.data);
      setIsError(true);
    } else {
      setIsError(false);
      setCloseModalOpen(false);
      addNotification('Przypisano do ciebie.', 'success');
      refreshPage();
    }
  };

  const onChangeState = () => {
    console.log('Change state');
  };

  const onClose = () => {
    console.log('Close');
    setCloseModalOpen(true);
  };

  const onCloseHadler = async () => {
    if (!requestID) {
      return;
    }
    setIsWaiting(true);
    const res = await EditRequest(Number(requestID), { state: 'closed' });

    setIsWaiting(false);
    if (res.status === 400) {
      // setErrorMessages(res.data);
      setIsError(true);
    } else {
      setIsError(false);
      setCloseModalOpen(false);
      addNotification('Zapytanie zostało zamkniete.', 'success');
      refreshPage();
    }
  };

  const editFormInitialData = {
    id: data?.id,
    notes: data?.notes,
    assigned_to: data?.assigned_to?.id,
    state: data?.state,
  };

  const stateMap: any = {
    new: 'Nowy',
    work_in_progress: 'W trakcie',
    pending: 'Oczekujący',
    resolved: 'Rozwiązany',
    closed: 'Zamknięty',
    cancelled: 'Anulowany',
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <div className={styles.propertiesContainer}>
        <div className={styles.content}>
          <div className={styles.header}>
            {/* <h1>{data?.title}</h1> */}
            <div className={styles.actions}>
              {isManager && (
                <>
                  {!data?.assigned_to && !isClosed && (
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
                    onClick={() => onClose()}
                  >
                    <span>Zamknij</span>
                  </Button>
                </>
              )}
            </div>
          </div>
          {/* <hr /> */}
          <Typography variant="h4" component="h2">
            {data?.title}
          </Typography>
          <Typography color="textPrimary" gutterBottom>
            Stan: {stateMap[data?.state||"new"]}
          </Typography>
          <Typography color="textPrimary" gutterBottom>
            Data dodania: {new Date(data?.created || '').toLocaleString()}
          </Typography>
          <Typography color="textPrimary" gutterBottom>
            Autor: {data?.created_by?.name}
          </Typography>
          <Typography color="textPrimary" gutterBottom>
            Zarządca: {data?.assigned_to?.name}
          </Typography>
          <Typography color="textPrimary" gutterBottom>
            Typ zgłoszenia: {data?.type?.title || "Inne"}
          </Typography>
          <Typography color="textPrimary" gutterBottom>
            Treść:
          </Typography>
          <Typography variant="body2">{data?.description}</Typography>
          <br />
          <Comments
            comments={data?.comments || []}
            newCommentEndpoint="/requests/comments/"
            isDisabled={isClosed}
            refreshPage={refreshPage}
            requestID={Number(requestID)}
          />
        </div>
      </div>
      {isCloseModalOpen && (
        <Modal>
          {!isWaiting && (
            <div>
              <p>
                Czy na pewno chcesz zamknąć <b>{data?.title}</b>?
              </p>
              <br />
              {isError && (
                <>
                  <p className={styles.error}>Nie udało się zamknąć rekordu.</p>
                  <br />
                </>
              )}
              <div>
                <Button
                  onClick={() => onCloseHadler()}
                  color="error"
                  variant="contained"
                >
                  Zamknij
                </Button>
                <Button
                  onClick={() => {
                    setCloseModalOpen(false);
                    setIsError(false);
                  }}
                  color="secondary"
                >
                  Anuluj
                </Button>
              </div>
            </div>
          )}
          {isWaiting && (
            <div className={styles.waiting}>
              <CircularProgress color="primary" sx={{ fontSize: 40 }} />
            </div>
          )}
        </Modal>
      )}
    </>
  );
};

export default ReqeustDetails;
