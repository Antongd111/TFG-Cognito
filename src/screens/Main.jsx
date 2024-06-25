import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {View} from "react-native";

import PantallaPacientes from "./PantallaPacientes";
import AgregarPaciente from "./AgregarPaciente";
import FichaPaciente from "./FichaPaciente";
import Header from '../components/header';

const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
      <Header />
      <Stack.Navigator initialRouteName="Pacientes" screenOptions={{headerShown: false }}>
        <Stack.Screen name="Pacientes" component={PantallaPacientes} options={{ title: 'Pantalla de Pacientes' }} />
        <Stack.Screen name="AgregarPaciente" component={AgregarPaciente} options={{ title: 'Pantalla de añadir paciente' }} />
        <Stack.Screen name="FichaPaciente" component={FichaPaciente} options={{ title: 'Pantalla de ficha de paciente' }} />
      </Stack.Navigator>
    </View>
  );
}

export default Main;