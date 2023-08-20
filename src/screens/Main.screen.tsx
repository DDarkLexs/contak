import React from 'react';
import { BottomNavigation } from 'react-native-paper';
import PainelScreen from '../screens/Painel/Painel.screen';
import ArtigoScreen from '../screens/Artigo/Artigo.screen';
import NumeracaoScreen from './Numeracao/Numeracao.screen';
import RegistroScreen from './Registro/Registro.screen';
import ContaScreen from './Conta/Conta.screen';
import { NotaRepository } from '../database/repository/nota.repository';
import { useEffect } from 'react';
import { actions } from '../store/reducers/main/main.reducer';
import { useAppDispatch } from '../store/hooks/store.hook';
export const Main: React.FC = (): React.JSX.Element => {
  new NotaRepository();
  const [index, setIndex] = React.useState(0);
  const dispatch = useAppDispatch();
  const [routes] = React.useState([
    {
      key: 'painel',
      title: 'Painel',
      focusedIcon: 'view-dashboard-variant',
      unfocusedIcon: 'view-dashboard-variant-outline',
    },
    {
      key: 'numeracao',
      title: 'Numeração',
      focusedIcon: 'circle-multiple',
      unfocusedIcon: 'circle-multiple-outline',
    },
    {
      key: 'artigo',
      title: 'Artigo',
      focusedIcon: 'archive',
      unfocusedIcon: 'archive-outline',
    },
    {
      key: 'registro',
      title: 'Registros',
      focusedIcon: 'clipboard-list',
      unfocusedIcon: 'clipboard-list-outline',
    },
    {
      key: 'conta',
      title: 'Conta',
      focusedIcon: 'account',
      unfocusedIcon: 'account-outline',
    },
  ]);

  useEffect(() => {
    dispatch(actions.setRoute(index));
  }, [index]);
  const renderScene = BottomNavigation.SceneMap({
    painel: PainelScreen,
    numeracao: NumeracaoScreen,
    artigo: ArtigoScreen,
    registro: RegistroScreen,
    conta: ContaScreen,
  });

  return (
    <BottomNavigation
      shifting={true}
      sceneAnimationType="shifting"
      compact={true}
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};
