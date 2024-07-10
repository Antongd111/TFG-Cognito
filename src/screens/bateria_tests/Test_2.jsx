import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import InstruccionesModal from '../../components/instrucciones';
import clownImage from '../../../assets/images/payaso.png';
import { Dimensions } from 'react-native';
import stylesComunes from '../../styles/ComunStyles';

const Test_2 = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(true);
    const [toques, setToques] = useState(0);
    const [posicion, setPosicion] = useState(obtenerPosicionAleatoria());

    function obtenerPosicionAleatoria() {
        const screenWidth = Dimensions.get('window').width;
        const screenHeight = Dimensions.get('window').height;
    
        // Ajusta los márgenes para asegurar que el payaso no se salga de la pantalla
        const margen = 500; // Suponiendo que el payaso tiene un tamaño de 100x100
        const x = Math.floor(Math.random() * (screenWidth - margen));
        const y = Math.floor(Math.random() * (screenHeight - margen));

        return { top: y, left: x };
    }

    const manejarToquePayaso = () => {
        setToques(toques + 1);
        if (toques >= 2) {
            navigation.goBack(); // Termina el test
        } else {
            setPosicion(obtenerPosicionAleatoria()); // Actualiza la posición para el siguiente toque
        }
    };

    return (
        <View style={stylesComunes.borde_tests}>
            <View style={stylesComunes.contenedor_test}>
                <InstruccionesModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    title="Test 2"
                    instructions="Toca el payaso tan pronto como lo veas."
                />
                {!modalVisible && (
                    <TouchableOpacity
                        style={[styles.payaso, posicion]}
                        onPress={manejarToquePayaso}
                    >
                        <Image source={clownImage} style={styles.imagenPayaso} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    payaso: {
        position: 'absolute',
        maxWidth: 350,
        maxHeight: 400,
    },
    imagenPayaso: {
        maxWidth: 350,
        maxHeight: 400,
        resizeMode: 'contain'
    }
});

export default Test_2;
