import {createSlice} from '@reduxjs/toolkit';
import {Usuario} from '../../../database/model/table.model';

interface UsuarioSlice {
  conta: Partial<Omit<Usuario, 'senha'>>;
}

const initialState: UsuarioSlice = {
  conta: {},
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
