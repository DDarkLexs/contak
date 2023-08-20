import {Appbar, useTheme, Avatar} from 'react-native-paper';
import {TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {NativeStackHeaderProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import {removeUser} from '../../appStorage/index.storage';
import {useAppDispatch} from '../../store/hooks/store.hook';
import {actions} from '../../store/reducers/usuario/usuario.reducer';

export const Header: React.FC<
  Pick<NativeStackHeaderProps, 'navigation' | 'options' | 'back'>
> = ({navigation}): React.JSX.Element => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const closeSession = async (): Promise<void> => {
    await removeUser();
    dispatch(actions.setSessao(null));
    navigation.navigate('Authentication');
  };
  return (
    <Appbar.Header theme={{colors: {primary: theme.colors.surface}}}>
      <Appbar.Content
        title={'CONTAK'}
        mode="center-aligned"
        titleStyle={{fontFamily: 'Serif', fontWeight: 'bold'}}
        color={theme.colors.primary}
      />
      <Appbar.Content
        title={
          <Image
            source={require('../../assets/logo/contak.png')}
            style={{width: 40, height: 40}}
          />
        }
      />
      <TouchableOpacity onPress={() => closeSession()}>
        <Avatar.Image
          size={40}
          source={require('../../assets/images/user.png')}
        />
      </TouchableOpacity>
    </Appbar.Header>
  );
};
