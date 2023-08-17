import React from 'react';
import {ScrollView} from 'react-native';
import ArtigoDataTable from '../../components/Artigo/artigo.dataTable';

const ArtigoScreen: React.FC = (): React.JSX.Element => {
  return (
    <ScrollView style={{flex: 1}}>
      <ArtigoDataTable />
    </ScrollView>
  );
};

export default ArtigoScreen;
