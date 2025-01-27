import { useState } from 'react';
import styles from '../../../../styles/Page.module.scss';
import { downloadFile } from '../../../../utils/downloadFile';
import { ModalType } from '../../../property/types';
import IconButton from '../../../ui/iconButton/IconButton';
import ReadingsList from './ReadingsList';
import { columns } from './utils';
import { useAppSelector } from '../../../../app/hooks';
import { selectSelectedCommunity } from '../../../../features/communities/sharedDataSlice';
import AddMeterReadingForm from './AddMeterReadingForm';
import Modal from '../../../ui/modal/Modal';
import FileUploadForm from '../../../common/forms/fileUploadForm/FileUploadForm';
import { metersReadingsQueryKeys } from '../../../../features/meters/meterReadings/meterReadingsTypes';
import { metersQueryKeys } from '../../../../features/meters/metersDevices/metersUtils';

const MeterReadings = () => {
  const hoaId = useAppSelector(selectSelectedCommunity) || -1;
  const [openModal, setOpenModal] = useState<ModalType | null>(null);
  const [isModalOn, setModalOn] = useState(false);

  const handleImportClick = () => {
    setOpenModal(ModalType.Import);
    setModalOn(true);
  };

  const handleExportClick = () => {
    downloadFile(
      `/billings/meter_readings/export?hoa=${hoaId}`,
      `meter_readings_${hoaId}.csv`,
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        {isModalOn && (
          <>
            {openModal === ModalType.Add && (
              <Modal>
                <AddMeterReadingForm onClose={() => setModalOn(false)} />
              </Modal>
            )}
            {openModal === ModalType.Import && (
              <Modal>
                <h1>Import lokali</h1>
                <FileUploadForm
                  url={`/billings/meter_readings/import/?hoa=${hoaId}`}
                  onClose={() => setModalOn(false)}
                  queryKeys={[
                    metersReadingsQueryKeys.filters({ hoaId }),
                    metersQueryKeys.filters({ hoaId }),
                  ]}
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
        <ReadingsList columns={columns} />
      </div>
    </div>
  );
};

export default MeterReadings;
