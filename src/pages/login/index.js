import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { KeyboardAvoidingView, Platform, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

import firebase from 'react-native-firebase';
import { connect } from 'react-redux';

import {
    addCity
} from '../../reducer/action';

function Login({ add, citys, navigation }) {

    const [email, setEmail] = useState('');   
    const [password, setPassword] = useState('');   
    const [error, setError] = useState(false);


    async function submit() {
        
        try {
            const response = await firebase.auth().signInWithEmailAndPassword(email, password);
            console.log(response.user);
            await AsyncStorage.setItem('user', JSON.stringify(response.user));
            
            navigation.navigate('Cidade');

        }catch(error) {
            setError(true);
        }

    }

    function register() {
        setEmail('');
        setPassword('');
        setError(false);
        navigation.navigate('Register');
    }

    return(
        <KeyboardAvoidingView 
            style={styles.container}
            behavior="padding"
            enabled={Platform.OS === 'ios'}
        >
            <TextInput 
                placeholder = "Email"
                placeholderTextColor = "#999"
                value={email}
                onChangeText={setEmail}
                style={styles.inputUser}/>

            <TextInput 
                placeholder = "Senha"
                placeholderTextColor = "#999"
                value={password}
                onChangeText={setPassword}
                style={styles.inputUser}/>

            <TouchableOpacity style={styles.button} onPress={submit}>
                <Text style={styles.textButton}>Entrar</Text>
            </TouchableOpacity>

            {error ? <Text style={styles.authenticated} >Email ou senha inválido.</Text> : null }

            <TouchableOpacity style={styles.buttonRegister} onPress={register}>
                <Text style={styles.textButtonRegister}>Cadastre-se</Text>
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
    button: {
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
    },
    authenticated: {
        color: 'red',
        margin: 10,
        padding: 10,
        borderRadius: 5,
    },
    buttonRegister: {
        backgroundColor: '#ddd',
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 5,
    },
    textButtonRegister: {
        color: 'black',
        padding: 10,
        fontSize: 18,
    }
  });