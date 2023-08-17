import {useCallback, useState} from 'react';
import {ToastAndroid, Alert} from 'react-native';
import {UsuarioController} from '../../../controller/usuario/usuario.controller';

export function usuarioAuthHook() {
  const [nome, setNome] = useState<string>('');
  const [telefone, setTelefone] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [_senha, _setSenha] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [see1, setSee1] = useState<boolean>(false);
  const [see2, setSee2] = useState<boolean>(false);

  const controller = new UsuarioController();
  const registrar = useCallback(async () => {
    try {
      setLoading(true);
      if (senha === _senha) {
        const response = await controller.createRecord({nome, telefone, senha});

        ToastAndroid.show(
          `${response.nome} foi registrado com sucesso!`,
          ToastAndroid.LONG,
        );
        setNome('');
        setSenha('');
        _setSenha('');
        setNome('');
        setTelefone('');
      } else {
        throw 'As senhas fornecidas não correspondem. Por favor, verifique e tente novamente.';
      }
    } catch (error) {
      ToastAndroid.show(JSON.stringify(error), ToastAndroid.LONG);
    } finally {
      setLoading(false);
    }
  }, [nome, telefone, senha, _senha]);

  const entrada = useCallback(
    async (navigation: any) => {
      try {
        setLoading(true);
        const user = await controller.authenticate({telefone, senha});

        ToastAndroid.show(`Seja bem-vindo ${user.nome}!`, ToastAndroid.LONG);
        navigation.navigate('Main');
      } catch (error) {
        Alert.alert('Houve um erro!', JSON.stringify(error));
      } finally {
        setLoading(false);
      }
    },
    [telefone, senha],
  );

  return {
    nome,
    setNome,
    telefone,
    setTelefone,
    senha,
    setSenha,
    _senha,
    _setSenha,
    loading,
    setLoading,
    see1,
    setSee1,
    see2,
    setSee2,
    registrar,
    entrada,
  };
}
