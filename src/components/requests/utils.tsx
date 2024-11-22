import { Request, stateDisplayMap } from '../../features/requests/requestTypes';
import { ApiPaginatedResult } from '../../types/types';
import { ColumnDef, ColumnType } from '../common/list/List';

export const requestColumns: ColumnDef[] = [
  {
    name: 'title',
    label: 'Tytuł',
    type: ColumnType.TEXT,
  },
  {
    name: 'created',
    label: 'Utworzono',
    type: ColumnType.DATETIME,
  },
  {
    name: 'state',
    label: 'Stan',
    type: ColumnType.TEXT,
  },
];

export const allRequestsColumns = [
  ...requestColumns,
  {
    name: 'assigned_to',
    label: 'Przypisana osoba',
    type: ColumnType.TEXT,
  },
];

export const requestTypesColumns: ColumnDef[] = [
  {
    name: 'title',
    label: 'Tytuł',
    type: ColumnType.TEXT,
  },
  {
    name: 'description',
    label: 'Opis',
    type: ColumnType.TEXT,
  },
];

export const getRequestData = (data: ApiPaginatedResult<Request>) => ({
  ...data,
  results: data.results.map((request) => ({
    ...request,
    state: stateDisplayMap[request.state],
    assigned_to: request.assigned_to?.email || '',
  })),
});
