import styles from '../../styles/Table.module.scss';
import propertiesStyles from '../properties/Properties.module.scss';
import Spinner from '../../components/ui/spinner/Spinner';
import { useParams } from 'react-router';
import { useAppSelector } from '../../app/hooks';
import { selectRoles } from '../../components/loginForm/loginFormSlice';
import { UserRole } from '../../types/types';
import List from '../../components/common/list/List';
import { columnsAdjustment, getAdjustmentData } from './utils';
import { useGetAdjustmentById } from '../../features/adjustments/useGetAdjustmentById';

const AdjustmentPage = () => {
  const role = useAppSelector(selectRoles);
  const isOwner = role === UserRole.Owner;
  const { adjustmentId: id } = useParams<{ adjustmentId: string }>();
  const adjustmentId = parseInt(id || '', 10);
  const { data, error, isError, isLoading } =
    useGetAdjustmentById(adjustmentId);

  // const handlePayment = async () => {
  //   const res = await SendPayment(billingId);

  //   if (res?.status === 400) {
  //     setErrorMessages(res?.data);
  //     console.log(res?.data);
  //     setIsError(true);
  //   } else {
  //     setIsError(false);
  //   }
  //   window.open(res?.data?.link, '_blank', 'noopener,noreferrer');
  // };

  if (isLoading) return <Spinner />;
  if (!adjustmentId) return <div>Nieznana korekta</div>;
  if (isError && error)
    return <div>{`Błąd przy wczytywaniu danych: ${error}`}</div>;
  if (!data) return <div>Brak danych</div>;

  return (
    <div className={styles.tableContainer}>
      <div className={propertiesStyles.summary}>
        <b>Data początkowa: </b>{' '}
        {new Date(data.start_month || '').toLocaleDateString()}
        <br />
        <b>Data końcowa: </b>{' '}
        {new Date(data.end_month || '').toLocaleDateString()}
        <br />
        <b>Data końcowa: </b> {data.payment_deadline || '-'}
      </div>
      <List
        data={getAdjustmentData(data.entries)}
        columns={columnsAdjustment}
        noPagination={true}
      />
    </div>
  );
};

export default AdjustmentPage;
