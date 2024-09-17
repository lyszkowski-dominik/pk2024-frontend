import styles from '../../global_styles/Table.module.scss';
import styles2 from './List.module.scss';
import ReactPaginate from 'react-paginate';
import type { ApiPaginatedResult } from '../../types/types';
import { useNavigate } from 'react-router';

type ColumnDef = {
  label: string;
  name: string;
  type: string;
};

type ListProps = {
  data: ApiPaginatedResult<any>;
  columns: ColumnDef[];
  nameField: string;
  onDelete?: (event: React.MouseEvent, id: number, record: any) => void;
  onPageChange: (pageNumber: number) => void;
  isFetching: boolean;
  page: number;
  pageSize: number;
  getDetailsHref?: (record: any) => string;
};

const List = ({
  data,
  columns,
  isFetching,
  onDelete,
  onPageChange,
  page,
  pageSize,
  getDetailsHref,
}: ListProps) => {
  const navigate = useNavigate();

  const pageCount = Math.ceil(
    data?.count !== undefined ? data?.count / pageSize : 0,
  );

  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selectedRecord, setSelectedRecord] = useState<number | null>(null);

  // const openModal = (record: number) => {
  //   setIsModalOpen(true);
  //   setSelectedRecord(record);
  // };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  //   setSelectedRecord(null);
  // };

  // const onDeleteHandler = (record: any) => {
  //   openModal(record.id);
  // };

  const renderRow = (record: any) => {
    const onCLick = () =>
      getDetailsHref ? navigate(getDetailsHref(record)) : '';

    const cols = columns.map((column) => {
      let value = record[column.name];
      if (column.type === 'datetime') {
        value = new Date(value).toLocaleString();
      }
      return <td key={column.name}>{value}</td>;
    });

    return (
      <tr key={record.id} className={styles2.row} onClick={onCLick}>
        {cols}
        {onDelete ? (
          <td>
            <button
              onClick={(event) => onDelete(event, record.id, record)}
              className={`${styles2.btn_edit} ${styles2.btn_delete}`}
            >
              Usuń
            </button>
          </td>
        ) : (
          ''
        )}
      </tr>
    );
  };

  const pageChangeHandler = (selectedItem: { selected: number }) => {
    onPageChange(selectedItem.selected + 1);
  };

  return (
    <>
      <div className={styles.tableContainer}>
        {isFetching && <div className={styles.overlay}></div>}
        <table className={styles.clickableTable}>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.name}>{column.label}</th>
              ))}
              {onDelete ? <th></th> : ''}
            </tr>
          </thead>
          <tbody>{data?.results?.map((record) => renderRow(record))}</tbody>
        </table>
        <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={isFetching ? undefined : pageChangeHandler}
          containerClassName={styles.pagination}
          activeClassName={styles.active}
          disabledClassName={isFetching ? styles.disabled : ''}
          initialPage={page - 1}
        />
      </div>
    </>
  );
};

export default List;
