
import React, { useState, useEffect } from 'react';
import InstruccionesModal from '../../components/instrucciones';
import PreguntaIniciarTest from '../../components/preguntaIniciarTest';
import { View, Image, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import styles from '../../styles/ComunStyles';



const Test_2 = ({ navigation, route }) => {

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Test 2</Text>
            <Text style={styles.texto}>En desarrollo...</Text>
        </View>
    );
}

export default Test_2;