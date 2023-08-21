import {combineReducers, configureStore} from '@reduxjs/toolkit';
import userSlice from './reducers/usuario/usuario.reducer';
import notaSlice from './reducers/nota/nota.reducer';
import mainReducer from './reducers/main/main.reducer';
import registroSlice from './reducers/registro/registro.reducer';

const reducer = combineReducers({
  usuario: userSlice,
  nota: notaSlice,
  main: mainReducer,
  registro: registroSlice,
});

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
