import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import Header from '../components/header';
import ListaPacientes from '../components/listaPacientes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTranslation } from "../locales"; // Importa la función para obtener traducciones
import { useIsFocused } from '@react-navigation/native'; // Importa el hook para detectar cuando la pantalla está enfocada

const PantallaPacientes = ({ navigation }) => {
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

  return (
    <View>
      <Header navigation={navigation} />
      <TouchableOpacity style={styles.botonAgregarPaciente} onPress={() => navigation.navigate('AgregarPaciente')}>
        <Text style={styles.textoAgregarPaciente}>{translations.AgregarPaciente}</Text>
      </TouchableOpacity>
      <ListaPacientes navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  botonAgregarPaciente: {
    backgroundColor: '#D2B48C',
    padding: 10,
    margin: '2%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },

  textoAgregarPaciente: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default PantallaPacientes;