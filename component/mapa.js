import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import { useRoute } from '@react-navigation/native';
import buscar from '../funciones/buscar';

const Mapa = () => {
    route = useRoute();
    const { mapa, radio, userLocation } = route.params;
    const x=userLocation.latitude, y=userLocation.longitude,x1=mapa.latitude,y1=mapa.longitude;
   
    const color = buscar(x,y,x1,y1,radio) ? 'rgba(0, 128, 0, 0.3)' : 'rgba(255, 0, 0, 0.5)'
    const color_texto = buscar(x,y,x1,y1,radio) ? 'rgba(0, 128, 0, 1)' : 'rgba(255, 0, 0, 1)'
    return (
        <View style={styles.container}>
            <MapView style={styles.map}
                initialRegion={{
                    latitude: x1,
                    longitude: y1,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                }}
            >
                <Marker coordinate={userLocation} title="Tu ubicación" />
                <>
                    <Marker coordinate={mapa} title="tarea" pinColor="#FFC000" />
                    <Circle
                        center={mapa}
                        radius={radio}
                        fillColor={color}
                    />
                </>
            </MapView>
            <Text style={{ position: 'absolute', bottom: 16, alignSelf: 'center', fontSize: 30, color: color_texto }}>
                {buscar(x,y,x1,y1,radio) ? 'Dentro del área' : 'Fuera del área'}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: '100%',
        height: '100%',
    },
});
export default Mapa;