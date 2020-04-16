import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { KeyboardAvoidingView, Platform, Text, TouchableOpacity, TextInput, StyleSheet, View } from 'react-native';

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
            const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
            console.log(response);
            
            navigation.navigate('Login');

        }catch(error) {
            setError(true);
        }

    }

    function backButton() {
        setEmail('');
        setPassword('');
        setError(false);
        navigation.navigate('Login');
    }

    return(
        <KeyboardAvoidingView 
            style={styles.container}
            behavior="padding"
            enabled={Platform.OS === 'ios'}
        >
            <TouchableOpacity style={styles.backButton} onPress={backButton}>
                <Text style={styles.backButtonText}>Voltar</Text>
            </TouchableOpacity>

            <View style={styles.header}>
                <Text style={styles.headerTitle}>Cadastre-se</Text>
                <Text style={styles.headerDescription}>Crie sua conta e tenha acesso as informações sobre o clima de sua região.</Text>
            </View> 
            
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

            <TouchableOpacity style={styles.botton} onPress={submit}>
                <Text style={styles.textButton}>Entrar</Text>
            </TouchableOpacity>

            {error ? <Text style={styles.authenticated} >Email ou senha inválido.</Text> : null }
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
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
    },
    backButtonText: {
        fontSize: 20,
    },
    header: {
        width: '100%',
        padding: 10,
        justifyContent: "center",
        alignItems: 'center',
    },  
    headerTitle: {
      color: 'gray',
      fontSize: 24,
    },
    headerDescription: {
        color: 'gray',
        textAlign: 'center'
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
        backgroundColor: 'red',
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
        backgroundColor: 'red',
        color: 'white',
        margin: 10,
        padding: 10,
        borderRadius: 5,
    }
  });