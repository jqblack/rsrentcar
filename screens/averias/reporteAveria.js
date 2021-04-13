import React, {useState} from 'react';
import {View} from 'react-native';
import {TextInput, Button,Headline,Appbar} from 'react-native-paper';
import globalStyles from '../../Styles/global';
import ClientAxios from '../../helpers/clientAxios'

const nuevaTorre = ({navigation,route}) => {
  const [descripcion, setDescripcion] = useState('');
    const [car,setCar] =useState({})


  const guardarAveria = async () => {
    //validar form
    if (
      descripcion === '' 
    ) {
      alert('Revise los campos');
      return;
    }
    //verificar si es modificar o crear una torre

    //crear o modificar
    const averia = {
      idCar: 1,
      descri: descripcion,
      idRent:3,
      idUser:1
    };
    
    //insert
    try {
      const res = await ClientAxios.post('complementos/insertAveria', {
        key: '416063c3d13d79e6e99a702fcd9cea10',
        data: averia,
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
    
    //limpiar form
    //redireccionar
  };

  return (
      <>
       <Appbar.Header>
        
        <Appbar.Content title="Reporte de averías" />
      </Appbar.Header>
    <View style={globalStyles.contenedor}>

    <Headline style={globalStyles.titulo}>
          Reporte a: mercedes benz
        </Headline>

      <TextInput
        label="Descripcion del problema"
        placeholder=""
        style={globalStyles.inputs}
        onChangeText={texto => setDescripcion(texto)}
        value={descripcion}
      />
      <Button onPress={() => guardarAveria()}>Reportar Averia</Button>
    </View>
    </>
  );
};

export default nuevaTorre;
