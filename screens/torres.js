import React, {useState} from 'react';
import {View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import globalStyles from '../Styles/global';
import ClientAxios from '../helpers/clientAxios'

const nuevaTorre = ({navigation,route}) => {
  const [nombre, setNombre] = useState('');
  const [cantidadPisos, setCantidad] = useState('');

  const guardarTorre = async () => {
    //validar form
    if (
      nombre === '' ||
      isNaN(cantidadPisos)
    ) {
      alert('Revise los campos');
      return;
    }
    //verificar si es modificar o crear una torre

    //crear o modificar
    const torres = {
      nombre,
      idresidencial:Number(route.params),
      niveles: Number(cantidadPisos),
    };
    
    //insert
    try {
      const res = await ClientAxios.post('torre/insert', {
        key: '291290336b75b259b77e181c87cc974f',
        data: torres,
      });
      if (res.data.key === '1') {
        // alert('Se completó');
        navigation.navigate('verTorres');
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
    <View style={globalStyles.contenedor}>
      <TextInput
        label="Nombre de la torre"
        placeholder="Residencia"
        style={globalStyles.inputs}
        onChangeText={texto => setNombre(texto)}
        value={nombre}
      />
      <TextInput
        label="Cantidad de pisos"
        placeholder="Residencia"
        style={globalStyles.inputs}
        onChangeText={texto => setCantidad(texto)}
        value={cantidadPisos}
        keyboardType="numeric"
      />
      <Button onPress={() => guardarTorre()}>Crear</Button>
    </View>
  );
};

export default nuevaTorre;
