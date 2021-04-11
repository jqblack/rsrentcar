import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import AtnDesingIcon from 'react-native-vector-icons/AntDesign';
import AdminDrawer from "./AdminDrawer";
import CommonDrawer1 from './commondrawer1';
import Residentes from '../Residentes';
import { Buttons, Container, Content, Text, Header, Left, Body, Title, Rights } from 'native-base';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}



function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}


const Drawer = createDrawerNavigator();
const CommonDrawer = () => {
  return (
    <>
    
      <NavigationContainer>
        <Drawer.Navigator drawerContent={props => <AdminDrawer {...props} />}>
          <Drawer.Screen name="Home" component={HomeScreen} options={{
            drawerIcon: ({ focused, color, size }) => (<AtnDesingIcon name="home" style={{ fontSize: size, color: color }} />),
          }
          }>

          </Drawer.Screen >
          <Drawer.Screen name="Notifications" component={NotificationsScreen} options={{
            drawerIcon: ({ focused, color, size }) => (<AtnDesingIcon name="notification" style={{ fontSize: size, color: color }} />),
          }
          } />

         <Drawer.Navigator>
         <Drawer.Screen name="Residentes" component={props => <CommonDrawer1 {...props} />} options={{
            drawerIcon: ({ focused, color, size }) => (<AtnDesingIcon name="notification" style={{ fontSize: size, color: color }} />),
          }
          } />
         </Drawer.Navigator>

        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
}

export default CommonDrawer;