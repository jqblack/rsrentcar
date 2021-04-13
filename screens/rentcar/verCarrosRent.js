import React, { useState, useContext } from 'react';
import { FlatList, View, TouchableWithoutFeedback, Image } from 'react-native';
import globalStyles from '../../Styles/global';
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
} from 'react-native-paper';
import { AppContext } from '../../context/AppContext';
// import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const verCarros = ({ navigation, route }) => {
    const [carros, setCarros] = useState([]);
    const { user } = useContext(AppContext);


      useFocusEffect(
        React.useCallback(() => {
          const getData = async () => {
            try {
              const resultados = await ClientAxios.post('rentcar/getcarrentados', {
                key: '416063c3d13d79e6e99a702fcd9cea10',
                data: { idUser:user.ID },
              });
              setCarros(resultados.data);
              // console.log(resultados.data);
            } catch (error) {
              console.log(error);
            }
          };
          getData();
          return () => console.log('on cleanup');
        }, []),
      );

    const CardCarros = ({ item }) => {
        const { nombre, imgCar, userArq, nombreRentcar, fechaArqu, dias } = item;
        // console.log(item);
        return (
            <TouchableWithoutFeedback
                onPress={() => navigation.navigate('verCarros', { item })}>
                <Card>
                    <Card.Content>
                        <Card.Cover source={{ uri: 'https://i.picsum.photos/id/863/700/700.jpg?hmac=0CH3HWqzcDYHNml_TBbqPWK1AY1te1JTmJXbb5UZpFY' }} />
                        <Title>{nombre + ' - ' + nombreRentcar}</Title>
                        <Paragraph>alquilado por: {userArq}</Paragraph>
                        <Paragraph>fecha de alquiler: {fechaArqu}</Paragraph>
                        <Paragraph>Días rentados: {dias}</Paragraph>
                        
                    </Card.Content>

                    <Card.Actions>
                        <Button onPress={()=>calificar}>Calificar</Button>
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
