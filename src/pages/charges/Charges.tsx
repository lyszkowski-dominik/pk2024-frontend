import { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import 'react-tabs/style/react-tabs.css';
import styles from '../../styles/Page.module.scss';

import { ChargesTab, getTabName } from './chargesPageUtils';
import { selectSelectedCommunity } from '../../features/communities/sharedDataSlice';
import { useAppSelector } from '../../app/hooks';
import Rates from '../../components/charges/rates/Rates';
import { selectRoles } from '../../components/loginForm/loginFormSlice';
import { UserRole } from '../../types/types';
import Meters from '../../components/charges/meters/Meters';
import MeterReadings from '../../components/charges/meters/readings/MeterReadings';

const Charges = ({ currentTab }: { currentTab?: ChargesTab }) => {
  const role = useAppSelector(selectRoles);
  const isManager = role === UserRole.Manager;
  const [tabIndex, setTabIndex] = useState(currentTab ?? ChargesTab.Rates);
  const tabs = [
    ChargesTab.Rates,
    ...(isManager ? [ChargesTab.Meters, ChargesTab.Readings] : []),
  ];

  const hoaId = useAppSelector(selectSelectedCommunity) || -1;

  if (!hoaId) {
    return <div>Nie wybrano wspólnoty</div>;
  }

  return (
    <Tabs
      selectedIndex={tabIndex}
      onSelect={(index) => setTabIndex(index)}
      className={styles['react-tabs']}
    >
      <TabList className={styles['react-tabs__tab-list']}>
        {tabs.map((tab) => (
          <Tab
            key={tab}
            className={styles['react-tabs__tab']}
            selectedClassName={styles['react-tabs__tab--selected']}
          >
            {getTabName(tab)}
          </Tab>
        ))}
      </TabList>

      <TabPanel selectedClassName="react-tabs__tab-panel--selected">
        <Rates />
      </TabPanel>
      {isManager && (
        <>
          <TabPanel selectedClassName="react-tabs__tab-panel--selected">
            <Meters />
          </TabPanel>
          <TabPanel selectedClassName="react-tabs__tab-panel--selected">
            <MeterReadings />
          </TabPanel>
        </>
      )}
    </Tabs>
  );
};

export default Charges;
