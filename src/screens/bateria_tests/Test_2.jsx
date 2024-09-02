import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import InstruccionesModal from '../../components/instrucciones';
import clownImage from '../../../assets/images/payaso.png';
import { Dimensions } from 'react-native';
import stylesComunes from '../../styles/ComunStyles';
import MenuComponent from '../../components/menu';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTranslation } from "../../locales";
import { useIsFocused } from '@react-navigation/native';

const Test_2 = ({ navigation, route }) => {
    const [modalVisible, setModalVisible] = useState(true);
    const [toques, setToques] = useState(0);
    const [posicion, setPosicion] = useState(obtenerPosicionAleatoria());
    const [mostrarOpciones, setMostrarOpciones] = useState(false);
    const [mostrarError, setMostrarError] = useState(false);

    const { idSesion } = route.params;

    /** CARGA DE TRADUCCIONES *******************************************/

    const [translations, setTranslations] = useState({});
    const isFocused = useIsFocused();

    useEffect(() => {
        const loadLanguage = async () => {
            const savedLanguage = await AsyncStorage.getItem('language');
            const lang = savedLanguage || 'es';
            setTranslations(getTranslation(lang));
        };

        if (isFocused) {
            loadLanguage();
        }
    }, [isFocused]);

    /** FIN CARGA DE TRADUCCIONES **************************************/


    /**
     * Calcula una posición {x, y} aleatoria dentro de la pantalla y la devuelve.
     * @returns 
     */
    function obtenerPosicionAleatoria() {
        const screenWidth = Dimensions.get('window').width;
        const screenHeight = Dimensions.get('window').height;

        // Ajusta los márgenes para asegurar que el payaso no se salga de la pantalla
        const margen = 500; // Suponiendo que el payaso tiene un tamaño de 100x100
        const x = Math.floor(Math.random() * (screenWidth - margen));
        const y = Math.floor(Math.random() * (screenHeight - margen));

        return { top: y, left: x };
    }

    /**
     * Maneja el toque del payaso. Si es el tercer ensayo se pasa a la siguiente fase, si no,
     * se pasa a generar el payaso en otra posición aleatoria.
     */
    const manejarToquePayaso = () => {
        setToques(toques + 1);
        if (toques >= 2) {
            setMostrarOpciones(true);
        } else {
            setPosicion(obtenerPosicionAleatoria());
        }
    };

    /**
     * Para la última fase, si el sujeto toca el payaso se acaba el test y se pasa al siguiente. Si no, se muestra error.
     * @param {*} opcion Elemento que ha tocado el usuario
     */
    const seleccionarOpcion = (opcion) => {
        if (opcion === 'payaso') {
            navigation.replace('Test_3', { idSesion: idSesion });
        } else {
            setMostrarError(true);
        }
    }

    return (
        <View style={stylesComunes.borde_tests}>
            <View style={stylesComunes.contenedor_test}>
                <MenuComponent
                    onToggleVoice={() => { }}
                    onNavigateHome={() => navigation.replace('Pacientes')}
                    onNavigateNext={() => navigation.replace('Test_3', { idSesion: idSesion })}
                    onNavigatePrevious={() => navigation.replace('Test_1', { idSesion: idSesion })}
                />
                <InstruccionesModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    title="Test 2"
                    instructions={translations.pr02ItemStart + "\n \n" + translations.ItemStartBasico}
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
                        <Text style={styles.instrucciones}>{translations.pr02Enunciado}</Text>
                        <View style={styles.opciones} >
                            <TouchableOpacity style={styles.boton} onPress={() => seleccionarOpcion('payaso')}>
                                <Text style={styles.nombre}>{translations.pr02Bernabe}</Text>
                                <Text style={styles.profesion}>{translations.pr02Payaso}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.boton} onPress={() => seleccionarOpcion('emperador')}>
                                <Text style={styles.nombre}>{translations.pr02Julio}</Text>
                                <Text style={styles.profesion}>{translations.pr02Emperador}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                {mostrarError && (
                    <Text style={styles.error}>{translations.pr02Tarjeta}</Text>
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
