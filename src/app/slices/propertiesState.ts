import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { IPropertiesState } from '../../types/propertiesTypes';

const initialState: IPropertiesState = {
  updatedOwnerships: false,
  updatedBillings: false,
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
  },
});

export const { setUpdatedOwnerships, setUpdatedBillings } =
  propertiesSlice.actions;
