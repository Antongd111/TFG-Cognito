import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import InstruccionesModal from '../../components/instrucciones';
import clownImage from '../../../assets/images/payaso.png';
import { Dimensions } from 'react-native';
import stylesComunes from '../../styles/ComunStyles';
import { set } from 'date-fns';

const Test_3 = ({ navigation, route }) => {

    const [modalVisible, setModalVisible] = useState(true);

    const { idPaciente } = route.params;

    return (
        <View style={stylesComunes.borde_tests}>
            <View style={stylesComunes.contenedor_test}>
                <InstruccionesModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    title="Test 3"
                    instructions="En la pantalla aparecerá una frase que usted debe leer en voz alta. Posteriormente, verá una imagen y debe hacer lo que acaba de leer lo más rápido posible. 
                    Pulse 'Entendido' para comenzar."
                />
                {!modalVisible && (
                    <View></View>
                )}
            </View>
        </View>
    );
};


export default Test_3;