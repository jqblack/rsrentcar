import React, { useState } from "react";
import { Text } from 'react-native-paper';
import { View,StyleSheet} from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Button from './Button'


function Datapiker() {
    const [fecha, guardarFecha] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
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

        guardarFecha(formatofecha(date));
        hideDatePicker();
    };

    const date = new Date();

    return (
        <>
            <View>
                <Text style={styles.label}>Fecha de nacimiento: </Text>
                <Button mode="contained" onPress={showDatePicker} >Selecciona una fecha</Button>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    locale='es_ES'
                />
                <Text>{fecha}</Text>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    formulario: {
        backgroundColor: '#FFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        

    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20,
    },
    ipmput: {
        marginTop: 10,
        height: 50,
        borderColor: '#e1e1e1',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    btnSubmit: {
        padding: 10,
        backgroundColor: '#7d024e',
        marginVertical: 10,
    },
    textoSubmit: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center',

    },
});


export default Datapiker;