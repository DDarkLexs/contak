import React from 'react';
import {View,StyleSheet,ScrollView} from 'react-native';
import {Text} from 'react-native-paper';
import CustomCard from '../../components/Painel/CustomCard/CustomCard.component';

const PainelScreen: React.FC = (): React.JSX.Element => {
  return (
    <ScrollView style={{flex: 1}}>
      <View style={styles.container}>
        <CustomCard icon={'cash'} label={'Total'} value={'100'}></CustomCard>
        <CustomCard icon={'cash'} label={'Total'} value={'100'}></CustomCard>
        <CustomCard icon={'cash'} label={'Total'} value={'100'}></CustomCard>
        <CustomCard icon={'cash'} label={'Total'} value={'100'}></CustomCard>
      </View>

      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 24, fontWeight: 'bold'}}>
          Bem-vindo à Contak!
        </Text>
        <Text style={{fontSize: 18, color: '#888', marginTop: 16}}>
          Este é um exemplo de componente React Native usando React Native
          Paper.
        </Text>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 16,
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flex: 1,
  },
});

export default PainelScreen;
