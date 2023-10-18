import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Mapa from './component/mapa';
import Inicio from './component/inicio';
import Login from './screen/login';
import { useState } from 'react';

const Stack = createNativeStackNavigator();

export default function App() {
  const [token, setToken] = useState(null);
  const [usuario, setUsuario] = useState(null);

  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator style={styles.container}> 
        {token ? (
          <>
            <Stack.Screen
              name="Tareas"
              options={{
                headerStyle: {
                  backgroundColor: '#1a1a1a', // Fondo gris claro para el header
                },
                headerTitleStyle: {
                  color: 'white', // Letras rojas para el header
                },
              }}
            >
              {(props) => <Inicio {...props} usuario={usuario} />}
            </Stack.Screen>
            <Stack.Screen name="Map" component={Mapa} options={{
                headerStyle: {
                  backgroundColor: '#303030', // Fondo gris claro para el header
                },
                headerTitleStyle: {
                  color: 'white', // Letras rojas para el header
                },
              }}/>
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              options={{
                headerStyle: {
                  backgroundColor: '#1a1a1a', // Fondo gris claro para el header
                },
                headerTitleStyle: {
                  color: 'white', // Letras rojas para el header
                },
              }}
            >
              {(props) => (
                <Login
                  {...props}
                  setToken={setToken}
                  setUsuario={(usuario) => {
                    setUsuario(usuario);
                    props.navigation.navigate("Tareas", usuario);
                  }}
                />
              )}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303030', 
    alignItems: 'center',
    justifyContent: 'center',
  },
});
