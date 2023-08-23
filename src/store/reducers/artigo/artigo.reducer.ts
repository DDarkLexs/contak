import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {Artigo} from '../../../database/model/table.model';

interface ArtigoSlice {
  artigos: Artigo[];
}

const initialState: ArtigoSlice = {
  artigos: [],
};

const artigoSlice = createSlice({
  name: 'artigo',
  initialState,
  reducers: {
    setArtigo: (state, action: PayloadAction<Artigo[]>) => {
      state.artigos = action.payload;
    },
  },
});

export const {actions} = artigoSlice;
export default artigoSlice.reducer;
