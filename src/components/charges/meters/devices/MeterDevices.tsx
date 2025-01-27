import { useAppSelector } from '../../../../app/hooks';
import styles from '../../../../styles/Page.module.scss';
import { selectSelectedCommunity } from '../../../../features/communities/sharedDataSlice';
import { useGetMeters } from '../../../../features/meters/metersDevices/useGetMeters';
import { useGetMeterTypes } from '../../../../features/meters/meterTypes/useGetMeterTypes';
import { useGetProperties } from '../../../../features/properties/useGetProperties';
import usePagination from '../../../../hooks/usePagination';
import List from '../../../common/list/List';
import Spinner from '../../../ui/spinner/Spinner';
import { columns, getData } from './utils';
import { useState } from 'react';
import IconButton from '../../../ui/iconButton/IconButton';
import { Meter } from '../../../../features/meters/metersApiTypes';
import { ModalType } from '../../../property/types';
import Modal from '../../../ui/modal/Modal';
import AddMeterDeviceForm from './AddMeterDeviceForm';
import DevicesFilters from './DevicesFilters';
import EditMeterDeviceForm from './EditMeterDeviceForm';
import DeleteMeterConfirmation from './DeleteMeterConfirmation';
import { downloadFile } from '../../../../utils/downloadFile';
import FileUploadForm from '../../../common/forms/fileUploadForm/FileUploadForm';
import { metersQueryKeys } from '../../../../features/meters/metersDevices/metersUtils';

const MeterDevices = () => {
  const hoaId = useAppSelector(selectSelectedCommunity) || -1;
  const { page, setPage, pageSize } = usePagination(false);
  const [selectedType, setSelectedType] = useState<number | undefined>();
  const [activeFilter, setActiveFilter] = useState<boolean | undefined>();
  const [openModal, setOpenModal] = useState<ModalType | null>(null);
  const [isModalOn, setModalOn] = useState(false);
  const [selectedRecord, setSeletedRecord] = useState<Omit<
    Meter,
    'type' | 'property'
  > | null>(null);

  const { data: meters, isLoading: loadingMeters } = useGetMeters({
    hoaId,
    page,
    pageSize,
    meterType: selectedType,
    isActive: activeFilter,
  });
  const {
    isLoading: loadingTypes,
    data: types,
    isError,
    error,
  } = useGetMeterTypes({
    hoaId,
    page: 1,
    pageSize: 1000,
    isActive: true,
  });
  const { isLoading: loadingProperties, data: properties } = useGetProperties({
    hoaId,
    page: 1,
    pageSize: 10000,
  });

  const isLoading = loadingMeters || loadingTypes || loadingProperties;

  const changePage = (pageNumber: number) => {
    setPage(pageNumber);
  };
  const handleImportClick = () => {
    setOpenModal(ModalType.Import);
    setModalOn(true);
  };

  const handleExportClick = () => {
    downloadFile(`/billings/meters/export?hoa=${hoaId}`, `meters_${hoaId}.csv`);
  };

  return (
    <div className={styles.section}>
      {isModalOn && (
        <>
          {openModal === ModalType.Add && (
            <Modal>
              <AddMeterDeviceForm onClose={() => setModalOn(false)} />
            </Modal>
          )}
          {openModal === ModalType.Edit && selectedRecord && (
            <Modal>
              <EditMeterDeviceForm
                onClose={() => setModalOn(false)}
                id={selectedRecord.id}
              />
            </Modal>
          )}
          {openModal === ModalType.Delete && selectedRecord && (
            <DeleteMeterConfirmation
              id={selectedRecord.id}
              number={selectedRecord.number}
              onClose={() => setModalOn(false)}
            />
          )}
          {openModal === ModalType.Import && (
            <Modal>
              <h1>Import lokali</h1>
              <FileUploadForm
                url={`/billings/meters/import/?hoa=${hoaId}`}
                onClose={() => setModalOn(false)}
                queryKeys={[metersQueryKeys.filters({ hoaId })]}
              />
            </Modal>
          )}
        </>
      )}
      <div className={styles.iconButtons}>
        <IconButton
          iconName="add"
          onClick={() => {
            setOpenModal(ModalType.Add);
            setModalOn(true);
          }}
          altText="Dodaj licznik"
        />
        <IconButton
          iconName="import"
          onClick={handleImportClick}
          altText="Importuj liczniki"
        />
        <IconButton
          iconName="export"
          onClick={handleExportClick}
          altText="Eksportuj liczniki"
        />
      </div>
      <DevicesFilters
        types={types?.results ?? []}
        activeFilter={activeFilter}
        selectedType={selectedType}
        setActiveFilter={setActiveFilter}
        setSelectedType={setSelectedType}
      />
      {isLoading ? (
        <Spinner />
      ) : isError && error ? (
        <div>{error.message}</div>
      ) : meters && meters.results.length > 0 ? (
        <>
          <List
            data={getData(
              meters,
              types?.results ?? [],
              properties?.results ?? [],
            )}
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
        </>
      ) : (
        <div>Brak danych liczników</div>
      )}
    </div>
  );
};

export default MeterDevices;
