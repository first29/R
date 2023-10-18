import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import axios from "axios"; // Importa axios
import buscar from '../funciones/buscar';

const Inicio = (usuario) => {
    route = useRoute();
    const user = usuario.route.params;
    const [datos, setDatos] = useState(null);
    const navigation = useNavigation();
    const fetchData = async (usuarioId) => {
        if (!usuarioId) return;
        try {
            const url = `http://192.168.1.3:3000/tasks/${usuarioId}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Error al obtener los datos');
            }
            const data = await response.json();
            setDatos(data);
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    useEffect(() => {
        fetchData(user);  // Llamamos a la función para obtener datos cuando el componente se monta
    }, [usuario]);
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
    const handleViewOnMap = (userLocation, mapa, radio) => {
        navigation.navigate('Map', { userLocation, mapa, radio });
    };
    const obtenerFechaHoraActual = () => {
        const fechaHoraActual = new Date();
        fechaHoraActual.setHours(fechaHoraActual.getHours() - 5);
        return fechaHoraActual.toISOString().slice(0, 19).replace('T', ' ');
    };
    const marcar = async (x,y,x1,y1,radio,hora, id, tipo) => {
        console.log(id);
        if(!buscar(x,y,x1,y1,radio)) {
            let mensaje="";
            if(!tipo) mensaje="No puede iniciar la tarea si esta fuera del Area";
            else mensaje="No puede terminar la tarea si esta fuera del Area";
            console.warn(mensaje);
            return;
        }
        try {
            const response = await axios.post(`http://192.168.1.3:3000/tasks/actualizar_fase`, {
                hora,
                id,
                tipo
            });
            console.log(hora);
        } catch (error) {
            console.warn("error al cambiar fase");
            console.error(error);
        }
        fetchData(user);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                {datos && datos.map(task => {
                    let faseAnteriorTerminada = true;
                    return (
                        <View key={task.IdTarea} style={styles.taskContainer}>
                            <Text style={styles.title}>{task.Nombre_Tarea}</Text>
                            <Text style={styles.texto}>Prioridad: {task.Prioridad}</Text>
                            <Text style={styles.texto}>Proyecto: {task.Descripcion}</Text>
                            <Text style={styles.subtitle}>Fases:</Text>
                            {task.phases.map((phase, index) => {
                                if (index === 0) faseAnteriorTerminada = true;
                                else faseAnteriorTerminada = task.phases[index - 1].status === 'Terminado';
                                if (faseAnteriorTerminada) {
                                    return (
                                        <View key={phase.id}>
                                            <View style={styles.phaseContainer}>
                                                <Text style={styles.phaseTitle}>{phase.title}</Text>
                                                <Text style={styles.texto}>Estado: {phase.status}</Text>
                                            </View>
                                            {phase.status === "Asignado" && <TouchableOpacity
                                                onPress={() => marcar(userLocation.latitude,userLocation.longitude,task.mapa.latitude,task.mapa.longitude,task.radio,obtenerFechaHoraActual(), phase.id, 0)}
                                                style={styles.customButton}
                                            >
                                                <Text style={styles.customButtonText}>{"Iniciar tarea"}</Text>
                                            </TouchableOpacity>}
                                            {phase.status === "Iniciado" && <TouchableOpacity
                                                onPress={() => marcar(userLocation.latitude,userLocation.longitude,task.mapa.latitude,task.mapa.longitude,task.radio,obtenerFechaHoraActual(), phase.id, 1)}
                                                style={styles.customButton}
                                            >
                                                <Text style={styles.customButtonText}>{"Terminar tarea"}</Text>
                                            </TouchableOpacity>}
                                        </View>
                                    );
                                }
                                return null;
                            })}

                            <TouchableOpacity
                                onPress={() => handleViewOnMap(userLocation, task.mapa, task.radio)}
                                style={styles.buton}
                            >
                                <Text style={styles.customButtonText}>Ver en el mapa</Text>
                            </TouchableOpacity>
                        </View>
                    );
                })}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#303030',
        padding: 20,
    },
    scrollView: {
        flexGrow: 1,
    },
    taskContainer: {
        marginBottom: 20,
        padding: 20,
        backgroundColor: '#606060',
        borderRadius: 30,
    },

    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
        marginLeft: 100,
    },
    phaseContainer: {
        alignContent: 'center',
        textAlign: 'center',
        marginBottom: 10,
    },
    phaseTitle: {
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
    },
    texto: {
        textAlign: 'center',
    },
    buton: {
        backgroundColor: 'gray',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    customButton: {
        backgroundColor: 'gray',
        padding: 10,
        borderRadius: 10,
        marginLeft: 90,
        marginBottom: 10,
        width: 150
    },
    customButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,  // Ajusta el tamaño del texto según tu preferencia
    },
});


export default Inicio;