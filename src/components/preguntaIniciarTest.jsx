import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/ComunStyles';
import { useState, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTranslation } from "../locales";
import { useIsFocused } from '@react-navigation/native';

const PreguntaIniciarTest = ({ visible, onClose, onRepeatTests, onStartRealTests, title, instructions }) => {

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

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.tituloInstrucciones}>{title}</Text>
          <View style={styles.separador} />
          <Text style={styles.textoInstrucciones}>{instructions}</Text>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <TouchableOpacity
              style={styles.boton}
              onPress={() => {
                onRepeatTests();
                onClose();
              }}>
              <Text style={styles.textoBoton}>{translations.RepetirEntrenamiento}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.boton}
              onPress={() => {
                onStartRealTests();
                onClose();
              }}>
              <Text style={styles.textoBoton}>{translations.ComenzarEnsayosReales}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PreguntaIniciarTest;