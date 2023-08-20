import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import ShortNumeracaoDataTable from '../../components/Registro/numeracao/numeracaoTable.component';
import ResumoRegistrosTables from '../../components/Registro/provider.component';

const RegistroScreen: React.FC = (): React.JSX.Element => {
  return (
    <ScrollView style={styles.container}>
      <ResumoRegistrosTables
        titulo="Numeração"
        DataTableComponent={ShortNumeracaoDataTable}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default RegistroScreen;
