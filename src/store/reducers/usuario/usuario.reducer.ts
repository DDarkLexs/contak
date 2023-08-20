import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {Usuario} from '../../../database/model/table.model';
import {RootState} from '../../index.store';

type SessaoType = Partial<Omit<Usuario, 'senha'>> | null;

interface UsuarioSlice {
  sessao: SessaoType;
}

const initialState: UsuarioSlice = {
  sessao: null,
};

const userSlice = createSlice({
  name: 'usuario',
  initialState,
  reducers: {
    setSessao: (state, action: PayloadAction<SessaoType>) => {
      state.sessao = action.payload;
    },
  },
});

export const {actions} = userSlice;
export const {setSessao} = userSlice.actions;
export default userSlice.reducer;
