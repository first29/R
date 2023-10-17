import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Mapa from './component/mapa';
import inicio from './component/inicio';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer styles={styles.container}>
      <Stack.Navigator>
      <Stack.Screen name="Tareas" component={inicio} />
      <Stack.Screen name="Map" component={Mapa} />
      </Stack.Navigator>
    </NavigationContainer>
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
