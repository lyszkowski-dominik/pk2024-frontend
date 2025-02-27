import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import styles from '../../styles/Page.module.scss';
import { useState } from 'react';
import { PropertyTab } from '../../features/properties/propertiesTypes';
import { useParams } from 'react-router-dom';
import Ownerships from '../../components/property/ownership/Ownerships';
import Meters from '../../components/property/meters/Meters';
import PropertyData from '../../components/property/data/PropertyData';
import BalanceList from '../../components/property/bills/BalanceList';

/**
 * @property {PropertyTab} currentTab - The `currentTab` property represents the current tab.
 */
export interface IProps {
  currentTab?: PropertyTab;
}

/**
 *
 * @param {IProps} params
 * @returns {JSX.Element} The `Property` component returns a property.
 */
const Property = ({ currentTab = PropertyTab.billings }: IProps) => {
  const [tabIndex, setTabIndex] = useState(currentTab);

  const { propertyId } = useParams<{ propertyId: string }>();

  if (!propertyId) {
    return <div>No property selected</div>;
  }

  return (
    <Tabs
      className={styles['react-tabs']}
      selectedIndex={tabIndex}
      onSelect={(index) => setTabIndex(index)}
    >
      <TabList className={styles['react-tabs__tab-list']}>
        <Tab
          className={styles['react-tabs__tab']}
          selectedClassName={styles['react-tabs__tab--selected']}
        >
          Rachunki
        </Tab>
        <Tab
          className={styles['react-tabs__tab']}
          selectedClassName={styles['react-tabs__tab--selected']}
        >
          Dane
        </Tab>
        <Tab
          className={styles['react-tabs__tab']}
          selectedClassName={styles['react-tabs__tab--selected']}
        >
          Liczniki
        </Tab>
        <Tab
          className={styles['react-tabs__tab']}
          selectedClassName={styles['react-tabs__tab--selected']}
        >
          Właściciele
        </Tab>
      </TabList>

      <TabPanel selectedClassName="react-tabs__tab-panel--selected">
        <BalanceList propertyId={parseInt(propertyId, 10)} />
      </TabPanel>
      <TabPanel selectedClassName="react-tabs__tab-panel--selected">
        <PropertyData propertyId={parseInt(propertyId, 10)} />
      </TabPanel>
      <TabPanel selectedClassName="react-tabs__tab-panel--selected">
        <Meters propertyId={parseInt(propertyId, 10)} />
      </TabPanel>
      <TabPanel selectedClassName="react-tabs__tab-panel--selected">
        <Ownerships propertyId={parseInt(propertyId, 10)} />
      </TabPanel>
    </Tabs>
  );
};

export default Property;
