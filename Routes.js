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
import verRencar from './screens/rentcar/verRentcars'
import verCarros from './screens/rentcar/verCarros'
import AgregarCarro from './screens/rentcar/agregarCarros'
import {AppContext} from './context/AppContext';
import Averia from './screens/averias/reporteAveria' 
import VerAveria from './screens/averias/verAverias' 
import DetalleAveria from './screens/averias/detalleAveria'

//stack
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

//DashBoard

const Routes = () => {
  const {user} = useContext(AppContext);

  const pantallasDrawer = [
    {
      name: 'Home',
      component: () => <StackScreensUser/> ,
      rol: [1],
    },
    {
      name: 'Averias',
      component: () => <Averia/>,
      rol: [2],
    },
    {
      name: 'Ver Averias',
      component: () => <VerAveria/>,
      rol: [1],
    },
    {
      name: '2',
      component: () => <Text>configuraciones</Text>,
      rol: [3, 2],
    },
    {
      name: 'Rentcars',
      component: () => <StackScreensRentcar/>,
      rol: [1],
    },
  ];

  return (
    <>
      <Drawer.Navigator initialRouteName="Home">
        {pantallasDrawer.map(pantalla => {
          if (pantalla.rol.includes(user.ID_tipoUsuario)) {
            return <Drawer.Screen name={pantalla.name} component={pantalla.component} />;
          }
          return;
        })}
      </Drawer.Navigator>
    </>
  );
}

function StackScreensRentcar() {
  return (
    <Stack.Navigator
      initialRouteName="verRentcars"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="verRentcars" component={verRencar} />
      <Stack.Screen name="agregarRentcar" component={AgregarRencar} />
      <Stack.Screen name="verCarros" component={verCarros} />
      <Stack.Screen name="agregarCarro" component={AgregarCarro} />
    </Stack.Navigator>
  );
}

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

function StackScreensAverias() {
  return (
    <Stack.Navigator
      initialRouteName="verAverias"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="verAverias" component={VerAveria} />
      <Stack.Screen name="detalleAveria" component={DetalleAveria} />
     
    </Stack.Navigator>
  );
}



export default Routes;
