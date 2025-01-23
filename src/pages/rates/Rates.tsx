import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectSelectedCommunity } from '../../features/communities/sharedDataSlice';
import { logOut, selectRoles } from '../../components/loginForm/loginFormSlice';
import { ModalType, UserRole } from '../../types/types';
import { useGetRates } from '../../features/rates/useGetRates';
import Spinner from '../../components/ui/spinner/Spinner';
import List from '../../components/common/list/List';
import { ratesColumns } from '../../features/rates/utils';
import usePagination from '../../hooks/usePagination';
import { Rate } from '../../features/rates/ratesTypes';
import RemoveRateConfirmation from '../../components/rates/RemoveRateConfirmation';
import IconButton from '../../components/ui/iconButton/IconButton';
import Modal from '../../components/ui/modal/Modal';
import styles from './Rates.module.scss';
import { UpdateRate } from '../../features/rates/updateRate';
import { EditRateModal } from './EditRateModal';
import { AddRateModal } from './AddRateModal';

export const Rates = () => {
  const [deleteModalOn, setDeleteModalOn] = useState(false);
  const hoaID = useAppSelector(selectSelectedCommunity) || -1;
  const [selectedRate, setSelectedRate] = useState<Rate | null>(null);
  const userRole = useAppSelector(selectRoles);
  const isManager = userRole === UserRole.Manager || UserRole.Admin;
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

  const { isLoading, data, refetch } = useGetRates({
    hoaId: hoaID,
    page,
    pageSize: 10,
  });

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
        <div style={{ display: 'flex', justifyContent: 'center', width: "100%" }}>
          {isManager && (
            <IconButton
              iconName="add"
              onClick={() => {
                setOpenModal(ModalType.Add);
                setModalOn(true);
              }}
              altText="Add User"
              size={24}
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
      </div>
    </>
  )
}