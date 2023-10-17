import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import task from './taskdata';
import { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';

const Mapa = () => {
    route = useRoute();
    console.log(route.params);
    const { mapa,radio, userLocation } = route.params;
    console.log(mapa,radio, userLocation);
    const distancia = (x,y,x1,y1,radio) => {
        console.log(x,y,x1,y1,radio);
        const X = (x * Math.PI) / 180;
        const Y = (y * Math.PI) / 180;
        const X1 = (x1 * Math.PI) / 180;
        const Y1 = (y1 * Math.PI) / 180;
        const radioTierra = 6371000;
        const dist = (Math.sqrt(Math.pow(X - X1, 2) + Math.pow(Y - Y1, 2)))*radioTierra;
        console.log(dist);
        const veracidad = dist <= radio
        console.log(veracidad);
        if (veracidad) return true;
        return false;
    };
    const color=distancia(userLocation.latitude,userLocation.longitude,mapa.latitude,mapa.longitude,radio) ? 'rgba(0, 128, 0, 0.3)' : 'rgba(255, 0, 0, 0.5)'
    const color_texto=distancia(userLocation.latitude,userLocation.longitude,mapa.latitude,mapa.longitude,radio) ? 'rgba(0, 128, 0, 1)' : 'rgba(255, 0, 0, 1)'
    return (
        <View style={styles.container}>
            <MapView style={styles.map}
                initialRegion={{
                    latitude: mapa.latitude,
                    longitude: mapa.longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                }}
            >
                <Marker coordinate={userLocation} title="Tu ubicación" />
                <>
                    <Marker coordinate={mapa} title="tarea" pinColor="#FFC000"/>
                    <Circle
                        center={mapa}
                        radius={radio}
                        fillColor={color}
                    />
                </>
            </MapView>
            <Text style={{ position: 'absolute', bottom: 16, alignSelf: 'center', fontSize: 30, color: color_texto}}>
                {distancia(userLocation.latitude,userLocation.longitude,mapa.latitude,mapa.longitude,radio) ? 'Dentro del área' : 'Fuera del área'}
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
    },
});
export default Mapa;