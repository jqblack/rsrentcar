import React, {useState} from 'react';
import {FlatList, View} from 'react-native';
import globalStyles from '../Styles/global';
import ClientAxios from '../helpers/clientAxios';
import {useFocusEffect} from '@react-navigation/core';
import {Button, List, Headline, FAB, Appbar} from 'react-native-paper';
import ScreenHeader from '../components/ScreenHeader';

const verResidenciales = ({navigation}) => {
  const [residencial, setResidencial] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        try {
          const resultados = await ClientAxios.post(
            'residencial/getAllResidencial',
            {key: '291290336b75b259b77e181c87cc974f', data: {}},
          );
          setResidencial(resultados.data);
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
        <Appbar.Content title="Residenciales"/> 
      </Appbar.Header>
      <View style={globalStyles.contenedor}>
        <Button
          icon="plus-circle"
          onPress={() => navigation.navigate('NuevaTorre')}>
          Nueva torre
        </Button>

        <Headline style={globalStyles.titulo}>
          {residencial.length > 0
            ? 'Residenciales'
            : 'Aún no tiene residenciales'}
        </Headline>
        <FlatList
          data={residencial}
          keyExtractor={residencial => residencial.id.toString()}
          renderItem={({item}) => (
            <List.Item
              title={item.nombre}
              onPress={() => navigation.navigate('verTorres', {item})}
            />
          )}
        />

        <FAB
          icon="plus"
          style={globalStyles.fab}
          onPress={() => navigation.navigate('NuevoResidencial')}
        />
      </View>
    </>
  );
};

export default verResidenciales;
