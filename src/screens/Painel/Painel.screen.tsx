import React from 'react';
import {View, StyleSheet, ScrollView, ToastAndroid} from 'react-native';
import {Text} from 'react-native-paper';
import CustomCard from '../../components/Painel/CustomCard/CustomCard.component';
import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../store/hooks/store.hook';
import {NotaController} from '../../controller/nota/nota.controller';
import {actions as notaActions} from '../../store/reducers/nota/nota.reducer';
import {convertToCurrency} from '../../utils/moeda/moeda.utils';
import {actions} from '../../store/reducers/main/main.reducer';

const PainelScreen: React.FC = (): React.JSX.Element => {
  const contaController = new NotaController();
  const route = useAppSelector(state => state.main.route);
  const contas = useAppSelector(state => state.nota.contagens);
  const id_usuario = useAppSelector(state => state.usuario.sessao?.id_usuario);
  const loading = useAppSelector(state => state.main.loading);
  const dispatch = useAppDispatch();
  const contaTotal: number = contas.reduce(
    (acumulador, conta) => acumulador + conta.total,
    0,
  );
  const contaQtd: number = contas.reduce(
    (acumulador, conta) => acumulador + conta.qtd,
    0,
  );
  const consultar = async () => {
    try {
      dispatch(actions.setLoading(true));
      const r1 = await contaController.getContagens();
      dispatch(notaActions.setContas(r1));
    } catch (error) {
      ToastAndroid.show(JSON.stringify(error), ToastAndroid.LONG);
    } finally {
      dispatch(actions.setLoading(false));
    }
  };
  useEffect(() => {
    if (id_usuario) {
      consultar();
    }
  }, [id_usuario, route]);
  return (
    <ScrollView style={{flex: 1}}>
      <View style={styles.container}>
        {/* <Text style={{fontSize: 24, fontWeight: 'bold'}}>

        </Text> */}
        {/* <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 18, color: '#888', marginTop: 16}}>
            um sistema que irá facilitar as suas contas!
          </Text>
        </View> */}
        <View style={styles.row}>
          <CustomCard
            icon={'hand-coin'}
            label={'N.Total'}
            value={convertToCurrency(contaTotal)}
          />
          <CustomCard
            icon={'cash-multiple'}
            label={'Montante'}
            value={contaQtd}
          />
        </View>
        <View style={styles.row}>
          <CustomCard icon={'cash'} label={'Total'} value={'100'} />
          <CustomCard icon={'cash'} label={'Total'} value={'100'} />
        </View>
        <CustomCard icon={'cash'} label={'Total'} value={'100'} />
        {/* <CustomCard icon={'cash'} label={'Total'} value={'100'} /> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between', // To evenly space the input components
    // marginBottom: 16,
  },
  column: {
    flex: 1,
  },
});

export default PainelScreen;
