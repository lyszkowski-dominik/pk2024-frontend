import styles from '../../styles/Table.module.scss';
import ReactPaginate from 'react-paginate';
import styles2 from './UsersList.module.scss';
import { RemoveUser } from '../../features/users/RemoveUser';
import { useState } from 'react';
import Modal from '../ui/modal/Modal';
import IconButton from '../ui/iconButton/IconButton';
import { Button } from '@mui/material';
import { useNotifications } from '../notifications/NotificationContext';
import type { UsersResponse } from '../../features/users/usersTypes';

/**
 * The type `OwnersListProps` defines the structure of the props for the `OwnersList` component.
 * @param {UsersResponse | null} ownersData - The `ownersData` property represents the data to be displayed in the list.
 * @param {function} changePage - The `changePage` property represents the function to be called when the page changes.
 * @param {boolean} isFetching - The `isFetching` property represents whether the data is being fetched.
 * @param {function} refetch - The `refetch` property represents the function to be called to refetch the data.
 */
export interface UsersListProps {
  usersData: UsersResponse | null;
  changePage: (pageNumber: number) => void;
  isFetching?: boolean;
  refetch: () => void;
}

/**
 *
 * @param {UsersListProps} props
 * @returns {JSX.Element} The `OwnersList` component returns a list of owners.
 */
const UsersList = ({
  usersData,
  changePage,
  isFetching,
  refetch,
}: UsersListProps) => {
  const pageSize = 10;
  const [editModal, setEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(-1);
  const { addNotification } = useNotifications();
  function handlePageClick(selectedItem: { selected: number }) {
    changePage(selectedItem.selected + 1);
  }

  return (
    <>
      {editModal && (
        <Modal>
          <div className={styles2.modal}>
            <h2>Czy na pewno chcesz usunąć tego użytkownika?</h2>
            <div className={styles2.modalButtons}>
              <Button
                variant="contained"
                color="error"
                onClick={async () => {
                  await RemoveUser({ id: selectedUser });
                  setEditModal(false);
                  addNotification('Użytkownik został usunięty.');
                  refetch();
                }}
              >
                Usuń
              </Button>
              <Button
                color="secondary"
                onClick={() => {
                  setEditModal(false);
                }}
              >
                Anuluj
              </Button>
            </div>
          </div>
        </Modal>
      )}
      <div className={styles.tableContainer}>
        {isFetching && <div className={styles.overlay}></div>}
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Imię</th>
              <th>Nazwisko</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {usersData?.results?.map((user) => (
              <tr key={user.id}>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>
                  <IconButton
                    iconName="delete"
                    onClick={(event: any) => {
                      setSelectedUser(user.id);
                      setEditModal(true);
                    }}
                    altText="Delete user"
                    size={24}
                    color="var(--pink)"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={Math.ceil(
            usersData?.count !== undefined ? usersData?.count / pageSize : 0,
          )}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={isFetching ? undefined : handlePageClick}
          containerClassName={styles.pagination}
          activeClassName={styles.active}
          disabledClassName={isFetching ? styles.disabled : ''}
        />
      </div>
    </>
  );
};

export default UsersList;
