import * as Yup from 'yup';
import { ColumnDef, ColumnType } from '../common/list/List';
import {
  Resolution,
  ResolutionState,
} from '../../features/resolutions/resolutionsTypes';
import dayjs from 'dayjs';
import { ApiPaginatedResult } from '../../types/types';

export const columns: ColumnDef[] = [
  {
    name: 'title',
    label: 'Nazwa',
    type: ColumnType.TEXT,
  },
  {
    name: 'start_date',
    label: 'Rozpoczęcie',
    type: ColumnType.DATE,
  },
  {
    name: 'end_date',
    label: 'Zakończenie',
    type: ColumnType.DATETIME,
  },
  {
    name: 'status',
    label: 'Stan głosowania',
    type: ColumnType.TEXT,
  },
];

export const getResolutionsData = (data: ApiPaginatedResult<Resolution>) => ({
  ...data,
  results: data.results.map((resolution) => ({
    ...resolution,
    status: getStatusDisplay(resolution),
  })),
});

const getStatusDisplay = (resolution: Resolution) => {
  const { state, start_date, end_date } = resolution;
  const now = dayjs();
  switch (state) {
    case ResolutionState.active:
      return now > dayjs(start_date) && now < dayjs(end_date)
        ? 'Aktywne'
        : 'Niekatywne';
    case ResolutionState.inactive:
      return 'Zamknięte';
  }
};

export const validationSchema = Yup.object({
  title: Yup.string().required('Tytuł jest wymagany'),
  description: Yup.string().required('Opis jest wymagany'),
  start_date: Yup.string().required('Data rozpoczęcia jest wymagana'),
  end_date: Yup.string().required('Data zakończenia jest wymagana'),
});
