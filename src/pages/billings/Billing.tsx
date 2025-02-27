import styles from '../../styles/Table.module.scss';
import propertiesStyles from '../properties/Properties.module.scss';
import Spinner from '../../components/ui/spinner/Spinner';
import { useParams } from 'react-router';
import { useGetBillingById } from '../../features/billings/useGetBillingById';
import { useAppSelector } from '../../app/hooks';
import { selectRoles } from '../../components/loginForm/loginFormSlice';
import { UserRole } from '../../types/types';
import List from '../../components/common/list/List';
import { columnsBilling, getBillingData } from './utils';

const BillingPage = () => {
  const role = useAppSelector(selectRoles);
  const isOwner = role === UserRole.Owner;
  const { billingId: id } = useParams<{ billingId: string }>();
  const billingId = parseInt(id || '', 10);
  const { data, error, isError, isLoading } = useGetBillingById(billingId);

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
  if (!billingId) return <div>Nieznany rachunek</div>;
  if (isError && error)
    return <div>{`Błąd przy wczytywaniu danych: ${error}`}</div>;
  if (!data) return <div>Brak danych</div>;

  return (
    <div className={styles.tableContainer}>
      <div className={propertiesStyles.summary}>
        <b>Data wystawienia: </b>{' '}
        {new Date(data.month || '').toLocaleDateString()}
        <br />
        <b>Data płatności: </b> {data.payment_deadline || '-'}
      </div>
      <List
        data={getBillingData(data.bills)}
        columns={columnsBilling}
        noPagination={true}
      />
    </div>
  );
};

export default BillingPage;
