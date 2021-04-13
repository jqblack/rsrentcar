import { useState } from 'react';
import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { RadioButton, Text } from 'react-native-paper'
import Background from '../../components/Background'
import Logo from '../../components/Logo'
import ReadMeExampleSingle from '../../components/Datapiker'
import Header from '../../components/Header'
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'
import BackButton from '../../components/BackButton'
import { theme } from '../../core/theme'
import { emailValidator } from '../../helpers/emailValidator'
import { passwordValidator } from '../../helpers/passwordValidator'
import { nameValidator } from '../../helpers/nameValidator'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DropDown from 'react-native-paper-dropdown';
import ClientAxios from '../../helpers/clientAxios';
const list = [{ label: 'Administrador', value: '1' }, { label: 'Cliente', value: '2' }, { label: 'Empleado', value: '3' }]

const Registro = ({navigation}) => {

  const [name, setName] = useState({ value: '', error: '' })
  const [apellido, setApellido] = useState({ value: '', error: '' })
  const [nameuser, setNameUser] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [numCuenta, setNumCuenta] = useState({ value: '', error: '' })
  const [rol, setValue] = React.useState('cliente');
  const [fecha, setFecha] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [tipoCuenta, setTipoCuenta] = useState('');
  const [mostrarTipoCuenta, setMostrarTipoCuenta] = useState(false);

  //{funciones datapiker
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const formatofecha = (date) => {


    const getDateNacimiento = new Date(date);
    const getDay = getDateNacimiento.getDate();
    const getMonth = getDateNacimiento.getMonth() + 1;
    const getYear = getDateNacimiento.getFullYear();

    const res = getDay + '/' + getMonth + '/' + getYear;
    return res;
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {

    setFecha(formatofecha(date));
    hideDatePicker();
  };

  //}

  const onSignUpPressed = async () => {
    alert('Entro');
    //validacion
    // const nameError = nameValidator(name.value)
    // const emailError = emailValidator(email.value)
    // const passwordError = passwordValidator(password.value)
    // if (passwordError || nameError || fecha === '') {
    //   setName({ ...name, error: nameError })
    //   setEmail({ ...email, error: emailError })
    //   setPassword({ ...password, error: passwordError })
    //   return
    // }
    //usuario
    const usuario={
      nombre:name.value,
      apellido:apellido.value,
      fecha:fecha,
      user:nameuser.value,
      pass:password.value,
      tipo:tipoCuenta
    }
    //insertar
    try {
      const res = await ClientAxios.post('/login/logininsertuser', {
        key: '416063c3d13d79e6e99a702fcd9cea10',
        data: usuario
      });
      if (res.data.key === '1') {
        alert('Se completó');
        console.log(res.data)
        navigation.goBack();
      } else {
        throw Error('No se ha podido completar');
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }

    console.log(usuario)

    //

  }

//  {/* <RadioButton.Group onValueChange={newRol => setValue(newRol)} value={rol} >
//             <View style={styles.row}>
//               <RadioButton value="administrador" />
//               <Text style={{ marginTop: 8 }}>Administrador</Text>
//               <View style={{ marginLeft: 8 }} />
//               <RadioButton value="cliente" />
//               <Text style={{ marginTop: 8 }}>Cliente</Text>
//             </View>
//           </RadioButton.Group> */}
//               {/* <TextInput
//             label="Email"
//             returnKeyType="next"
//             value={email.value}
//             onChangeText={(text) => setEmail({ value: text, error: '' })}
//             error={!!email.error}
//             errorText={email.error}
//             autoCapitalize="none"
//             autoCompleteType="email"
//             textContentType="emailAddress"
//             keyboardType="email-address"
//           /> */} {/* <Background> */} {/* <ReadMeExampleSingle /> */}{/* </Background> */}

  return (
    <>
      <ScrollView>
      <View>
        <BackButton />
        <Logo />
        <Header>Create Account</Header>

       
        <TextInput
          label="Nombre"
          returnKeyType="next"
          value={name.value}
          onChangeText={(text) => setName({ value: text, error: '' })}
          error={!!name.error}
          errorText={name.error}
        />
        <TextInput
          label="Apellido"
          returnKeyType="next"
          value={apellido.value}
          onChangeText={(text) => setApellido({ value: text, error: '' })}
          error={!!apellido.error}
          errorText={apellido.error}
        />
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


        </View>


        <TextInput
          label="Nombre de usuario"
          returnKeyType="next"
          value={nameuser.value}
          onChangeText={(text) => setNameUser({ value: text, error: '' })}
          error={!!nameuser.error}
          errorText={nameuser.error}
        />
    
        <View style={styles.inputs}>
          <DropDown
            label={'Tipo de cuenta '}
            mode='outlined'
            value={tipoCuenta}
            setValue={setTipoCuenta}
            list={list}
            visible={mostrarTipoCuenta}
            showDropDown={() => setMostrarTipoCuenta(true)}
            onDismiss={() => setMostrarTipoCuenta(false)}
            inputProps={{
              right: <TextInput.Icon name={'menu-down'} />,

            }} theme={theme}
          />
        </View>

        <TextInput
          label="Contraseña"
          returnKeyType="done"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: '' })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />


        <Button
          mode="contained"
          onPress={onSignUpPressed}
          style={{ marginTop: 24 }}
        >
          Sign Up
      </Button>
        <View style={styles.row}>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },


});

export default Registro;
