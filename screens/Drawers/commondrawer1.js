import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation} from '@react-navigation/native';
import AtnDesingIcon from 'react-native-vector-icons/AntDesign';
import AdminDrawer from "./AdminDrawer";


function HomeScreen1({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}



function NotificationsScreen1({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}


const Drawer = createDrawerNavigator();
const CommonDrawer1=()=> {
  return (
    <>
    <NavigationContainer>
      <Drawer.Navigator  drawerContent={props=><AdminDrawer {...props}/>}>
        <Drawer.Screen name="Home1" component={HomeScreen1} options={{
          drawerIcon:({focused,color,size})=>(<AtnDesingIcon name="home" style={{fontSize: size, color:color}}/>),
        }
        }>
           
        </Drawer.Screen >
        <Drawer.Screen name="Notifications1" component={NotificationsScreen1} options={{
          drawerIcon:({focused,color,size})=>(<AtnDesingIcon name="notification" style={{fontSize: size, color:color}}/>),
        }
        }/>
      
      </Drawer.Navigator>
    </NavigationContainer>
    </>
  );
}

export default CommonDrawer1;