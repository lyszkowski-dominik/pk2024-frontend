import { Button } from '@mui/material';
import styles from '../../../styles/Page.module.scss';
import Accordion from '../../common/accordion/Accordion';
import { useEffect, useState } from 'react';
import { selectSelectedCommunity } from '../../../features/communities/sharedDataSlice';
import { useAppSelector } from '../../../app/hooks';
import Spinner from '../../ui/spinner/Spinner';
import dayjs from 'dayjs';
import { selectRoles } from '../../loginForm/loginFormSlice';
import { UserRole } from '../../../types/types';
import { useGetPayments } from '../../../features/payments/useGetPayments';
import PaymentsMonth from './PaymentsMonth';

const Payments = () => {
  const hoaId = useAppSelector(selectSelectedCommunity) || -1;
  const [monthsList, setMonthsList] = useState<Date[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(dayjs().year());
  const [firstPaymentDate, setFirstPaymentDate] = useState<Date>(
    dayjs().toDate(),
  );
  const role = useAppSelector(selectRoles);
  const isManager = role === UserRole.Manager;

  const currentDate = new Date(dayjs().startOf('month').format('YYYY-MM-DD'));
  const [expandedMonths, setExpandedMonths] = useState<Date[]>([currentDate]);

  const {
    data: payments,
    isLoading,
    isError,
    error,
  } = useGetPayments({
    hoaId,
    page: 1,
    pageSize: 1,
    order_by: 'date',
  });

  useEffect(() => {
    if (payments && payments.results.length > 0) {
      if (payments.results[0].date === null) return;
      const oldestPaymentDate = dayjs(payments.results[0].date).startOf(
        'month',
      );
      setFirstPaymentDate(oldestPaymentDate.toDate());
      let tempDate = dayjs(currentDate);
      let months: Date[] = [];

      while (!tempDate.isBefore(oldestPaymentDate)) {
        months.push(tempDate.toDate());
        tempDate = dayjs(tempDate).subtract(1, 'month');
      }
      setMonthsList(months);
    }
  }, [payments]);

  const handleAccordionChange = (month: Date) => {
    setExpandedMonths((prev) =>
      prev.includes(month) ? prev.filter((m) => m !== month) : [...prev, month],
    );
  };
  const goToPreviousYear = () => setSelectedYear((prev) => prev - 1);
  const goToNextYear = () => setSelectedYear((prev) => prev + 1);

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        {isLoading ? (
          <Spinner />
        ) : isError && error ? (
          <div>{error.message}</div>
        ) : payments && payments.results.length > 0 ? (
          <>
            <div className={styles.navigation}>
              <Button
                variant="outlined"
                onClick={goToPreviousYear}
                disabled={selectedYear === dayjs(firstPaymentDate).year()}
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
                        <PaymentsMonth
                          month={month}
                          isEditable={isManager}
                          hoaId={hoaId}
                        />
                      )}
                    </Accordion>
                  </div>
                );
              })}
          </>
        ) : (
          <div>Brak danych płatności</div>
        )}
      </div>
    </div>
  );
};

export default Payments;
