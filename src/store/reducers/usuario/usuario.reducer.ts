import {createSlice} from '@reduxjs/toolkit';
import {Usuario} from '../../../database/model/table.model';

interface UsuarioSlice {
  conta: Usuario;
}

const initialState: UsuarioSlice = {
  conta: {
    nome: 'antonio',
    senha: '',
    telefone: '',
  },
};

const userSlice = createSlice({
  name: 'usuario',
  initialState,
  reducers: {
    // setAccount: (state, action) => {
    // },
  },
});

export const {actions} = userSlice;
export default userSlice.reducer;
