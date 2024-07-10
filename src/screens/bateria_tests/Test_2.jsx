import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import InstruccionesModal from '../../components/instrucciones';
import clownImage from '../../../assets/images/payaso.png';
import { Dimensions } from 'react-native';
import stylesComunes from '../../styles/ComunStyles';
import { set } from 'date-fns';

const Test_2 = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(true);
    const [toques, setToques] = useState(0);
    const [posicion, setPosicion] = useState(obtenerPosicionAleatoria());
    const [mostrarOpciones, setMostrarOpciones] = useState(false);
    const [mostrarError, setMostrarError] = useState(false);

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
            setMostrarOpciones(true);
        } else {
            setPosicion(obtenerPosicionAleatoria()); // Actualiza la posición para el siguiente toque
        }
    };

    const seleccionarOpcion = (opcion) => {
        if (opcion === 'payaso') {
            // Respuesta correcta
            navigation.navigate('Test_3');
        } else {
            // Respuesta incorrecta
            setMostrarError(true);
        }
    }



    return (
        <View style={stylesComunes.borde_tests}>
            <View style={stylesComunes.contenedor_test}>
                <InstruccionesModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    title="Test 2"
                    instructions="Toca el payaso."
                />
                {!modalVisible && !mostrarOpciones && (
                    <TouchableOpacity
                        style={[styles.payaso, posicion]}
                        onPress={manejarToquePayaso}
                    >
                        <Image source={clownImage} style={styles.imagenPayaso} />
                    </TouchableOpacity>
                )}
                {mostrarOpciones && (
                    <View style={styles.opcionesContenedor}>
                        <Text style={styles.instrucciones}>El payaso se llama Bernabé.{'\n'}Toque su tarjeta de visita.</Text>
                        <View style={styles.opciones} >
                            <TouchableOpacity style={styles.boton} onPress={() => seleccionarOpcion('payaso')}>
                                <Text style={styles.nombre}>Bernabé</Text>
                                <Text style={styles.profesion}>Payaso</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.boton} onPress={() => seleccionarOpcion('emperador')}>
                            <Text style={styles.nombre}>Julio César</Text>
                            <Text style={styles.profesion}>Emperador</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                {mostrarError && (
                    <Text style={styles.error}>Toque la tarjeta de visita correcta.</Text>
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
    },
    opcionesContenedor: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    instrucciones: {
        fontSize: 40,
        marginBottom: 20,
        marginTop: 150,
        textAlign: 'center',
    },
    opciones: {
        flexDirection: 'row',
        margin: 10,
    },
    boton: {
        backgroundColor: '#F2E8E1',
        margin: 50,
        marginTop: 50,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#D2B48C',
        alignItems: 'center',
        justifyContent: 'center',
        height: 200,
        width: 400,
    },
    nombre: {
        color: 'black',
        fontSize: 40,
        textAlign: 'center',
        marginBottom: 40,
        fontWeight: 'bold',
    },
    profesion: {
        color: 'black',
        fontSize: 40,
        textAlign: 'center',
    },
    error: {
        color: 'red',
        fontSize: 40,
        textAlign: 'center',
        marginTop: 80,
    },

});

export default Test_2;
