import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from '../../app/store';
import { uuidv4 } from '../../utils/uuid';

export type AlertType = {
  id: string;
  message: string;
  type: string;
  duration: number;
};

export type AlertData = {
  message: string;
  type: string;
  duration?: number;
};

type AlertsState = {
  list: AlertType[];
};

const initialState: AlertsState = {
  list: [],
};

const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    addAlert: (state, action: PayloadAction<AlertType>) => {
      const duration = action.payload.duration ?? 10000;
      const { id, message, type } = action.payload;

      state.list.push({ id, message, type, duration });
    },
    removeAlert: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.list = state.list.filter((alert) => alert.id !== id);
    },
  },
});

export default alertsSlice;
export const { removeAlert } = alertsSlice.actions;
const { addAlert } = alertsSlice.actions;

export const showAlert = (data: AlertData) => (dispatch: AppDispatch) => {
  const id = uuidv4();
  const duration = data.duration || 10000;

  dispatch(addAlert({ ...data, id, duration }));

  setTimeout(() => {
    dispatch(removeAlert(id));
  }, duration);
};

export const selectAlerts = createSelector(
  [(state: RootState) => state.alerts],
  (alerts) => {
    return alerts.list;
  },
);
