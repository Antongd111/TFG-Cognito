import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import InstruccionesModal from '../../components/instrucciones';
import stylesComunes from '../../styles/ComunStyles';

const Test_5 = ({ navigation, route }) => {

    const [modalVisible, setModalVisible] = useState(true);

    const { idPaciente } = route.params;

    return (
        <View style={stylesComunes.borde_tests}>
            <View style={stylesComunes.contenedor_test}>
                <InstruccionesModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    title="Test 5"
                    instructions="Test 5."
                />
                {!modalVisible && (
                    <View></View>
                )}
            </View>
        </View>
    );
};


export default Test_5;