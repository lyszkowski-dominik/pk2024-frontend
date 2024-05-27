import styles from './AdminPanel.module.scss';
import { useAppSelector } from '../../app/hooks';
import { useGetCommunitiesQuery } from '../../app/slices/communitiesDataApiSlice';
import { selectRoles } from '../loginForm/loginFormSlice';
import { useSidebar } from '../layout/sidebar/SidebarProvider';
import { useEffect, useState } from 'react';
import AddCommunityForm from './AddCommunityForm';
import Modal from '../ui/modal/Modal';

const AdminPanel = () => {
  const userRoles = useAppSelector(selectRoles);
  const {
    data: communities,
    isError,
    isLoading,
    isSuccess,
  } = useGetCommunitiesQuery();

  const { setElements } = useSidebar();

  useEffect(() => {
    setElements([
      { title: 'Dodaj wspólnotę', onClick: () => setIsAddingCommunity(true) },
    ]);
    return () => setElements([]);
  }, [setElements]);

  const [isAddingCommunity, setIsAddingCommunity] = useState<boolean>(false);

  if (!userRoles?.includes('admin')) {
    return <div>Brak dostępu</div>;
  }

  return (
    <>
      {isAddingCommunity && (
        <Modal>
          <AddCommunityForm isModalOn={setIsAddingCommunity} />
        </Modal>
      )}
      <div className={styles.info}>
        {isError && <div>Wystąpił błąd podczas ładowania danych</div>}
        {isSuccess && communities && (
          <table className={styles.communityTable}>
            <thead>
              <tr>
                <th>Nazwa</th>
                <th>Adres</th>
                <th>e-mail</th>
              </tr>
            </thead>
            <tbody>
              {communities.results.map((community) => (
                <tr key={community.id}>
                  <td>{community.name}</td>
                  <td>{community.address}</td>
                  <td>{community.contact_info}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {isSuccess && !communities.results.length && <div>Brak danych</div>}
      </div>
    </>
  );
};

export default AdminPanel;
