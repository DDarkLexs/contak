import React, {useState} from 'react';
import {Alert, ToastAndroid, View} from 'react-native';
import {useTheme, IconButton, Menu} from 'react-native-paper';
import {QueryContagem} from '../../../database/repository/nota.repository';
import {NotaController} from '../../../controller/nota/nota.controller';
import {actions as mainActions} from '../../../store/reducers/main/main.reducer';
import {useAppDispatch, useAppSelector} from '../../../store/hooks/store.hook';
import {actions} from '../../../store/reducers/nota/nota.reducer';
import {NotaDeContagem} from '../../../database/model/table.model';

export const MenuItem: React.FC<Pick<QueryContagem, 'id_notaDeContagem'>> = ({
  id_notaDeContagem,
}): React.JSX.Element => {
  const controller = new NotaController();
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const items = useAppSelector(state => state.nota.registro);
  const ndc = items.find(
    state => state.id_notaDeContagem === id_notaDeContagem,
  );
  const dispatch = useAppDispatch();
  const deleteOne = async () => {
    try {
      dispatch(mainActions.setLoading(true));
      await controller.deleteNotaDeContagemOnlyOne(Number(id_notaDeContagem));
      const query = await controller.getContagens();
      dispatch(actions.setRegistro(query));
      ToastAndroid.show('Numeração eliminado com sucesso!', ToastAndroid.LONG);
    } catch (error) {
      ToastAndroid.show(JSON.stringify(error), ToastAndroid.LONG);
    } finally {
      dispatch(mainActions.setLoading(false));
    }
  };
  const deleteAlert = async () => {
    Alert.alert(
      'tens a certeza?',
      `deseja apagar este registro de numeração com titulo ${ndc?.titulo}?`,
      [
        {
          text: 'não',
          // onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'sim',
          onPress: () => deleteOne(),
        },
      ],
    );
  };

  // console.log(artigo.expira)

  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={() => closeMenu()}
        anchor={
          <IconButton
            icon="dots-vertical"
            size={20}
            onPressIn={() => openMenu()}
          />
        }>
        {
          <Menu.Item
            leadingIcon={'eye'}
            title={'Visualizar'}
            onPress={() => {}}
          />
        }
        {
          <Menu.Item
            leadingIcon={'pencil'}
            title={'Editar'}
            onPress={() => {}}
          />
        }
        {
          <Menu.Item
            leadingIcon={'delete'}
            title={'apagar'}
            onPress={() => {
              closeMenu();
              deleteAlert();
            }}
          />
        }
      </Menu>
    </View>
  );
};
