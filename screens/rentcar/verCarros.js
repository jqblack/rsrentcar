import React, {useState, useContext} from 'react';
import {FlatList, View} from 'react-native';
import globalStyles from '../../Styles/global';
import ClientAxios from '../../helpers/clientAxios';
import {useFocusEffect} from '@react-navigation/core';
import {Button, List, Headline, FAB, Appbar} from 'react-native-paper';
import {AppContext} from '../../context/AppContext';

const verCarros = ({navigation,route}) => {
  const [carros, setCarros] = useState([]);
  const {user} = useContext(AppContext);
  const Rentcar=route.params.item;
  console.log(Rentcar);
  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        try {
          const resultados = await ClientAxios.post(
            'car/getAllbyrent ',
            {key: '416063c3d13d79e6e99a702fcd9cea10', data: {idRent:Rentcar.ID}},
          );
          setCarros(resultados.data);
          console.log(resultados.data)
        } catch (error) {
          console.log(error);
        }
      };
      getData();
      return () => console.log('on cleanup');
    }, []),
  );
  return (
    <>
      <Appbar.Header> 
        <Appbar.Content title="Vehiculos"/> 
      </Appbar.Header>
      <View style={globalStyles.contenedor}>
      

        <Headline style={globalStyles.titulo}>
          {carros.length > 0
            ? ''
            : 'Aún no tiene Carros'}
        </Headline>
        <FlatList
          data={carros}
          keyExtractor={carros => carros.ID.toString()}
          renderItem={({item}) => (
            <List.Item
              title={item.nombre}
              onPress={() => navigation.navigate('verCarros', {item})}
            />
          )}
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
