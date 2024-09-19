import { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import List from '../list/List';
import { useGetRequests } from '../../hooks/useGetRequests';
import { useAppSelector } from '../../app/hooks';
import { selectSelectedCommunity } from '../../app/slices/sharedDataSlice';
import usePagination from '../../hooks/usePagiantion';
import { useGetRequestTypes } from '../../hooks/useGetRequestTypes';
import Spinner from '../ui/spinner/Spinner';
import styles from './ManagerRequests.module.scss';

const listColumns = [
  {
    name: 'title',
    label: 'Tytuł',
    type: 'string',
  },
  {
    name: 'created',
    label: 'Utworzono',
    type: 'datetime',
  },
  {
    name: 'state',
    label: 'Stan',
    type: 'string',
  },
];

const listColumnsTypes = [
  {
    name: 'title',
    label: 'Tytuł',
    type: 'string',
  },
  {
    name: 'description',
    label: 'Opis',
    type: 'string',
  },
];

/**
 * 
 * @returns {JSX.Element} The `ManagerRequests` component returns a list of requests.
 */
const ManagerRequests = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const hoaID = useAppSelector(selectSelectedCommunity) || -1;
  const {
    page: pageMine,
    setPage: setPageMine,
    pageSize: pageSizeMine,
  } = usePagination();
  const {
    page: pageNew,
    setPage: setPageNew,
    pageSize: pageSizeNew,
  } = usePagination();
  const {
    page: pageAll,
    setPage: setPageAll,
    pageSize: pageSizeAll,
  } = usePagination();
  const {
    page: pageTypes,
    setPage: setPageTypes,
    pageSize: pageSizeTypes,
  } = usePagination();

  const {
    isLoading: isLoadingNew,
    data: dataNew,
    error: errorNew,
    refetch: refreshPageNew,
    isFetching: isFetchingNew,
  } = useGetRequests({
    hoaID,
    page: pageNew,
    pageSize: pageSizeNew,
    state: 'new',
    queryKey: 'newRequests',
  });

  const {
    isLoading: isLoadingMine,
    data: dataMine,
    error: errorMine,
    refetch: refreshPageMine,
    isFetching: isFetchingMine,
  } = useGetRequests({
    hoaID,
    page: pageMine,
    pageSize: pageSizeMine,
    assignedToMe: true,
    queryKey: 'assignedToMeRequests',
  });

  const {
    isLoading: isLoadingAll,
    data: dataAll,
    error: errorAll,
    refetch: refreshPageAll,
    isFetching: isFetchingAll,
  } = useGetRequests({
    hoaID,
    page: pageAll,
    pageSize: pageSizeAll,
    queryKey: 'allRequests',
  });

  const {
    isLoading: isLoadingTypes,
    data: dataTypes,
    error: errorTypes,
    refetch: refreshPageTypes,
    isFetching: isFetchingTypes,
  } = useGetRequestTypes({
    hoaID,
    page: pageTypes,
    pageSize: pageSizeTypes,
  });

  const changePageNew = (pageNumber: number) => {
    setPageNew(pageNumber);
    refreshPageNew();
  };

  const changePageMine = (pageNumber: number) => {
    setPageMine(pageNumber);
    refreshPageMine();
  };

  const changePageAll = (pageNumber: number) => {
    setPageAll(pageNumber);
    refreshPageAll();
  };

  const changePageTypes = (pageNumber: number) => {
    setPageTypes(pageNumber);
    refreshPageTypes();
  };

  return (
    <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
      <TabList>
        <Tab>Zapytania</Tab>
        <Tab>Typy Zapytań</Tab>
      </TabList>
      <TabPanel>
        <div className={styles.propertiesContainer}>
          <div className={styles.content}>
            <div className={styles.header}>
              <h1>Twoje Zapytania</h1>
            </div>
            {isLoadingMine && <Spinner />}
            {!isLoadingMine && (
              <List
                data={dataMine}
                columns={listColumns}
                onPageChange={changePageMine}
                isFetching={isFetchingMine}
                nameField="title"
                page={pageMine}
                pageSize={pageSizeMine}
                getDetailsHref={(record) =>
                  '/hoa/' + hoaID + '/requests/' + record.id
                }
              />
            )}
          </div>
        </div>

        <div className={styles.propertiesContainer}>
          <div className={styles.content}>
            <div className={styles.header}>
              <h1>Nowe Zapytania</h1>
            </div>
            {isLoadingNew && <Spinner />}
            {!isLoadingNew && (
              <List
                data={dataNew}
                columns={listColumns}
                onPageChange={changePageNew}
                isFetching={isFetchingNew}
                nameField="title"
                page={pageNew}
                pageSize={pageSizeNew}
                getDetailsHref={(record) =>
                  '/hoa/' + hoaID + '/requests/' + record.id
                }
              />
            )}
          </div>
        </div>

        <div className={styles.propertiesContainer}>
          <div className={styles.content}>
            <div className={styles.header}>
              <h1>Wszystkie Zapytania</h1>
            </div>
            {isLoadingAll && <Spinner />}
            {!isLoadingAll && (
              <List
                data={dataAll}
                columns={listColumns}
                onPageChange={changePageAll}
                isFetching={isFetchingAll}
                nameField="title"
                page={pageAll}
                pageSize={pageSizeAll}
                getDetailsHref={(record) =>
                  '/hoa/' + hoaID + '/requests/' + record.id
                }
              />
            )}
          </div>
        </div>
      </TabPanel>
      <TabPanel>
        <div className={styles.propertiesContainer}>
          <div className={styles.content}>
            <div className={styles.header}>
              <h1>Typy Zapytań</h1>
            </div>
            <List
              data={dataTypes}
              columns={listColumnsTypes}
              onPageChange={changePageTypes}
              isFetching={isFetchingTypes}
              nameField="title"
              page={pageTypes}
              pageSize={pageSizeTypes}
              getDetailsHref={(record) =>
                '/hoa/' + hoaID + '/request_types/' + record.id
              }
            />
          </div>
        </div>
      </TabPanel>
    </Tabs>
    // </div>
  );
};

export default ManagerRequests;
