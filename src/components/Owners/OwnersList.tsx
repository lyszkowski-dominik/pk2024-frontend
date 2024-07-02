import type { OwnersResponse } from '../../types/OwnersTypes';
import styles from '../../global_styles/Table.module.scss';
import ReactPaginate from 'react-paginate';
import styles2 from './OwnersList.module.scss';
import { RemoveUser } from '../../utils/RemoveUser';
import { useState } from 'react';
import Modal from '../ui/modal/Modal';


interface OwnersListProps {
  ownersData: OwnersResponse | null;
  changePage: (pageNumber: number) => void;
  isFetching?: boolean;
  refetch: () => void;
}

const OwnersList = ({ ownersData, changePage, isFetching, refetch }: OwnersListProps) => {
  const pageSize = 10;
  const [editModal, setEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(-1);

  function handlePageClick(selectedItem: { selected: number }) {
    changePage(selectedItem.selected + 1);
  }

  return (
    <>
      {editModal && <Modal>
        <div className={styles2.modal}>
          <h2>Czy na pewno chcesz usunąć tego użytkownika?</h2>
          <div className={styles2.modalButtons}>
            <button className={styles2.btn_edit} onClick={() => {
              setEditModal(false);
            }}>Anuluj
            </button>
            <button onClick={async () => {
              await RemoveUser({ id: selectedUser });
              setEditModal(false);
              refetch();
            }} className={`${styles2.btn_edit} ${styles2.btn_delete}`}>Usuń
            </button>
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
            <th>Akcja</th>
          </tr>
          </thead>
          <tbody>
          {ownersData?.results.map(owner => (
            <tr key={owner.id}>
              <td>{owner.first_name}</td>
              <td>{owner.last_name}</td>
              <td>{owner.email}</td>
              <td>
                {/*<button>Edytuj</button>*/}
                <button onClick={() => {
                  setSelectedUser(owner.id);
                  setEditModal(true);
                }} className={`${styles2.btn_edit} ${styles2.btn_delete}`}>Usuń
                </button>
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