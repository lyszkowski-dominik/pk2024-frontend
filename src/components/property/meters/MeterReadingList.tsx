import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import styles from '../../../global_styles/Table.module.scss';
import Spinner from '../../ui/spinner/Spinner';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setUpdatedMeterReadings } from '../../../app/slices/propertiesState';
import IconButton from '../../ui/iconButton/IconButton';
import type { IMeterReading } from '../../../types/billingTypes';
import { useGetMeterReadings } from '../../../hooks/useGetMeterReadings';

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
  const [page, setPage] = useState(1);
  const [meterReadings, setMeterReadings] = useState([]);
  const shouldUpdate = useAppSelector(
    (state) => state.propertiesState.updatedMeterReadings,
  );
  const dispatch = useAppDispatch();
  const pageSize = 20;
  const {
    data,
    error,
    isLoading,
    refetch: refreshPage,
  } = useGetMeterReadings({
    page,
    pageSize,
    propertyId,
  });

  useEffect(() => {
    refreshPage();
    if (data) {
      setMeterReadings(
        data?.results?.filter((r: IMeterReading) => r.meter === meterId),
      );
    }
  }, [page, data, refreshPage, propertyId, meterId]);

  useEffect(() => {
    if (shouldUpdate) {
      refreshPage();
      dispatch(setUpdatedMeterReadings(false));
    }
  }, [shouldUpdate]);

  const handlePageClick = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected + 1);
    refreshPage();
  };

  if (isLoading) return <Spinner />;
  if (error) return <div>Błąd przy wczytywaniu danych</div>;
  if (meterReadings.length <= 0) return <div>Brak odczytów</div>;

  return (
    <div className={styles.tableContainer}>
      <table className={styles.clickableTable}>
        <thead>
          <tr>
            <th>Data odczytu</th>
            <th>Wartość</th>
            {isEditable && <th></th>}
          </tr>
        </thead>
        <tbody>
          {meterReadings?.map((reading: IMeterReading) => (
            <tr key={reading.id} onClick={() => onRowClicked(reading.id)}>
              <td>{reading.reading_date}</td>
              <td>{reading.reading_value}</td>
              {isEditable && (
                <td>
                  <IconButton
                    iconName="delete"
                    onClick={(event: any) => {
                      event.stopPropagation();
                      onRowDelete(reading.id);
                    }}
                    altText="Delete Reading"
                    size={24}
                    color="var(--pink)"
                  />
                </td>
              )}
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

export default MeterReadingList;
