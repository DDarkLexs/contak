import {PayloadAction, createSlice} from '@reduxjs/toolkit';

const initialState = {
  notas: [],
  path: 'resumo', //remuneracao
};

const registroSlice = createSlice({
  name: 'registro',
  initialState,
  reducers: {
    setPath: (state, action: PayloadAction<string>) => {
      state.path = action.payload;
    },
  },
});

export const {actions} = registroSlice;
export default registroSlice.reducer;
