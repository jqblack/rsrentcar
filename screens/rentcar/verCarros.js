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
  const Rentcar = route.params.item;
  console.log(Rentcar);
  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        try {
          const resultados = await ClientAxios.post('car/getAllbyrent ', {
            key: '416063c3d13d79e6e99a702fcd9cea10',
            data: { idRent: Rentcar.ID },
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
    const { nombre, imgCar, precioAlquiler } = item;
    // console.log(item);
    return (
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate('verCarros', { item })}>
        <Card>
          <Card.Content>
            <Title>{nombre}</Title>
            <Paragraph>Precio de alquiler: ${precioAlquiler}</Paragraph>
          </Card.Content>
          <Card.Cover source={{ uri: imgCar }} />
          <Card.Actions>
            <Button>Cancel</Button>
            <Button>Ok</Button>
          </Card.Actions>
        </Card>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Vehiculos" />
      </Appbar.Header>
      <View style={globalStyles.contenedor}>
        <Image
          style={{
            width: 300,
            height: 300,
            resizeMode: 'contain',
          }}
          source={{
            uri:
              ''
          }}
        />
        <Headline style={globalStyles.titulo}>
          {carros.length > 0 ? '' : 'Aún no tiene Carros'}
        </Headline>
        <FlatList
          data={carros}
          keyExtractor={carros => carros.ID.toString()}
          renderItem={({ item }) => <CardCarros item={item} />}
        />

        <FAB
          icon="plus"
          style={globalStyles.fab}
          onPress={() => navigation.navigate('agregarCarro', Rentcar)}
        />
      </View>
    </>
  );
};

export default verCarros;
