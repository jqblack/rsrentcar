import React, { useState, useContext } from 'react';
import { FlatList, View, TouchableWithoutFeedback, Image } from 'react-native';
import globalStyles from '../../../Styles/global';
import DropDown from 'react-native-paper-dropdown';
import ClientAxios from '../../../helpers/clientAxios';
import { useFocusEffect } from '@react-navigation/core';
import {
    Button,
    Text,
    Card,
    Headline,
    FAB,
    Appbar,
    Title,
    Paragraph,
    TextInput

} from 'react-native-paper';



import { AppContext } from '../../context/AppContext';
// import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const detalleConsutaVehi = ({ navigation, route }) => {
        const [dias,setDias]=useState('');

        const item=route.params.item;
        const  userid=route.params.user;

    const Alquilar = async () => {
    
        if (Number(dias) <= 0 || Number(dias) > 30) {
            alert('ingrese los días en un rango del 1 al 30')
            return
        }
        if (dias == '') {
            alert('La cantida de dias no puede estar vacía')
            return
        }
        console.log(item.ID);
        
        try {
            const resultados = await ClientAxios.post('rentcar/rentar', {
                key: '416063c3d13d79e6e99a702fcd9cea10',
                data: { idCar: item.ID, idUser:userid.ID,idRent:item.ID_RentCar,cantDias:dias }
            });
            //setCarros(resultados.data);
            // console.log(resultados.data);
            navigation.goBack();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="Detalle del vehícula" />
            </Appbar.Header>
            <View style={globalStyles.contenedor}>
                <Title>Rent car {item.nombrerent}</Title>
                <Paragraph>Carro: {item.nombreCar}</Paragraph>
                <Paragraph>Matricula: {item.matricula}</Paragraph>   
                <Paragraph>Marca: {item.marca}</Paragraph>
                <Paragraph>Precio de alquiler por dia: ${item.precioAlquiler}</Paragraph>
                <TextInput
                    label="Cantidad de días:"
                    style={globalStyles.inputs}
                    onChangeText={texto => setDias(texto)}
                    value={dias}
                    keyboardType="number-pad"
                />
                <Button onPress={()=>Alquilar()}>Alquilar</Button>
            </View>
        </>
    );
};

export default detalleConsutaVehi;
