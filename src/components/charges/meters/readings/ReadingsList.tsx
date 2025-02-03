import { useState } from 'react';
import { useGetMeterReadings } from '../../../../features/meters/meterReadings/useGetMeterReadings';
import usePagination from '../../../../hooks/usePagination';
import List, { ColumnDef } from '../../../common/list/List';
import { ModalType } from '../../../property/types';
import Spinner from '../../../ui/spinner/Spinner';
import DeleteReadingConfirmation from './DeleteReadingConfirmation';
import EditMeterReadingForm from './EditMeterReadingForm';
import Modal from '../../../ui/modal/Modal';
import { useAppSelector } from '../../../../app/hooks';
import { selectSelectedCommunity } from '../../../../features/communities/sharedDataSlice';
import { getData } from './utils';
import { useGetMeterTypes } from '../../../../features/meters/meterTypes/useGetMeterTypes';
import { MeterReading } from '../../../../features/meters/metersApiTypes';

const ReadingsList = ({
  columns,
  meterId,
}: {
  columns: ColumnDef[];
  meterId?: number;
}) => {
  const hoaId = useAppSelector(selectSelectedCommunity) || -1;
  const [openModal, setOpenModal] = useState<ModalType | null>(null);
  const [isModalOn, setModalOn] = useState(false);
  const [selectedRecord, setSeletedRecord] = useState<Omit<
    MeterReading,
    'meter_type'
  > | null>(null);
  const { page, setPage, pageSize } = usePagination(false);
  const changePage = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const {
    data: readings,
    isLoading: loadingReadings,
    isError,
    error,
  } = useGetMeterReadings({
    page,
    pageSize,
    hoaId: hoaId ?? undefined,
    meterId: meterId ?? undefined,
  });

  const { isLoading: loadingTypes, data: types } = useGetMeterTypes({
    hoaId,
    page: 1,
    pageSize: 1000,
    isActive: true,
  });

  const isLoading = loadingReadings || loadingTypes;

  return (
    <>
      {isModalOn && (
        <>
          {openModal === ModalType.Edit && selectedRecord && (
            <Modal>
              <EditMeterReadingForm
                onClose={() => setModalOn(false)}
                id={selectedRecord.id}
              />
            </Modal>
          )}
          {openModal === ModalType.Delete && selectedRecord && (
            <DeleteReadingConfirmation
              id={selectedRecord.id}
              date={selectedRecord.reading_date}
              number={selectedRecord.meter_number}
              onClose={() => setModalOn(false)}
              meterId={meterId}
            />
          )}
        </>
      )}
      {isLoading ? (
        <Spinner />
      ) : isError && error ? (
        <div>{error.message}</div>
      ) : readings && readings.results.length > 0 ? (
        <List
          data={getData(readings, types?.results ?? [])}
          columns={columns}
          page={page}
          pageSize={pageSize}
          onPageChange={changePage}
          onRowClick={(record) => {
            setSeletedRecord(record);
            setOpenModal(ModalType.Edit);
            setModalOn(true);
          }}
          onDelete={(record) => {
            setSeletedRecord(record);
            setOpenModal(ModalType.Delete);
            setModalOn(true);
          }}
        />
      ) : (
        <div>Brak odczytów</div>
      )}
    </>
  );
};

export default ReadingsList;
