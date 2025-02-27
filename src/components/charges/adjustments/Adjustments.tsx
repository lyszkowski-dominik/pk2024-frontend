import { Button } from '@mui/material';
import styles from '../../../styles/Page.module.scss';
import editableRatesStyles from './EditableRates.module.scss';
import Accordion from '../../common/accordion/Accordion';
import { useEffect, useState } from 'react';
import { selectSelectedCommunity } from '../../../features/communities/sharedDataSlice';
import { useAppSelector } from '../../../app/hooks';
import Spinner from '../../ui/spinner/Spinner';
import dayjs from 'dayjs';
import { selectRoles } from '../../loginForm/loginFormSlice';
import { UserRole } from '../../../types/types';
import { useGetAdjustments } from '../../../features/adjustments/useGetAdjustments';
import AdjustmentMonth from './AdjustmentsMonth';
import Modal from '../../ui/modal/Modal';
import EditableAdjustmentRatesList from './EditableAdjustmentRatesList';
import { useGetAdjustmentsDates } from '../../../features/adjustments/useGetAdjustmentsDates';

const Adjustments = () => {
  const hoaId = useAppSelector(selectSelectedCommunity) || -1;
  const [adjustmentWindowOpen, setAdjustmentWindowOpen] = useState(false);

  const [monthsList, setMonthsList] = useState<Date[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(dayjs().year());
  const [firstAdjustmentDate, setFirstAdjustmentDate] = useState<Date>(
    dayjs().toDate(),
  );
  const role = useAppSelector(selectRoles);
  const isManager = role === UserRole.Manager;

  const [expandedMonths, setExpandedMonths] = useState<Date[]>([monthsList[0]]);

  const {
    data: adjustments,
    isLoading,
    isError,
    error,
  } = useGetAdjustments({
    hoaId,
    page: 1,
    pageSize: 1,
    order_by: 'start_month',
  });

  const { data: adjustmentsDates } = useGetAdjustmentsDates(hoaId);

  useEffect(() => {
    if (adjustments && adjustments.results.length > 0) {
      const oldestAdjustmentDate = dayjs(adjustments.results[0].end_month)
        .add(1, 'month')
        .startOf('month');
      setFirstAdjustmentDate(oldestAdjustmentDate.toDate());
      let tempDate = dayjs(dayjs().startOf('month').format('YYYY-MM-DD'));
      let months: Date[] = [];

      while (!tempDate.isBefore(oldestAdjustmentDate)) {
        months.push(tempDate.toDate());
        tempDate = dayjs(tempDate).subtract(1, 'month');
      }
      setMonthsList(months);
    }
  }, [adjustments]);

  const handleAccordionChange = (month: Date) => {
    setExpandedMonths((prev) =>
      prev.includes(month) ? prev.filter((m) => m !== month) : [...prev, month],
    );
  };
  const goToPreviousYear = () => setSelectedYear((prev) => prev - 1);
  const goToNextYear = () => setSelectedYear((prev) => prev + 1);

  return (
    <>
      {adjustmentWindowOpen && (
        <Modal className={editableRatesStyles['wide-modal']}>
          <EditableAdjustmentRatesList
            onClose={() => setAdjustmentWindowOpen(false)}
          />
        </Modal>
      )}
      <div className={styles.container}>
        {isManager && (
          <div className={styles.section}>
            <Accordion title="Wysyłanie korekt" defaultOpen={false}>
              {/* <InputField
              type="month"
              label="Data:"
              name="adjustmentDate"
              value={adjustmentDate}
              onChange={(e) => setAdjustmentDate(e.target.value)}
            /> */}
              <Button
                color="secondary"
                variant="outlined"
                // disabled={adjustmentDate === ''}
                onClick={() => setAdjustmentWindowOpen(true)}
              >
                Wyślij korekty
              </Button>
            </Accordion>
          </div>
        )}
        <div className={styles.section}>
          {isLoading ? (
            <Spinner />
          ) : isError && error ? (
            <div>{error.message}</div>
          ) : adjustments && adjustments.results.length > 0 ? (
            <>
              <div className={styles.navigation}>
                <Button
                  variant="outlined"
                  onClick={goToPreviousYear}
                  disabled={selectedYear === dayjs(firstAdjustmentDate).year()}
                >
                  {'<'}
                </Button>
                <h3>{selectedYear}</h3>
                <Button
                  variant="outlined"
                  onClick={goToNextYear}
                  disabled={selectedYear === dayjs().year()}
                >
                  {'>'}
                </Button>
              </div>
              {adjustmentsDates
                ?.filter(
                  (m) => dayjs(m).add(1, 'month').year() === selectedYear,
                )
                .map((m) => {
                  const month = dayjs(m)
                    .add(1, 'month')
                    .startOf('month')
                    .toDate();
                  return (
                    <div
                      key={dayjs(month).format('MMMM YYYY')}
                      className={styles.monthData}
                    >
                      <Accordion
                        title={dayjs(month).format('MMMM YYYY')}
                        defaultOpen={dayjs(month).isSame(monthsList[0])}
                        onChange={() => handleAccordionChange(month)}
                      >
                        {expandedMonths.find((m) => dayjs(m).isSame(month)) && (
                          <AdjustmentMonth
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
            <div>Brak danych korekt</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Adjustments;
