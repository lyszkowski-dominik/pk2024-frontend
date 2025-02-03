import MeterTypes from './meterTypes/MeterTypes';
import styles from '../../../styles/Page.module.scss';
import MeterDevices from './devices/MeterDevices';

const Meters = () => {
  return (
    <div className={styles.container}>
      <MeterTypes />
      <MeterDevices />
    </div>
  );
};

export default Meters;
