import React, { useState, useContext } from 'react';
import { FlatList, View, TouchableWithoutFeedback, Image } from 'react-native';
import globalStyles from '../../Styles/global';
import DropDown from 'react-native-paper-dropdown';
import ClientAxios from '../../helpers/clientAxios';
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

const detalleAlquier = ({ navigation, route }) => {
        const [calificacion,setCalificacion]=useState('');
        console.log(route.params.item);
        const item=route.params.item;
        const  userid=route.params.user;
    //   useFocusEffect(
    //     React.useCallback(() => {
    //       const getData = async () => {
    //         try {
    //           const resultados = await ClientAxios.post('rentcar/getcarrentados', {
    //             key: '416063c3d13d79e6e99a702fcd9cea10',
    //             data: { idUser:user.ID },
    //           });
    //           setCarros(resultados.data);
    //           // console.log(resultados.data);
    //         } catch (error) {
    //           console.log(error);
    //         }
    //       };
    //       getData();
    //       return () => console.log('on cleanup');
    //     }, []),
    //   );

    const Devuelto = async () => {
      
        if (Number(calificacion) <= 0 || Number(calificacion) > 10) {
            alert('ingrese calificacion en un rango del 1 al 10')
            return
        }
        if (calificacion == '') {
            alert('La calificacion no puede estar vacío')
            return
        }
        console.log(item.ID_Carro);
        
        try {
            const resultados = await ClientAxios.post('rentcar/devolverCar', {
                key: '416063c3d13d79e6e99a702fcd9cea10',
                data: { idCar:item.ID_Carro, id: item.ID, score:calificacion },
            });
            //setCarros(resultados.data);
            // console.log(resultados.data);
            navigation.navigate('Ver carros rentados');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="Detalle de la renta" />
            </Appbar.Header>
            <View style={globalStyles.contenedor}>
            <Paragraph>alquilado por: {item.nombreuser}</Paragraph>
                        <Paragraph>fecha de alquiler: {item.fecha}</Paragraph>
                        <Paragraph>Días rentados: {item.cantDias}</Paragraph>
                <TextInput
                    label="Calificación"
                    style={globalStyles.inputs}
                    onChangeText={texto => setCalificacion(texto)}
                    value={calificacion}
                    keyboardType="number-pad"
                />
                <Button onPress={()=>Devuelto()}>devuelto</Button>
            </View>
        </>
    );
};

export default detalleAlquier;
