import React, {useState, useContext} from 'react';
import {ToastAndroid, View, StyleSheet} from 'react-native';
import {
  TextInput,
  Button,
  Headline,
  Appbar,
  Modal,
  Portal,
  Text,
  Paragraph, Dialog
} from 'react-native-paper';
import globalStyles from '../../Styles/global';
import {useFocusEffect} from '@react-navigation/core';
import ClientAxios from '../../helpers/clientAxios';
import DropDown from 'react-native-paper-dropdown';
import {useNavigation} from '@react-navigation/core';
import {AppContext} from '../../context/AppContext';
const nuevaAveria = ({route}) => {
  const navigation = useNavigation();
  const [descripcion, setDescripcion] = useState('');
  const [carros, setCarros] = useState(0);
  const [verCarros, setVerCarros] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const [visible1, setVisible1] = React.useState(false);
  const [car, setCar] = useState({});
  const [carsRent, setCarsRent] = useState({});
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const showDialog = () => setVisible1(true);

  const hideDialog = () => setVisible1(false);

  const {user} = useContext(AppContext);
  useFocusEffect(
    React.useCallback(() => {
      // console.log(route)

      const getData = async () => {
        try {
          const resultados = await ClientAxios.post(
            'complementos/listamiscarros',
            {
              key: '416063c3d13d79e6e99a702fcd9cea10',
              data: {idUser: user.ID},
            },
          );
          setCarsRent(resultados.data);
          console.log(resultados.data)
         
          if (carsRent.cantidad > 1) {
            showModal();
          } else if (carsRent.cantidad < 1) {
              alert('te falta calle')
          } else {
            setCarros(carsRent.listaDrop[0].value);
          }
        } catch (error) {
          console.log(error);
        }
      };
      getData();

      return () => {
        console.log('on cleanup');
      };
    }, []),
  );

  const guardarAveria = async () => {
    //validar form
    if (descripcion === '') {
      alert('Revise los campos');
      return;
    }
    //verificar si es modificar o crear una torre

    //crear o modificar
    const averia = {
      idCar:carros ,
      descri: descripcion,
      idRent: 3,
      idUser: user.ID,
    };

    //insert
    try {
      const res = await ClientAxios.post('complementos/insertAveria', {
        key: '416063c3d13d79e6e99a702fcd9cea10',
        data: averia,
      });
      if (res.data.key === '1') {
        console.log(res.data);
        ToastAndroid.show('Se completó la avería. !', ToastAndroid.SHORT);
        navigation.goBack();
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
          mode="outlined"
          multiline
          numberOfLines={10}
          placeholder="Descripcion del problema"
          style={globalStyles.inputs}
          onChangeText={texto => setDescripcion(texto)}
          value={descripcion}
        />
        <Button onPress={() => guardarAveria()}>Reportar Averia</Button>

        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={{
              backgroundColor: 'white',
              paddingVertical: 100,
              paddingHorizontal: 10,
            }}
            style={{
              paddingHorizontal: 10,
            }}>
            <View>
              <Text style={{marginBottom: 10, fontWeight: 'bold'}}>
                Selecione su modo de inicio
              </Text>
              <DropDown
                label={'Selecciona su modo de'}
                mode="outlined"
                value={carros}
                setValue={e => {
                  setCarros(e);
                }}
                list={carsRent.listaDrop}
                visible={verCarros}
                showDropDown={() => setVerCarros(true)}
                onDismiss={() => setVerCarros(false)}
                inputProps={{
                  right: <TextInput.Icon name={'menu-down'} />,
                }}
              />
              <Button
                mode="contained"
                style={{marginTop: 10}}
                onPress={() => {
                 
                  hideModal();
                }}>
                Guardar
              </Button>
            </View>


          </Modal>


          <Dialog visible={visible1} onDismiss={hideDialog}>
          <Dialog.Title>No tiene Vehiculos rentados</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Rente algun vehiculo</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Done</Button>
          </Dialog.Actions>
        </Dialog>

        </Portal>
      </View>
    </>
  );
};



export default nuevaAveria;
