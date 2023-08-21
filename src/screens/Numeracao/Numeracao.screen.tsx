import React, {useEffect, useState} from 'react'; // Importe o useState
import {View, ToastAndroid, StyleSheet, ScrollView} from 'react-native';
import {NotaController} from '../../controller/nota/nota.controller';
import {useAppDispatch, useAppSelector} from '../../store/hooks/store.hook';
import {
  actions as notaAction,
  ModifiedNota,
} from '../../store/reducers/nota/nota.reducer';
import NumInputComponent from '../../components/Numeracao/NumInput.component';
import InfoCard from '../../components/Numeracao/InfoCard.component';

const NumeracaoScreen: React.FC = () => {
  const notaCtrl = new NotaController();
  const id_usuario = useAppSelector(state => state.usuario.sessao?.id_usuario);
  const notas: ModifiedNota[] = useAppSelector(state => state.nota.notas);
  const route = useAppSelector(state => state.main.route);
  const dispatch = useAppDispatch();
  const [isFetching, setIsFetching] = useState(false); // Adicione o estado isFetching
  const setEnviroment = async () => {
    try {
      // console.log('Notas atualizadas');
      if (!isFetching) {
        // Verifica se já não está buscando dados
        setIsFetching(true); // Inicia a busca
        const consulta = await notaCtrl.consultaNotaKwanza();
        dispatch(notaAction.setNotas(consulta));
        setIsFetching(false); // Finaliza a busca
      }
    } catch (error) {
      ToastAndroid.show(JSON.stringify(error), ToastAndroid.LONG);
      setIsFetching(false); // Finaliza a busca em caso de erro também
    }
  };

  useEffect(() => {
    if (id_usuario) {
      setEnviroment();
    }
    return () => {
      setIsFetching(false);
    };
  }, [id_usuario]);
  return (
    <ScrollView style={styles.container}>
      {notas.map(
        (nota, i) =>
          i % 2 === 0 && (
            <View key={i} style={styles.row}>
              <NumInputComponent
                denominacao={nota.denominacao}
                valor={nota.valor}
                id_nota={nota.id_nota}
                index={i}
              />
              {notas[i + 1] && (
                <NumInputComponent
                  index={i + 1}
                  denominacao={notas[i + 1].denominacao}
                  valor={notas[i + 1].valor}
                  id_nota={notas[i + 1].id_nota}
                />
              )}
            </View>
          ),
      )}
      <View style={styles.container1}>
        <InfoCard />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    // padding: 16,
  },
  container: {
    flex: 1,
    padding: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between', // To evenly space the input components
    marginBottom: 16,
  },
});

export default NumeracaoScreen;
