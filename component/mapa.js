import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import task from './taskdata';
import { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native'; 

const Mapa = () => {
    route=useRoute();
    const {userLocation} = route.params;
    console.log(userLocation);
    /*const distancia = (radio, tlat, tlon) => {
        const dist = Math.sqrt(Math.pow(tlat - userLocation.latitude, 2) + Math.pow(tlon - userLocation.longitude, 2));
        if (dist <= radio) return true;
        return false;
    };*/
    return (
        <View style={styles.container}>
            <MapView style={styles.map}>
                <Marker coordinate={userLocation} title="Tu ubicación" />
            </MapView>
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
    map: {
        width: '100%',
        height: '100%',
    }
});
export default Mapa;