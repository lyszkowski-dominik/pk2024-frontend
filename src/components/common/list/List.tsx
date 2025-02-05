import styles from '../../../styles/Table.module.scss';
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
  AMOUNT,
  ACTION,
  OTHER,
}

export type ListProps<T> = {
  data: ApiPaginatedResult<T> | any[];
  columns: ColumnDef[];
  onDelete?: (record: T) => void;
  onPageChange?: (pageNumber: number) => void;
  page?: number;
  pageSize?: number;
  onRowClick?: (rowData: T) => void;
  noPagination?: boolean;
};

const List = <T,>({
  data,
  columns,
  onDelete,
  onPageChange,
  page,
  pageSize,
  onRowClick,
  noPagination = false,
}: ListProps<T>) => {
  const isClickable = !!onRowClick;
  const results = Array.isArray(data) ? data : data?.results;

  const pageCount = Math.ceil(
    !Array.isArray(data) && data?.count !== undefined && !!pageSize
      ? data?.count / pageSize
      : 0,
  );

  const renderRow = (record: any) => {
    const cols = columns.map((column) => {
      let value = record[column.name];
      if (value === null || value === undefined) {
        value = '-';
      } else {
        if (column.type === ColumnType.DATETIME) {
          value = new Date(value).toLocaleString();
        } else if (column.type === ColumnType.DATE) {
          value = new Date(value).toLocaleDateString();
        } else if (column.type === ColumnType.AMOUNT) {
          value = `${parseFloat(`${value}`).toFixed(2)} zł`;
        }
      }
      return <td key={column.name}>{value}</td>;
    });

    return (
      <tr key={record.id} onClick={() => onRowClick?.(record)}>
        {cols}
        {onDelete ? (
          <td>
            <IconButton
              iconName="delete"
              onClick={(event) => {
                event.stopPropagation();
                onDelete(record);
              }}
              altText="Usuń"
            />
          </td>
        ) : (
          ''
        )}
      </tr>
    );
  };

  const pageChangeHandler = (selectedItem: { selected: number }) => {
    onPageChange?.(selectedItem.selected + 1);
  };

  return (
    <>
      <div className={styles.tableContainer}>
        <table className={isClickable ? styles.clickableTable : styles.table}>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.name}>{column.label}</th>
              ))}
              {onDelete ? <th></th> : ''}
            </tr>
          </thead>
          <tbody>{results?.map((record) => renderRow(record))}</tbody>
        </table>
        {!noPagination && page && (
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
        )}
      </div>
    </>
  );
};

export default List;
