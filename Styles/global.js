import {StyleSheet} from 'react-native';
import {DefaultTheme} from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
  fonts: {
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal',
    },
  },
};

const globalStyles = StyleSheet.create({
  contenedor: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: '2.5%',
  },
  titulo: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
    fontSize: 30,
  },
  inputs: {
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default globalStyles;
