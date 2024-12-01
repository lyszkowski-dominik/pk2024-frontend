import styles from '../../../styles/Table.module.scss';
import IconButton from '../../ui/iconButton/IconButton';
import type { IMeter } from '../../../features/billings/billingTypes';
import { getMeterType } from '../propertyUtils';
import propertiesStyles from '../../../pages/properties/Properties.module.scss';
import { Button } from '@mui/material';
import MeterReadingList from './MeterReadingList';

interface IProps {
  propertyId: number;
  meter: IMeter;
  onMeterEdit: (id: number) => void;
  onMeterDelete: (id: number) => void;
  onReadingEdit: (id: number) => void;
  onReadingDelete: (id: number) => void;
  isEditable: boolean;
  handleAddReading: () => void;
  handleImportReadings: () => void;
  handleExportReadings: () => void;
}

const Meter = ({
  propertyId,
  meter,
  onMeterEdit,
  onMeterDelete,
  onReadingEdit,
  onReadingDelete,
  isEditable,
  handleAddReading,
  handleImportReadings,
  handleExportReadings,
}: IProps) => {
  return (
    <div className={styles.tableContainer}>
      <div key={meter.id} className={propertiesStyles.meterSection}>
        <div className={propertiesStyles.meterTitle}>
          <b>Licznik numer {meter.number}: </b>
          {isEditable && (
            <>
              <Button
                variant="outlined"
                type="button"
                onClick={() => onMeterEdit(meter.id)}
              >
                <span>Edytuj</span>
              </Button>
              <Button
                variant="outlined"
                type="button"
                onClick={() => onMeterDelete(meter.id)}
                color="error"
              >
                <span>Usuń</span>
              </Button>
            </>
          )}
        </div>
        <b>Rodzaj: </b>
        {getMeterType(meter.type)}
        <br />
        <b>Jednostki: </b>
        {meter.unit_of_measurement}
        <br />
        <b>Data instalacji: </b>{' '}
        {new Date(meter.installation_date || '').toLocaleDateString()}
        <br />
        <div className={propertiesStyles.readingTitle}>
          <b>Odczyty: </b>
          <br />
          {isEditable && (
            <div className={propertiesStyles.iconButtons}>
              <IconButton
                iconName="add"
                onClick={handleAddReading}
                altText="Dodaj odczyt"
              />
              <IconButton
                iconName="export"
                onClick={handleExportReadings}
                altText="Eksportuj odczyty"
              />
            </div>
          )}
        </div>
        <MeterReadingList
          propertyId={propertyId}
          meterId={meter.id}
          onRowClicked={onReadingEdit}
          onRowDelete={onReadingDelete}
          isEditable={isEditable}
        />
      </div>
    </div>
  );
};

export default Meter;
