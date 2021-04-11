import React from 'react';
import {Appbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

export default function ScreenHeader(props) {
  const navigation = useNavigation();
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={props.title} />
      </Appbar.Header>
      {props.children}
    </>
  );
}
