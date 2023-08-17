import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Card, TextInput, Button, HelperText} from 'react-native-paper';
import {useAppSelector} from '../../store/hooks/store.hook';
import {usuarioAuthHook} from './states/index.state';
import {AuthPath, AuthProps} from './model/props.model';

const EntradaScreen: React.FC<AuthProps> = (props): React.JSX.Element => {
  const {
    telefone,
    senha,
    setSenha,
    setTelefone,
    loading,
    see1,
    setSee1,
    entrada,
  } = usuarioAuthHook();
  return (
    <View style={style.container}>
      <Card disabled={loading} style={style.card}>
        <View style={style.avatarContainer}>
          <Image
            style={style.img}
            source={require('../../assets/images/auth.png')}
          />
          <Card.Title
            title={'Entrada'}
            titleStyle={style.cardTitle}
            titleVariant="titleLarge"
          />
        </View>
        <Card.Content>
          <TextInput
            style={style.input}
            value={telefone}
            disabled={loading}
            onChangeText={setTelefone}
            label="telefone"
            keyboardType="phone-pad"
          />
          <TextInput
            style={style.input}
            value={senha}
            disabled={loading}
            onChangeText={setSenha}
            secureTextEntry={!see1}
            label="senha"
            right={
              <TextInput.Icon
                onPress={() => setSee1(!see1)}
                icon={see1 ? 'eye-off' : 'eye'}
              />
            }
          />
        </Card.Content>
        <Card.Actions style={style.cardAction}>
          <Button
            onPress={() => entrada(props.navigation)}
            mode="contained-tonal"
            loading={loading}
            disabled={loading}>
            Entrar
          </Button>
          <Button
            mode="contained-tonal"
            loading={loading}
            disabled={loading}
            onPress={() => props.setPath(AuthPath.REGISTRO)}>
            Registro
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {textAlign: 'center'},
  img: {width: 150, height: 150},
  cardAction: {
    alignSelf: 'center',
  },
  card: {
    width: '95%',
    alignContent: 'center',
  },
  input: {
    margin: 5,
  },
  avatarContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
  },
});
export default EntradaScreen;
