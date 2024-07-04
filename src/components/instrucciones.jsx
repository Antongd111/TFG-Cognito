import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/ComunStyles';

const InstruccionesModal = ({ visible, onClose, title, instructions }) => {
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
            <Text style={styles.textoBoton}>Entendido</Text>
            </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default InstruccionesModal;