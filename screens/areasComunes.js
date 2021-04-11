import React, { useState } from 'react';
import { View } from "react-native";
import { TextInput, Button, } from 'react-native-paper';
import globalStyles from '../Styles/global';

const areaComun = () => {
const [nombre,setNombre]=useState('');
const [descripcion,setDescripcion]=useState('');
const guardarArea=()=>{
    //validar form
    //verificar si es modificar o crear una torre
    //crear o modificar
    //limpiar form
    //redireccionar
  }
    return (
        <View style={globalStyles.contenedor}>
            <TextInput
                label='Nombre del área común'
                placeholder='Residencia'
                style={globalStyles.inputs}
                onChangeText={texto => setNombre(texto)}
                value={nombre}
                
            />

            <TextInput
                label='breve descripción'
                placeholder='Residencia'
                style={globalStyles.inputs}
                onChangeText={texto => setDescripcion(texto)}
                value={descripcion}
                multiline={true}
            />
            <Button onPress={() => guardarArea()}>Crear</Button>




        </View>
    );
}

export default areaComun;
