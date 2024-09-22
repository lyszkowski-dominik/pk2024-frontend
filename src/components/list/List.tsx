import styles from '../../styles/Table.module.scss';
import styles2 from './List.module.scss';
import ReactPaginate from 'react-paginate';
import type { ApiPaginatedResult } from '../../types/types';
import { useNavigate } from 'react-router';
import { Button } from '@mui/material';
import IconButton from '../ui/iconButton/IconButton';

/**
 * The type `ColumnDef` defines the structure of the column definition object.
 * @param {string} label - The `label` property represents the label of the column.
 * @param {string} name - The `name` property represents the name of the column.
 * @param {string} type - The `type` property represents the type of the column.
 */
type ColumnDef = {
  label: string;
  name: string;
  type: string;
};

/**
 * The type `ListProps` defines the structure of the props for the `List` component.
 * @param {ApiPaginatedResult<any>} data - The `data` property represents the paginated data to be displayed in the list.
 * @param {ColumnDef[]} columns - The `columns` property represents the column definitions for the list.
 * @param {string} nameField - The `nameField` property represents the field in the data that contains the name of the record.
 * @param {function} onDelete - The `onDelete` property represents the function to be called when a record is deleted.
 * @param {function} onPageChange - The `onPageChange` property represents the function to be called when the page changes.
 * @param {boolean} isFetching - The `isFetching` property represents whether the data is being fetched.
 * @param {number} page - The `page` property represents the current page number.
 * @param {number} pageSize - The `pageSize` property represents the number of records to be displayed per page.
 * @param {function} getDetailsHref - The `getDetailsHref` property represents the function to get the details URL for a record.
 */
export type ListProps = {
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

/**
 * 
 * @param {ListProps} props
 * @returns {JSX.Element} The `List` component returns a paginated list of records.
 */
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
            {/* <Button
              onClick={(event) => onDelete(event, record.id, record)}
              className={`${styles2.btn_edit} ${styles2.btn_delete}`}
            >
              Usuń
            </Button> */}
            <IconButton
              iconName="delete"
              onClick={(event) => onDelete(event, record.id, record)}
              altText="Usuń"
              size={24}
              color="var(--pink)"
            />
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
