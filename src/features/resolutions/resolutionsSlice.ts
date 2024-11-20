import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import api from '../../services/axiosInstance';
import type { ApiPaginatedResult } from '../../types/types';
import type { AppDispatch, RootState } from '../../app/store';
import { showAlert } from '../alerts/alertsSlice';
import { localDateToISO } from '../../utils/date';
import { Resolution } from './resolutionsTypes';

type ResolutionsState = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  byId: { [index: number]: Resolution };
  allIds: number[];
  details: Resolution | null;
  count: number;
  error: string | null;
};

const initialState: ResolutionsState = {
  status: 'idle',
  byId: {},
  allIds: [],
  details: null,
  count: 0,
  error: null,
};

export const resolutionsSlice = createSlice({
  name: 'resolutions',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchResolutions.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchResolutions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allIds = [];
        const { count, results } = action.payload;
        state.count = count;
        for (const resolution of results) {
          state.byId[resolution.id] = resolution;
          state.allIds.push(resolution.id);
        }
      })
      .addCase(fetchResolutions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || '';
      })
      .addCase(fetchResolution.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchResolution.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.details = action.payload;
      })
      .addCase(fetchResolution.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || '';
      })
      .addCase(deleteResolution.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(deleteResolution.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const resolutionId = action.meta.arg.id;
        delete state.byId[resolutionId];
        state.allIds = state.allIds.filter((id) => id !== resolutionId);
      })
      .addCase(deleteResolution.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || '';
      })
      .addCase(editResolution.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(editResolution.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.details = action.payload;
      })
      .addCase(editResolution.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || '';
      })
      .addCase(createResolution.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(createResolution.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const resolutionId = action.payload.id;
        state.byId[resolutionId] = action.payload;
        state.allIds.splice(0, 0, resolutionId);
      })
      .addCase(createResolution.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || '';
      });
  },
});

// ============== AsyncThunks =================

const createResolutionsAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string;
}>();

type FetchResolutionsParams = {
  hoaID: number;
  page: number;
  page_size: number;
};

export const fetchResolutions = createResolutionsAsyncThunk<
  ApiPaginatedResult<Resolution>,
  FetchResolutionsParams
>('resolutions/fetchResolutions', async (params, thunkApi) => {
  try {
    const response = await api.get('/resolutions/resolutions', { params });
    return response.data;
  } catch (error) {
    thunkApi.dispatch(
      showAlert({
        message: 'Nie można wczytać uchwał, sprawdź swoje połączenie.',
        type: 'error',
      }),
    );
    return thunkApi.rejectWithValue('Nie można wczytać uchwał.');
  }
});

type FetchResolutionParams = {
  id: number;
};
type DeleteResolutionParams = FetchResolutionParams;

export const fetchResolution = createResolutionsAsyncThunk<
  Resolution,
  FetchResolutionParams
>('resolutions/fetchResolution', async (params, thunkApi) => {
  try {
    const response = await api.get(`/resolutions/resolutions/${params.id}/`);
    return response.data;
  } catch (error) {
    thunkApi.dispatch(
      showAlert({
        message: 'Nie można wczytać uchwały, sprawdź swoje połączenie.',
        type: 'error',
      }),
    );
    return thunkApi.rejectWithValue('Nie można wczytać uchwały.');
  }
});

export const deleteResolution = createResolutionsAsyncThunk<
  void,
  DeleteResolutionParams
>('resolutions/deleteResolution', async (params, thunkApi) => {
  try {
    const response = await api.delete(`/resolutions/resolutions/${params.id}/`);
    thunkApi.dispatch(
      showAlert({
        message: 'Rekord został usunięty.',
        type: 'error',
      }),
    );
    return response.data;
  } catch (error) {
    thunkApi.dispatch(
      showAlert({
        message: 'Nie można usunąć uchwały, sprawdź swoje połączenie.',
        type: 'error',
      }),
    );
    return thunkApi.rejectWithValue('Nie można usunąć uchwały.');
  }
});

type EditResolutionParams = {
  id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  hoa: number;
};

export const editResolution = createResolutionsAsyncThunk<
  Resolution,
  EditResolutionParams
>('resolutions/editResolution', async (params, thunkApi) => {
  try {
    const patchData = {
      title: params.title,
      description: params.description,
      start_date: new Date(localDateToISO(params.start_date)),
      end_date: new Date(localDateToISO(params.end_date)),
      hoa: params.hoa,
    };

    const response = await api.patch(
      `/resolutions/resolutions/${params.id}/`,
      patchData,
    );
    thunkApi.dispatch(
      showAlert({
        message: 'Edytowano rekord.',
        type: 'success',
      }),
    );
    return response.data;
  } catch (error) {
    thunkApi.dispatch(
      showAlert({
        message: 'Nie można zaktualizować uchwały, sprawdź swoje połączenie.',
        type: 'error',
      }),
    );
    return thunkApi.rejectWithValue('Nie można zaktualizować uchwały.');
  }
});

type CreateResolutionParams = {
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  hoa: number;
};

export const createResolution = createResolutionsAsyncThunk<
  Resolution,
  CreateResolutionParams
>('resolutions/createResolution', async (params, thunkApi) => {
  try {
    const response = await api.post(`/resolutions/resolutions/`, params);
    thunkApi.dispatch(
      showAlert({
        message: 'Dodano nową uchwałę.',
        type: 'success',
      }),
    );
    return response.data;
  } catch (error) {
    thunkApi.dispatch(
      showAlert({
        message: 'Nie można dodać uchwały, sprawdź swoje połączenie.',
        type: 'error',
      }),
    );
    return thunkApi.rejectWithValue('Nie można dodać uchwały.');
  }
});

type VoteResolutionData = {
  id: number;
  choice: string;
};

export const voteResolution = createResolutionsAsyncThunk<
  Resolution,
  VoteResolutionData
>('resolutions/voteResolution', async (params, thunkApi) => {
  try {
    const response = await api.patch(
      `/resolutions/resolutions/${params.id}/vote/`,
      { choice: params.choice },
    );
    thunkApi.dispatch(
      showAlert({
        message: 'Oddano głos.',
        type: 'success',
      }),
    );
    return response.data;
  } catch (error) {
    thunkApi.dispatch(
      showAlert({
        message: 'Nie można oddać głosu, sprawdź swoje połączenie.',
        type: 'error',
      }),
    );
    return thunkApi.rejectWithValue('Nie można oddać głosu.');
  }
});

// ============== Selectors =================

export const selectResolutions = createSelector(
  [(state: RootState) => state.resolutions],
  (state) => {
    return state.allIds.map((id) => state.byId[id]);
  },
);

export const selectResolutionsStatus = createSelector(
  [(state: RootState) => state.resolutions],
  (state) => {
    return state.status === 'loading';
  },
);

export const selectResolutionsCount = createSelector(
  [(state: RootState) => state.resolutions],
  (state) => {
    return state.count;
  },
);

export const selectResolutionDetails = createSelector(
  [(state: RootState) => state.resolutions],
  (state) => {
    return state.details;
  },
);
