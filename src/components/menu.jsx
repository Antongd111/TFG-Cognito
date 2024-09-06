import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTranslation } from "../locales";
import { useIsFocused } from '@react-navigation/native';

const MenuComponent = ({ onNavigateHome, onNavigateNext, onNavigatePrevious }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [narradorActivo, setNarradorActivo] = useState(false);
  const [translations, setTranslations] = useState({});
  const isFocused = useIsFocused();

  // Cargar el estado del narrador desde AsyncStorage
  useEffect(() => {
    const loadSettings = async () => {
      const savedLanguage = await AsyncStorage.getItem('language');
      const lang = savedLanguage || 'es';
      setTranslations(getTranslation(lang));

      const narradorEnabled = await AsyncStorage.getItem('voiceEnabled');
      setNarradorActivo(narradorEnabled === 'true');
    };

    if (isFocused) {
      loadSettings();
    }
  }, [isFocused]);

  // Función para cambiar el estado del narrador
  const toggleNarrador = async () => {
    const newState = !narradorActivo;  
    setNarradorActivo(newState); 
    await AsyncStorage.setItem('voiceEnabled', newState ? 'true' : 'false');
  };

  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)} style={styles.menuButton}>
        <Text style={styles.menuText}>☰</Text>
      </TouchableOpacity>
      {menuVisible && (
        <View style={styles.dropdown}>
          <TouchableOpacity onPress={toggleNarrador}>
            <Text style={styles.dropdownText}>
              {translations.Narrador} {narradorActivo ? '✓' : '✗'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onNavigateHome}>
            <Text style={styles.dropdownText}>{translations.VolverInicio}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onNavigatePrevious}>
            <Text style={styles.dropdownText}>{translations.AntTest}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onNavigateNext}>
            <Text style={styles.dropdownText}>{translations.SigTest}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 10,
    zIndex: 1,
  },
  menuButton: {
    backgroundColor: '#D2B48C',
    padding: 8,
    borderRadius: 7,
  },
  menuText: {
    color: 'white',
    fontSize: 30,
  },
  dropdown: {
    backgroundColor: '#F2E8E1',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  dropdownText: {
    fontSize: 25,
    marginVertical: 5,
  },

  fondoMenu: {
    backgroundColor: '#D2B48C',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
},
});

export default MenuComponent;