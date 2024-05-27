import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface SharedDataState {
  selectedCommunityId: number | null;
}

const initialState: SharedDataState = {
  selectedCommunityId: null,
};

export const sharedDataSlice = createSlice({
  name: 'sharedData',
  initialState,
  reducers: {
    setSelectedCommunity(state, action: PayloadAction<number>) {
      state.selectedCommunityId = action.payload;
    },
    clearSelectedCommunity(state) {
      state.selectedCommunityId = null;
    },
  },
});

export const { setSelectedCommunity, clearSelectedCommunity } =
  sharedDataSlice.actions;

export const selectSelectedCommunity = (state: RootState) =>
  state.sharedData.selectedCommunityId;
