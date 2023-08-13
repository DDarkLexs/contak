import React, {useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Schema} from './src/database/model/index.schema';

const App: React.FC = (): React.JSX.Element => {
  useEffect(() => {
    const func = async (): Promise<any> => {
      // await ctrl.createAll();
      // ctrl.knex;
      return true;
    };
    func();
  });
  return (
    <View style={styles.appStyle}>
      <Text>Ola mundo! 🖖</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  appStyle: {
    flex: 1,
    margin: 'auto',
    justifyContent: 'center',
    textAlign: 'center',
    alignContent: 'center',
  },
});

export default App;
