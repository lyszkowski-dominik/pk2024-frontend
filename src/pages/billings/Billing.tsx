import { useEffect, useState } from 'react';
import styles from '../../styles/Table.module.scss';
import propertiesStyles from '../properties/Properties.module.scss';
import Spinner from '../../components/ui/spinner/Spinner';
import { useNavigate, useParams } from 'react-router';
import { useGetBillingById } from '../../features/billings/useGetBillingById';
import type { IBill, IBilling } from '../../features/billings/billingTypes';
import { getUnit } from '../../components/property/propertyUtils';
import { useAppSelector } from '../../app/hooks';
import { selectRoles } from '../../components/loginForm/loginFormSlice';
import SendPayment from '../../features/billings/SendPayment';
import { Button } from '@mui/material';

/**
 * 
 * @returns {JSX.Element} The `Billing` component returns the billing details.
 */
const Billing = () => {
  const role = useAppSelector(selectRoles);
  const navigate = useNavigate();
  const isOwner = role === 'owner';
  const [isError, setIsError] = useState(false);
  const [errorMessages, setErrorMessages] = useState<{ errors: string } | null>(
    null,
  );
  const { billingId: id } = useParams<{ billingId: string }>();
  const billingId = parseInt(id || '', 10);
  const [billing, setBilling] = useState<IBilling>();
  const {
    data,
    error,
    isLoading,
    refetch: refreshPage,
  } = useGetBillingById(billingId);

  useEffect(() => {
    refreshPage();
    if (data) {
      setBilling(data);
    }
  }, [data, refreshPage]);

  const handlePayment = async () => {
    const res = await SendPayment(billingId);

    if (res?.status === 400) {
      setErrorMessages(res?.data);
      console.log(res?.data);
      setIsError(true);
    } else {
      setIsError(false);
    }
    window.open(res?.data?.link, '_blank', 'noopener,noreferrer');
  };

  if (isLoading) return <Spinner />;
  if (!billingId) return <div>Nieznany rachunek</div>;
  if (error) return <div>Błąd przy wczytywaniu danych</div>;
  if (!billing) return <div>Brak danych</div>;

  return (
    <div className={styles.tableContainer}>
      <div className={propertiesStyles.summary}>
        <b>Data wystawienia: </b>{' '}
        {new Date(billing.month || '').toLocaleDateString()}
        <br />
        <b>Data płatności: </b>{' '}
        {new Date(billing.month || '').setDate(10) &&
          new Date(
            new Date(billing.month || '').setDate(10),
          ).toLocaleDateString()}
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Media</th>
            <th>Ilość</th>
            <th>JM</th>
            <th>Stawka</th>
            <th>Wartość</th>
          </tr>
        </thead>
        <tbody>
          {billing?.bills.map((bill: IBill) => (
            <tr key={bill.id}>
              <td>{bill.rate.name}</td>
              <td>{bill.units_consumed}</td>
              <td>{getUnit(bill.rate.type)}</td>
              <td>{bill.rate.rate_per_unit}</td>
              <td>{bill.total_amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {isOwner && billing && (
        <>
          <div className={propertiesStyles.payment}>
            <Button
              disabled={billing.is_paid}
              onClick={async () => await handlePayment()}
            >
              Zapłać
            </Button>
          </div>

          {isError && (
            <div className={styles.error}>
              {Object.entries(errorMessages || {}).map(([key, value]) => (
                <div key={key}>{value}</div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Billing;
