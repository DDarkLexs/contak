import React from 'react';
import {ScrollView} from 'react-native';
import ArtigoDataTable from '../../components/Artigo/artigo.dataTable';
import {Portal, FAB, useTheme} from 'react-native-paper';
import {useState} from 'react';

const ArtigoScreen: React.FC = (): React.JSX.Element => {
  const [state, setState] = useState<boolean>(false);
  // const onStateChange = () => setState(!state);
  const theme = useTheme();

  return (
    <ScrollView style={{flex: 1}}>
      <ArtigoDataTable />
      {/* <Portal>
        <FAB.Group
          style={{marginBottom: 80}}
          open={state}
          visible
          color={'white'}
          onLongPress={() => {
            // Vibration.cancel()//vibrate([1000,2000,10000],false)
          }}
          fabStyle={{backgroundColor: theme.colors.inversePrimary}}
          variant={'primary'}
          icon={state ? 'close' : 'menu'}
          actions={[
            {
              icon: 'archive-plus',
              label: 'Adicionar Artigo',
              color: 'white',
              style: {
                // backgroundColor: useTheme().colors.primary,
              },
              onPress: () => {},
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {

          }}
        />
      </Portal> */}
    </ScrollView>
  );
};

export default ArtigoScreen;
