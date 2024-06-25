import type { OwnersResponse } from '../../types/OwnersTypes';
import styles from '../../global_styles/Table.module.scss';
import ReactPaginate from 'react-paginate';

interface OwnersListProps {
  ownersData: OwnersResponse | null;
  changePage: (pageNumber: number) => void;
  isFetching?: boolean;
}

const OwnersList = ({ ownersData, changePage, isFetching }: OwnersListProps) => {
  const pageSize = 10;

  function handlePageClick(selectedItem: { selected: number }) {
    changePage(selectedItem.selected + 1);
  }

  return (
    <>
      <div className={styles.tableContainer}>
        {isFetching && <div className={styles.overlay}></div>}
          <table className={styles.table}>
            <thead>
            <tr>
              <th>Imię</th>
              <th>Nazwisko</th>
              <th>Email</th>
            </tr>
            </thead>
            <tbody>
            {ownersData?.results.map(owner => (
            <tr key={owner.id}>
              <td>{owner.first_name}</td>
              <td>{owner.last_name}</td>
              <td>{owner.email}</td>
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