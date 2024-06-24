import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import styles from '../../global_styles/Table.module.scss';
import Spinner from '../ui/spinner/Spinner';
import { useGetPropertiesQuery } from './propertiesApiSlice';
import { PropertyTypeDisplayNames } from './types';

const PropertiesList = () => {
  const [page, setPage] = useState(1);
  const pageSize = 20;
  const { data, error, isLoading } = useGetPropertiesQuery({
    page,
    pageSize: pageSize,
  });

  const handlePageClick = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected + 1);
  };

  if (isLoading) return <Spinner />;
  if (error) return <div>Błąd przy wczytywaniu danych</div>;

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
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
          {data?.results.map((property) => (
            <tr key={property.id}>
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
        pageCount={Math.ceil(data?.count ?? 0 / pageSize)}
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
