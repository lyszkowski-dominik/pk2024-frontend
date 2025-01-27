import { useState } from 'react';
import { MeterReading } from '../../../../features/billings/billingTypes';
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
  const [selectedRecord, setSeletedRecord] = useState<MeterReading | null>(
    null,
  );
  const { page, setPage, pageSize } = usePagination(false);
  const changePage = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const {
    data: readings,
    isLoading,
    isError,
    error,
  } = useGetMeterReadings({
    page,
    pageSize,
    hoaId: hoaId ?? undefined,
    meterId: meterId ?? undefined,
  });

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
              meterId={meterId ?? selectedRecord.meter}
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
          data={readings}
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
