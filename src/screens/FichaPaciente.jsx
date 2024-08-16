import React from "react";
import Header from "../components/header";
import { Text, View, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { useState, useLayoutEffect, useEffect } from 'react';
import FichaPacientesStyles from '../styles/FichaPacientesStyles';
import styles from '../styles/ComunStyles';
import { obtenerPaciente } from '../api/PacienteApi';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTranslation } from "../locales";
import { useIsFocused } from '@react-navigation/native';

const FichaPaciente = ({ route, navigation }) => {

  // Cogemos de los parámetros de la ruta el id del paciente
  const { idPaciente } = route.params;

  const [paciente, setPaciente] = useState([]);

  /** CARGA DE TRADUCCIONES **************************************/

  const [translations, setTranslations] = useState({});
  const isFocused = useIsFocused();

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await AsyncStorage.getItem('language');
      const lang = savedLanguage || 'es';
      setTranslations(getTranslation(lang));
    };

    if (isFocused) {
      loadLanguage();
    }
  }, [isFocused]);

  /** FIN CARGA DE TRADUCCIONES **************************************/

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
      <Header navigation={navigation} />
      <Text style={FichaPacientesStyles.titulo}>{translations.FichaPaciente}</Text>
      <View style={FichaPacientesStyles.contenedor}>
        <View style={FichaPacientesStyles.contenedor_datos}>

          <View style={FichaPacientesStyles.inputGroup}>
            <Text style={FichaPacientesStyles.label}>{translations.Identificacion}:</Text>
            <TextInput
              style={[FichaPacientesStyles.input, FichaPacientesStyles.identificacion]}
              value={paciente.identificacion}
              editable={false}>
            </TextInput>
          </View>
          <View style={FichaPacientesStyles.row}>
            <View style={FichaPacientesStyles.inputGroup}>
              <Text style={FichaPacientesStyles.label}>{translations.Nombre}:</Text>
              <TextInput
                style={FichaPacientesStyles.input}
                value={paciente.nombre}
                editable={false}>
              </TextInput>
            </View>
            <View style={FichaPacientesStyles.inputGroup}>
              <Text style={FichaPacientesStyles.label}>{translations.Apellidos}:</Text>
              <TextInput
                style={FichaPacientesStyles.input}
                value={paciente.apellidos}
                editable={false}>
              </TextInput>
            </View>
          </View>
          <View style={FichaPacientesStyles.row}>
            <View style={FichaPacientesStyles.inputGroup}>
              <Text style={FichaPacientesStyles.label}>{translations.Sexo}:</Text>
              <TextInput
                style={FichaPacientesStyles.input}
                value={paciente.sexo === 'M' ? translations.Hombre : translations.Mujer}
                editable={false}>
              </TextInput>
            </View>
            <View style={FichaPacientesStyles.inputGroup}>
              <Text style={FichaPacientesStyles.label}>{translations.FechaNacimiento}:</Text>
              <TextInput
                style={FichaPacientesStyles.input}
                value={paciente.fecha_nacimiento}
                editable={false}>
              </TextInput>
            </View>
          </View>
          <View style={FichaPacientesStyles.inputGroup}>
            <Text style={FichaPacientesStyles.label}>{translations.Observaciones}:</Text>
            <TextInput
              style={[FichaPacientesStyles.input, FichaPacientesStyles.observaciones]}
              value={paciente.observaciones}
              editable={false}
              multiline>
            </TextInput>
          </View>

        </View>
        <View style={FichaPacientesStyles.contenedor_tests}>
          <Text style={FichaPacientesStyles.tituloTests}>{translations.TestRealizados}</Text>
          <ScrollView style={FichaPacientesStyles.lista_tests}>

          </ScrollView>
          <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('Pacientes')}>
            <Text style={styles.textoBoton}>  {translations.Volver}  </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>

      </View>
    </View>
  );
};

export default FichaPaciente 