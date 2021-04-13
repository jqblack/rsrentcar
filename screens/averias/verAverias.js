import React, {useState, useContext} from 'react';
import {FlatList, View} from 'react-native';
import globalStyles from '../../Styles/global';
import ClientAxios from '../../helpers/clientAxios';
import {useFocusEffect, useNavigation} from '@react-navigation/core';
import {Button, List, Headline, Appbar} from 'react-native-paper';
import {AppContext} from '../../context/AppContext';

const verAveriasAdmin = ({}) => {
  const [averias, setAverias] = useState([]);
  const navigation = useNavigation();
  const {user} = useContext(AppContext);
  console.log(user);
  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        try {
          const resultados = await ClientAxios.post(
            'complementos/listadoaveria',
            {key: '416063c3d13d79e6e99a702fcd9cea10', data: {idUser: user.ID}},
          );
          setAverias(resultados.data);
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
        <Appbar.Content title="Averias" />
      </Appbar.Header>
      <View style={globalStyles.contenedor}>
        <FlatList
          data={averias}
          keyExtractor={averias => averias.idUser.toString()}
          renderItem={({item}) => (
            <List.Item
              title={item.nombrerent + ' - ' + item.nombreCar}
              description={item.descripcion}
              onPress={() => navigation.navigate('detalleAveria', {item})}
            />
          )}
        />
      </View>
    </>
  );
};

export default verAveriasAdmin;
