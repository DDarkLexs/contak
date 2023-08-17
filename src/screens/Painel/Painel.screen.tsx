import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';

const PainelScreen: React.FC = (): React.JSX.Element => {
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 24, fontWeight: 'bold'}}>
          Bem-vindo à Contak!
        </Text>
        <Text style={{fontSize: 18, color: '#888', marginTop: 16}}>
          Este é um exemplo de componente React Native usando React Native
          Paper.
        </Text>
      </View>
    </View>
  );
};

export default PainelScreen;
