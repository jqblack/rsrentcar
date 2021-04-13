import * as React from 'react';
import Login from './Routes';

import {AppContextProvider} from './context/AppContext';
import {NavigationContainer} from '@react-navigation/native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#C62828',
    accent: '#f1c40f',
  },
};
const App = () => {
  return (
    <>
      <AppContextProvider>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <Login />
          </NavigationContainer>
        </PaperProvider>
      </AppContextProvider>
    </>
  );
};
 

export default App;
