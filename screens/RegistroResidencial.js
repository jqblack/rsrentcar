import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView, KeyboardAvoidingView} from 'react-native';
import {
  Text,
  TextInput,
  Headline,
  Button,
  Paragraph,
  Dialog,
  Portal,
  DefaultTheme,
} from 'react-native-paper';
import globalStyles from '../Styles/global';
import axios from 'axios';
import DropDown from 'react-native-paper-dropdown';
import ClientAxios from '../helpers/clientAxios';
import ScreenHeader from '../components/ScreenHeader';
let provincias = [
  {label: 'santiago', value: '1'},
  {label: 'samana', value: '2'},
  {label: 'punta cana', value: '3'},
  {label: 'puerto plata', value: '4'},
  {label: 'mao', value: '5'},
];
let listamunicipios = [
  {label: 'janico', value: '1'},
  {label: 'sabana iglesias', value: '2'},
  {label: 'sajoma', value: '3'},
  {label: 'tamboril', value: '4'},
  {label: 'villagonzales', value: '5'},
];
let listasectores = [
  {label: 'las palomas', value: '1'},
  {label: 'atomayor', value: '2'},
  {label: 'los jardines', value: '3'},
  {label: 'el embrujo I', value: '4'},
  {label: 'La trinitaria', value: '5'},
];
let list = [];

const NuevoResidencial = ({navigation, route}) => {
  //estados
  const [nombre, setNombre] = useState('');
  const [area, setArea] = useState('');
  // const [region, setRegion] = useState('');
  // const [mostrarRegion, setMostrarRegion] = useState(false);
  const [provincia, setProvincia] = useState('');
  const [mostrarProvinvia, setMostrarProvincia] = useState(false);
  const [municipio, setMunicipio] = useState('');

  const [mostrarMunicipio, setMostrarMunicipio] = useState(false);

  const [sector, setSector] = useState('');
  const [mostrarSector, setMostrarSector] = useState(false);
  const [alerta, setAlerta] = useState(false);
  const [alerta1, setAlerta1] = useState(false);
  //funciones

  //fetch
  useEffect(() => {
    const getdata = async () => {
      try {
        let response = await fetch(
          'http://25.31.135.148/API/complementos/get_provincias',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              key: '291290336b75b259b77e181c87cc974f',
              data: {},
            }),
          },
        );
        provincias = await response.json();
        return provincias;
      } catch (error) {
        console.error(error);
      }
    };
    // getdata();
  }, []);

  // const {setConsultar} = route.params;
  // const postdata = async () => {

  //   try {
  //     let response = await fetch(
  //       'http://10.0.0.12:8080/API/residencial/test_sending',
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Accept': 'application/json',
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify({ key: '291290336b75b259b77e181c87cc974f', data: { idprovincia: provincia } })
  //       }
  //     );

  //   } catch (error) {
  //     console.error(error);
  //   }

  //   console.log(provincia);
  // };

  const guardarResidencial = async () => {
    //validar
    if (
      nombre === '' ||
      // area === '' ||
      provincia === '' ||
      municipio === '' ||
      sector === '' ||
      isNaN(area)
    ) {
      alert('Revise los campos');
      return;
    }
    //enviar datos a la api
    const Residencial = {
      nombre,
      area: Number(area),
      provincia: Number(provincia),
      municipio: Number(municipio),
      sector: Number(sector),
    };
    // Consulta
    try {
      const res = await ClientAxios.post('residencial/insert', {
        key: '291290336b75b259b77e181c87cc974f',
        data: Residencial,
      });
      if (res.data.key === '1') {
        // alert('Se completó');
        navigation.navigate('verResidenciales');
      } else {
        throw Error('No se ha podido completar');
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }

    //limpiar form
    // setNombre('');
    // setArea('');
    // setProvincia('');
    // setMunicipio('');
    // setSector('');
    // //redireccionar a otra pantalla
    // navigation.navigate('verResidenciales');
    // setConsultar(true);
    // console.log(Residencial);
  };

  //Para dropdow Condicional
  const municipios = async provincia => {
    listamunicipios = await ClientAxios.post('complementos/get_municipio', {
      key: '291290336b75b259b77e181c87cc974f',
      data: {idprovincia: provincia},
    });
    // listamunicipios=await axios.post("http://10.0.0.12:8080/API/residencial/get_provincias",{ key: '291290336b75b259b77e181c87cc974f', data: { idprovincia: provincia } });
    setProvincia(provincia);
  };

  const sectores = async municipio => {
    listamunicipios = await ClientAxios.post('complementos/get_sector', {
      key: '291290336b75b259b77e181c87cc974f',
      data: {idprovincia: provincia},
    });
    // listasectores=await axios.post("http://10.0.0.12:8080/API/residencial/get_provincias",{ key: '291290336b75b259b77e181c87cc974f', data: { idprovincia: municipio } });
    setMunicipio(municipio);
  };

  return (
    <ScreenHeader title="Residencial">
      <ScrollView>
        <KeyboardAvoidingView>
          <View style={globalStyles.contenedor}>
            <Headline style={globalStyles.titulo}>Nuevo Residencial</Headline>
            <TextInput
              label="Nombre del residencial"
              placeholder="Residencia"
              style={styles.inputs}
              onChangeText={texto => setNombre(texto)}
              value={nombre}
            />

            <TextInput
              label="Area"
              placeholder="m^2"
              style={styles.inputs}
              onChangeText={texto => setArea(texto)}
              value={area}
              keyboardType="numeric"
            />
            <Text style={globalStyles.titulo}>Ubicación:</Text>

            <View style={styles.inputs}>
              <DropDown
                label={'provincia'}
                mode="outlined"
                value={provincia}
                list={provincias}
                setValue={setProvincia}
                visible={mostrarProvinvia}
                showDropDown={() => setMostrarProvincia(true)}
                onDismiss={() => setMostrarProvincia(false)}
                inputProps={{
                  right: <TextInput.Icon name={'menu-down'} />,
                }}
              />
            </View>

            <View style={styles.inputs}>
              <DropDown
                label="Municipios"
                mode="outlined"
                value={municipio}
                setValue={setMunicipio}
                list={listamunicipios}
                visible={mostrarMunicipio}
                showDropDown={() => setMostrarMunicipio(true)}
                onDismiss={() => setMostrarMunicipio(false)}
                inputProps={{
                  right: <TextInput.Icon name={'menu-down'} />,
                }}
              />
            </View>
            <View style={styles.inputs}>
              <DropDown
                label={'Sector'}
                mode="outlined"
                value={sector}
                setValue={setSector}
                list={listasectores}
                visible={mostrarSector}
                showDropDown={() => setMostrarSector(true)}
                onDismiss={() => setMostrarSector(false)}
                inputProps={{
                  right: <TextInput.Icon name={'menu-down'} />,
                }}
              />
            </View>

            <Button
              icon="pencil-circle"
              mode="contained"
              onPress={() => guardarResidencial()}
              style={{marginBottom: 15}}>
              Guardar residencial
            </Button>

            <Button
              icon="pencil-circle"
              mode="contained"
              onPress={() => setAlerta1(true)}
              style={{marginBottom: 15}}>
              enviar
            </Button>

            <Portal>
              <Dialog visible={alerta} onDismiss={() => setAlerta(false)}>
                <Dialog.Title>Error</Dialog.Title>
                <Dialog.Content>
                  <Paragraph>Todos los campos son requeridos</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={() => setAlerta(false)}>OK</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>

            <Portal>
              <Dialog visible={alerta1} onDismiss={() => setAlerta1(false)}>
                <Dialog.Title>Error</Dialog.Title>
                <Dialog.Content>
                  <Paragraph>Todo bien</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={() => setAlerta1(false)}>OK</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </ScreenHeader>
  );
};

const styles = StyleSheet.create({
  inputs: {
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
});

export default NuevoResidencial;
