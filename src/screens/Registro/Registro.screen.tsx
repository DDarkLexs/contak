import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import ShortNumeracaoDataTable from '../../components/Registro/numeracao/numeracaoTable.component';
import ResumoRegistrosTables from '../../components/Registro/provider.component';
import {useAppSelector} from '../../store/hooks/store.hook';
import NumeracaoData from './Numeracao.screen';

const RegistroScreen: React.FC = (): React.JSX.Element => {
  const path = useAppSelector(state => state.registro.path);
  return (
    <ScrollView style={styles.container}>
      {path === 'resumo' && (
        <ResumoRegistrosTables
          titulo="Numeração"
          DataTableComponent={ShortNumeracaoDataTable}
        />
      )}

      {path === 'numeracao' && <NumeracaoData />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default RegistroScreen;
