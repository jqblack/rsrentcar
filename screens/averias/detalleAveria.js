import React, {useState} from 'react';
import {View} from 'react-native';
import {TextInput, Button,Headline,Appbar,Card,Title, Paragraph} from 'react-native-paper';
import globalStyles from '../../Styles/global';
import ClientAxios from '../../helpers/clientAxios'

const DetalleAveria = ({navigation,route}) => {
  const [averia, setAveria] = useState({});
    setAveria(route.params);
  const completado = async () => {
    
    try {
      const res = await ClientAxios.post('complementos/insertAveria', {
        key: '416063c3d13d79e6e99a702fcd9cea10',
        data: {idadv:averia.ID},
      });
      if (res.data.key === '1') {
          
        console.log(res.data)
        
      } else {
        throw Error('No se ha podido completar');
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
    
    navigation.navigate('verAverias')
    //limpiar form
    //redireccionar
  };

  return (
      <>
       <Appbar.Header>
        
        <Appbar.Content title="Reporte de averías" />
      </Appbar.Header>
    <View style={globalStyles.contenedor}>
        <Card>
          <Card.Content>
            <Title>{averia.nombrerent+' - '+averia.nombreCar}</Title>
            <Paragraph>Descripcion: ${averia.descripcion}</Paragraph>
          </Card.Content>
          
          <Card.Actions>
            <Button onPress={() => completado()}>Completado</Button>
         
          </Card.Actions>
        </Card>
      
      
    </View>
    </>
  );
};

export default DetalleAveria;
