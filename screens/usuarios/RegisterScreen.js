import { useState } from 'react';
import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { RadioButton, Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import ReadMeExampleSingle from '../components/Datapiker'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { nameValidator } from '../helpers/nameValidator'


const Registro = () => {

  const [name, setName] = useState({ value: '', error: '' })
  const [apellido, setApellido] = useState({ value: '', error: '' })
  const [nameuser, setNameUser] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [numCuenta, setNumCuenta] = useState({ value: '', error: '' })
  const [rol, setValue] = React.useState('cliente');

  let dif = !rol; 
  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    })
  }


  return (
    <>
      <ScrollView>
        <Background>
          <BackButton />
          <Logo />
          <Header>Create Account</Header>

          <RadioButton.Group onValueChange={newRol => setValue(newRol)} value={rol} >
            <View style={styles.row}>
              <RadioButton value="administrador" />
              <Text style={{ marginTop: 8 }}>Administrador</Text>
              <View style={{ marginLeft: 8 }} />
              <RadioButton value="cliente" />
              <Text style={{ marginTop: 8 }}>Cliente</Text>
            </View>
          </RadioButton.Group>


          <TextInput
            label="Nombre"
            returnKeyType="next"
            value={nameuser.value}
            onChangeText={(text) => setName({ value: text, error: '' })}
            error={!!name.error}
            errorText={name.error}
          />


          <TextInput
            label="Apellido"
            returnKeyType="next"
            value={apellido.value}
            onChangeText={(text) => setApellido({ value: text, error: '' })}
            error={!!name.error}
            errorText={name.error}
          />

          <ReadMeExampleSingle />


          <TextInput
            label="Nombre de usuario"
            returnKeyType="next"
            value={name.value}
            onChangeText={(text) => setNameUser({ value: text, error: '' })}
            error={!!name.error}
            errorText={name.error}
          />
          <TextInput
            label="Email"
            returnKeyType="next"
            value={email.value}
            onChangeText={(text) => setEmail({ value: text, error: '' })}
            error={!!email.error}
            errorText={email.error}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
          />
          <TextInput
            label="Contraseña"
            returnKeyType="done"
            value={password.value}
            onChangeText={(text) => setPassword({ value: text, error: '' })}
            error={!!password.error}
            errorText={password.error}
            secureTextEntry
          />

          {
            rol === 'cliente' ?
              <View></View>: <TextInput
                label="Numero de cuenta"
                returnKeyType="next"
                keyboardType='numeric'
                clearButtonMode="always"
                value={numCuenta.value}
                onChangeText={(text) => setNumCuenta({ value: text, error: '' })}
                error={!!name.error}
                errorText={name.error}
              />

          }

          <Button
            mode="contained"
            onPress={onSignUpPressed}
            style={{ marginTop: 24 }}
          >
            Sign Up
      </Button>
          <View style={styles.row}>
            <Text>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.replace('Login')}>
              <Text style={styles.link}>Login</Text>
            </TouchableOpacity>
          </View>
        </Background>
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
