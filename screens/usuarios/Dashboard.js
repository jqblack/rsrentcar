import React, {useContext} from 'react';
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import Paragraph from '../../components/Paragraph';
import Button from '../../components/Button';
import {AppContext} from '../../context/AppContext';
import {useNavigation} from '@react-navigation/core';

export default function Dashboard({}) {
  const {user, setUser} = useContext(AppContext);
  const navigation = useNavigation();
  return (
    <Background>
      <Logo />
      <Header>Let’s start</Header>
      <Paragraph>
        Your amazing app starts here. Open you favorite code editor and start
        editing this project.
      </Paragraph>
      <Button
        mode="outlined"
        onPress={() => {
          setUser({nombre: 'pepito', ID_tipoUsuario: 2, ID: 2});
          navigation.navigate('LoginScreen');
        }}>
        Logout
      </Button>
    </Background>
  );
}
