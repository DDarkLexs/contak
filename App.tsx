import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Authentication from './src/screens/Authentication/index.screen';
import {Main} from './src/screens/Main.screen';
import {createNativeStackNavigator as createStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {Header as MainHeader} from './src/components/Header/Header.component';

// import {Schema} from './src/database/schema/index.schema';
const Stack = createStackNavigator();

const App: React.FC = (): React.JSX.Element => {
  // const ctrl = new Schema();
  useEffect(() => {
    const func = async (): Promise<any> => {
      // await ctrl.dropTable();
      // await ctrl.createAll();
      // ctrl.knex;
      return true;
    };
    func();
  });
  return (
    <View style={styles.appStyle}>
      <NavigationContainer independent={true}>
        <Stack.Navigator
          screenOptions={{
            header: ({navigation, back, options}) => (
              <MainHeader
                back={back}
                options={options}
                navigation={navigation}
              />
            ),
          }}>
          <Stack.Screen
            name="Authentication"
            options={{headerShown: false}}
            component={Authentication}
          />
          <Stack.Screen name="Main" component={Main} />
        </Stack.Navigator>
      </NavigationContainer>
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
