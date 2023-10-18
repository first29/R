import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import jwt_decode from "jwt-decode";
import axios from "axios"; // Importa axios

const Login = ({ setToken, setUsuario }) => {
    const [correo, setCorreo] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = () => {
        const data = {
            correo,
            contraseña,
        };

        const handleLogin = async () => {
            try {
                const response = await axios.post(`http://192.168.1.3:3000/tasks/login`, data);
                // Maneja la respuesta aqu
                const { token } = response.data;
                setToken(token);
                const decodedToken = jwt_decode(token);
                const usuario_id = decodedToken.id;
                setUsuario(usuario_id);
            } catch (error) {
                setError("Credenciales inválidas");
                console.error(error);
            }
        };

        handleLogin();
    };

    return (
        <View style={styles.view}>
            <Text style={styles.title}>Iniciar Sesión</Text>

            {error && <Text style={{ color: "red", marginBottom: 16 }}>{error}</Text>}

            <Text style={styles.texto}>Correo Electrónico:</Text>
            <TextInput
                style={styles.input}
                value={correo}
                onChangeText={(text) => setCorreo(text)}
                selectionColor={'gray'}
            />

            <Text style={styles.texto}>Contraseña:</Text>
            <TextInput
                style={styles.input}
                value={contraseña}
                onChangeText={(text) => setContraseña(text)}
                secureTextEntry
                selectionColor={'gray'}
            />

            <Button color="grey" style={styles.boton} title="Iniciar sesión" onPress={handleSubmit} />
        </View>
    );
};
const styles = StyleSheet.create({
    view: {
        padding: 16,
        backgroundColor: '#303030',
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 16,
        color: "grey",
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        color: "grey",
        marginBottom: 16
    },
    texto: {
        color: "grey",
    },

});
export default Login;
