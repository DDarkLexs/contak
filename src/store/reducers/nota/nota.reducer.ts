import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {Nota} from '../../../database/model/table.model';
import { QueryContagem } from '../../../database/repository/nota.repository';

interface NotaValue {
  quantidade?: number;
}

export type ModifiedNota = Partial<Nota> & Partial<NotaValue>;

interface NotaSlice {
  notas: ModifiedNota[];
  contagens:QueryContagem[],
  loading: boolean;
  clean: boolean;
}

const initialState: NotaSlice = {
  notas: [],
  loading: false,
  clean: false,
  contagens:[],
};

const notaSlice = createSlice({
  name: 'notas',
  initialState,
  reducers: {
    setClean: (state, action: PayloadAction<boolean>) => {
      state.clean = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setNotas: (state, action: PayloadAction<ModifiedNota[]>) => {
      state.notas = action.payload;
    },
    setContas: (state, action: PayloadAction<QueryContagem[]>) => {
      state.contagens = action.payload;
    },
    setNotasByKey: (state, action: PayloadAction<Partial<any>>) => {
      const i = action.payload.index;
      const qtd = action.payload.quantidade;
      state.notas[i].quantidade = qtd;
    },
  },
});

export const {actions} = notaSlice;
export default notaSlice.reducer;
