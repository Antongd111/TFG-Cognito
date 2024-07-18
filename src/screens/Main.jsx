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

const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#F2E8E1' }}>
      <Stack.Navigator initialRouteName="Pacientes" screenOptions={{headerShown: false }}>
        <Stack.Screen name="Pacientes" component={PantallaPacientes} options={{ title: 'Pantalla de Pacientes' }} />
        <Stack.Screen name="AgregarPaciente" component={AgregarPaciente} options={{ title: 'Pantalla de añadir paciente' }} />
        <Stack.Screen name="FichaPaciente" component={FichaPaciente} options={{ title: 'Pantalla de ficha de paciente' }} />
        <Stack.Screen name="ModificarPaciente" component={ModificarPaciente} options={{ title: 'Pantalla de modificación de paciente' }} />
        <Stack.Screen name="Test_1" component={Test_1} options={{ title: 'Test 1' }} />
        <Stack.Screen name="Test_2" component={Test_2} options={{ title: 'Test 2' }} />
        <Stack.Screen name="Test_3" component={Test_3} options={{ title: 'Test 3' }} />
        <Stack.Screen name="Test_4" component={Test_4} options={{ title: 'Test 4' }} />
        <Stack.Screen name="Test_5" component={Test_5} options={{ title: 'Test 5' }} />
      </Stack.Navigator>
    </View>
  );
}

export default Main;