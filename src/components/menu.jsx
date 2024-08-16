// MenuComponent.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const MenuComponent = ({ onToggleVoice, onNavigateHome, onExitTest, onNavigateNext, onNavigatePrevious }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)} style={styles.menuButton}>
        <Text style={styles.menuText}>☰</Text>
      </TouchableOpacity>
      {menuVisible && (
        <View style={styles.dropdown}>
          <TouchableOpacity onPress={onToggleVoice}>
            <Text style={styles.dropdownText}>Activar voz</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onNavigateHome}>
            <Text style={styles.dropdownText}>Volver al menú</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onNavigatePrevious}>
            <Text style={styles.dropdownText}>Test Anterior</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onNavigateNext}>
            <Text style={styles.dropdownText}>Siguiente test</Text>
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
    fontSize: 24,
  },
  dropdown: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  dropdownText: {
    fontSize: 16,
    marginVertical: 5,
  }
});

export default MenuComponent;