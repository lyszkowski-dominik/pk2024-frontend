import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import styles from '../../global_styles/Table.module.scss';
import Spinner from '../ui/spinner/Spinner';
import { PropertyTypeDisplayNames } from './types';
import type { Property } from '../../types/propertiesTypes';
import IconButton from '../ui/iconButton/IconButton';
import { useNavigate } from 'react-router';
import { useGetProperties } from '../../hooks/useGetProperties';

/**
 * @property {number} hoaId - The `hoaId` property represents the id of the hoa.
 */
export interface IProps {
  hoaId: number;
}


/**
 * 
 * @param {IProps} params
 * @returns {JSX.Element} The `PropertiesList` component returns a list of properties.
 */
const PropertiesList = ({ hoaId }: IProps) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const pageSize = 20;
  const {
    data,
    error,
    isLoading,
    refetch: refreshPage,
    isFetching,
  } = useGetProperties({
    page,
    pageSize,
    hoaId,
  });

  useEffect(() => {
    refreshPage();
  }, [page, data, hoaId, refreshPage]);

  const handlePageClick = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected + 1);
    refreshPage();
  };

  if (isLoading) return <Spinner />;
  if (error) return <div>Błąd przy wczytywaniu danych</div>;

  return (
    <div className={styles.tableContainer}>
      <table className={styles.clickableTable}>
        <thead>
          <tr>
            <th>Numer</th>
            <th>Rodzaj</th>
            <th>Piętro</th>
            <th>Powierzchnia całkowita</th>
            <th>Budynek</th>
            <th>Przynależy do</th>
          </tr>
        </thead>
        <tbody>
          {data?.results?.map((property: Property) => (
            <tr
              key={property.id}
              onClick={() =>
                navigate(`/hoa/${hoaId}/properties/${property.id}`)
              }
            >
              <td>{property.number}</td>
              <td>{PropertyTypeDisplayNames[property.type]}</td>
              <td>{property.floor}</td>
              <td>{property.total_area}</td>
              <td>{property.building}</td>
              <td>{property.building}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={Math.ceil((data?.count ?? 0) / pageSize)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={styles.pagination}
        activeClassName={styles.active}
      />
    </div>
  );
};

export default PropertiesList;
