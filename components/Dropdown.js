
import { Provider, TextInput, DefaultTheme } from 'react-native-paper';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Background from '../components/Background'
import DropDown from 'react-native-paper-dropdown';
import { colors } from 'react-native-elements';
const Dropdown=  ({list})=> {
    const [showDropDown, setShowDropDown] = useState(false);
    const [gender, setGender] = useState('');
   

    const theme = {
        ...DefaultTheme,
        roundness: 2,
        colors: {
            ...DefaultTheme.colors,
            primary: '#3498db',
            accent: '#f1c40f',
           

        },
        fonts:{
            thin: {
                fontFamily: 'sans-serif-thin',
                fontWeight: 'normal',
              },
        }
       
    };

    return (
        <Provider theme={theme}>
        <SafeAreaView style={styles.containerStyle}>
            <DropDown
                label={'Gender'}
                    mode={'outlined'}
                    value={gender}
                    setValue={setGender}
                    list={list}
                    visible={showDropDown}
                    showDropDown={() => setShowDropDown(true)}
                    onDismiss={() => setShowDropDown(false)}
                    inputProps={{
                        right: <TextInput.Icon name={'menu-down'} />,
                    }}theme={theme}
                >

                </DropDown>
            </SafeAreaView>
        </Provider>
    );
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        marginHorizontal: 20,
        justifyContent: 'center',
        
    },
});

export default Dropdown;