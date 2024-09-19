import type { OwnersResponse } from '../../types/OwnersTypes';
import styles from '../../global_styles/Table.module.scss';
import ReactPaginate from 'react-paginate';
import styles2 from './OwnersList.module.scss';
import { RemoveUser } from '../../utils/RemoveUser';
import { useState } from 'react';
import Modal from '../ui/modal/Modal';
import IconButton from '../ui/iconButton/IconButton';
import { Button } from '@mui/material';
import { useNotifications } from '../notifications/NotificationContext';


/**
 * The type `OwnersListProps` defines the structure of the props for the `OwnersList` component.
 * @param {OwnersResponse | null} ownersData - The `ownersData` property represents the data to be displayed in the list.
 * @param {function} changePage - The `changePage` property represents the function to be called when the page changes.
 * @param {boolean} isFetching - The `isFetching` property represents whether the data is being fetched.
 * @param {function} refetch - The `refetch` property represents the function to be called to refetch the data.
 */
export interface OwnersListProps {
  ownersData: OwnersResponse | null;
  changePage: (pageNumber: number) => void;
  isFetching?: boolean;
  refetch: () => void;
}

/**
 * 
 * @param {OwnersListProps} props
 * @returns {JSX.Element} The `OwnersList` component returns a list of owners.
 */
const OwnersList = ({ ownersData, changePage, isFetching, refetch }: OwnersListProps) => {
  const pageSize = 10;
  const [editModal, setEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(-1);
  const { addNotification } = useNotifications();
  function handlePageClick(selectedItem: { selected: number }) {
    changePage(selectedItem.selected + 1);
  }

  return (
    <>
      {editModal && <Modal>
        <div className={styles2.modal}>
          <h2>Czy na pewno chcesz usunąć tego użytkownika?</h2>
          <div className={styles2.modalButtons}>
            <Button variant="contained" color="error" onClick={async () => {
              await RemoveUser({ id: selectedUser });
              setEditModal(false);
              addNotification("Użytkownik został usunięty.");
              refetch();
            }} >Usuń
            </Button>
            <Button color="secondary" onClick={() => {
              setEditModal(false);
            }}>Anuluj
            </Button>
          </div>
        </div>
      </Modal>}
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
          {ownersData?.results?.map(owner => (
            <tr key={owner.id}>
              <td>{owner.first_name}</td>
              <td>{owner.last_name}</td>
              <td>{owner.email}</td>
              <td>
                {/*<button>Edytuj</button>*/}
                <IconButton
                    iconName="delete"
                    onClick={(event: any) => {
                      setSelectedUser(owner.id);
                      setEditModal(true);
                    }}
                    altText="Delete Ownership"
                    size={24}
                    color="var(--pink)"
                  />
                {/* <button onClick={() => {
                  setSelectedUser(owner.id);
                  setEditModal(true);
                }} className={`${styles2.btn_edit} ${styles2.btn_delete}`}>Usuń
                </button> */}
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
          pageCount={Math.ceil(ownersData?.count !== undefined ? ownersData?.count / pageSize : 0)}
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

export default OwnersList;