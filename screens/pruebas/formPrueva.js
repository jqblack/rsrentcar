import React, { useState, useEffect } from 'react';
import { Text, TextInput, DefaultTheme, Button, } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
// import Datapiker from '../../components/Datapiker'
import DropDown from 'react-native-paper-dropdown';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from 'axios';
//import Button from '../../components/Button';
let list = [{ label: 'klk1', value: 1 }, { label: 'klk2', value: 2 }, { label: 'klk3', value: 3 }]
const nuevoRegistro = ({ navigation, route }) => {
  // state
  const [entrada, setEntrada] = useState('');
  const [combo1, setCombo1] = useState('');
  const [mostrar1, setMostrar1] = useState(false);
  const [combo2, setCombo2] = useState('');
  const [mostrar2, setMostrar2] = useState(false);
  const [fecha, setFecha] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  //useEfecte
  console.log(route.params);
  useEffect(() => {
    if (route.params.datos) {
      const { datos } = route.params;
      setEntrada(datos.entrada);
      setCombo1(datos.combo1);
      setCombo2(datos.combo2);
      setFecha(datos.fecha);
    }
  }, []);

  const { setConsultar } = route.params;

  //para cambiar el estado de una fecha
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const formatofecha = (date) => {
    const options = { year: 'numeric', month: 'long', day: '2-digit' }
    const nuevafecha = new Date(date);
    return nuevafecha.toLocaleDateString('es-ES', options);
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {

    setFecha(formatofecha(date));
    hideDatePicker();
  };

  //insert
  const guardar = async () => {
    const datos = { entrada, combo1, combo2, fecha }
    //si estamos editando o creando un nuevo resgistro
    if (route.params.datos) {
      const { id } = route.params.datos;
      datos.id = id;
      const url = `http://localhost:3000/datos/${id}`
      try {
        await axios.put(url, datos);
      } catch (error) {
        console.log(error)
      }
    } else {
      //creando un nuevo registro
      try {
        await axios.post('http://localhost:3000/datos', { key: '291290336b75b259b77e181c87cc974f', data: datos });
      } catch (error) {
        console.log(error)
      }
    }

    setEntrada('');
    setCombo1('');
    setCombo2('');
    setFecha('');
    //cambiar a true para traer los nuevos datos
   
    navigation.navigate('Inicio')
    console.log(datos);
    setConsultar(true);
  }
  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: '#3498db',
      accent: '#f1c40f',

    },
    fonts: {
      thin: {
        fontFamily: 'sans-serif-thin',
        fontWeight: 'normal',
      },
    }

  };
  return (
    <>
      <View>
        <Text style={styles.inputs}>ver registros</Text>
        <TextInput
          label='Area'
          placeholder='m^2'
          style={styles.inputs}
          onChangeText={texto => setEntrada(texto)}
          value={entrada}
        />
        <View style={styles.inputs}>
          <DropDown
            label={'Región'}
            mode='outlined'
            value={combo1}
            setValue={setCombo1}
            list={list}
            visible={mostrar1}
            showDropDown={() => setMostrar1(true)}
            onDismiss={() => setMostrar1(false)}
            inputProps={{
              right: <TextInput.Icon name={'menu-down'} />,

            }} theme={theme}
          />
        </View>

        <View style={styles.inputs}>
          <DropDown
            label={'Región'}
            mode='outlined'
            value={combo2}
            setValue={setCombo2}
            list={list}
            visible={mostrar2}
            showDropDown={() => setMostrar2(true)}
            onDismiss={() => setMostrar2(false)}
            inputProps={{
              right: <TextInput.Icon name={'menu-down'} />,

            }} theme={theme}
          />
        </View>
        <View>
          <Text style={styles.label}>fecha </Text>
          <Button mode="contained" onPress={showDatePicker} >Selecciona una fecha</Button>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            locale='es_ES'

          />
          <Text>{fecha}</Text>

          <Button icon='pencil-circle' mode='contained' onPress={
            () => guardar()
          } style={{ marginBottom: 15 }}>Guardar</Button>

        </View>




      </View>
    </>
  );

}

const styles = StyleSheet.create({
  inputs: {
    marginBottom: 20,
    backgroundColor: 'transparent'
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
  },


})

export default nuevoRegistro;