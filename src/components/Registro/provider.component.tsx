import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Button} from 'react-native-paper';

const ResumoRegistrosTables: React.FC<{
  titulo: string;
  DataTableComponent: any;
}> = ({titulo, DataTableComponent}): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.headLine} variant="headlineMedium">
          {titulo}
        </Text>
        <Button mode="contained-tonal">mais</Button>
      </View>
      <View style={styles.container}>
        <DataTableComponent />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headLine: {
    // margin: 10,
  },
  container: {
    flex: 1,
  },
  top: {
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between', // To evenly space the input components
    marginBottom: 16,
  },
});
export default ResumoRegistrosTables;
