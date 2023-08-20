import React, {useState} from 'react';
import {View, StyleSheet, ToastAndroid} from 'react-native';
import {TextInput, Button, Text, useTheme} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useAppDispatch, useAppSelector} from '../../store/hooks/store.hook';
import {ModifiedNota, actions} from '../../store/reducers/nota/nota.reducer';
import {convertToCurrency} from '../../utils/moeda/moeda.utils';
import {NotaController} from '../../controller/nota/nota.controller';
import {ReqContagem} from '../../controller/model/notaCtrl.model';
import {formatLong} from '../../utils/date/date.utils';
import {ReqNotaDeContagem} from '../../database/model/index.model';

const InfoCard: React.FC = (): React.JSX.Element => {
  const theme = useTheme();
  const notaCtrl = new NotaController();
  const [data, setData] = useState(new Date());
  const [titulo, setTitulo] = useState<string>('');
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const loading: boolean = useAppSelector(state => state.nota.loading);
  const notas: ModifiedNota[] = useAppSelector(state => state.nota.notas);
  const isCleaning: boolean = useAppSelector(state => state.nota.clean);
  const dispatch = useAppDispatch();
  const soma: number = useAppSelector(state => state.nota.notas).reduce(
    (acumulador, nota) => acumulador + Number(nota.quantidade) || 0,
    0,
  );
  const total: number = notas.reduce(
    (acumulador, nota) =>
      acumulador + Number(nota.quantidade) * Number(nota.valor) || 0,
    0,
  );
  const guardar = async () => {
    try {
      dispatch(actions.setLoading(true));
      const contagem = notas.map(({id_nota, quantidade}): ReqContagem => {
        return {
          id_nota: Number(id_nota),
          quantidade: Number(quantidade),
        };
      });
      const notaDeContagem: ReqNotaDeContagem = {
        vencimento: new Date(data).toISOString(),
        titulo,
      };
      await notaCtrl.registrarNumeracao(contagem, notaDeContagem);

      ToastAndroid.show('Guardado com sucesso!', ToastAndroid.LONG);
    } catch (error) {
      ToastAndroid.show(JSON.stringify(error), ToastAndroid.LONG);
    } finally {
      dispatch(actions.setLoading(false));
    }
  };

  const limpar = () => {
    try {
      dispatch(actions.setLoading(true));
      setTitulo('');
      setData(new Date());
      dispatch(actions.setClean(!isCleaning));
      ToastAndroid.show('os campos limpado', ToastAndroid.LONG);
    } catch (error) {
      ToastAndroid.show(JSON.stringify(error), ToastAndroid.LONG);
    } finally {
      dispatch(actions.setLoading(false));
      // dispatch(actions.setClean(false));
      console.log('finished');
    }
  };

  const handleDateChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || data;
    setShowDatePicker(false);
    setData(currentDate);
  };

  return (
    <View style={styles.card}>
      <View style={styles.labelValueContainer}>
        <View style={styles.labelValue}>
          <Text style={styles.label}>Total:</Text>
          <Text style={styles.value}>{convertToCurrency(total)}</Text>
          {/* <IconButton icon="numeric" /> */}
        </View>
        <View style={styles.labelValue}>
          <Text style={styles.label}>Quantidade:</Text>
          <Text style={styles.value}>{soma}</Text>
          {/* <IconButton icon="numeric" /> */}
        </View>
      </View>
      <View style={styles.inputStyle}>
        <TextInput
          disabled={loading}
          label="titulo"
          value={titulo}
          onChangeText={text => setTitulo(text)}
        />
      </View>
      <View style={styles.inputStyle}>
        <TextInput
          disabled={loading}
          showSoftInputOnFocus={false}
          label="Data de vencimento"
          value={formatLong(data)}
          onPressIn={() => setShowDatePicker(true)}
        />
        {showDatePicker && (
          <DateTimePicker
            value={data}
            mode="date"
            disabled={loading}
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>
      <View style={styles.buttonStyle}>
        <Button
          disabled={loading}
          loading={loading}
          mode="contained-tonal"
          onPress={() => guardar()}>
          Registrar
        </Button>
        <Button
          disabled={loading}
          loading={loading}
          mode="contained-tonal"
          buttonColor={theme.colors.tertiaryContainer}
          onPress={() => limpar()}>
          limpar
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
  },
  inputStyle: {
    // padding: 5,
    marginVertical: 8,
  },
  buttonStyle: {
    // padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  labelValueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  labelValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginRight: 8,
  },
  value: {
    marginRight: 8,
    fontWeight: 'bold',
  },
});

export default InfoCard;
