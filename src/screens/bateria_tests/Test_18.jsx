import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import InstruccionesModal from '../../components/instrucciones';
import MenuComponent from '../../components/menu';
import stylesComunes from '../../styles/ComunStyles';
import { guardarResultadosTest_18 } from '../../api/TestApi';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTranslation } from "../../locales";
import { useIsFocused } from '@react-navigation/native';

import cara1 from '../../../assets/images/Caras/cara1.png';
import cara2 from '../../../assets/images/Caras/cara2.png';
import cara3 from '../../../assets/images/Caras/cara3.png';
import cara4 from '../../../assets/images/Caras/cara4.png';
import cara5 from '../../../assets/images/Caras/cara5.png';
import cara6 from '../../../assets/images/Caras/cara6.png';
import cara7 from '../../../assets/images/Caras/cara7.png';
import cara8 from '../../../assets/images/Caras/cara8.png';
import cara9 from '../../../assets/images/Caras/cara9.png';
import cara10 from '../../../assets/images/Caras/cara10.png';
import cara11 from '../../../assets/images/Caras/cara11.png';
import cara13 from '../../../assets/images/Caras/cara13.png';
import cara14 from '../../../assets/images/Caras/cara14.png';
import cara15 from '../../../assets/images/Caras/cara15.png';
import cara16 from '../../../assets/images/Caras/cara16.png';
import cara17 from '../../../assets/images/Caras/cara17.png';
import cara18 from '../../../assets/images/Caras/cara18.png';

// Función para mezclar el orden de las caras
const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
};

const Test_18 = ({ navigation, route }) => {
    const [modalVisible, setModalVisible] = useState(true);
    const [indiceCaraActual, setIndiceCaraActual] = useState(0);
    const [carasReconocidasCorrectamente, setCarasReconocidasCorrectamente] = useState(0);
    const [carasIncorrectamenteReconocidas, setCarasIncorrectamenteReconocidas] = useState(0);
    const [nombresReconocidosCorrectamente, setNombresReconocidosCorrectamente] = useState(0);
    const [mostrarNombre, setMostrarNombre] = useState(false);
    const [mostrarBotonesValidacion, setMostrarBotonesValidacion] = useState(false);
    const [mostrarBotonesSN, setMostrarBotonesSN] = useState(true);

    const [todasLasCarasAleatorias, setTodasLasCarasAleatorias] = useState([]);

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

    const carasConNombres = [
        { id: 1, nombre: translations.pr08Nombre1, imagen: cara1 },
        { id: 2, nombre: translations.pr08Nombre2, imagen: cara2 },
        { id: 3, nombre: translations.pr08Nombre3, imagen: cara3 },
        { id: 4, nombre: translations.pr08Nombre4, imagen: cara4 },
        { id: 5, nombre: translations.pr08Nombre5, imagen: cara5 },
        { id: 6, nombre: translations.pr08Nombre6, imagen: cara6 },
        { id: 7, nombre: translations.pr08Nombre7, imagen: cara7 },
        { id: 8, nombre: translations.pr08Nombre8, imagen: cara8 },
        { id: 9, nombre: translations.pr08Nombre9, imagen: cara9 },
    ];

    const todasLasCaras = [
        ...carasConNombres,
        { id: 10, imagen: cara10 },
        { id: 11, imagen: cara11 },
        { id: 13, imagen: cara13 },
        { id: 14, imagen: cara14 },
        { id: 15, imagen: cara15 },
        { id: 16, imagen: cara16 },
        { id: 17, imagen: cara17 },
        { id: 18, imagen: cara18 },
    ];

    useEffect(() => {
        const guardarResultados = async () => {
            await guardarResultadosTest_18(route.params.idSesion, carasReconocidasCorrectamente, carasIncorrectamenteReconocidas, nombresReconocidosCorrectamente);
            navigation.replace('Test_19', { idSesion: route.params.idSesion });
        };

        if (indiceCaraActual === todasLasCaras.length) {
            guardarResultados();
        }
    }, [indiceCaraActual]);

    useEffect(() => {
        // Mezcla las caras al inicio y las guarda en el estado
        const carasAleatorias = shuffleArray([...todasLasCaras]);
        setTodasLasCarasAleatorias(carasAleatorias);
    }, []);

    if (todasLasCarasAleatorias.length === 0) {
        // Asegúrate de que el array no esté vacío
        return null;
    }

    const caraActual = todasLasCarasAleatorias[indiceCaraActual];
    const esCaraConNombre = carasConNombres.some((cara) => cara.id === caraActual?.id);

    const handleRespuestaS = () => {
        if (esCaraConNombre) {
            setCarasReconocidasCorrectamente(prev => prev + 1);
            setMostrarBotonesValidacion(true);
            setMostrarBotonesSN(false);
        } else {
            setCarasIncorrectamenteReconocidas(prev => prev + 1);
            finalizarRespuesta('S');
        }
    };

    const handleRespuestaN = () => {
        if (esCaraConNombre) {
            setCarasIncorrectamenteReconocidas(prev => prev + 1);
        }
        finalizarRespuesta('N');
    };

    const handleMostrarNombre = () => {
        setMostrarNombre(true);
    };

    const handleRespuestaCorrecta = () => {
        setNombresReconocidosCorrectamente(prev => prev + 1);
        avanzarACaraSiguiente();
    };

    const handleRespuestaIncorrecta = () => {
        avanzarACaraSiguiente();
    };

    const avanzarACaraSiguiente = () => {
        setMostrarNombre(false);
        setMostrarBotonesValidacion(false);
        setMostrarBotonesSN(true);
        setIndiceCaraActual(indiceCaraActual + 1);
    };

    const finalizarRespuesta = (respuestaSujeto) => {
        avanzarACaraSiguiente();
    };

    const iniciarTarea = () => {
        setModalVisible(false);
    };

    // Se evita renderizar si ya se ha completado la prueba
    if (indiceCaraActual >= todasLasCaras.length) {
        return null;
    }

    return (
        <View style={stylesComunes.borde_tests}>
            <View style={stylesComunes.contenedor_test}>
                <MenuComponent
                    onToggleVoice={() => { }}
                    onNavigateHome={() => navigation.navigate('Pacientes')}
                    onNavigateNext={() => navigation.navigate('Test_19', { idSesion: route.params.idSesion })}
                    onNavigatePrevious={() => navigation.navigate('Test_17', { idSesion: route.params.idSesion })}
                />
                <InstruccionesModal
                    visible={modalVisible}
                    onClose={iniciarTarea}
                    title={translations.Pr18Titulo}
                    instructions={translations.pr18ItemStart}
                />
                {!modalVisible && (
                    <View style={styles.caraContainer}>
                        <Text style={styles.caraTexto}>{translations.pr18CaraVista}</Text>
                        <Image source={caraActual.imagen} style={styles.imagenCara} />

                        {mostrarBotonesSN && (
                            <View style={styles.botonera}>
                                <TouchableOpacity style={styles.boton} onPress={handleRespuestaS}>
                                    <Text style={styles.textoBoton}>{translations.Si}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.boton} onPress={handleRespuestaN}>
                                    <Text style={styles.textoBoton}>{translations.No}</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        {mostrarBotonesValidacion && !mostrarNombre && (
                            <TouchableOpacity style={styles.boton} onPress={handleMostrarNombre}>
                                <Text style={styles.textoBoton}>{translations.pr18MostrarNombre}</Text>
                            </TouchableOpacity>
                        )}

                        {mostrarNombre && (
                            <>
                                <Text style={styles.nombreTexto}>{translations.Nombre}: {carasConNombres.find(cara => cara.id === caraActual.id)?.nombre}</Text>
                                <View style={styles.botonera}>
                                    <TouchableOpacity style={styles.botonCorrecto} onPress={handleRespuestaCorrecta}>
                                        <Text style={styles.textoBoton}>{translations.Correcto}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.botonIncorrecto} onPress={handleRespuestaIncorrecta}>
                                        <Text style={styles.textoBoton}>{translations.Incorrecto}</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    caraContainer: {
        alignItems: 'center',
        marginTop: 50,
    },
    caraTexto: {
        fontSize: 24,
        marginBottom: 20,
    },
    imagenCara: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    nombreTexto: {
        fontSize: 24,
        marginVertical: 20,
    },
    botonera: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    boton: {
        padding: 15,
        marginTop: 30,
        backgroundColor: '#D2B48C',
        borderRadius: 10,
        width: '40%',
        alignItems: 'center',
    },
    botonCorrecto: {
        padding: 15,
        backgroundColor: '#4CAF50',
        borderRadius: 10,
        width: '40%',
        alignItems: 'center',
    },
    botonIncorrecto: {
        padding: 15,
        backgroundColor: '#F44336',
        borderRadius: 10,
        width: '40%',
        alignItems: 'center',
    },
    textoBoton: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default Test_18;