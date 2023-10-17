import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import task from './taskdata';
import { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';

const Mapa = () => {
    route = useRoute();
    const { task, userLocation } = route.params;
    const tlat = task.mapa.latitude;
    const tlon = task.mapa.longitude;
    console.log(task.mapa, userLocation);
    const distancia = (x,y,x1,y1,radio) => {
        const dist = Math.sqrt(Math.pow(x - x1, 2) + Math.pow(y - y1, 2));
        const veracidad = dist <= radio
        if (veracidad) return true;
        return false;
    };
    let color=distancia(userLocation.latitude,userLocation.longitude,tlat,tlon,task.radio) ? 'rgba(0, 128, 0, 0.3)' : 'rgba(255, 0, 0, 0.5)'
    let color_texto=distancia(userLocation.latitude,userLocation.longitude,tlat,tlon,task.radio) ? 'rgba(0, 128, 0, 1)' : 'rgba(255, 0, 0, 1)'
    return (
        <View style={styles.container}>
            <MapView style={styles.map}
                initialRegion={{
                    latitude: tlat,
                    longitude: tlon,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                }}
            >
                <Marker coordinate={userLocation} title="Tu ubicación" />
                <>
                    <Marker coordinate={task.mapa} title="tarea" pinColor="#FFC000"/>
                    <Circle
                        center={task.mapa}
                        radius={task.radio}
                        fillColor={color}
                    />
                </>
            </MapView>
            <Text style={{ position: 'absolute', bottom: 16, alignSelf: 'center', fontSize: 30, color: color_texto}}>
                {distancia(userLocation.latitude,userLocation.longitude,tlat,tlon,task.radio) ? 'Dentro del área' : 'Fuera del área'}
            </Text>
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