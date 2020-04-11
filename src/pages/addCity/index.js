import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { KeyboardAvoidingView, Platform, Text, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native';

import { connect } from 'react-redux';

import {
    addCity
} from '../../reducer/action';

function Login({ add, citys, navigation }) {

    const [city, setCity] = useState('');   

    useEffect(() => {
        getState();
    }, []);


    async function getState() {
        let state = await AsyncStorage.getItem('state');
        state = JSON.parse(state);
        
        if(state.city) {
            state.city.map((city) =>{
                add(city);
                console.log('adicionei aqui');
            });
        }
    }

    async function adicionarCidade() {
        add(city);

        await AsyncStorage.setItem('state', JSON.stringify(citys));
        navigation.navigate('ListCity');
    }

    return(
        <KeyboardAvoidingView 
            style={styles.container}
            behavior="padding"
            enabled={Platform.OS === 'ios'}
        >
            <TextInput 
                placeholder = "Cidade"
                placeholderTextColor = "#999"
                value={city}
                onChangeText={setCity}
                style={styles.inputUser}/>

            <TouchableOpacity style={styles.botton} onPress={adicionarCidade}>
                <Text style={styles.textButton}>Entrar</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

const mapStateToProps = (state) => {
    return {
        citys: state.CityReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        add: (city) => dispatch(addCity(city))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
    container: {
      backgroundColor:'#fff',
      flex: 1,
      justifyContent: "center",
      alignItems: 'center',
      padding: 30,
    },
    logo: {
        width:200,
        height: 200,
    },  
    text: {
      color: '#fff',
      fontSize: 30,
    },
    inputUser: {
        height: 46,
        width: '100%',
        backgroundColor: '#fff',
        borderColor: '#ddd',
        borderWidth: 1.5,
        borderRadius: 5,
        paddingLeft: 15,
        marginTop: 15,
    },
    botton: {
        height: 46,
        width: '100%',
        backgroundColor: '#24bdc1',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 15,
    },
    textButton: {
        color: '#fff',
        fontSize: 18,
        fontWeight: "bold",
    }
  });