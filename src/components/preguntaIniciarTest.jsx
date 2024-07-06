import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/ComunStyles';

const PreguntaIniciarTest = ({ visible, onClose, onRepeatTests, onStartRealTests, title, instructions }) => {
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
            onPress={() => {
              onRepeatTests(); // Pass false to the handler
              onClose(); // Optionally close the modal
            }}>
            <Text style={styles.textoBoton}>Repetir pruebas</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.boton}
            onPress={() => {
              onStartRealTests(); // Pass true to the handler
              onClose(); // Optionally close the modal
            }}>
            <Text style={styles.textoBoton}>Comenzar ensayos reales</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PreguntaIniciarTest;