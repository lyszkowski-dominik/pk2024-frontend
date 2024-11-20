import styles from '../../../styles/Table.module.scss';
import styles2 from './List.module.scss';
import ReactPaginate from 'react-paginate';
import type { ApiPaginatedResult } from '../../../types/types';
import IconButton from '../../ui/iconButton/IconButton';

/**
 * The type `ColumnDef` defines the structure of the column definition object.
 * @param {string} label - The `label` property represents the label of the column.
 * @param {string} name - The `name` property represents the name of the column.
 * @param {string} type - The `type` property represents the type of the column.
 */
export type ColumnDef = {
  label: string;
  name: string;
  type: ColumnType;
};

export enum ColumnType {
  TEXT,
  DATE,
  DATETIME,
  ACTION,
}

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
export type ListProps<T> = {
  data: ApiPaginatedResult<T>;
  columns: ColumnDef[];
  onDelete?: (record: T) => void;
  onPageChange: (pageNumber: number) => void;
  page: number;
  pageSize: number;
  onRowClick?: (rowData: T) => void;
};

const List = <T,>({
  data,
  columns,
  onDelete,
  onPageChange,
  page,
  pageSize,
  onRowClick,
}: ListProps<T>) => {
  const isClickable = !!onRowClick;

  const pageCount = Math.ceil(
    data?.count !== undefined ? data?.count / pageSize : 0,
  );

  const renderRow = (record: any) => {
    const cols = columns.map((column) => {
      let value = record[column.name];
      if (column.type === ColumnType.DATETIME) {
        value = new Date(value).toLocaleString();
      } else if (column.type === ColumnType.DATE) {
        value = new Date(value).toLocaleDateString();
      }
      return <td key={column.name}>{value}</td>;
    });

    return (
      <tr
        key={record.id}
        className={isClickable ? styles2.row : ''}
        onClick={() => onRowClick?.(record)}
      >
        {cols}
        {onDelete ? (
          <td>
            <IconButton
              iconName="delete"
              onClick={() => onDelete(record)}
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
          onPageChange={pageChangeHandler}
          containerClassName={styles.pagination}
          activeClassName={styles.active}
          disabledClassName={styles.disabled}
          initialPage={page - 1}
        />
      </div>
    </>
  );
};

export default List;
