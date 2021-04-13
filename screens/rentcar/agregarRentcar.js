import React, { useState, useEffect,useContext } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
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
import globalStyles from '../../Styles/global';
import DropDown from 'react-native-paper-dropdown';
import ClientAxios from '../../helpers/clientAxios';
import {AppContext} from '../../context/AppContext';
import ScreenHeader from '../../components/ScreenHeader';
let provincias = [
    { label: 'santiago', value: '1' },
    { label: 'samana', value: '2' },
    { label: 'punta cana', value: '3' },
    { label: 'puerto plata', value: '4' },
    { label: 'mao', value: '5' },
];
let listamunicipios = [
    { label: 'janico', value: '1' },
    { label: 'sabana iglesias', value: '2' },
    { label: 'sajoma', value: '3' },
    { label: 'tamboril', value: '4' },
    { label: 'villagonzales', value: '5' },
];
let listasectores = [
    { label: 'las palomas', value: '1' },
    { label: 'atomayor', value: '2' },
    { label: 'los jardines', value: '3' },
    { label: 'el embrujo I', value: '4' },
    { label: 'La trinitaria', value: '5' },
];
let list = [];

const NuevaRentcar = ({ navigation, route }) => {

    //context del usuario
    const {user} = useContext(AppContext);

    //estados
    const [nombre, setNombre] = useState('');
  
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
  



    const gardarRentcar = async () => {
        //validar
        if (
            nombre === '' ||
            // area === '' ||
            provincia === '' ||
            municipio === '' ||
            sector === '' 
        ) {
            alert('Revise los campos');
            return;
        }
        //enviar datos a la api
        const rentcar = {
            nom: nombre,
            numpro: Number(provincia),
            nummuni: Number(municipio),
            numsec: Number(sector),
            iduser:user.ID,
        };
        // Consulta
        try {
            const res = await ClientAxios.post('rentcar/insert', {
                key: '416063c3d13d79e6e99a702fcd9cea10',
                data: rentcar,
            });
            if (res.data.key === '1') {
                // alert('Se completó');
                navigation.navigate('verRentcars');
            } else {
                throw Error('No se ha podido completar');
            }
        } catch (error) {
            console.log(error);
            alert(error);
        }


    };

    //Para dropdow Condicional
  

    return (
        <ScreenHeader title="Rentcars">
            <ScrollView>
                <KeyboardAvoidingView>
                    <View style={globalStyles.contenedor}>
                        <Headline style={globalStyles.titulo}></Headline>
                        <TextInput
                            label="Nombre de la rentcar"
                            placeholder="rentcar"
                            style={styles.inputs}
                            onChangeText={texto => setNombre(texto)}
                            value={nombre}
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
                            onPress={() => gardarRentcar()}
                            style={{ marginBottom: 15 }}>
                            Guardar rentcar
            </Button>

                        <Button
                            icon="pencil-circle"
                            mode="contained"
                            onPress={() => setAlerta1(true)}
                            style={{ marginBottom: 15 }}>
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

export default NuevaRentcar;
