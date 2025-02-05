import { useState } from 'react';
import EditableRates from './EditableRates';
import { ModalType } from '../../property/types';
import styles from '../../../styles/Page.module.scss';
import localStyles from './EditableRates.module.scss';
import Modal from '../../ui/modal/Modal';
import { useGetRates } from '../../../features/rates/useGetRates';
import { useAppSelector } from '../../../app/hooks';
import { selectSelectedCommunity } from '../../../features/communities/sharedDataSlice';
import { RateSetState } from '../../../features/rates/ratesTypes';
import Spinner from '../../ui/spinner/Spinner';
import List from '../../common/list/List';
import { columns, getData } from './utils';
import { useGetMeterTypes } from '../../../features/meters/meterTypes/useGetMeterTypes';
import { Button } from '@mui/material';
import Accordion from '../../common/accordion/Accordion';
import { selectRoles } from '../../loginForm/loginFormSlice';
import { UserRole } from '../../../types/types';
import DeleteRateConfirmation from './DeleteRateConfirmation';

const Rates = () => {
  const hoaId = useAppSelector(selectSelectedCommunity) || -1;
  const userRole = useAppSelector(selectRoles);
  const isManager = userRole === UserRole.Manager;
  const [selectedRecord, setSelectedRecord] = useState<number>();
  const [openModal, setOpenModal] = useState<ModalType | null>(null);
  const [isModalOn, setModalOn] = useState(false);
  const {
    data: currentRates,
    isLoading: loadingCurrent,
    isError: isErrorCurrent,
    error: errorCurrent,
  } = useGetRates({ hoaId, page: 1, pageSize: 1, state: RateSetState.CURRENT });
  const { data: pastRates } = useGetRates({
    hoaId,
    page: 1,
    pageSize: 1000,
    state: RateSetState.PAST,
  });
  const { data: futureRates } = useGetRates({
    hoaId,
    page: 1,
    pageSize: 1000,
    state: RateSetState.FUTURE,
  });
  const { data: types } = useGetMeterTypes({
    hoaId,
    page: 1,
    pageSize: 1000,
    isActive: true,
  });

  if (loadingCurrent) return <Spinner />;
  if (isErrorCurrent && errorCurrent) return <div>{errorCurrent.message}</div>;
  return (
    <>
      <div className={styles.container}>
        <div className={styles.section}>
          {isModalOn && (
            <>
              {openModal === ModalType.Add && (
                <Modal className={localStyles['wide-modal']}>
                  <EditableRates
                    onClose={() => setModalOn(false)}
                    id={selectedRecord}
                    minDate={currentRates?.results[0].start}
                  />
                </Modal>
              )}
              {openModal === ModalType.Edit && selectedRecord && (
                <Modal className={localStyles['wide-modal']}>
                  <EditableRates
                    onClose={() => setModalOn(false)}
                    id={selectedRecord}
                    addNew={false}
                    minDate={currentRates?.results[0].start}
                  />
                </Modal>
              )}
              {openModal === ModalType.Delete && selectedRecord && (
                <DeleteRateConfirmation
                  id={selectedRecord}
                  onClose={() => setModalOn(false)}
                />
              )}
            </>
          )}
          <h2 className={styles['section-title']}>Aktualne stawki</h2>
          {isManager && (
            <Button
              onClick={() => {
                setOpenModal(ModalType.Add);
                setModalOn(true);
                setSelectedRecord(currentRates?.results[0].id);
              }}
              disabled={futureRates && futureRates.results.length > 0}
            >
              Aktualizuj
            </Button>
          )}
          {currentRates && currentRates.results.length > 0 ? (
            <>
              <div className={localStyles.display_date}>
                <label>Ważne od:</label> {currentRates.results[0].start}{' '}
              </div>
              <List
                columns={columns}
                data={getData(
                  currentRates.results[0].rates,
                  types?.results ?? [],
                )}
              />
            </>
          ) : (
            <div>Brak aktualnych stawek</div>
          )}
        </div>
        {futureRates && futureRates.results.length > 0 && (
          <div className={styles.section}>
            <h2 className={styles['section-title']}>Przyszłe stawki</h2>
            {isManager && (
              <div className={styles.iconButtons}>
                <Button
                  onClick={() => {
                    setOpenModal(ModalType.Edit);
                    setModalOn(true);
                    setSelectedRecord(futureRates?.results[0].id);
                  }}
                >
                  Edytuj
                </Button>
                <Button
                  onClick={() => {
                    setOpenModal(ModalType.Delete);
                    setModalOn(true);
                    setSelectedRecord(futureRates?.results[0].id);
                  }}
                  color="error"
                >
                  Usuń
                </Button>
              </div>
            )}
            <>
              <div className={localStyles.display_date}>
                <label>Ważne od:</label> {futureRates.results[0].start}{' '}
              </div>
              <List
                columns={columns}
                data={getData(
                  futureRates.results[0].rates,
                  types?.results ?? [],
                )}
              />
            </>
          </div>
        )}
        <div className={styles.section}>
          <Accordion title="Poprzednie stawki">
            {pastRates && pastRates.results.length > 0 ? (
              <div className={localStyles.past_list}>
                {pastRates.results.map((rateSet) => (
                  <div className={localStyles.past_rates} key={rateSet.id}>
                    <Accordion title={`${rateSet.start} - ${rateSet.end}`}>
                      <List
                        columns={columns}
                        data={getData(rateSet.rates, types?.results ?? [])}
                      />
                    </Accordion>
                  </div>
                ))}
              </div>
            ) : (
              <div>Brak poprzednich stawek</div>
            )}
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default Rates;
