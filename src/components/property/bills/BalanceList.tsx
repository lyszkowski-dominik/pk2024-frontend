import { Button } from '@mui/material';
import styles from '../../../styles/Page.module.scss';
import stylesBalance from './Balance.module.scss';
import Accordion from '../../common/accordion/Accordion';
import { useEffect, useState } from 'react';
import { useGetBillings } from '../../../features/billings/useGetBillings';
import { selectSelectedCommunity } from '../../../features/communities/sharedDataSlice';
import { useAppSelector } from '../../../app/hooks';
import Spinner from '../../ui/spinner/Spinner';
import { useNotifications } from '../../alerts/NotificationContext';
import dayjs from 'dayjs';
import { selectRoles } from '../../loginForm/loginFormSlice';
import { UserRole } from '../../../types/types';
import BalanceItem from './BalanceItem';
import { useGeneratePayment } from '../../../features/payments/useGeneratePayment';
import { useGetProperty } from '../../../features/properties/useGetProperty';
import { useGetOwnerships } from '../../../features/ownerships/useGetOwnerships';

const BalanceList = ({ propertyId }: { propertyId: number }) => {
  const hoaId = useAppSelector(selectSelectedCommunity) || -1;
  const { addNotification } = useNotifications();
  const [billingDate, setBillingDate] = useState<string>('');
  const [errors, setErrors] = useState<Error>();
  const [monthsList, setMonthsList] = useState<Date[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(dayjs().year());
  const [firstBillingDate, setFirstBillingDate] = useState<Date>(
    dayjs().toDate(),
  );
  const role = useAppSelector(selectRoles);
  const isManager = role === UserRole.Manager;
  const isOwner = role === UserRole.Owner;

  const currentDate = new Date(dayjs().startOf('month').format('YYYY-MM-DD'));
  const [expandedMonths, setExpandedMonths] = useState<Date[]>([currentDate]);

  const {
    data: billings,
    isLoading,
    isError,
    error,
  } = useGetBillings({
    hoaId,
    propertyId,
    page: 1,
    pageSize: 1,
    order_by: 'month',
  });

  const payBalance = useGeneratePayment(hoaId, propertyId);

  useEffect(() => {
    if (billings && billings.results.length > 0) {
      const oldestBillingDate = dayjs(billings.results[0].month).startOf(
        'month',
      );
      setFirstBillingDate(oldestBillingDate.toDate());
      let tempDate = dayjs(currentDate);
      let months: Date[] = [];

      while (!tempDate.isBefore(oldestBillingDate)) {
        months.push(tempDate.toDate());
        tempDate = dayjs(tempDate).subtract(1, 'month');
      }
      setMonthsList(months);
    }
  }, [billings]);

  const { isLoading: loadingProperty, data: property } =
    useGetProperty(propertyId);
  const { data: ownerships, isLoading: loadingOwnerships } = useGetOwnerships({
    page: 1,
    pageSize: 100,
    propertyId,
  });

  const handleAccordionChange = (month: Date) => {
    setExpandedMonths((prev) =>
      prev.includes(month) ? prev.filter((m) => m !== month) : [...prev, month],
    );
  };
  const goToPreviousYear = () => setSelectedYear((prev) => prev - 1);
  const goToNextYear = () => setSelectedYear((prev) => prev + 1);

  return (
    <div className={styles.container}>
      {
        <div className={styles.section}>
          <h1>Saldo</h1>
          {loadingOwnerships ? (
            <Spinner />
          ) : ownerships?.results && ownerships.results.length > 0 ? (
            <div className={stylesBalance.balanceList}>
              {ownerships?.results
                ?.filter(
                  (o) =>
                    (isManager &&
                      ((o.end !== null && o.balance !== 0) ||
                        o.end === null)) ||
                    isOwner,
                )
                .map((o) => (
                  <div key={o.id} className={stylesBalance.balance}>
                    {isManager && (
                      <div className={stylesBalance.balanceOwners}>
                        {o.owners.map((owner) => (
                          <h2>
                            {owner.first_name} {owner.last_name}
                          </h2>
                        ))}
                      </div>
                    )}
                    <h2
                      className={
                        property?.balance !== undefined
                          ? property?.balance < 0
                            ? stylesBalance.balanceAmountRed
                            : stylesBalance.balanceAmountGreen
                          : ''
                      }
                    >
                      {`${o.balance} zł`}
                    </h2>
                  </div>
                ))}
            </div>
          ) : (
            'Brak danych'
          )}
          {isOwner && (
            <>
              <br />
              <Button
                color="secondary"
                variant="outlined"
                onClick={() =>
                  payBalance.mutate(propertyId, {
                    onSuccess: (data) => {
                      window.open(data?.link, '_blank', 'noopener,noreferrer');
                    },
                    onError: (error) => {
                      setErrors(error);
                    },
                  })
                }
              >
                Zapłać
              </Button>
            </>
          )}
          {errors && <div>{errors.message}</div>}
        </div>
      }
      <div className={styles.section}>
        {isLoading ? (
          <Spinner />
        ) : isError && error ? (
          <div>{error.message}</div>
        ) : billings && billings.results.length > 0 ? (
          <>
            <div className={styles.navigation}>
              <Button
                variant="outlined"
                onClick={goToPreviousYear}
                disabled={selectedYear === dayjs(firstBillingDate).year()}
              >
                {'<'}
              </Button>
              <h3>{selectedYear}</h3>
              <Button
                variant="outlined"
                onClick={goToNextYear}
                disabled={selectedYear === dayjs(currentDate).year()}
              >
                {'>'}
              </Button>
            </div>
            {monthsList
              .filter((m) => dayjs(m).year() === selectedYear)
              .map((month) => {
                return (
                  <div
                    key={dayjs(month).format('MMMM YYYY')}
                    className={styles.monthData}
                  >
                    <Accordion
                      title={dayjs(month).format('MMMM YYYY')}
                      defaultOpen={dayjs(month).isSame(currentDate)}
                      onChange={() => handleAccordionChange(month)}
                    >
                      {expandedMonths.find((m) => dayjs(m).isSame(month)) && (
                        <BalanceItem
                          month={month}
                          isManager={isManager}
                          hoaId={hoaId}
                          propertyId={propertyId}
                        />
                      )}
                    </Accordion>
                  </div>
                );
              })}
          </>
        ) : (
          <div>Brak danych rachunków</div>
        )}
      </div>
    </div>
  );
};

export default BalanceList;
