import { useNavigate, useParams } from 'react-router';
import styles from './Resolutions.module.scss';
import { Button, CircularProgress } from '@mui/material';
import { selectRoles } from '../../components/loginForm/loginFormSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Modal from '../../components/ui/modal/Modal';
import { useEffect, useState } from 'react';
import EditResolutionForm from '../../components/resolutions/EditResolutionForm';
import { selectSelectedCommunity } from '../../features/communities/sharedDataSlice';
import Spinner from '../../components/ui/spinner/Spinner';
import {
  deleteResolution,
  fetchResolution,
  selectResolutionDetails,
  selectResolutionsStatus,
  voteResolution,
} from '../../features/resolutions/resolutionsSlice';

/**
 *
 * @returns {React.FunctionComponent} The `ResolutionDetails` component is a functional component that displays the details of a resolution.
 */
const ResolutionDetails = () => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isVoteModalOpen, setVoteModalOpen] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedVoteOption, setSelectedVoteOption] = useState('none');

  const resolutionID = parseInt(useParams().resolutionID || '');

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const data = useAppSelector(selectResolutionDetails);
  const isLoading = useAppSelector(selectResolutionsStatus);
  const hoaID = useAppSelector(selectSelectedCommunity);
  const role = useAppSelector(selectRoles);
  const isManager = role === 'manager';
  const isOwner = role === 'owner';
  const isOpenVoting = data?.can_vote || false;
  const canEdit = data?.can_edit || false;
  const haveResults = data?.results ?? false;

  useEffect(() => {
    dispatch(fetchResolution({ id: resolutionID }));
  }, [dispatch, resolutionID]);

  const onEdit = () => {
    setEditModalOpen(true);
  };

  const onDelete = () => {
    setDeleteModalOpen(true);
  };

  const onDeleteHadler = async () => {
    setIsWaiting(true);

    const res = await dispatch(deleteResolution({ id: resolutionID }));

    setIsWaiting(false);
    if (deleteResolution.fulfilled.match(res)) {
      setIsError(false);
      setDeleteModalOpen(false);
      navigate('/hoa/' + hoaID + '/resolutions');
    } else {
      setIsError(true);
    }
  };

  const onVote = (choice: string) => {
    setVoteModalOpen(true);
    setSelectedVoteOption(choice);
  };

  const onVoteHandler = async () => {
    setIsWaiting(true);
    const res = dispatch(
      voteResolution({
        id: resolutionID,
        choice: selectedVoteOption,
      }),
    );

    setIsWaiting(false);
    if (voteResolution.fulfilled.match(res)) {
      setIsError(false);
      setVoteModalOpen(false);
    } else {
      setIsError(true);
    }
    dispatch(fetchResolution({ id: resolutionID }));
  };

  const editFormInitialData = {
    id: data?.id,
    title: data?.title,
    description: data?.description,
    start_date: new Date(data?.start_date || '').toLocaleString(),
    end_date: new Date(data?.end_date || '').toLocaleString(),
    hoa: data?.hoa,
  };
  const voteMap = {
    for: 'Za',
    against: 'Przeciw',
    abstain: 'Wstrzymano się',
  };

  const yourVote: string = data?.vote
    ? voteMap[data?.vote as 'for' | 'against' | 'abstain']
    : 'Wstrzymano się';
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <div className={styles.propertiesContainer}>
        <div className={styles.content}>
          <div className={styles.header}>
            <h1>{data?.title}</h1>
            <div className={styles.actions}>
              {isManager && canEdit && (
                <>
                  <Button variant="outlined" type="button" onClick={onEdit}>
                    <span>Edytuj</span>
                  </Button>
                  <Button
                    variant="outlined"
                    type="button"
                    onClick={onDelete}
                    color="error"
                  >
                    <span>Usuń</span>
                  </Button>
                </>
              )}
              {isOwner && isOpenVoting && (
                <>
                  <Button
                    variant="outlined"
                    type="button"
                    onClick={() => onVote('for')}
                  >
                    <span>Za</span>
                  </Button>
                  <Button
                    variant="outlined"
                    type="button"
                    onClick={() => onVote('against')}
                  >
                    <span>Przeciw</span>
                  </Button>
                  <Button
                    variant="outlined"
                    type="button"
                    onClick={() => onVote('abstain')}
                  >
                    <span>Wstrzymaj się</span>
                  </Button>
                </>
              )}
            </div>
          </div>
          <hr />
          <h2>Szczegóły</h2>
          <div className={styles.details}>
            <b>Dodano: </b> {new Date(data?.created_at || '').toLocaleString()}
            <br />
            <b>Otwarcie: </b>{' '}
            {new Date(data?.start_date || '').toLocaleString()}
            <br />
            <b>Zakończenie: </b>{' '}
            {new Date(data?.end_date || '').toLocaleString()}
            <br />
          </div>
          {haveResults && (
            <>
              <h2>Wyniki</h2>
              <div className={styles.details}>
                {isOwner && !isOpenVoting && (
                  <>
                    <b>Twój głos:</b> {yourVote}
                    <br />
                  </>
                )}
                <b>Za: </b> {data?.results.total_for}(
                {Math.round(data?.results.percentage_for)}%)
                <br />
                <b>Przeciw: </b> {data?.results.total_against}(
                {Math.round(data?.results.percentage_against)}%)
                <br />
                <b>Wstrzymało się:</b> {data?.results.total_abstain}(
                {Math.round(data?.results.percentage_abstain)}%)
              </div>
            </>
          )}
          <h2>Opis</h2>
          <div className={styles.description}>
            <p>{data?.description}</p>
          </div>
        </div>
      </div>
      {isEditModalOpen && (
        <Modal>
          <EditResolutionForm
            initialData={editFormInitialData}
            onCancel={() => setEditModalOpen(false)}
            onSubmit={() => {
              dispatch(fetchResolution({ id: resolutionID }));
            }}
          />
        </Modal>
      )}
      {isDeleteModalOpen && (
        <Modal>
          {!isWaiting && (
            <div>
              <p>
                Czy na pewno chcesz usunąć <b>{data?.title}</b>?
              </p>
              <br />
              {isError && (
                <>
                  <p className={styles.error}>Nie udało się usunąć rekordu.</p>
                  <br />
                </>
              )}
              <div>
                <Button
                  onClick={() => onDeleteHadler()}
                  color="error"
                  variant="contained"
                >
                  Usuń
                </Button>
                <Button
                  onClick={() => {
                    setDeleteModalOpen(false);
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
      {isVoteModalOpen && (
        <Modal>
          {!isWaiting && (
            <div>
              <p>Czy potwierdzasz swój wybór?</p>
              <br />
              {isError && (
                <>
                  <p className={styles.error}>Nie udało sięoddać głosu.</p>
                  <br />
                </>
              )}
              <div>
                <Button
                  onClick={() => onVoteHandler()}
                  color="primary"
                  variant="contained"
                >
                  Potwierdź
                </Button>
                <Button
                  onClick={() => {
                    setVoteModalOpen(false);
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

export default ResolutionDetails;
