// FIXME: NO SE DEBE PREGUNTAR AQUI SI LA PERSPECTIVA ES CORRECTA, SINO EN EL ULTIMO TEST

import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import InstruccionesModal from '../../components/instrucciones';
import MenuComponent from '../../components/menu';
import stylesComunes from '../../styles/ComunStyles';
import correct from '../../../assets/images/correct.png';
import incorrect from '../../../assets/images/incorrect.png';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTranslation } from "../../locales";
import { useIsFocused } from '@react-navigation/native';

// Importar la imagen de la casa
const images = {
    casa: require('../../../assets/images/Test_15/casa.png')
};

const Test_15 = ({ navigation, route }) => {
    const [modalVisible, setModalVisible] = useState(true);
    const [fase, setFase] = useState(1); // 1: preguntar incapacidad, 2: preguntar si acepta, 3: evaluación
    const [incapacidad, setIncapacidad] = useState(false);
    const [aceptaPrueba, setAceptaPrueba] = useState(false);
    const [dibujoCorrecto, setDibujoCorrecto] = useState(null);
    const [perspectivaCorrecta, setPerspectivaCorrecta] = useState(null);

    /******************** CARGA DE TRADUCCIONES ********************/

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

    /***************** FIN DE CARGA DE TRADUCCIONES ****************/

    /******************** MENÚ DE EVALUACIÓN ********************/
    const handleToggleVoice = () => {
        console.log("Toggle voice feature");
    };

    const handleNavigateHome = () => {
        navigation.navigate('Pacientes');
    };

    const handleNavigateNext = () => {
        navigation.navigate('Test_16', { idSesion: route.params.idSesion });
    };

    const handleNavigatePrevious = () => {
        navigation.navigate('Test_14', { idSesion: route.params.idSesion });
    };

    /***************** FIN MENÚ DE EVALUACIÓN *****************/

    const iniciarPrueba = () => {
        setModalVisible(false);
        setFase(1);
    };

    const manejarIncapacidad = (respuesta) => {
        setIncapacidad(respuesta);
        if (respuesta) {
            mostrarResultados();
        } else {
            setFase(2);
        }
    };

    const manejarAceptacion = (respuesta) => {
        setAceptaPrueba(respuesta);
        if (!respuesta) {
            mostrarResultados();
        } else {
            setFase(3);
        }
    };

    const manejarEvaluacionDibujo = (respuesta) => {
        setDibujoCorrecto(respuesta);
        setFase(4);
    };

    const manejarPerspectiva = (respuesta) => {
        setPerspectivaCorrecta(respuesta);
        mostrarResultados();
    };

    const mostrarResultados = () => {
        Alert.alert('Resultados',
            `Incapacidad para realizar la prueba: ${incapacidad ? 'Sí' : 'No'}\n` +
            `Aceptación de la prueba: ${aceptaPrueba ? 'Sí' : 'No'}\n` +
            `Dibujo correcto: ${dibujoCorrecto === null ? 'N/A' : dibujoCorrecto ? 'Sí' : 'No'}\n` +
            `Perspectiva correcta: ${perspectivaCorrecta === null ? 'N/A' : perspectivaCorrecta ? 'Sí' : 'No'}`);
    };

    return (
        <View style={stylesComunes.borde_tests}>
            <View style={stylesComunes.contenedor_test}>
                <MenuComponent
                    onToggleVoice={handleToggleVoice}
                    onNavigateHome={handleNavigateHome}
                    onNavigateNext={handleNavigateNext}
                    onNavigatePrevious={handleNavigatePrevious}
                />
                <InstruccionesModal
                    visible={modalVisible}
                    onClose={iniciarPrueba}
                    title="Test 15"
                    instructions={translations.pr15ItemStart} />
                {!modalVisible && (
                    <>
                        {fase === 1 && (
                            <View style={styles.container}>
                                <Text style={styles.pregunta}>{translations.pr16Incapacidad}</Text>
                                <View style={styles.botonesContainer}>
                                    <TouchableOpacity style={styles.botonNo} onPress={() => manejarIncapacidad(true)}>
                                        <Text style={styles.textoBoton}>{translations.Si}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.botonSi} onPress={() => manejarIncapacidad(false)}>
                                        <Text style={styles.textoBoton}>{translations.No}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                        {fase === 2 && (
                            <View style={styles.container}>
                                <Text style={styles.pregunta}>{translations.pr16Rechazo}</Text>
                                <View style={styles.botonesContainer}>
                                    <TouchableOpacity style={styles.botonSi} onPress={() => manejarAceptacion(true)}>
                                        <Text style={styles.textoBoton}>{translations.Si}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.botonNo} onPress={() => manejarAceptacion(false)}>
                                        <Text style={styles.textoBoton}>{translations.No}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                        {fase === 3 && (
                            <View style={styles.containerFase3}>
                                <Image source={images.casa} style={styles.imagen} />
                                <View style={styles.botonesContainerFase3}>
                                    <TouchableOpacity style={styles.botonCorrecto} onPress={() => manejarEvaluacionDibujo(true)}>
                                        <Image source={correct} style={{ width: 60, height: 60 }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.botonIncorrecto} onPress={() => manejarEvaluacionDibujo(false)}>
                                        <Image source={incorrect} style={{ width: 60, height: 60 }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                        {fase === 4 && (
                            <View style={styles.container}>
                                <Text style={styles.pregunta}>¿La perspectiva del dibujo es correcta?</Text>
                                <View style={styles.botonesContainer}>
                                    <TouchableOpacity style={styles.botonSi} onPress={() => manejarPerspectiva(true)}>
                                        <Text style={styles.textoBoton}>Sí</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.botonNo} onPress={() => manejarPerspectiva(false)}>
                                        <Text style={styles.textoBoton}>No</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    containerFase3: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        marginBottom: 20,
        width: '100%',
        height: '100%'
    },
    pregunta: {
        fontSize: 40,
        textAlign: 'center',
        marginBottom: 20
    },
    botonesContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
    },
    botonesContainerFase3: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        width: '10%',
        marginBottom: 20
    },
    botonSi: {
        backgroundColor: '#47F251',
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        width: '40%'
    },
    botonNo: {
        backgroundColor: '#F04343',
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        width: '40%'
    },
    botonCorrecto: {
        backgroundColor: '#47F251',
        padding: 10,
        borderRadius: 50,
        marginHorizontal: 10,
        marginVertical: 20,
        width: 100,
        height: 100,
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
    },
    botonIncorrecto: {
        backgroundColor: '#F04343',
        padding: 10,
        borderRadius: 50,
        marginHorizontal: 10,
        marginVertical: 20,
        width: 100,
        height: 100,
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
    },
    textoBoton: {
        fontSize: 40,
        color: 'white',
        textAlign: 'center'
    },
    imagen: {
        width: '80%',
        height: '80%',
        resizeMode: 'contain',
        marginVertical: 20
    }
});

export default Test_15;