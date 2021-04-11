import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import globalStyles from '../Styles/global';
import DropDown from 'react-native-paper-dropdown'
import {DefaultTheme, TextInput, Button} from 'react-native-paper';
import axios from 'axios';

const listPermisos=[]

const modoSesion = ({navigation, route}) => {
    const [permiso,setPermiso]=useState('');
    const [desplegar, setDesplegar]=useState(false);

    useEffect(()=>{
        const cargar = async ()=>{
            try {
                const lista= await axios.get('http://10.0.0.12:8080/API/residencial/get_permisos');
                //enviarme lista como formato: [{label:'', value:''},{label: '', value:''}]
                return lista;
            } catch (error) {
                console.log(error)
            }
        }
        listPermisos=cargar();
    },[]);

    const theme = {
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
        }
    
      };
//funcion inciciar

const iniciar=()=>{
    //validar
    //setear
    
    //resdireccionar
    navigation.navigate('Inicio',{acceso:permiso})
}
    return(
    <View style={globalStyles.contenedor}>
        <Text style={globalStyles.titulo}>¿Como desea iniciar sesión?</Text>
        <View style={globalStyles.inputs}>
            <DropDown
                label={'Modos usuario'}
                mode='outlined'
                value={permiso}
                setValue={setPermiso}
                list={listPermisos}
                visible={desplegar}
                showDropDown={() => setDesplegar(true)}
                onDismiss={() => setDesplegar(false)}
                inputProps={{
                    right: <TextInput.Icon name={'menu-down'} />,

                }} theme={theme}
            />
        </View>
        
        <Button onPress={iniciar()}>Iniciar</Button>
    </View>
);
}


export default modoSesion;
