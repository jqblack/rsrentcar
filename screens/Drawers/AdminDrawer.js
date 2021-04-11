import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import React from "react";
import AntDesingIcon from 'react-native-vector-icons/AntDesign';
import MatirialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ioncons from 'react-native-vector-icons/Ionicons';
// import Residentes from './Residentes';
// import Animated from 'react-native-reanimated';
import { Container, Content, Footer, Header, Button, Right, ListItem, Left, Thumbnail, Body, Text, H3 } from "native-base";
import { DrawerActions } from '@react-navigation/native';
// import { color } from "react-native-reanimated";
// import {DrawerActions} from '@react-navigation/native';
function AdminDrawer({ ...props }) {

    const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";
    return (
        <Container>
            <Header style={{ backgroundColor: "#fff", borderEndWidth: 0 }}>
                <Right>
                    <Button transparent onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}>
                        <AntDesingIcon name="menu-unfold" style={{ fontSize: 20, color: 'blue' }} />
                    </Button>

                </Right>
            </Header>
            <Content>
                <ListItem thumbnail>
                    <Left>
                        <Thumbnail source={require('../../src/logo10.png')}
                        />
                    </Left>
                    <Body>
                        <H3>Sadiel Henriquez</H3>
                        <Text note>Administrador</Text>
                    </Body>
                </ListItem>
                <DrawerContentScrollView {...props}>

                    <DrawerItemList {...props} />
                    
                    <DrawerItem label='Residentes'
                        icon={({ color, size }) => <MatirialIcon name="nature-people" style={{ fontSize: size, color: color }} />}
                        onPress={() => props.navigation.navigate('./Residentes', {
                            screen: 'Residentes',
                            
                          })}
                          
                    />
                    <DrawerItem label='Roles'
                        icon={({ color, size }) => <AntDesingIcon name="eyeo" style={{ fontSize: size, color: color }} />}
                        onPress={() => props.navigation.navigate("Home")}
                    />
                    <DrawerItem label='Tareas'
                        icon={({ color, size }) => <FontAwesome5 name="tasks" style={{ fontSize: size, color: color }} />}
                        onPress={() => props.navigation.navigate("Home")}
                    />
                    <DrawerItem label='Mantenimiento'
                        icon={({ color, size }) => <Ioncons name="build-outline" style={{ fontSize: size, color: color }} />}
                        onPress={() => props.navigation.navigate("Home")}
                    />
                    <DrawerItem label='Actividades'
                        icon={({ color, size }) => <AntDesingIcon name="book" style={{ fontSize: size, color: color }} />}
                        onPress={() => props.navigation.navigate("Home")}
                    />
                    <DrawerItem label='Quejas'
                        icon={({ color, size }) => <AntDesingIcon name="exclamationcircleo" style={{ fontSize: size, color: color }} />}
                        onPress={() => props.navigation.navigate("Home")}
                    />
                     <DrawerItem label='Otros residenciales'
                        icon={({ color, size }) => <AntDesingIcon name="search1" style={{ fontSize: size, color: color }} />}
                        onPress={() => props.navigation.navigate("Home")}
                    />
                </DrawerContentScrollView>
            </Content>
            <Footer>

            </Footer>
        </Container>




    );
}

export default AdminDrawer;