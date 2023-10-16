import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import { useState, useEffect } from 'react';
import tasksData from './taskdata';

export default function Inicio({ navigation }) {
    const [userLocation, setUserLocation] = useState(null);
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestBackgroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setUserLocation({ latitude: location.coords.latitude, longitude: location.coords.longitude });
            
        })();
    },[]);
    console.log(userLocation);
    const handleViewOnMap = (userLocation) => {
        const  task=tasksData[0]
        navigation.navigate('Map', { userLocation,task });
    };
    return (
        <View style={styles.container}>
            <Text>Open up App.js to start working on your app!</Text>
            <TouchableOpacity onPress={() => handleViewOnMap(userLocation)}>
                <Text style={styles.actionButton}>Ver en el mapa</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});