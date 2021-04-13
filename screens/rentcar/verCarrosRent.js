import React, { useState, useContext } from 'react';
import { FlatList, View, TouchableWithoutFeedback, Image } from 'react-native';
import globalStyles from '../../Styles/global';
import DropDown from 'react-native-paper-dropdown';
import ClientAxios from '../../helpers/clientAxios';
import { useFocusEffect } from '@react-navigation/core';
import {
    Button,
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

const verCarros = ({ navigation, route }) => {
    const [carros, setCarros] = useState([]);
    const [calificacion, setCalificacion] = useState('1');

    const { user } = useContext(AppContext);
    const [score, setScore] = useState('');
    const [mostrarScore, setMostrarScore] = useState(false);

      useFocusEffect(
        React.useCallback(() => {
          const getData = async () => {
            try {
              const resultados = await ClientAxios.post('rentcar/getcarrentados', {
                key: '416063c3d13d79e6e99a702fcd9cea10',
                data: { idUser:user.ID },
              });
              setCarros(resultados.data);
              console.log(resultados.data);
            } catch (error) {
              console.log(error);
            }
          };
          getData();
          return () => console.log('on cleanup');
        }, []),
      );

    const calificar = async (usuarioArq) => {

        if (usuarioArq.calificacion <= 0 || usuarioArq.calificacion > 10) {
            alert('ingrese calificacion en un rango del 1 al 10')
            return
        }
        console.log(usuarioArq)
        // try {
        //     const resultados = await ClientAxios.post('rentcar/getcarrentados', {
        //         key: '416063c3d13d79e6e99a702fcd9cea10',
        //         data: { idUser: userArq },
        //     });
        //     setCarros(resultados.data);
        //     // console.log(resultados.data);
        // } catch (error) {
        //     console.log(error);
        // }
    }

    const CardCarros = ({ item }) => {
        const {nombreCar, imgCar, nombreuser, nombrerent, fecha,  cantDias, ID_Usuario } = item;

        // console.log(item);
        return (
            <TouchableWithoutFeedback>
                <Card onPress={() => navigation.navigate('detalleCarRented', { item, user })}>
                    <Card.Content>
                        <Card.Cover source={{ uri: 'https://i.picsum.photos/id/863/700/700.jpg?hmac=0CH3HWqzcDYHNml_TBbqPWK1AY1te1JTmJXbb5UZpFY' }} />
                        <Title>{nombreCar + ' - ' + nombrerent}</Title>
                       
                    </Card.Content>
                    <Card.Actions>
                        <Button onPress={() => navigation.navigate('detalleCarRented', { item })}>Detalles</Button>
                    </Card.Actions>
                </Card>
            </TouchableWithoutFeedback>
        );
    };

    return (
        <>
            <Appbar.Header>
                <Appbar.Content title="Vehiculos rentados" />
            </Appbar.Header>
            <View style={globalStyles.contenedor}>

                <FlatList
                    data={carros}
                    keyExtractor={carros => carros.ID.toString()}
                    renderItem={({ item }) => <CardCarros item={item} />}
                />


            </View>
        </>
    );
};

export default verCarros;
