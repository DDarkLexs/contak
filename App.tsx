import React, {useEffect} from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import {Surface, useTheme} from 'react-native-paper';
import Authentication from './src/screens/Authentication/index.screen';
import {Main} from './src/screens/Main.screen';
import {createNativeStackNavigator as createStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {Header as MainHeader} from './src/components/Header/Header.component';
// import {Schema} from './src/database/schema/index.schema';
import {useAppSelector} from './src/store/hooks/store.hook';
import './src/database/schema/index.schema';

const Stack = createStackNavigator();

const App: React.FC = (): React.JSX.Element => {
  const [route, setRoute] = React.useState<number | undefined>(0);
  const session = useAppSelector(state => state.usuario.sessao);
  const isLoggedIn = !!useAppSelector(state => state.usuario.sessao);
  const theme = useTheme();
  // const isDark = use

  useEffect(() => {
    if (isLoggedIn) {
    }
  }, [route]);

  return (
    <Surface style={styles.appStyle}>
      <StatusBar backgroundColor={theme.colors.inversePrimary} />
      <NavigationContainer
        onStateChange={prop => {
          setRoute(prop?.index);
        }}>
        <Stack.Navigator
          initialRouteName={isLoggedIn ? 'Main' : 'Authentication'}
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
    </Surface>
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
