import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Authentication from './src/screens/Authentication/index.screen';

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
      <Authentication />
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
