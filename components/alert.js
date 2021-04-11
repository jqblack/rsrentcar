import React, { useState } from 'react';
import {Button, Paragraph, Dialog, Portal} from 'react-native-paper';

const Alert =({titulo, parrafo, state})=>{
const [alerta1,setAlerta1] =useState(state)

    return( 
         <Portal>
        <Dialog
          visible={alerta1}
          onDismiss={() => setAlerta1(false)}
        >
          <Dialog.Title>{titulo}</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{parrafo}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setAlerta1(false)}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>);    
}

export default Alert;