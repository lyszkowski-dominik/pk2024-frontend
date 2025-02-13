import styles from './Resolutions.module.scss';
import {
  Resolution,
  resolutionsQueryKeys,
  voteDisplayMap,
} from '../../features/resolutions/resolutionsTypes';
import { UserRole } from '../../types/types';
import { FileList } from '../common/files/FileList';

const Details = ({
  resolution,
  role,
}: {
  resolution: Resolution;
  role: UserRole;
}) => {
  const isOwner = role === UserRole.Owner;
  const isManager = role === UserRole.Manager;
  const isOpenVoting = resolution?.can_vote || false;
  const haveResults = resolution?.results || false;

  const yourVote: string = resolution?.vote
    ? voteDisplayMap[resolution?.vote]
    : 'Nie zagłosowano';

  return (
    <>
      <div className={styles.details}>
        <b>Dodano: </b>{' '}
        {new Date(resolution?.created_at || '').toLocaleString()}
        <br />
        <b>Otwarcie: </b>{' '}
        {new Date(resolution?.start_date || '').toLocaleString()}
        <br />
        <b>Zakończenie: </b>{' '}
        {new Date(resolution?.end_date || '').toLocaleString()}
        <br />
      </div>
      <div className={styles.details}>
        {isOwner && (
          <>
            <b>Twój głos:</b> {yourVote}
            <br />
          </>
        )}
        {isManager && (
          <>
            <b>Stan głosowania:</b> {yourVote}
            <br />
          </>
        )}
      </div>

      {haveResults && (
        <>
          <h3>Wyniki</h3>
          <div className={styles.details}>
            {isOwner && !isOpenVoting && (
              <>
                <b>Twój głos:</b> {yourVote}
                <br />
              </>
            )}
            <b>Za: </b> {resolution?.results.total_for}(
            {Math.round(resolution?.results.percentage_for)}%)
            <br />
            <b>Przeciw: </b> {resolution?.results.total_against}(
            {Math.round(resolution?.results.percentage_against)}%)
            <br />
            <b>Wstrzymało się:</b> {resolution?.results.total_abstain}(
            {Math.round(resolution?.results.percentage_abstain)}%)
          </div>
        </>
      )}
      <h3>Opis</h3>
      <div className={styles.description}>
        <p>{resolution?.description}</p>
      </div>
      <FileList
        tableName="Resolution"
        recordId={resolution.id}
        files={resolution.files}
        canEditFiles={!isOwner}
        invalidateQuery={resolutionsQueryKeys.details(resolution.id)}
      />
    </>
  );
};

export default Details;
