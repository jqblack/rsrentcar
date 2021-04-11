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
import LoginScreen from './screens/usuarios/LoginScreen'
import RegisterScreen from './screens/usuarios/RegisterScreen'
import Dashboard from './screens/usuarios/Dashboard'
import AgregarRencar from './screens/rentcar/agregarRentcar'
import {AppContext} from './context/AppContext';

//stack
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// function StackScreens() {
//   return (
//     <Stack.Navigator
//       initialRouteName="verResidenciales"
//       screenOptions={{headerShown: false}}>
//       <Stack.Screen name="verResidenciales" component={VerResidenciales} />
//       <Stack.Screen name="verTorres" component={VerTorres} />
//       <Stack.Screen name="verDepartamentos" component={VerApartamentos} />
//       <Stack.Screen name="NuevoDepartamento" component={NuevoDepartamento} />
//       <Stack.Screen name="NuevaTorre" component={NuevaTorre} />
//       <Stack.Screen name="NuevoResidencial" component={NuevoResidencial} />
//       <Stack.Screen name="NuevoServicio" component={Servicios} />
//       <Stack.Screen name="verServicios" component={VerServisios} />
//     </Stack.Navigator>
//   );
// }

function StackScreensUser() {
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegistroUsuario" component={RegisterScreen} />
      <Stack.Screen name="DashBoard" component={Dashboard} />
    </Stack.Navigator>
  );
}

function StackScreensRentcar() {
  return (
    <Stack.Navigator
      initialRouteName="agregarRentcar"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="verRentcars" component={LoginScreen} />
      <Stack.Screen name="agregarRentcar" component={AgregarRencar} />
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
      component: () => <StackScreensUser />,
      rol: [2, 4],
    },
    {
      name: '2',
      component: () => <Text>Lista de residenciales</Text>,
      rol: [3, 2, 4],
    },
    {
      name: 'Rentcars',
      component: () => <StackScreensRentcar/>,
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
