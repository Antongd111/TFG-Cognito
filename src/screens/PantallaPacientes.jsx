import React from "react";
import { Text, View , TouchableOpacity, StyleSheet, Button} from "react-native";
import ListaPacientes from '../components/listaPacientes';
import AgregarPaciente from "./AgregarPaciente";
import { addPaciente } from '../database/db';
import { Alert } from "react-native";

const PantallaPacientes = ({navigation}) => {
  const agregarPacientePrueba = async () => {
    try {
      // Datos de ejemplo
      const nombre = "John";
      const apellidos = "Doe";
      const fecha_nacimiento = "1980-01-01";
      const sexo = "M";
      const observaciones = "Ninguna observación especial";

      await addPaciente(nombre, apellidos, fecha_nacimiento, sexo, observaciones);
      Alert.alert("Éxito", "Paciente añadido correctamente");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo añadir el paciente");
    }
  };

  return (
    <View>
      <TouchableOpacity style={styles.botonAgregarPaciente} onPress={() => navigation.navigate('AgregarPaciente')}>
        <Text style={styles.textoAgregarPaciente}>Agregar Paciente</Text>
      </TouchableOpacity>
      <ListaPacientes />
    </View>
  );
};

const styles = StyleSheet.create({
    botonAgregarPaciente : {
        backgroundColor: '#D2B48C',
        padding: 10,
        margin: '2%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
    },

    textoAgregarPaciente : {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
  });

export default PantallaPacientes