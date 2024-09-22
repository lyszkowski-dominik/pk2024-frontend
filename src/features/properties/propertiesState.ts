import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { IPropertiesState } from './propertiesTypes';

const initialState: IPropertiesState = {
  updatedOwnerships: false,
  updatedBillings: false,
  updatedMeters: false,
  updatedMeterReadings: false,
};

/**
 * The `propertiesSlice` manages the state of the properties.
 * @returns {IPropertiesState} The initial state of the properties.
 */
export const propertiesSlice = createSlice({
  name: 'propertiesState',
  initialState,
  reducers: {
    setUpdatedOwnerships(state, action: PayloadAction<boolean>) {
      state.updatedOwnerships = action.payload;
    },
    setUpdatedBillings(state, action: PayloadAction<boolean>) {
      state.updatedBillings = action.payload;
    },
    setUpdatedMeters(state, action: PayloadAction<boolean>) {
      state.updatedMeters = action.payload;
    },
    setUpdatedMeterReadings(state, action: PayloadAction<boolean>) {
      state.updatedMeterReadings = action.payload;
    },
  },
});

export const {
  setUpdatedOwnerships,
  setUpdatedBillings,
  setUpdatedMeters,
  setUpdatedMeterReadings,
} = propertiesSlice.actions;
