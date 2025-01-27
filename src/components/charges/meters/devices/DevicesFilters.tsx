import Select from 'react-select';
import metersStyles from '../Meters.module.scss';
import { MeterType } from '../../../../features/meters/metersApiTypes';
import Filters from '../../../common/filters/Filters';
import { useState } from 'react';

type DevicesFiltersProps = {
  types: MeterType[];
  activeFilter: boolean | undefined;
  selectedType: number | undefined;
  setActiveFilter: (value: boolean | undefined) => void;
  setSelectedType: (value: number | undefined) => void;
};

const DevicesFilters = ({
  types,
  activeFilter,
  selectedType,
  setActiveFilter,
  setSelectedType,
}: DevicesFiltersProps) => {
  const [isFiltersVisible, setFiltersVisible] = useState(false);
  const activeOptions = [
    { value: true, label: 'Aktywne' },
    { value: false, label: 'Nieaktywne' },
  ];
  const typeOptions =
    types
      .filter((type) => type.active)
      .map((type) => ({
        value: type.id,
        label: type.label,
      })) || [];

  return (
    <Filters
      isVisible={isFiltersVisible}
      toggleVisibility={() => setFiltersVisible((prev) => !prev)}
    >
      <Select
        className={metersStyles.select}
        options={typeOptions}
        isClearable
        placeholder="Typ licznika"
        value={typeOptions.find((opt) => opt.value === selectedType) || null}
        onChange={(option) =>
          setSelectedType(option ? option.value : undefined)
        }
      />
      <Select
        className={metersStyles.select}
        options={activeOptions}
        isClearable
        placeholder="Status"
        value={activeOptions.find((opt) => opt.value === activeFilter) || null}
        onChange={(option) =>
          setActiveFilter(option ? option.value : undefined)
        }
      />
    </Filters>
  );
};

export default DevicesFilters;
