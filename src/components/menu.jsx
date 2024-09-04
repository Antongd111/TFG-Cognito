// MenuComponent.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MenuComponent = ({ onNavigateHome, onNavigateNext, onNavigatePrevious }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)} style={styles.menuButton}>
        <Text style={styles.menuText}>☰</Text>
      </TouchableOpacity>
      {menuVisible && (
        <View style={styles.dropdown}>
          <TouchableOpacity onPress={async () => {
              const currentVoiceState = await AsyncStorage.getItem('voiceEnabled');
              const newVoiceState = currentVoiceState === 'true' ? 'false' : 'true';
              await AsyncStorage.setItem('voiceEnabled', newVoiceState);
          }}>
            <Text style={styles.dropdownText}>🔊</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onNavigateHome}>
            <Text style={styles.dropdownText}>🏠</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onNavigatePrevious}>
            <Text style={styles.dropdownText}>⬅️</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onNavigateNext}>
            <Text style={styles.dropdownText}>➡️</Text>
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
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  dropdownText: {
    fontSize: 30,
    marginVertical: 5,
  }
});

export default MenuComponent;