/**
 * @format
 */

import {AppRegistry, useColorScheme} from 'react-native';
import App from './App';
import {PaperProvider} from 'react-native-paper';
import {Provider as StoreProvider} from 'react-redux';
import {name as appName} from './app.json';
import {dark, light} from './src/config/theme.config';
import { store } from './src/store/index.store';

export default function MainApp() {
  const theme = useColorScheme() === 'light' ? light : dark;
  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    </StoreProvider>
  );
}

AppRegistry.registerComponent(appName, () => MainApp);
