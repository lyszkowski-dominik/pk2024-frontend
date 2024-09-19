import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useState } from 'react';
import { PropertyTab } from '../../types/propertiesTypes';
import { useParams } from 'react-router-dom';
import Ownerships from './ownership/Ownerships';
import BillingList from './bills/BillingList';

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
        <p>
          <b>Luigi</b> (<i>Japanese: ルイージ Hepburn: Ruīji, [ɾɯ.iː.dʑi̥]</i>) (
          <i>English: /luˈiːdʒi/; Italian: [luˈiːdʒi]</i>) is a fictional
          character featured in video games and related media released by
          Nintendo. Created by prominent game designer Shigeru Miyamoto, Luigi
          is portrayed as the slightly younger but taller fraternal twin brother
          of Nintendo's mascot Mario, and appears in many games throughout the
          Mario franchise, often as a sidekick to his brother.
        </p>
        <p>
          Source:{' '}
          <a href="https://en.wikipedia.org/wiki/Luigi" target="_blank">
            Wikipedia
          </a>
        </p>
      </TabPanel>
      <TabPanel>
        <Ownerships propertyId={parseInt(propertyId, 10)} />
      </TabPanel>
    </Tabs>
  );
};

export default Property;
