import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {View} from "react-native";

import PantallaPacientes from "./PantallaPacientes";
import AgregarPaciente from "./AgregarPaciente";
import FichaPaciente from "./FichaPaciente";
import ModificarPaciente from "./ModificarPaciente";
import Test_1 from "./bateria_tests/Test_1";
import Test_2 from "./bateria_tests/Test_2";
import Test_3 from "./bateria_tests/Test_3";
import Test_4 from "./bateria_tests/Test_4";
import Test_5 from "./bateria_tests/Test_5";
import Test_6 from "./bateria_tests/Test_6";
import Test_7 from "./bateria_tests/Test_7";
import Test_8 from "./bateria_tests/Test_9";
import Test_9 from "./bateria_tests/Test_9";
import Test_10 from "./bateria_tests/Test_10";
import Test_11 from "./bateria_tests/Test_11";

const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#F2E8E1' }}>
      <Stack.Navigator initialRouteName="Test_11" screenOptions={{headerShown: false }}>
        <Stack.Screen name="Pacientes" component={PantallaPacientes} options={{ title: 'Pantalla de Pacientes' }} />
        <Stack.Screen name="AgregarPaciente" component={AgregarPaciente} options={{ title: 'Pantalla de añadir paciente' }} />
        <Stack.Screen name="FichaPaciente" component={FichaPaciente} options={{ title: 'Pantalla de ficha de paciente' }} />
        <Stack.Screen name="ModificarPaciente" component={ModificarPaciente} options={{ title: 'Pantalla de modificación de paciente' }} />
        <Stack.Screen name="Test_1" component={Test_1} options={{ title: 'Test 1' }} />
        <Stack.Screen name="Test_2" component={Test_2} options={{ title: 'Test 2' }} />
        <Stack.Screen name="Test_3" component={Test_3} options={{ title: 'Test 3' }} />
        <Stack.Screen name="Test_4" component={Test_4} options={{ title: 'Test 4' }} />
        <Stack.Screen name="Test_5" component={Test_5} options={{ title: 'Test 5' }} />
        <Stack.Screen name="Test_6" component={Test_6} options={{ title: 'Test 6' }} />
        <Stack.Screen name="Test_7" component={Test_7} options={{ title: 'Test 7' }} />
        <Stack.Screen name="Test_8" component={Test_8} options={{ title: 'Test 8' }} />
        <Stack.Screen name="Test_9" component={Test_9} options={{ title: 'Test 9' }} />
        <Stack.Screen name="Test_10" component={Test_10} options={{ title: 'Test 10' }} />
        <Stack.Screen name="Test_11" component={Test_11} options={{ title: 'Test 11' }} />
      </Stack.Navigator>
    </View>
  );
}

export default Main;