import { useState } from 'react';
import styles from '../../../styles/Page.module.scss';
import propertiesStyles from '../../../pages/properties/Properties.module.scss';
import IconButton from '../../ui/iconButton/IconButton';
import Modal from '../../ui/modal/Modal';
import { ModalType } from '../types';
import { useAppSelector } from '../../../app/hooks';
import { selectRoles } from '../../loginForm/loginFormSlice';
import { useGetMeters } from '../../../features/meters/metersDevices/useGetMeters';
import MeterComponent from './Meter';
import Spinner from '../../ui/spinner/Spinner';
import { UserRole } from '../../../types/types';
import { selectSelectedCommunity } from '../../../features/communities/sharedDataSlice';
import DeleteMeterConfirmation from '../../charges/meters/devices/DeleteMeterConfirmation';
import { Meter } from '../../../features/meters/metersApiTypes';
import EditMeterDeviceForm from '../../charges/meters/devices/EditMeterDeviceForm';
import AddMeterDeviceForm from '../../charges/meters/devices/AddMeterDeviceForm';
import InputField from '../../common/forms/inputField/InputField';
import AddMeterReadingForm from '../../charges/meters/readings/AddMeterReadingForm';
import { downloadFile } from '../../../utils/downloadFile';

interface IProps {
  propertyId: number;
}

enum FormType {
  Reading = 'Reading',
  Meter = 'Meter',
}

const Meters = ({ propertyId }: IProps) => {
  const hoaId = useAppSelector(selectSelectedCommunity) || -1;
  const [onlyActive, setOnlyActive] = useState<boolean>(true);

  const [openModal, setOpenModal] = useState({});
  const [isModalOn, setModalOn] = useState(false);
  const [formType, setFormType] = useState<FormType | undefined>();
  const [selectedMeter, setSelectedMeter] = useState<Meter | undefined>();
  const role = useAppSelector(selectRoles);
  const isManager = role === UserRole.Manager;

  const {
    data: activeMeters,
    isLoading,
    isError,
    error,
  } = useGetMeters({
    hoaId,
    propertyId,
    page: 1,
    pageSize: 1000,
    isActive: true,
  });

  const { data: inactiveMeters } = useGetMeters({
    hoaId,
    propertyId,
    page: 1,
    pageSize: 1000,
    isActive: false,
  });

  const handleAction = (
    modalType: ModalType,
    formType: FormType,
    meter?: Meter,
  ) => {
    setModalOn(true);
    setSelectedMeter(meter);
    setOpenModal(modalType);
    setFormType(formType);
  };

  const handleAddReading = (meter: Meter) => {
    handleAction(ModalType.Add, FormType.Reading, meter);
  };

  const handleEditMeter = (meter: Meter) => {
    handleAction(ModalType.Edit, FormType.Meter, meter);
  };

  const handleDeleteMeter = (meter: Meter) => {
    handleAction(ModalType.Delete, FormType.Meter, meter);
  };

  const handleExportReadings = (meter: Meter) => {
    downloadFile(
      `/billings/meter_readings/export?meter=${meter.id}`,
      `meter_readings_${meter.number}.csv`,
    );
  };

  if (isLoading) return <Spinner />;
  if (isError) return <div>Błąd przy wczytywaniu danych: {error.message}</div>;
  if (activeMeters && activeMeters.results.length <= 0)
    return <div>Brak przypisanych liczników</div>;

  return (
    <div className={styles.section}>
      {isModalOn && (
        <>
          <Modal>
            {openModal === ModalType.Add && formType === FormType.Meter && (
              <AddMeterDeviceForm
                onClose={() => setModalOn(false)}
                propertyId={propertyId}
              />
            )}
            {openModal === ModalType.Edit &&
              formType === FormType.Meter &&
              selectedMeter && (
                <EditMeterDeviceForm
                  onClose={() => setModalOn(false)}
                  id={selectedMeter?.id}
                />
              )}
            {openModal === ModalType.Add &&
              formType === FormType.Reading &&
              selectedMeter && (
                <AddMeterReadingForm
                  onClose={() => setModalOn(false)}
                  meterId={selectedMeter.id}
                />
              )}
          </Modal>
          {openModal === ModalType.Delete &&
            formType === FormType.Meter &&
            selectedMeter && (
              <DeleteMeterConfirmation
                id={selectedMeter.id}
                onClose={() => setModalOn(false)}
                number={selectedMeter.number}
              />
            )}
        </>
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
            altText="Dodaj licznik"
          />
        </div>
      )}
      <div className={propertiesStyles.metersList}>
        {activeMeters?.results.map((meter) => (
          <MeterComponent
            key={meter.id}
            meter={meter}
            onMeterEdit={() => handleEditMeter(meter)}
            onMeterDelete={() => handleDeleteMeter(meter)}
            isEditable={isManager}
            handleAddReading={() => handleAddReading(meter)}
            handleExportReadings={() => handleExportReadings(meter)}
          />
        ))}
      </div>
      <InputField
        label="Pokaż nieaktywne"
        name="onlyActive"
        value={!onlyActive}
        type="checkbox"
        checked={!onlyActive}
        onChange={() => {
          setOnlyActive(!onlyActive);
        }}
      />
      {!onlyActive && (
        <div className={propertiesStyles.metersList}>
          {inactiveMeters?.results.map((meter) => (
            <MeterComponent
              key={meter.id}
              meter={meter}
              onMeterEdit={() => handleEditMeter(meter)}
              onMeterDelete={() => handleDeleteMeter(meter)}
              isEditable={isManager}
              handleAddReading={() => handleAddReading(meter)}
              handleExportReadings={() => handleExportReadings(meter)}
              inactive={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Meters;
