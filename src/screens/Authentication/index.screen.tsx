import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Surface} from 'react-native-paper';
import Entrada from './Entrada.screen';
import Registro from './Registro.screen';

const AuthScreen: React.FC = (): React.JSX.Element => {
  return (
    <Surface style={styles.container}>
      <Registro />
    </Surface>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    margin: 'auto',
    textAlign: 'center',
  },
});

export default AuthScreen;
