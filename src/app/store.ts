import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { loginFormSlice } from '../components/loginForm/loginFormSlice';
import { userDataApiSlice } from '../components/userProfile/userDataApiSlice';
import { sharedDataSlice } from '../features/communities/sharedDataSlice';
import { propertiesSlice } from '../features/properties/propertiesState';
import alertsSlice from '../features/alerts/alertsSlice';

const rootReducer = combineSlices(
  loginFormSlice,
  userDataApiSlice,
  sharedDataSlice,
  propertiesSlice,
  alertsSlice,
);
export type RootState = ReturnType<typeof rootReducer>;

/**
 *
 * @param {Partial<RootState>} preloadedState - The `makeStore` function creates a store with the provided preloaded state.
 * @remarks
 * The `makeStore` function creates a store with the provided preloaded state.
 * @returns {AppStore} The `makeStore` function creates a store with the provided preloaded state.
 */
export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer, // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) => {
      // return getDefaultMiddleware()
      return getDefaultMiddleware().concat(userDataApiSlice.middleware);
    },
    preloadedState,
  });
  // configure listeners using the provided defaults
  // optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
  setupListeners(store.dispatch);
  return store;
};

export const store = makeStore();

// Infer the type of `store`
export type AppStore = typeof store;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
