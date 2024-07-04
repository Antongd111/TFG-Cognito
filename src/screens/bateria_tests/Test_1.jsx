import React, { useState, useEffect, useRef } from 'react';
import InstruccionesModal from '../../components/instrucciones';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import styles from '../../styles/ComunStyles';

const Test_1 = ({ navigation, route }) => {

    const { idPaciente } = route.params;

    const [modalVisible, setModalVisible] = useState(true);

    return (
        <View style={styles.contenedor_test}>
      <InstruccionesModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Test 1"
        instructions="Toca la pantalla tan rápido como pueda cuando vea aparecer el payaso. Pulsa el botón de abajo para comenzar con unos ensayos de prueba."
      />
      <Text>Contenido del Test 1</Text>
      {/* Aquí iría el contenido adicional de tu test */}
        </View>
    );
};


export default Test_1;