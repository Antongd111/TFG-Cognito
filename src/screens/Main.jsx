import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {View} from "react-native";

import PantallaPacientes from "./PantallaPacientes";
import AgregarPaciente from "./AgregarPaciente";
import FichaPaciente from "./FichaPaciente";
import ModificarPaciente from "./ModificarPaciente";
import InfoSesion from "./InfoSesion";
import Ajustes from "./Ajustes";
import Test_1 from "./bateria_tests/Test_1";
import Test_2 from "./bateria_tests/Test_2";  //Revisado
import Test_3 from "./bateria_tests/Test_3";  //Revisado
import Test_4 from "./bateria_tests/Test_4";  //Revisado
import Test_5 from "./bateria_tests/Test_5";
import Test_6 from "./bateria_tests/Test_6";
import Test_7 from "./bateria_tests/Test_7";
import Test_8 from "./bateria_tests/Test_8";  //Revisado
import Test_9 from "./bateria_tests/Test_9";  //Revisado
import Test_10 from "./bateria_tests/Test_10";  //Revisado sin BD
import Test_11 from "./bateria_tests/Test_11";  //Revisado sin BD
import Test_12 from "./bateria_tests/Test_12";  // Revisado sin BD
import Test_13 from "./bateria_tests/Test_13";  
import Test_14 from "./bateria_tests/Test_14";
import Test_15 from "./bateria_tests/Test_15";
import Test_16 from "./bateria_tests/Test_16";
import Test_17 from "./bateria_tests/Test_17";
import Test_18 from "./bateria_tests/Test_18";
import Test_19 from "./bateria_tests/Test_19";
import Test_20 from "./bateria_tests/Test_20";
import Test_21 from "./bateria_tests/Test_21";
import Test_22 from "./bateria_tests/Test_22";
import Test_23 from "./bateria_tests/Test_23";
// import Test_24 from "./bateria_tests/Test_24";
// import Test_25 from "./bateria_tests/Test_25";

const Stack = createNativeStackNavigator();

//TODO: Se puede usar replace en lugar de navigate para que no se guarde en la pila de navegación, y que asi no se guarden los datos de la sesión
const Main = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#F2E8E1' }}>
      <Stack.Navigator initialRouteName="Test_13" screenOptions={{headerShown: false }}>
        <Stack.Screen name="Pacientes" component={PantallaPacientes} options={{ title: 'Pantalla de Pacientes' }} />
        <Stack.Screen name="AgregarPaciente" component={AgregarPaciente} options={{ title: 'Pantalla de añadir paciente' }} />
        <Stack.Screen name="FichaPaciente" component={FichaPaciente} options={{ title: 'Pantalla de ficha de paciente' }} />
        <Stack.Screen name="ModificarPaciente" component={ModificarPaciente} options={{ title: 'Pantalla de modificación de paciente' }} />
        <Stack.Screen name="InfoSesion" component={InfoSesion} options={{ title: 'Información de la Sesión' }} />
        <Stack.Screen name="Ajustes" component={Ajustes} options={{ title: 'Ajustes' }} />
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
        <Stack.Screen name="Test_12" component={Test_12} options={{ title: 'Test 12' }} />
        <Stack.Screen name="Test_13" component={Test_13} options={{ title: 'Test 13' }} />
        <Stack.Screen name="Test_14" component={Test_14} options={{ title: 'Test 14' }} />
        <Stack.Screen name="Test_15" component={Test_15} options={{ title: 'Test 15' }} />
        <Stack.Screen name="Test_16" component={Test_16} options={{ title: 'Test 16' }} />
        <Stack.Screen name="Test_17" component={Test_17} options={{ title: 'Test 17' }} />
        <Stack.Screen name="Test_18" component={Test_18} options={{ title: 'Test 18' }} />
        <Stack.Screen name="Test_19" component={Test_19} options={{ title: 'Test 19' }} />
        <Stack.Screen name="Test_20" component={Test_20} options={{ title: 'Test 20' }} />
        <Stack.Screen name="Test_21" component={Test_21} options={{ title: 'Test 21' }} />
        <Stack.Screen name="Test_22" component={Test_22} options={{ title: 'Test 22' }} />
        <Stack.Screen name="Test_23" component={Test_23} options={{ title: 'Test 23' }} />
        {/* <Stack.Screen name="Test_24" component={Test_24} options={{ title: 'Test 24' }} /> */}
        {/* <Stack.Screen name="Test_25" component={Test_25} options={{ title: 'Test 25' }} /> */}
      </Stack.Navigator>
    </View>
  );
}

export default Main;