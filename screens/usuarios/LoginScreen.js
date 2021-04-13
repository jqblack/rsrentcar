import React, { useContext, useState } from 'react';
import { TouchableOpacity, StyleSheet, View, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import BackButton from '../../components/BackButton';
import { theme } from '../../core/theme';
import { UserValidator } from '../../helpers/userValidator';
import { passwordValidator } from '../../helpers/passwordValidator';
import ClientAxios from '../../helpers/clientAxios'
import { AppContext } from '../../context/AppContext';

export default function LoginScreen({ navigation }) {
  // const navigation = useNavigation()
  const { user, setUser } = useContext(AppContext);
  const [usuario, setUsuario] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });


  const getUser = async () => {
    try {
      const resultados = await ClientAxios.post('login/verificar', {
        key: '416063c3d13d79e6e99a702fcd9cea10',
        data: {
          user: usuario.value,
          pass: password.value,
        },
      });
      setUser(resultados.data);
      console.log(resultados.data);
      return resultados.data;
    } catch (error) {
      console.log(error);
    }
  }


  const onLoginPressed = async () => {
    
    const userError=UserValidator(usuario.value)
    const passwordError = passwordValidator(password.value);
    if (userError||passwordError) {
      setUsuario({ ...usuario, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
 //validar en api
 const datos = await getUser();
    if( Object.keys(datos).length === 0){
      setUsuario({...usuario, error:'El usuario o la contrasena no son correctos'})
      console.log('aqui llego')
    return;
    }
    console.log('no entro en el if')
   
    navigation.navigate('DashBoard');

  };



  return (
    <ScrollView>
      <Background>
        {/* <BackButton goBack={navigation.goBack} /> */}
        <Logo />
        <Header>RS Rentcar</Header>
        <TextInput
          label="Usuario"
          returnKeyType="next"
          value={usuario.value}
          onChangeText={text => setUsuario({ value: text, error: '' })}
          error={!!usuario.error}
          errorText={usuario.error}
          autoCapitalize="none"
          
          
         
        />
        <TextInput
          label="Password"
          returnKeyType="done"
          value={password.value}
          onChangeText={text => setPassword({ value: text, error: '' })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />
        <View style={styles.forgotPassword}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ResetPasswordScreen')}>
            <Text style={styles.forgot}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>
        <Button mode="contained" onPress={onLoginPressed}>
          Login
        </Button>

        <View style={styles.row}>
          <Text>Don’t have an account? </Text>
          <TouchableOpacity
            onPress={() => navigation.replace('RegistroUsuario')}>
            <Text style={styles.link}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </Background>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});
