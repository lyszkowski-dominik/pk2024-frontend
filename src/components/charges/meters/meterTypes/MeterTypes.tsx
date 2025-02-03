import { useAppSelector } from '../../../../app/hooks';
import usePagination from '../../../../hooks/usePagination';
import { selectSelectedCommunity } from '../../../../features/communities/sharedDataSlice';
import styles from '../../../../styles/Page.module.scss';

import { useGetMeterTypes } from '../../../../features/meters/meterTypes/useGetMeterTypes';

import List from '../../../common/list/List';
import Spinner from '../../../ui/spinner/Spinner';
import { columns, getData } from './utils';
import IconButton from '../../../ui/iconButton/IconButton';
import { useState } from 'react';
import { ModalType } from '../../../property/types';
import Modal from '../../../ui/modal/Modal';
import AddMeterTypeForm from './AddMeterTypeForm';
import Accordion from '../../../common/accordion/Accordion';
import DeleteMeterTypeConfirmation from './DeleteMeterTypeConfirmation';
import { MeterType } from '../../../../features/meters/metersApiTypes';
import EditMeterTypeForm from './EditMeterTypeForm';

const MeterTypes = () => {
  const hoaId = useAppSelector(selectSelectedCommunity) || -1;
  const { page, setPage, pageSize } = usePagination(false);
  const [openModal, setOpenModal] = useState<ModalType | null>(null);
  const [isModalOn, setModalOn] = useState(false);
  const [selectedRecord, setSeletedRecord] = useState<MeterType | null>(null);

  const { isLoading, data, isError, error } = useGetMeterTypes({
    hoaId,
    page,
    pageSize,
    isActive: true,
  });
  const existingLabels =
    data?.results?.filter((type) => type.active).map((type) => type.label) ??
    [];

  const changePage = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <div className={styles.section}>
      {isModalOn && (
        <>
          {openModal === ModalType.Add && (
            <Modal>
              <AddMeterTypeForm
                onClose={() => setModalOn(false)}
                existingLabels={existingLabels}
              />
            </Modal>
          )}
          {openModal === ModalType.Edit && selectedRecord && (
            <Modal>
              <EditMeterTypeForm
                onClose={() => setModalOn(false)}
                id={selectedRecord.id}
              />
            </Modal>
          )}
          {openModal === ModalType.Delete && selectedRecord && (
            <DeleteMeterTypeConfirmation
              id={selectedRecord.id}
              label={selectedRecord.label}
              onClose={() => setModalOn(false)}
            />
          )}
        </>
      )}
      <Accordion title="Rodzaje liczników">
        <div className={styles.iconButtons}>
          <IconButton
            iconName="add"
            onClick={() => {
              setOpenModal(ModalType.Add);
              setModalOn(true);
            }}
            altText="Dodaj rodzaj licznika"
          />
        </div>
        {isLoading ? (
          <Spinner />
        ) : isError && error ? (
          <div>{error.message}</div>
        ) : data && data.results.length > 0 ? (
          <List
            data={getData(data)}
            columns={columns}
            page={page}
            pageSize={pageSize}
            onPageChange={changePage}
            onRowClick={(record) => {
              setSeletedRecord(record as MeterType);
              setOpenModal(ModalType.Edit);
              setModalOn(true);
            }}
            onDelete={(record) => {
              setSeletedRecord(record as MeterType);
              setOpenModal(ModalType.Delete);
              setModalOn(true);
            }}
            noPagination={data.count <= pageSize}
          />
        ) : (
          <div>Brak zdefiniowanych rodzajów liczników</div>
        )}
      </Accordion>
    </div>
  );
};

export default MeterTypes;
