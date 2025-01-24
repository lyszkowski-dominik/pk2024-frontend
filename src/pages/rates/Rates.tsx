import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectSelectedCommunity } from '../../features/communities/sharedDataSlice';
import { logOut, selectRoles } from '../../components/loginForm/loginFormSlice';
import { ModalType, UserRole } from '../../types/types';
import Spinner from '../../components/ui/spinner/Spinner';
import List from '../../components/common/list/List';
import usePagination from '../../hooks/usePagination';
import IconButton from '../../components/ui/iconButton/IconButton';
import Modal from '../../components/ui/modal/Modal';
import styles from './Rates.module.scss';
import { EditRateModal } from './EditRateModal';
import RemoveRateConfirmation from '../../components/rates/RemoveRateConfirmation';
import { Rate } from '../../features/rates/ratesTypes';
import { UpdateRate } from '../../features/rates/updateRate';
import { useGetRates } from '../../features/rates/useGetRates';
import { ratesColumns } from '../../features/rates/utils';
import { AddRateModal } from './AddRateModal';
import { useGetOldRates } from '../../features/rates/useGetOldRates';

export const Rates = () => {
  const [deleteModalOn, setDeleteModalOn] = useState(false);
  const hoaID = useAppSelector(selectSelectedCommunity) || -1;
  const [selectedRate, setSelectedRate] = useState<Rate | null>(null);
  const userRole = useAppSelector(selectRoles);
  const isManager = userRole === UserRole.Manager || userRole === UserRole.Admin;
  const dispatch = useAppDispatch();
  const { page, setPage, pageSize } = usePagination();
  const [openModal, setOpenModal] = useState({});
  const [isModalOn, setModalOn] = useState(false);
  const [editModalData, setEditModalData] = useState<Rate | null>(null);
  useEffect(() => {
    if (!isManager) {
      dispatch(logOut());
      window.location.assign('/login');
    }
  }, [dispatch, isManager]);
  const setAddModalOn = () => {
    setOpenModal(ModalType.Edit);
    setModalOn(true);
  }
  function changePage(pageNumber: number) {
    setPage(pageNumber);
  }
  const { isLoading, data, refetch, isError, error } = useGetRates({
    hoaId: hoaID,
    page,
    pageSize: 10,
  });

  const { data: oldRates, isLoading: oldIsLoading } = useGetOldRates({
    hoaId: hoaID,
    page,
    pageSize,
    onlyOld: true,
  });

  console.log('old rates: ', oldRates)

  const handleRowClick = (rate: Rate) => {
    setEditModalData(rate);
    setSelectedRate(rate);
    setAddModalOn();
  };
  return (
    <>
      {deleteModalOn && (
        <RemoveRateConfirmation
          rateId={selectedRate?.id || -1}
          onClose={() => setDeleteModalOn(false)}
        />
      )}
      <div>
        {isError && <div>{error instanceof Error ? error.message : 'Nie masz wystarczających uprawnień.'}</div>}
        <div style={{ display: 'flex', justifyContent: 'center', width: "100%" }}>
          {isManager && !isError && !isLoading && (
            <IconButton
              iconName="add"
              onClick={() => {
                setOpenModal(ModalType.Add);
                setModalOn(true);
              }}
              altText="Add Rate"
              size={24}
              margin={10}
              color="var(--pink)"
            />
          )}
        </div>
        {isModalOn && (
          <Modal>
            {openModal === ModalType.Add && (
              <div className={styles.addRateContainer}>
                <AddRateModal setModalOn={setModalOn} refetchRates={refetch} />
              </div>
            )}

            {openModal === ModalType.Edit && editModalData != null && (
              <div className={styles.addRateContainer}>
                {editModalData && <EditRateModal data={editModalData} UpdateRate={UpdateRate} setModalOn={setModalOn} refetchRates={refetch} />}
              </div>
            )}
          </Modal>
        )}
        {isLoading ? (
          <Spinner />
        ) : (
          data && (
            <List
              data={data}
              columns={ratesColumns}
              onPageChange={changePage}
              page={page}
              pageSize={pageSize}
              {...(isManager && {
                onDelete: (rate: Rate) => {
                  setSelectedRate(rate);
                  setDeleteModalOn(true);
                },
              })}
              onRowClick={handleRowClick} />
          )
        )}
        {oldIsLoading ? (
          <Spinner />
        ) : (
          oldRates && (
            <>
              <h1>Stawki historyczne</h1>
              <List
                data={oldRates}
                columns={ratesColumns}
                onPageChange={changePage}
                page={page}
                pageSize={pageSize}
                // {...(isManager && {
                //   onDelete: (rate: Rate) => {
                //     setSelectedRate(rate);
                //     setDeleteModalOn(true);
                //   },
                // })}
                onRowClick={handleRowClick} 
                />
            </>
          )
        )}
      </div>
    </>
  )
}