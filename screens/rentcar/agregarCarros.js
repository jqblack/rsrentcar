import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {TextInput, Button, Appbar} from 'react-native-paper';
import globalStyles from '../../Styles/global';
import ClientAxios from '../../helpers/clientAxios';
import DropDown from 'react-native-paper-dropdown';
const listaTipo = [
  {label: 'VIP', value: '1'},
  {label: 'Normal', value: '2'},
];
const listaColor = [
  {label: 'Negro', value: '1'},
  {label: 'Rojo', value: '2'},
  {label: 'Blanco', value: '3'},
  {label: 'Azul', value: '4'},
  {label: 'Verde', value: '5'},
  {label: 'Amarillo', value: '6'},
  {label: 'Naranja', value: '7'},
  {label: 'Morado', value: '8'},
];
const listaMarca = [
  {label: 'Toyota', value: '1'},
  {label: 'Ford', value: '2'},
  {label: 'Honda', value: '3'},
  {label: 'Mercedes Benz', value: '4'},
  {label: 'KIA', value: '5'},
  {label: 'Hyundai', value: '6'},
  {label: 'Buggatti', value: '7'},
];
const listaCate = [
  {label: 'Carro', value: '1'},
  {label: 'Jeepeta', value: '2'},
  {label: 'Deportivo', value: '3'},
  {label: 'Camioneta', value: '4'},
];
const listaScore = [
  {label: '1', value: '1'},
  {label: '2', value: '2'},
  {label: '3', value: '3'},
  {label: '4', value: '4'},
  {label: '5', value: '5'},
  {label: '6', value: '6'},
  {label: '7', value: '7'},
  {label: '8', value: '8'},
  {label: '9', value: '9'},
  {label: '10', value: '10'},
];

const NuevoCarro = ({navigation, route}) => {
  const [matri, setMatri] = useState('');
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('');
  const [mostrarTipos, setMostrarTipo] = useState(false);
  const [color, setColor] = useState('');
  const [mostrarColor, setMostrarColor] = useState(false);
  const [marca, setMarca] = useState('');
  const [mostrarMarca, setMostrarMarca] = useState(false);
  const [cate, setCate] = useState('');
  const [mostrarCate, setMostrarCate] = useState(false);
  const [precio, setPrecio] = useState('');
  const [score, setScore] = useState('');
  const [mostrarScore, setMostrarScore] = useState(false);

  const gruardarCarro = async () => {
    //validar form

    //verificar si es modificar o crear una torre
    console.log(route.params.ID);
    //crear o modificar
    const carros = {
      matri,
      nombre,
      tipo: Number(tipo),
      idColor: Number(color),
      idMarca: Number(marca),
      idCate: Number(cate),
      precio: Number(precio),
      idRent: Number(route.params.ID),
      score: Number(score),
    };

    //insert
    try {
      const res = await ClientAxios.post('car/insert', {
        key: '416063c3d13d79e6e99a702fcd9cea10',
        data: carros,
      });
      if (res.data.key === '1') {
        // alert('Se completó');
        navigation.navigate('verCarros');
      } else {
        throw Error('No se ha podido completar');
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }

    console.log(carros);

    //limpiar form
    //redireccionar
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Title" subtitle="Subtitle" />
      </Appbar.Header>
      <ScrollView style={{...globalStyles.contenedor, paddingBottom: 20}}>
        <TextInput
          label="Matricula"
          placeholder="A12234"
          style={globalStyles.inputs}
          onChangeText={texto => setMatri(texto)}
          value={matri}
        />
        <TextInput
          label="Nombre"
          placeholder="Residencia"
          style={globalStyles.inputs}
          onChangeText={texto => setNombre(texto)}
          value={nombre}
        />
        <View style={globalStyles.inputs}>
          <DropDown
            label={'Tipo de vehiculo'}
            mode="outlined"
            value={tipo}
            list={listaTipo}
            setValue={setTipo}
            visible={mostrarTipos}
            showDropDown={() => setMostrarTipo(true)}
            onDismiss={() => setMostrarTipo(false)}
            inputProps={{
              right: <TextInput.Icon name={'menu-down'} />,
            }}
          />
        </View>

        <View style={globalStyles.inputs}>
          <DropDown
            label={'Color de vehiculo'}
            mode="outlined"
            value={color}
            list={listaColor}
            setValue={setColor}
            visible={mostrarColor}
            showDropDown={() => setMostrarColor(true)}
            onDismiss={() => setMostrarColor(false)}
            inputProps={{
              right: <TextInput.Icon name={'menu-down'} />,
            }}
          />
        </View>

        <View style={globalStyles.inputs}>
          <DropDown
            label={'Marca de vehiculo'}
            mode="outlined"
            value={marca}
            list={listaMarca}
            setValue={setMarca}
            visible={mostrarMarca}
            showDropDown={() => setMostrarMarca(true)}
            onDismiss={() => setMostrarMarca(false)}
            inputProps={{
              right: <TextInput.Icon name={'menu-down'} />,
            }}
          />
        </View>

        <View style={globalStyles.inputs}>
          <DropDown
            label={'Categoria de vehiculo'}
            mode="outlined"
            value={cate}
            list={listaCate}
            setValue={setCate}
            visible={mostrarCate}
            showDropDown={() => setMostrarCate(true)}
            onDismiss={() => setMostrarCate(false)}
            inputProps={{
              right: <TextInput.Icon name={'menu-down'} />,
            }}
          />
        </View>

        <View style={globalStyles.inputs}>
          <DropDown
            label={'Score Maximo de vehiculo'}
            mode="outlined"
            value={score}
            list={listaScore}
            setValue={setScore}
            visible={mostrarScore}
            showDropDown={() => setMostrarScore(true)}
            onDismiss={() => setMostrarScore(false)}
            inputProps={{
              right: <TextInput.Icon name={'menu-down'} />,
            }}
          />
        </View>

        <TextInput
          label="Precio Alquiler"
          placeholder="1500"
          style={globalStyles.inputs}
          onChangeText={texto => setPrecio(texto)}
          value={precio}
          keyboardType="numeric"
        />

        <Button onPress={() => gruardarCarro()}>Crear carros</Button>
      </ScrollView>
    </>
  );
};

export default NuevoCarro;
