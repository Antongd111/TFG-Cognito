import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/ComunStyles';
import { useState, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTranslation } from "../locales";
import { useIsFocused } from '@react-navigation/native';

const InstruccionesModal = ({ visible, onClose, title, instructions }) => {

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
          <TouchableOpacity 
            style={styles.boton}
            onPress={onClose}>
            <Text style={styles.textoBoton}>  {translations.Comenzar}  </Text>
            </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default InstruccionesModal;