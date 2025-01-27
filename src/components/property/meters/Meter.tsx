import styles from '../../../styles/Page.module.scss';
import IconButton from '../../ui/iconButton/IconButton';
import propertiesStyles from '../../../pages/properties/Properties.module.scss';
import { Button } from '@mui/material';
import { Meter } from '../../../features/meters/metersApiTypes';
import { useGetMeterType } from '../../../features/meters/meterTypes/useGetMeterType';
import ReadingsList from '../../charges/meters/readings/ReadingsList';
import { columns } from './metersUtils';

interface IProps {
  meter: Meter;
  onMeterEdit: (id: number) => void;
  onMeterDelete: (id: number) => void;
  isEditable: boolean;
  handleAddReading: () => void;
  handleExportReadings: () => void;
  inactive?: boolean;
}

const MeterComponent = ({
  meter,
  onMeterEdit,
  onMeterDelete,
  isEditable,
  handleAddReading,
  handleExportReadings,
  inactive = false,
}: IProps) => {
  const { data: meterType } = useGetMeterType(meter.type);

  return (
    <div className={styles.container}>
      <div
        key={meter.id}
        className={
          inactive ? propertiesStyles.inactive : propertiesStyles.meterSection
        }
      >
        <div className={propertiesStyles.leftSection}>
          <div className={propertiesStyles.meterTitle}>
            <b>Licznik numer {meter.number}: </b>
          </div>
          <div className={propertiesStyles.metersDetails}>
            <div className={propertiesStyles.detailItem}>
              <label>Rodzaj:</label>
              <span>{meterType?.label}</span>
            </div>
            <div className={propertiesStyles.detailItem}>
              <label>Jednostki:</label>
              <span>{meterType?.unit}</span>
            </div>
            <div className={propertiesStyles.detailItem}>
              <label>Data instalacji:</label>
              <span>
                {meter.installation_date!
                  ? new Date(meter.installation_date).toLocaleDateString()
                  : '-'}
              </span>
            </div>
            <div className={propertiesStyles.detailItem}>
              <label>Data demontażu:</label>
              <span>
                {meter.removal_date!
                  ? new Date(meter.removal_date).toLocaleDateString()
                  : '-'}
              </span>
            </div>
          </div>
          {isEditable && (
            <div className={styles.iconButtons} style={{ margin: '0 auto' }}>
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
            </div>
          )}
        </div>
        <div className={propertiesStyles.rightSection}>
          <div className={propertiesStyles.readingTitle}>
            <b>Odczyty: </b>
            <br />
            {isEditable && (
              <div className={styles.iconButtons}>
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
            <ReadingsList columns={columns} meterId={meter.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeterComponent;
