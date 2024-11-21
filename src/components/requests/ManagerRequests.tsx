import { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import RequestsList from './RequestsList';
import { RequestState } from '../../features/requests/requestTypes';
import RequestsTypesList from './RequestsTypesList';

/**
 *
 * @returns {JSX.Element} The `ManagerRequests` component returns a list of requests.
 */
const ManagerRequests = () => {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
      <TabList>
        <Tab>Zapytania</Tab>
        <Tab>Typy Zapytań</Tab>
      </TabList>
      <TabPanel>
        <RequestsList header="Twoje Zapytania" assignedToMe={true} />
        <RequestsList header="Nowe Zapytania" state={RequestState.new} />
        <RequestsList header="Wszystkie Zapytania" />
      </TabPanel>
      <TabPanel>
        <RequestsTypesList />
      </TabPanel>
    </Tabs>
  );
};

export default ManagerRequests;
