import React from 'react';
import {View, Text} from 'react-native';
import {Appbar} from 'react-native-paper';

const EntradaScreen = () => {
  return (
    <View style={{flex: 1}}>
      <Appbar.Header>
        <Appbar.Content title="Homescreen" />
      </Appbar.Header>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 24, fontWeight: 'bold'}}>
          Bem-vindo à EntradaScreen!
        </Text>
        <Text style={{fontSize: 18, color: '#888', marginTop: 16}}>
          Este é um exemplo de componente React Native usando React Native
          Paper.
        </Text>
      </View>
    </View>
  );
};

export default EntradaScreen;
