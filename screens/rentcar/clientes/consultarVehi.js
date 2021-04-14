import React, { useState, useContext } from 'react';
import { FlatList, View, TouchableWithoutFeedback, Image } from 'react-native';
import globalStyles from '../../../Styles/global';
import DropDown from 'react-native-paper-dropdown';
import ClientAxios from '../../../helpers/clientAxios';
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

import { AppContext } from '../../../context/AppContext';
// import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const ConsultaVehi = ({ navigation, route }) => {
    const [carros, setCarros] = useState([]);
    const [calificacion, setCalificacion] = useState('1');

    const { user } = useContext(AppContext);
    const [score, setScore] = useState('');
    const [mostrarScore, setMostrarScore] = useState(false);

      useFocusEffect(
        React.useCallback(() => {
          const getData = async () => {
            try {
              const resultados = await ClientAxios.post('car/getcarClient', {
                key: '416063c3d13d79e6e99a702fcd9cea10',
                data: {score:user.currentScore},
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


    const CardCarros = ({ item }) => {
        const {nombreCar, imgCar, nombreuser, nombrerent, fecha,  cantDias, ID_Usuario, marca, precioAlquiler } = item;

        // console.log(item);
        return (
            <TouchableWithoutFeedback>
                <Card onPress={() => navigation.navigate('detalle', { item, user })}>
                    <Card.Content>
                        <Card.Cover source={{ uri: 'https://i.picsum.photos/id/863/700/700.jpg?hmac=0CH3HWqzcDYHNml_TBbqPWK1AY1te1JTmJXbb5UZpFY' }} />
                        <Title>{nombreCar + ' - ' + nombrerent}</Title>
                         <Paragraph>Marca:{marca}</Paragraph>
                        <Paragraph>Precio x dia:{precioAlquiler}</Paragraph>

                    </Card.Content>
                    <Card.Actions>
                        <Button onPress={() => navigation.navigate('detalle', { item })}>Detalles</Button>
                    </Card.Actions>
                </Card>
            </TouchableWithoutFeedback>
        );
    };

    return (
        <>
            <Appbar.Header>
                <Appbar.Content title="Vehiculos" />
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

export default ConsultaVehi;
