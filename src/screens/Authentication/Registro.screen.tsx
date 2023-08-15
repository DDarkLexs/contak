import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Surface, Card, TextInput, HelperText, Button} from 'react-native-paper';

const RegistroScreen: React.FC = (): React.JSX.Element => {
  
  return (
    <View style={style.container}>
      <Card style={style.card}>
        <Card.Title title={'Registro'} />
        <Card.Content>
          <TextInput style={style.input} mode="flat" placeholder="Nome" />
          <TextInput style={style.input} placeholder="telefone" />
          <TextInput style={style.input} placeholder="senha" />
          <TextInput style={style.input} placeholder="senha novamente" />
        </Card.Content>
        <Card.Actions>
          <Button>Registrar</Button>
          <Button>Entrada</Button>
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
  card: {
    width: '90%',
  },
  input: {
    margin: 5,
  },
});
export default RegistroScreen;
