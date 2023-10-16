import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import task from './taskdata';
import { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';

const Mapa = () => {
    route = useRoute();
    const { task, userLocation } = route.params;
    const tlat = task.location.latitude;
    const tlon = task.location.longitude;
    console.log(task.location, userLocation);
    const distancia = (x,y,x1,y1,radio) => {
        const dist = Math.sqrt(Math.pow(x - x1, 2) + Math.pow(y - y1, 2));
        const veracidad = dist <= radio
        if (veracidad) return true;
        return false;
    };
    let color=distancia(userLocation.latitude,userLocation.longitude,tlat,tlon,task.radius) ? 'rgba(0, 128, 0, 0.3)' : 'rgba(255, 0, 0, 0.5)'
    let color_texto=distancia(userLocation.latitude,userLocation.longitude,tlat,tlon,task.radius) ? 'rgba(0, 128, 0, 1)' : 'rgba(255, 0, 0, 1)'
    return (
        <View style={styles.container}>
            <MapView style={styles.map}
                initialRegion={{
                    latitude: task.location.latitude,
                    longitude: task.location.longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                }}
            >
                <Marker coordinate={userLocation} title="Tu ubicación" />
                <>
                    <Marker coordinate={task.location} title="tarea" />
                    <Circle
                        center={task.location}
                        radius={task.radius}
                        fillColor={color}
                    />
                </>
            </MapView>
            <Text style={{ position: 'absolute', bottom: 16, alignSelf: 'center', fontSize: 30, color: color_texto}}>
                {distancia(userLocation.latitude,userLocation.longitude,tlat,tlon,task.radius) ? 'Dentro del área' : 'Fuera del área'}
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