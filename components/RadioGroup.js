import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';

const Radiogroup = () => {
  const [value, setValue] = React.useState('cliente');

  return (
    <View style={{ flexDirection: 'row' }}>
      <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value} >
        <View style={styles.row}>
          <RadioButton value="administrador" />
          <Text style={{marginTop: 8}}>Administrador</Text>
          <View style={{ marginLeft: 8 }} />
          <RadioButton value="cliente" />
          <Text style={{marginTop: 8}}>Cliente</Text>
        </View>
      </RadioButton.Group>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
    marginHorizontal: '5%'
  }


});

export default Radiogroup;