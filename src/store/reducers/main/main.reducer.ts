import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {Nota} from '../../../database/model/table.model';

interface MainSlice {
  loading?: boolean;
  route: number | null;
}

const initialState: MainSlice = {
  loading: false,
  route: null,
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setRoute: (state, action: PayloadAction<number>) => {
      state.route = action.payload;
    },
  },
});

export const {actions} = mainSlice;
export default mainSlice.reducer;
