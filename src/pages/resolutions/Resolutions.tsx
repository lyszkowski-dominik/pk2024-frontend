import styles from './Resolutions.module.scss';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectSelectedCommunity } from '../../features/communities/sharedDataSlice';
import usePagination from '../../hooks/usePagiantion';
import List from '../../components/list/List';
import Spinner from '../../components/ui/spinner/Spinner';
import Modal from '../../components/ui/modal/Modal';
import { ModalType } from '../../components/property/types';
import IconButton from '../../components/ui/iconButton/IconButton';
import AddResolutionForm from '../../components/resolutions/AddResolutionForm';
import { selectRoles } from '../../components/loginForm/loginFormSlice';
import {
  fetchResolutions,
  selectResolutionsStatus,
  selectResolutions,
  selectResolutionsCount,
} from '../../features/resolutions/resolutionsSlice';
import type { ApiPaginatedResult } from '../../types/types';
import type { Resolution } from '../../features/resolutions/resolutionsSlice';

const listColumns = [
  {
    name: 'title',
    label: 'Nazwa',
    type: 'string',
  },
  {
    name: 'created_at',
    label: 'Utworzono',
    type: 'datetime',
  },
  {
    name: 'start_date',
    label: 'Rozpoczęcie',
    type: 'datetime',
  },
  {
    name: 'end_date',
    label: 'Zakończenie',
    type: 'datetime',
  },
];
/**
 *
 * @returns {React.FunctionComponent} The `Resolutions` component is a functional component that displays a list of resolutions.
 */
const Resolutions = () => {
  const hoaID = useAppSelector(selectSelectedCommunity) || -1;
  const { page, setPage, pageSize } = usePagination();
  const userRole = useAppSelector(selectRoles);
  const canAddResolution = userRole === 'manager';

  const dispatch = useAppDispatch();
  const resolutions = useAppSelector(selectResolutions);
  const isLoading = useAppSelector(selectResolutionsStatus);
  const count = useAppSelector(selectResolutionsCount);

  const data: ApiPaginatedResult<Resolution> = {
    count: count,
    next: '',
    previous: '',
    results: resolutions,
  };

  useEffect(() => {
    dispatch(fetchResolutions({ hoaID: hoaID, page, page_size: pageSize }));
  }, [dispatch, hoaID, page, pageSize]);

  const changePage = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const [isModalOn, setModalOn] = useState(false);
  const [openModal, setOpenModal] = useState({});

  function handleImportClick() {
    console.log('Import clicked');
  }

  function handleExportClick() {
    console.log('Export clicked');
  }

  return (
    <div className={styles.propertiesContainer}>
      {isModalOn && (
        <Modal>
          {openModal === ModalType.Add && (
            <AddResolutionForm
              onCancel={() => {
                setModalOn(false);
              }}
            />
          )}
        </Modal>
      )}
      <div className={styles.iconButtons}>
        {canAddResolution && (
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
        {canAddResolution && (
          <IconButton
            iconName="import"
            onClick={handleImportClick}
            altText="Import Properties"
            size={24}
            color="var(--pink)"
          />
        )}
        {canAddResolution && (
          <IconButton
            iconName="export"
            onClick={handleExportClick}
            altText="Export Properties"
            size={24}
            color="var(--pink)"
          />
        )}
      </div>

      <List
        data={data}
        columns={listColumns}
        onPageChange={changePage}
        isFetching={isLoading}
        nameField="title"
        page={page}
        pageSize={pageSize}
        getDetailsHref={(record) =>
          '/hoa/' + hoaID + '/resolutions/' + record.id
        }
      />
    </div>
  );
};

export default Resolutions;
