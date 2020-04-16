import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Text, View, StyleSheet, SafeAreaView, Image } from 'react-native';
import { Divider } from 'react-native-elements';
import getClima from '../../api/api';


import storm from '../../assets/storm.png';
import snow from '../../assets/snow.png';
import rain from '../../assets/rain.png';
import hail from '../../assets/hail.png';
import fog from '../../assets/fog.png';
import cloudly_night from '../../assets/cloudly_night.png';
import cloudly_day from '../../assets/cloudly_day.png';
import cloud from '../../assets/cloud.png';
import clear_night from '../../assets/clear_night.png';
import clear_day from '../../assets/clear_day.png';

export default function CityStatus({ navigation }) {

    const [data, setData] = useState(JSON.parse('{"city_name": "Joao Pessoa", "date": "10/04/2020", "description": "Parcialmente nublado", "forecast": [{"condition": "storm", "date": "10/04", "description": "Tempestades", "max": 30, "min": 25}, {"condition": "storm", "date": "11/04", "description": "Tempestades", "max": 30, "min": 26}, {"condition": "storm", "date": "12/04", "description": "Tempestades isoladas", "max": 30, "min": 25}, {"condition": "storm", "date": "13/04", "description": "Tempestades", "max": 29, "min": 25}, {"condition": "storm", "date": "14/04", "description": "Tempestades", "max": 30, "min": 25}], "temp": 27}'));

    useEffect(() => {
        let city = navigation.getParam('city');
        getStatus(city);
    }, []);

    async function getStatus(city) {

        await getClima(city).then( (result) => {
            setData(result.data);
            let res = JSON.stringify(result.data);
            AsyncStorage.setItem(city, res);
            
        }).catch(async () => {
            let cache = await AsyncStorage.getItem(city);
            if(cache) {
                cache = JSON.parse(cache);
                setData(cache);
            }
        });
    }


    // returns the image value according to the climatic condition
    function imgProcessing(condition) {
        switch (condition) {
            case "storm":
                return <Image source={storm} style={styles.img}/>
            case "snow":
                return <Image source={snow} style={styles.img}/>
            case "hail":
                return <Image source={hail} style={styles.img}/>
            case "rain":
                return <Image source={rain} style={styles.img}/>
            case "fog":
                return <Image source={fog} style={styles.img}/>
            case "clear_day":
                return <Image source={clear_day} style={styles.img}/>
            case "clear_night":
                return <Image source={clear_night} style={styles.img}/>
            case "cloud":
                return <Image source={cloud} style={styles.img}/>
            case "cloudly_day":
                return <Image source={cloudly_day} style={styles.img}/>
            case "cloudly_night":
                return <Image source={cloudly_night} style={styles.img}/>
            case "none_day":
                return <Image source={none_day} style={styles.img}/>
            case "none_night":
                return <Image source={none_night} style={styles.img}/>
            default:
                return 0;
        }
    }


    return(
        <SafeAreaView>
            <View style={styles.cityContainer}>
                <Text style={styles.cityText}>{data.city_name}</Text>
            </View>
            <View style={styles.container}>
                <View style={styles.forecast}>
                    <View style={styles.info}>
                        
                        <Text>{data.date}</Text>
                        <Text>{'Max: ' + data.forecast[0].max + 'º'}</Text>
                        <Text>{'Min: ' + data.forecast[0].min + 'º'}</Text>
                    </View>
                    <View>
                        {imgProcessing(data.forecast[0].condition)}
                    </View>
                </View>
                <View>
                    <Text>{data.forecast[0].description}</Text>
                </View>
            </View>


            <View style={styles.container}>
                <View style={styles.forecast}>
                    <View style={styles.info}>
                        <Text>{data.forecast[1].date}</Text>
                        {imgProcessing(data.forecast[1].condition)}
                        <Text>{data.forecast[1].description}</Text>
                        <Text>{'Max: ' + data.forecast[1].max + 'º'}</Text>
                        <Text>{'Min: ' + data.forecast[1].min + 'º'}</Text>
                    </View>

                    <View style={styles.info}>
                        <Text>{data.forecast[2].date}</Text>
                        {imgProcessing(data.forecast[2].condition)}
                        <Text>{data.forecast[2].description}</Text>
                        <Text>{'Max: ' + data.forecast[2].max + 'º'}</Text>
                        <Text>{'Min: ' + data.forecast[2].min + 'º'}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.container}>
                <View style={styles.forecast}>
                    <View style={styles.info}>
                        <Text>{data.forecast[3].date}</Text>
                        {imgProcessing(data.forecast[3].condition)}
                        <Text>{data.forecast[3].description}</Text>
                        <Text>{'Max: ' + data.forecast[3].max + 'º'}</Text>
                        <Text>{'Min: ' + data.forecast[3].min + 'º'}</Text>
                    </View>

                    <View style={styles.info}>
                        <Text>{data.forecast[4].date}</Text>
                        {imgProcessing(data.forecast[4].condition)}
                        <Text>{data.forecast[4].description}</Text>
                        <Text>{'Max: ' + data.forecast[4].max + 'º'}</Text>
                        <Text>{'Min: ' + data.forecast[4].min + 'º'}</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {

    },
    cityContainer:{
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cityText: {
        color: 'black',
        fontSize: 18,
    },
    img: {
        width: 100,
        height: 100,
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    forecast: {
        flexDirection: 'row',
    },
    info:{
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    }
});


