import React, { useState, useRef } from 'react';
import { HelperText, TextInput } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { actions } from '../../store/reducers/nota/nota.reducer';
import { convertToCurrency } from '../../utils/moeda/moeda.utils';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks/store.hook';

const NumInputComponent: React.FC<any> = ({
  denominacao,
  valor,
  id_nota,
  index,
}) => {
  const loading: boolean = useAppSelector(state => state.nota.loading);
  const route = useAppSelector(state => state.main.route);
  // const qtdByKey = useAppSelector(state => state.nota.notas[index].quantidade);
  const isCleaning = useAppSelector(state => state.nota.clean);
  const [quantidade, setQuantidade] = useState<number>(0);
  const InputText = useRef<any>();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (InputText.current) {
      setQuantidade(0);
      InputText.current.clear();
      InputText.current.value = 0;
    }
  }, [isCleaning, route]);

  useEffect(() => {
    dispatch(actions.setNotasByKey({quantidade, index}));
  }, [quantidade]);
  return (
    <View style={style.row}>
      <TextInput
        ref={InputText}
        disabled={loading}
        keyboardType="number-pad"
        label={denominacao}
        defaultValue={String(quantidade)}
        clearButtonMode="always"
        onChangeText={text => {
          setQuantidade(Number(text));
          // Lógica para atualizar o valor, se necessário
        }}
      />
      <HelperText disabled={loading} type="info">
        {convertToCurrency(Number(valor) * quantidade)}
      </HelperText>
    </View>
  );
};

const style = StyleSheet.create({
  column: {
    flex: 5,
  },
  row: {
    flex: 1,
    marginRight: 8,
    flexDirection: 'column',
  },
});

export default NumInputComponent;
