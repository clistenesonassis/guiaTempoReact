import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View , Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView} from 'react-native';
import { ListItem } from 'react-native-elements';
import getClima from '../../api/api';

import {
    removeCity
} from '../../reducer/action';

import { connect } from 'react-redux';

const list = [
    {
        name: 'Amy Farha',
        subtitle: 'Optica Dinis'
    },
    {
        name: 'Chris Jackson',
        subtitle: 'Vice Chairman'
    },
    {
        name: 'Chris Jackson',
        subtitle: 'Vice Chairman'
    }
]

function ListCity({ citys, remove, navigation }) {

    function getStatus(city) {
        navigation.navigate('Consulta',{
            city
        });
    }

    return(
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {
                    citys.city.map((city, index) => (
                        <TouchableOpacity onLongPress={()=> remove(city)} onPress={() => getStatus(city)}>
                            <ListItem
                                key={index}
                                title={city}
                                bottomDivider
                            />
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        </SafeAreaView>
    );
}

const mapStateToProps = (state) => {
    console.log("prpos", state);

    AsyncStorage.setItem('state', JSON.stringify(state));

    return {
        citys: state.CityReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        remove: (city) => dispatch(removeCity(city))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListCity);


const styles = StyleSheet.create({
    container: {
        height: '100%',
        marginBottom: 50,
    }
});