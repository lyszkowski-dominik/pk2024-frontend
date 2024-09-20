import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useState } from 'react';
import { PropertyTab } from '../../types/propertiesTypes';
import { useParams } from 'react-router-dom';
import Ownerships from './ownership/Ownerships';
import BillingList from './bills/BillingList';
import Meters from './meters/Meters';

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
    <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
      <TabList>
        <Tab>Rachunki</Tab>
        <Tab>Liczniki</Tab>
        <Tab>Właściciele</Tab>
      </TabList>

      <TabPanel>
        <BillingList propertyId={parseInt(propertyId, 10)} />
      </TabPanel>
      <TabPanel>
        <Meters propertyId={parseInt(propertyId, 10)} />
      </TabPanel>
      <TabPanel>
        <Ownerships propertyId={parseInt(propertyId, 10)} />
      </TabPanel>
    </Tabs>
  );
};

export default Property;
