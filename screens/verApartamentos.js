import React, {useEffect, useState} from 'react';
import {Text, Button, List, Headline, FAB} from 'react-native-paper';
import {FlatList, View, StyleSheet} from 'react-native';
import axios from 'axios';
import globalStyles from '../Styles/global';
import ClientAxios from '../helpers/clientAxios';
import {useFocusEffect} from '@react-navigation/core';

const verApartamento = ({navigation, route}) => {
  const [departamento, setDepartamento] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        try {
          const resultados = await ClientAxios.post(
            'departamento/getdepartamentos',
            {
              key: '291290336b75b259b77e181c87cc974f',
              data: {id: route.params.item.id},
            },
          );
          setDepartamento(resultados.data);
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
      <View style={globalStyles.contenedor}>
        <Button
          icon="plus-circle"
          onPress={() =>
            navigation.navigate('NuevoDepartamento', route.params.item.id)
          }>
          Nuevo departamento
        </Button>

        <Headline style={globalStyles.titulo}>
          {departamento.length > 0
            ? 'Apartamentos'
            : 'No hay Apartamentos registrados'}
        </Headline>

        <FlatList
          data={departamento}
          keyExtractor={departamento => departamento.id.toString()}
          renderItem={({item}) => (
            <List.Item
              title={item.Nombre_departamento}
              //navigation.navigate('detalleDepartamento',{item})
              onPress={() => console.log(item)}
            />
          )}
        />

        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => navigation.navigate('NuevaTorre')}
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 20,
  },
});
//setTorres
export default verApartamento;
