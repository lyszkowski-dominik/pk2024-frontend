import styles from '../../../styles/Table.module.scss';
import Spinner from '../../ui/spinner/Spinner';
import { useGetMeterReadings } from '../../../features/meters/meterReadings/useGetMeterReadings';

import { columns } from './metersUtils';
import List from '../../common/list/List';
import usePagination from '../../../hooks/usePagination';

interface IProps {
  propertyId: number;
  meterId: number;
  onRowClicked: (id: number) => void;
  onRowDelete: (id: number) => void;
  isEditable: boolean;
}

const MeterReadingList = ({
  propertyId,
  meterId,
  onRowClicked,
  onRowDelete,
  isEditable,
}: IProps) => {
  const { page, setPage, pageSize } = usePagination();
  const { data, error, isLoading } = useGetMeterReadings({
    page,
    pageSize,
    propertyId,
    meterId,
  });

  const changePage = (pageNumber: number) => {
    setPage(pageNumber);
  };

  if (isLoading) return <Spinner />;
  if (error) return <div>Błąd przy wczytywaniu danych</div>;
  if (data?.results && data.results.length <= 0)
    return <div>Brak odczytów</div>;

  return (
    <div className={styles.tableContainer}>
      {data && data.results.length > 0 ? (
        <List
          data={data}
          columns={columns}
          onPageChange={changePage}
          page={page}
          pageSize={pageSize}
          onRowClick={(reading: any) => onRowClicked(reading.id)}
          {...(isEditable && {
            onDelete: (reading: any) => onRowDelete(reading.id),
          })}
        />
      ) : (
        <div>Brak odczytów</div>
      )}
    </div>
  );
};

export default MeterReadingList;
