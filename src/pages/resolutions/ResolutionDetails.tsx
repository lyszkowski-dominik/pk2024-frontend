import { useParams } from 'react-router';
import styles from './Resolutions.module.scss';
import { selectRoles } from '../../components/loginForm/loginFormSlice';
import { useAppSelector } from '../../app/hooks';
import Spinner from '../../components/ui/spinner/Spinner';
import { useGetResolution } from '../../features/resolutions/useGetResolution';
import Details from '../../components/resolutions/Details';
import ManagersActions from '../../components/resolutions/ManagersActions';
import { UserRole } from '../../types/types';
import OwnersActions from '../../components/resolutions/OwnersActions';

const ResolutionDetails = () => {
  const resolutionId = parseInt(useParams().resolutionId || '');
  const { isLoading, data } = useGetResolution(resolutionId);
  const role = useAppSelector(selectRoles);
  const isManager = role === UserRole.Manager;
  const isOwner = role === UserRole.Owner;
  const isOpenVoting = data?.can_vote || false;
  const canEdit = data?.can_edit || false;

  if (isLoading) {
    return <Spinner />;
  }

  return (
    data &&
    role && (
      <>
        <div className={styles.propertiesContainer}>
          <div className={styles.content}>
            <div className={styles.header}>
              <h1>{data?.title}</h1>
              <div className={styles.actions}>
                {isManager && canEdit && <ManagersActions resolution={data} />}
                {isOwner && isOpenVoting && (
                  <OwnersActions resolutionId={resolutionId} />
                )}
              </div>
            </div>
            <hr />
            <Details resolution={data} role={role} />
          </div>
        </div>
      </>
    )
  );
};

export default ResolutionDetails;
