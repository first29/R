import { StatusBar } from 'expo-status-bar';
import { ScrollView, TouchableOpacity, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import * as Location from 'expo-location';
import { useState, useEffect } from 'react';
import task from './taskdata';
const Inicio = ({ navigation }) => {
    const [datos, setDatos] = useState(null);  // Estado para almacenar los datos

    const fetchData = async () => {
        const url = 'http://192.168.1.3:3000/tasks';
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Error al obtener los datos');
            }
            const data = await response.json();
            console.log(data);
            setDatos(data);  // Actualizamos el estado con los datos obtenidos
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };
    useEffect(() => {
        fetchData();  // Llamamos a la función para obtener datos cuando el componente se monta
      }, []);
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
    }, []);
    console.log(userLocation);
    const handleViewOnMap = (userLocation, mapa, radio) => {
        navigation.navigate('Map', { userLocation, mapa, radio });
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView >
                <View style={styles.container}>
                    {datos && datos.map(task => {
                        let faseAnteriorTerminada = true;  // Variable para verificar si la fase anterior está "terminado"
                        return (
                            <View key={task.IdTarea} style={styles.taskContainer}>
                                <Text>Nombre de la tarea: {task.Nombre_Tarea}</Text>
                                <Text>Prioridad: {task.Prioridad}</Text>
                                <Text>Responsable: {task.IdResponsable}</Text>
                                <Text>Proyecto: {task.IdProyecto}</Text>
                                <Text>Fases:</Text>
                                {task.phases.map((phase, index) => {
                                    if(index===0) faseAnteriorTerminada=true;
                                    else  faseAnteriorTerminada = task.phases[index - 1].status === 'terminado';
                                    // Muestra la fase si está "pendiente" y la fase anterior está "terminado"
                                    if ((phase.status == 'pendiente'||'iniciado') && faseAnteriorTerminada) {
                                        return (
                                            <View key={phase.id} style={styles.phaseContainer}>
                                                <Text>Título de Fase: {phase.title}</Text>
                                                <Text>Estado: {phase.status}</Text>
                                            </View>
                                        );
                                    }
                                    return null;  // Si no se cumple la condición, no muestra la fase
                                })}
                                <TouchableOpacity onPress={() => handleViewOnMap(userLocation,task.mapa,task.radio)}>
                                    <Text style={styles.actionButton}>Ver en el mapa</Text>
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </View>
            </ScrollView >

        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    },
    taskContainer: {
        marginBottom: 20,
        marginTop: 30
    },
    phaseContainer: {
        marginLeft: 20,
    },
});

export default Inicio;