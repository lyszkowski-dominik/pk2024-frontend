import { useEffect, useState } from 'react';
import styles from '../../../pages/properties/Properties.module.scss';
import IconButton from '../../ui/iconButton/IconButton';
import Modal from '../../ui/modal/Modal';
import { ModalType } from '../types';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectRoles } from '../../loginForm/loginFormSlice';
import {
  setUpdatedMeterReadings,
  setUpdatedMeters,
} from '../../../features/properties/propertiesState';
import MeterForm from './MeterForm';
import { DeleteMeter } from '../../../features/meters/DeleteMeter';
import MeterReadingForm from './MeterReadingForm';
import { DeleteMeterReading } from '../../../features/meter_readings/DeleteMeterReading';
import { useGetMeters } from '../../../features/meters/useGetMeters';
import type { IMeter } from '../../../features/billings/billingTypes';
import Meter from './Meter';
import Spinner from '../../ui/spinner/Spinner';

interface IProps {
  propertyId: number;
}

enum FormType {
  Reading = 'Reading',
  Meter = 'Meter',
}

const Meters = ({ propertyId }: IProps) => {
  const dispatch = useAppDispatch();
  const [openModal, setOpenModal] = useState({});
  const [isModalOn, setModalOn] = useState(false);
  const [formType, setFormType] = useState<FormType | undefined>();
  const [selectedMeter, setSelectedMeter] = useState<number | undefined>();
  const [selectedReading, setSelectedReading] = useState<number | undefined>();
  const shouldUpdate = useAppSelector(
    (state) => state.propertiesState.updatedMeters,
  );
  const [meters, setMeters] = useState([]);
  const role = useAppSelector(selectRoles);
  const isManager = role === 'manager';

  const { data, error, isLoading, refetch: refreshPage } = useGetMeters();

  const handleImportClick = () => {
    console.log('Import clicked');
  };

  const handleExportClick = () => {
    console.log('Export clicked');
  };

  useEffect(() => {
    refreshPage();
    if (data) {
      setMeters(
        propertyId
          ? data?.results?.filter(
              (meter: IMeter) => meter.property === propertyId,
            )
          : data?.results,
      );
    }
  }, [data, refreshPage, propertyId]);

  useEffect(() => {
    if (shouldUpdate) {
      refreshPage();
      dispatch(setUpdatedMeters(false));
    }
  }, [dispatch, refreshPage, shouldUpdate]);

  useEffect(() => {
    if (!isModalOn) {
      setSelectedMeter(undefined);
      setSelectedReading(undefined);
    }
  }, [isModalOn]);

  if (isLoading) return <Spinner />;
  if (error) return <div>Błąd przy wczytywaniu danych</div>;
  if (meters.length <= 0) return <div>Brak przypisanych liczników</div>;

  return (
    <div className={styles.propertiesContainer}>
      {isModalOn && (
        <Modal>
          {openModal === ModalType.Add && formType === FormType.Meter && (
            <MeterForm isModalOn={setModalOn} propertyId={propertyId} />
          )}
          {openModal === ModalType.Edit && formType === FormType.Meter && (
            <MeterForm
              isModalOn={setModalOn}
              propertyId={propertyId}
              meterId={selectedMeter}
            />
          )}
          {openModal === ModalType.Delete && formType === FormType.Meter && (
            <div>
              <h2>Czy na pewno chcesz usunąć ten licznik?</h2>
              <div className={styles.modalButtons}>
                <button
                  className={styles.btn_edit}
                  onClick={() => {
                    setModalOn(false);
                  }}
                >
                  Anuluj
                </button>
                <button
                  onClick={async () => {
                    await DeleteMeter(selectedMeter || -1);
                    setModalOn(false);
                    dispatch(setUpdatedMeters(true));
                  }}
                  className={`${styles.btn_edit} ${styles.btn_delete}`}
                >
                  Usuń
                </button>
              </div>
            </div>
          )}
          {openModal === ModalType.Add &&
            formType === FormType.Reading &&
            selectedMeter && (
              <MeterReadingForm
                isModalOn={setModalOn}
                meterId={selectedMeter}
              />
            )}
          {openModal === ModalType.Edit &&
            formType === FormType.Reading &&
            selectedMeter && (
              <MeterReadingForm
                isModalOn={setModalOn}
                meterId={selectedMeter}
                readingId={selectedReading}
              />
            )}
          {openModal === ModalType.Delete && formType === FormType.Reading && (
            <div>
              <h2>Czy na pewno chcesz usunąć ten odczyt?</h2>
              <div className={styles.modalButtons}>
                <button
                  className={styles.btn_edit}
                  onClick={() => {
                    setModalOn(false);
                  }}
                >
                  Anuluj
                </button>
                <button
                  onClick={async () => {
                    await DeleteMeterReading(selectedReading || -1);
                    setModalOn(false);
                    dispatch(setUpdatedMeterReadings(true));
                  }}
                  className={`${styles.btn_edit} ${styles.btn_delete}`}
                >
                  Usuń
                </button>
              </div>
            </div>
          )}
        </Modal>
      )}
      {isManager && (
        <div className={styles.iconButtons}>
          <IconButton
            iconName="add"
            onClick={() => {
              setOpenModal(ModalType.Add);
              setFormType(FormType.Meter);
              setModalOn(true);
            }}
            altText="Add Meter"
            size={24}
            color="var(--pink)"
          />
          <IconButton
            iconName="import"
            onClick={handleImportClick}
            altText="Import Meters"
            size={24}
            color="var(--pink)"
          />
          <IconButton
            iconName="export"
            onClick={handleExportClick}
            altText="Export Meters"
            size={24}
            color="var(--pink)"
          />
        </div>
      )}
      {meters?.map((meter: IMeter) => (
        <Meter
          key={meter.id}
          propertyId={propertyId}
          meter={meter}
          onMeterEdit={() => {
            setModalOn(true);
            setOpenModal(ModalType.Edit);
            setFormType(FormType.Meter);
            setSelectedMeter(meter.id);
          }}
          onMeterDelete={() => {
            setModalOn(true);
            setOpenModal(ModalType.Delete);
            setFormType(FormType.Meter);
            setSelectedMeter(meter.id);
          }}
          onReadingEdit={(id: number) => {
            setModalOn(true);
            setOpenModal(ModalType.Edit);
            setFormType(FormType.Reading);
            setSelectedMeter(meter.id);
            setSelectedReading(id);
          }}
          onReadingDelete={(id: number) => {
            setModalOn(true);
            setOpenModal(ModalType.Delete);
            setFormType(FormType.Reading);
            setSelectedMeter(meter.id);
            setSelectedReading(id);
          }}
          isEditable={isManager}
          handleAddReading={() => {
            setModalOn(true);
            setOpenModal(ModalType.Add);
            setFormType(FormType.Reading);
          }}
          handleImportReadings={handleImportClick}
          handleExportReadings={handleExportClick}
        />
      ))}
    </div>
  );
};

export default Meters;
