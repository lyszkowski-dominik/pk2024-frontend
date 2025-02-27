import { Button } from '@mui/material';
import styles from '../../../styles/Page.module.scss';
import Accordion from '../../common/accordion/Accordion';
import InputField from '../../common/forms/inputField/InputField';
import { useEffect, useState } from 'react';
import { useGetBillings } from '../../../features/billings/useGetBillings';
import { selectSelectedCommunity } from '../../../features/communities/sharedDataSlice';
import { useAppSelector } from '../../../app/hooks';
import Spinner from '../../ui/spinner/Spinner';
import { useGenerateBillings } from '../../../features/billings/useGenerateBillings';
import { useNotifications } from '../../alerts/NotificationContext';
import BillingsMonth from './BillingsMonth';
import dayjs from 'dayjs';
import { selectRoles } from '../../loginForm/loginFormSlice';
import { UserRole } from '../../../types/types';

const Billings = () => {
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

  const currentDate = new Date(dayjs().startOf('month').format('YYYY-MM-DD'));
  const [expandedMonths, setExpandedMonths] = useState<Date[]>([currentDate]);

  const {
    data: billings,
    isLoading,
    isError,
    error,
  } = useGetBillings({
    hoaId,
    page: 1,
    pageSize: 1,
    order_by: 'month',
  });

  const generateBillings = useGenerateBillings(hoaId);

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

  const handleAccordionChange = (month: Date) => {
    setExpandedMonths((prev) =>
      prev.includes(month) ? prev.filter((m) => m !== month) : [...prev, month],
    );
  };
  const goToPreviousYear = () => setSelectedYear((prev) => prev - 1);
  const goToNextYear = () => setSelectedYear((prev) => prev + 1);

  return (
    <div className={styles.container}>
      {isManager && (
        <div className={styles.section}>
          <Accordion title="Wysyłanie rachunków" defaultOpen={false}>
            <InputField
              type="month"
              label="Data:"
              name="billingDate"
              value={billingDate}
              onChange={(e) => setBillingDate(e.target.value)}
            />
            <Button
              color="secondary"
              variant="outlined"
              disabled={billingDate === ''}
              onClick={() =>
                generateBillings.mutate(new Date(billingDate), {
                  onSuccess: () => {
                    addNotification('Wygenerowano rachunki', 'success');
                  },
                  onError: (error) => {
                    setErrors(error);
                  },
                })
              }
            >
              Wyślij rachunki
            </Button>
            {errors && <div>{errors.message}</div>}
          </Accordion>
        </div>
      )}
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
                        <BillingsMonth
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
          <div>Brak danych rachunków</div>
        )}
      </div>
    </div>
  );
};

export default Billings;
