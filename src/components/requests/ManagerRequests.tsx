import { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import RequestsList from './RequestsList';
import RequestsTypesList from './RequestsTypesList';
import { allRequestsColumns } from './utils';
import { useGetUserData } from '../../features/auth/useGetUserData';
import Spinner from '../ui/spinner/Spinner';

/**
 *
 * @returns {JSX.Element} The `ManagerRequests` component returns a list of requests.
 */
const ManagerRequests = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const { data: userData, isLoading: loadingUserData } = useGetUserData();

  return (
    <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
      <TabList>
        <Tab>Zgłoszenia</Tab>
        <Tab>Typy Zgłoszeń</Tab>
      </TabList>
      <TabPanel>
        {loadingUserData ? (
          <Spinner />
        ) : (
          <RequestsList
            header="Twoje Zgłoszenia"
            assignedTo={userData?.id}
            closedCheckbox
          />
        )}
        <RequestsList header="Nieprzypisane Zgłoszenia" notAssigned={true} />
        <RequestsList
          header="Wszystkie Zgłoszenia"
          columns={allRequestsColumns}
          closedCheckbox
        />
      </TabPanel>
      <TabPanel>
        <RequestsTypesList />
      </TabPanel>
    </Tabs>
  );
};

export default ManagerRequests;
