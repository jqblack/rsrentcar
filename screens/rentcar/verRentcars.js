import React, {useState, useContext} from 'react';
import {FlatList, View} from 'react-native';
import globalStyles from '../../Styles/global';
import ClientAxios from '../../helpers/clientAxios';
import {useFocusEffect} from '@react-navigation/core';
import {Button, List, Headline, FAB, Appbar} from 'react-native-paper';
import {AppContext} from '../../context/AppContext';

const verRentcars = ({navigation}) => {
  const [rentCars, setRentCars] = useState([]);
  const {user} = useContext(AppContext);
  
  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        try {
          const resultados = await ClientAxios.post(
            'rentcar/getAll',
            {key: '416063c3d13d79e6e99a702fcd9cea10', data: {idUser:user.id}},
          );
          setRentCars(resultados.data);
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
        <Appbar.Content title="Rent Cars"/> 
      </Appbar.Header>
      <View style={globalStyles.contenedor}>
      

        <Headline style={globalStyles.titulo}>
          {rentCars.length > 0
            ? ''
            : 'Aún no tiene Rentcars'}
        </Headline>
        <FlatList
          data={rentCars}
          keyExtractor={rentCars => rentCars.ID.toString()}
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
          onPress={() => navigation.navigate('agregarRentcar')}
        />
      </View>
    </>
  );
};

export default verRentcars;
