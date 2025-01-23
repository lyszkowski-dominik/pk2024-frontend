import Spinner from '../ui/spinner/Spinner';
import { useNavigate } from 'react-router';
import { useGetProperties } from '../../features/properties/useGetProperties';
import usePagination from '../../hooks/usePagination';
import List from '../common/list/List';
import { columns, getData, mustHaveParent } from './propertyUtils';
import { Property } from '../../features/properties/propertiesTypes';
import { ApiPaginatedResult } from '../../types/types';

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

  const filterProperties = (propertiesData: ApiPaginatedResult<Property>) => ({
    ...propertiesData,
    results: propertiesData.results.filter((p) => !mustHaveParent(p.type)),
  });

  const changePage = (pageNumber: number) => {
    setPage(pageNumber);
  };

  if (isLoading) return <Spinner />;
  if (error) return <div>Błąd przy wczytywaniu danych</div>;
  const filteredData = data ? filterProperties(data) : null;
  return (
    <>
      {filteredData && filteredData?.results?.length > 0 ? (
        <List
          data={getData(filteredData)}
          columns={columns}
          onPageChange={changePage}
          page={page}
          pageSize={pageSize}
          onRowClick={(property) =>
            navigate(`/hoa/${hoaId}/properties/${property.id}`)
          }
        />
      ) : (
        <div>Brak lokali do wyświetlenia</div>
      )}
    </>
  );
};

export default PropertiesList;
