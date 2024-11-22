import Spinner from '../ui/spinner/Spinner';
import { useNavigate } from 'react-router';
import { useGetProperties } from '../../features/properties/useGetProperties';
import usePagination from '../../hooks/usePagination';
import List from '../common/list/List';
import { columns, getData } from './propertyUtils';

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
  const { page, setPage, pageSize } = usePagination();

  const { data, isLoading, error } = useGetProperties({
    page,
    pageSize,
    hoaId,
  });

  const changePage = (pageNumber: number) => {
    setPage(pageNumber);
  };

  if (isLoading) return <Spinner />;
  if (error) return <div>Błąd przy wczytywaniu danych</div>;

  return (
    <>
      {data && (
        <List
          data={getData(data)}
          columns={columns}
          onPageChange={changePage}
          page={page}
          pageSize={pageSize}
          onRowClick={(property) =>
            navigate(`/hoa/${hoaId}/properties/${property.id}`)
          }
        />
      )}
    </>
  );
};

export default PropertiesList;
