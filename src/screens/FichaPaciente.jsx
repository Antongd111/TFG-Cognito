import React from "react";
import Header from "../components/header";
import { Text, View, TouchableOpacity, TextInput, Button, ScrollView } from "react-native";
import { useState, useLayoutEffect } from 'react';
import FichaPacientesStyles from '../styles/FichaPacientesStyles';
import styles from '../styles/ComunStyles';
import { obtenerPaciente } from '../api/PacienteApi';

const FichaPaciente = ({ route, navigation }) => {

  // Cogemos de los parámetros de la ruta el id del paciente
  const { idPaciente } = route.params;

  const [paciente, setPaciente] = useState([]);

  useLayoutEffect(() => {
    const cargarDatos = async () => {
      try {
        const pacienteCargado = await obtenerPaciente(idPaciente);
        setPaciente(pacienteCargado);
      } catch (error) {
        console.error("Error al cargar el paciente:", error);
      }
    };

    cargarDatos();
  }, []);

  return (
    <View>
      <Header />
      <Text style={FichaPacientesStyles.titulo}>Ficha del Paciente</Text>
      <View style={FichaPacientesStyles.contenedor}>
        <View style={FichaPacientesStyles.contenedor_datos}>

          <View style={FichaPacientesStyles.inputGroup}>
            <Text style={FichaPacientesStyles.label}>Identificación:</Text>
            <TextInput
              style={[FichaPacientesStyles.input, FichaPacientesStyles.identificacion]}
              value={paciente.identificacion}
              editable={false}>
            </TextInput>
          </View>
          <View style={FichaPacientesStyles.row}>
            <View style={FichaPacientesStyles.inputGroup}>
              <Text style={FichaPacientesStyles.label}>Nombre:</Text>
              <TextInput
                style={FichaPacientesStyles.input}
                value={paciente.nombre}
                editable={false}>
              </TextInput>
            </View>
            <View style={FichaPacientesStyles.inputGroup}>
              <Text style={FichaPacientesStyles.label}>Apellidos:</Text>
              <TextInput
                style={FichaPacientesStyles.input}
                value={paciente.apellidos}
                editable={false}>
              </TextInput>
            </View>
          </View>
          <View style={FichaPacientesStyles.row}>
            <View style={FichaPacientesStyles.inputGroup}>
              <Text style={FichaPacientesStyles.label}>Género:</Text>
              <TextInput
                style={FichaPacientesStyles.input}
                value={paciente.sexo === 'M' ? 'Hombre' : 'Mujer'}
                editable={false}>
              </TextInput>
            </View>
            <View style={FichaPacientesStyles.inputGroup}>
              <Text style={FichaPacientesStyles.label}>Fecha de nacimiento:</Text>
              <TextInput
                style={FichaPacientesStyles.input}
                value={paciente.fecha_nacimiento}
                editable={false}>
              </TextInput>
            </View>
          </View>
          <View style={FichaPacientesStyles.inputGroup}>
            <Text style={FichaPacientesStyles.label}>Observaciones:</Text>
            <TextInput
              style={[FichaPacientesStyles.input, FichaPacientesStyles.observaciones]}
              value={paciente.observaciones}
              editable={false}
              multiline>
            </TextInput>
          </View>

        </View>
        <View style={FichaPacientesStyles.contenedor_tests}>
          <Text style={FichaPacientesStyles.tituloTests}>Test realizados</Text>
          <ScrollView style={FichaPacientesStyles.lista_tests}>

          </ScrollView>
          <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('Pacientes')}>
            <Text style={styles.textoBoton}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>

      </View>
    </View>
  );
};

export default FichaPaciente 