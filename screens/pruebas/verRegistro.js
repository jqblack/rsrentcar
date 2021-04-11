import React, { useEffect, useState } from 'react';
import { Text, Button, List, Headline, FAB } from 'react-native-paper';
import { FlatList, View,StyleSheet } from 'react-native';
import axios from 'axios';
import globalStyles from '../../Styles/global';

const verRegistro = ({navigation}) => {
    const [datos, setDatos] = useState([]);
    const [consultar, setConsultar] = useState(true)
    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const resultados = await axios.get('http://localhost:3000/datos');
                setDatos(resultados.data);
                setConsultar(false);
            } catch (error) {
                console.log(error);
            }
        }
        if (consultar) {
            obtenerDatos();
        }


    }, [consultar]);


    return (
        <>
            <View style={globalStyles.contenedor}>
                <Button icon="plus-circle" onPress={()=>navigation.navigate("formPrueba",{setConsultar})}>
                    Nuevo dato
                </Button>

                <Headline style={globalStyles.titulo}>{datos.length > 0 ? 'Datos' : 'No hay datos'}</Headline>

                <FlatList
                    data={datos}
                    keyExtractor={datos => (datos.id).toString()}
                    renderItem={({ item }) => (
                        <List.Item
                            title={item.entrada}
                            description={item.combo1}
                            onPress={()=>navigation.navigate('detalles',{item})}
                        />
                    )}
                />

                <FAB
                 icon='plus'
                 style={styles.fab}
                 onPress={()=>navigation.navigate("formPrueba",{setConsultar})}
                />
            </View>
        </>
    );

}
const styles=StyleSheet.create({
    fab:{
        position:'absolute',
        margin:20,
        right:0,
        bottom:20
    }
})

export default verRegistro;