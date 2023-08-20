import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Card, TextInput, Button, HelperText} from 'react-native-paper';
import {useAppSelector} from '../../store/hooks/store.hook';
import {usuarioAuthHook} from './states/index.state';
import {AuthPath, AuthProps} from './model/props.model';

const RegistroScreen: React.FC<AuthProps> = (props): React.JSX.Element => {
  const {
    nome,
    setNome,
    telefone,
    _senha,
    senha,
    setSenha,
    _setSenha,
    setTelefone,
    registrar,
    loading,
    see1,
    see2,
    setSee1,
    setSee2,
  } = usuarioAuthHook(props.navigation);
  return (
    <View style={style.container}>
      <Card disabled={loading} style={style.card}>
        <View style={style.avatarContainer}>
          <Image
            style={style.img}
            source={require('../../assets/images/auth.png')}
          />
          <Card.Title
            title={'Registro'}
            titleStyle={style.cardTitle}
            titleVariant="titleLarge"
          />
        </View>
        <Card.Content>
          <TextInput
            style={style.input}
            mode="flat"
            disabled={loading}
            value={nome}
            onChangeText={setNome}
            label="Nome"
          />
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
          <TextInput
            style={style.input}
            value={_senha}
            disabled={loading}
            onChangeText={_setSenha}
            secureTextEntry={!see2}
            label="senha novamente"
            right={
              <TextInput.Icon
                onPress={() => setSee2(!see2)}
                icon={see2 ? 'eye-off' : 'eye'}
              />
            }
          />
        </Card.Content>
        <Card.Actions style={style.cardAction}>
          <Button
            mode="contained-tonal"
            loading={loading}
            disabled={loading}
            onPress={() => registrar()}>
            Registrar
          </Button>
          <Button
            mode="contained-tonal"
            onPress={() => props.setPath(AuthPath.ENTRADA)}
            loading={loading}
            disabled={loading}>
            Entrada
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
export default RegistroScreen;
