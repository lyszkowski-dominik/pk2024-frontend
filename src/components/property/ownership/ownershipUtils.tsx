import { Ownership } from '../../../features/ownerships/ownershipTypes';
import { ApiPaginatedResult } from '../../../types/types';
import { ColumnDef, ColumnType } from '../../common/list/List';
import * as Yup from 'yup';

export const columns: ColumnDef[] = [
  {
    name: 'owners',
    label: 'Właściciele',
    type: ColumnType.OTHER,
  },
  {
    name: 'start',
    label: 'Data nabycia',
    type: ColumnType.DATE,
  },
  {
    name: 'end',
    label: 'Data zbycia',
    type: ColumnType.DATE,
  },
];

export const getData = (data: ApiPaginatedResult<Ownership>) => ({
  ...data,
  results: data.results.map((ownership) => ({
    ...ownership,
    owners: ownership.owners?.map((owner) => (
      <p key={owner.id}>
        {owner.first_name} {owner.last_name}
      </p>
    )),
  })),
});

export const validationSchema = Yup.object().shape({
  owners: Yup.array().required('Dodaj właściciela'),
  start: Yup.string().required('Podaj datę nabycia'),
});
