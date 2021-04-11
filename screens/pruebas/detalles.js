import axios from 'axios';
import React, { Fragment } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Headline, Text, Subheading, Button ,FAB } from 'react-native-paper';
import globalStyle from '../../Styles/global';

const Detalle = ({navigation, route }) => {
	const { item, setConsultar  } = route.params;

	const mostrarConfirmacion = () => {
		Alert.alert('Deseas eliminar este cliente?', 'Un contacto eliminado no se puede recuperar', [
			{
				text: 'Si eliminar',
            onPress: () => eliminarContacto ()
			},
			{
				text: 'Cancelar',
				style: 'cancel'
			}
		]);
	};

   const eliminarContacto = async () => {
      const url = `http://localhost:3005/clientes/${item.id}`;
      try {
         await axios.delete(url);
      } catch (error) {
         console.log(error)
      }

      //Redicreccion
      navigation.navigate('Inicio')

      // Consultar API 
      setConsultar(true)

   }

	return (
		<View>
			<Headline style={globalStyle.titulo}>{item.entrada}</Headline>
			<Text style={styles.texto}>
				<Subheading>Empresa: {item.combo1}</Subheading>
			</Text>
			<Text style={styles.texto}>
				<Subheading>Correo: {item.combo2}</Subheading>
			</Text>
			<Text style={styles.texto}>
				<Subheading>Telefono: {item.fecha}</Subheading>
			</Text>
			<Button style={styles.boton} mode="contained" icon="cancel" onPress={() => eliminarContacto()}>
				Eliminar 
			</Button>
         <FAB
         icon="pencil"
          style={globalStyle.fab}
          onPress={() => navigation.navigate('formPrueba', {datos: route.params.item, setConsultar})}

         />
		</View>
	);
};

const styles = StyleSheet.create({
	texto: {
		marginBottom: 20,
		fontSize: 18
	},
	boton: {
		marginTop: 100,
		backgroundColor: 'red'
	}
});

export default Detalle;