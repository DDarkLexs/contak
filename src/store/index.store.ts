import {combineReducers, configureStore} from '@reduxjs/toolkit';
import userSlice from './reducers/usuario/usuario.reducer';

const reducer = combineReducers({
  usuario: userSlice,
});

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
