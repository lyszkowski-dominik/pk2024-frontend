import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { IPropertiesState } from '../../types/propertiesTypes';

const initialState: IPropertiesState = {
  updatedOwnerships: false,
  updatedBillings: false,
};

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
