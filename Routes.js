import {Text} from 'react-native';
import React, {useContext} from 'react';
import VerResidenciales from './screens/verResidenciales';
import VerApartamentos from './screens/verApartamentos';
import NuevoResidencial from './screens/RegistroResidencial';
import {createStackNavigator} from '@react-navigation/stack';
import VerTorres from './screens/verTorres';
import NuevaTorre from './screens/torres';
import NuevoDepartamento from './screens/departamentos';
import Servicios from './screens/servicios';
import VerServisios from './screens/verServicios';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {AppContext} from './context/AppContext';

//stack
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function StackScreens() {
  return (
    <Stack.Navigator
      initialRouteName="verResidenciales"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="verResidenciales" component={VerResidenciales} />
      <Stack.Screen name="verTorres" component={VerTorres} />
      <Stack.Screen name="verDepartamentos" component={VerApartamentos} />
      <Stack.Screen name="NuevoDepartamento" component={NuevoDepartamento} />
      <Stack.Screen name="NuevaTorre" component={NuevaTorre} />
      <Stack.Screen name="NuevoResidencial" component={NuevoResidencial} />
      <Stack.Screen name="NuevoServicio" component={Servicios} />
      <Stack.Screen name="verServicios" component={VerServisios} />
    </Stack.Navigator>
  );
}

const Routes = () => {
  const {user} = useContext(AppContext);

  const pantallasDrawer = [
    {
      name: 'Home',
      component: () => <Text>Lista de residenciales</Text>,
      rol: [1],
    },
    {
      name: 'ListaResidenciales',
      component: () => <StackScreens />,
      rol: [2, 4],
    },
    {
      name: '2',
      component: () => <Text>Lista de residenciales</Text>,
      rol: [3, 2, 4],
    },
    {
      name: '3',
      component: () => <Text>Lista de residenciales</Text>,
      rol: [1, 4],
    },
  ];

  return (
    <>
      <Drawer.Navigator initialRouteName="Home">
        {pantallasDrawer.map(pantalla => {
          if (pantalla.rol.includes(user.rol)) {
            return <Drawer.Screen name={pantalla.name} component={pantalla.component} />;
          }
          return;
        })}
      </Drawer.Navigator>
    </>
  );
};

export default Routes;
