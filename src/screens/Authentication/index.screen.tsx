import React, {useEffect} from 'react';
import {StyleSheet, View, ImageBackground} from 'react-native';
import Entrada from './Entrada.screen';
import Registro from './Registro.screen';
import EntradaScreen from './Entrada.screen';
import {AuthPath} from './model/props.model';
import { StackScreenProps } from '@react-navigation/stack'

type RootStackParamList = {
  Authentication:undefined,
}
type AuthScreenProp = StackScreenProps<RootStackParamList,'Authentication'>

const AuthScreen: React.FC<any> = ( prop:AuthScreenProp ): React.JSX.Element => {
  const [path, setPath] = React.useState('ENTRADA');
  useEffect(() => {

  }, [path]);
  return (
    <ImageBackground
      source={require('../../assets/images/banner-1.jpg')}
      style={styles.container}>
      {path === AuthPath.ENTRADA ? (
        <EntradaScreen navigation={prop.navigation} path={AuthPath.ENTRADA} setPath={setPath} />
      ) : (
        <Registro path={AuthPath.REGISTRO} setPath={setPath} />
      )}
    </ImageBackground>
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
