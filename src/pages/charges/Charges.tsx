import { useEffect, useMemo, useState } from 'react';
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
import Billings from '../../components/charges/billings/Billings';
import Adjustments from '../../components/charges/adjustments/Adjustments';
import { Link, useParams } from 'react-router-dom';
import Payments from '../../components/charges/payments/Payments';
import Spinner from '../../components/ui/spinner/Spinner';

const Charges = () => {
  const role = useAppSelector(selectRoles);
  const isManager = role === UserRole.Manager;
  const { tab: currentTab } = useParams<{ tab: ChargesTab }>();

  const tabs = useMemo(
    () => ({
      [ChargesTab.Rates]: 0,
      ...(isManager && {
        [ChargesTab.Billings]: 1,
        [ChargesTab.Adjustments]: 2,
        [ChargesTab.Payments]: 3,
        [ChargesTab.Balance]: 4,
        [ChargesTab.Meters]: 5,
        [ChargesTab.Readings]: 6,
      }),
    }),
    [isManager],
  );

  const [tabIndex, setTabIndex] = useState<number | null>(null);

  useEffect(() => {
    if (currentTab) {
      setTabIndex(tabs[currentTab] ?? null);
    } else {
      setTabIndex(tabs[ChargesTab.Rates]);
    }
  }, [currentTab, tabs]);

  useEffect(() => {
    if (currentTab) setTabIndex(tabs[currentTab] ?? null);
  }, [currentTab, tabs]);

  const hoaId = useAppSelector(selectSelectedCommunity) || -1;

  if (!hoaId) {
    return <div>Nie wybrano wspólnoty</div>;
  }

  if (tabIndex === null) {
    return <Spinner />;
  }

  return (
    <Tabs
      selectedIndex={tabIndex}
      onSelect={(index) => setTabIndex(index)}
      className={styles['react-tabs']}
    >
      <TabList className={styles['react-tabs__tab-list']}>
        {Object.keys(tabs).map((tab) => (
          <Link to={`/hoa/${hoaId}/charges/${tab}`} key={tab}>
            <Tab
              key={tab}
              className={styles['react-tabs__tab']}
              selectedClassName={styles['react-tabs__tab--selected']}
            >
              {getTabName(tab as ChargesTab)}
            </Tab>
          </Link>
        ))}
      </TabList>
      <TabPanel selectedClassName="react-tabs__tab-panel--selected">
        <Rates />
      </TabPanel>
      {isManager && (
        <>
          <TabPanel selectedClassName="react-tabs__tab-panel--selected">
            <Billings />
          </TabPanel>
          <TabPanel selectedClassName="react-tabs__tab-panel--selected">
            <Adjustments />
          </TabPanel>
          <TabPanel selectedClassName="react-tabs__tab-panel--selected">
            <Payments />
          </TabPanel>
          <TabPanel selectedClassName="react-tabs__tab-panel--selected">
            <Billings />
          </TabPanel>
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
