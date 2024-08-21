

import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import InstruccionesModal from '../../components/instrucciones';
import MenuComponent from '../../components/menu';
import stylesComunes from '../../styles/ComunStyles';
import { guardarResultadosTest_5 } from '../../api/TestApi';

import figura_1 from '../../../assets/images/Test_5/figura_1.png';
import figura_2 from '../../../assets/images/Test_5/figura_2.png';
import figura_3 from '../../../assets/images/Test_5/figura_3.png';
import figura_4 from '../../../assets/images/Test_5/figura_4.png';
import figura_5 from '../../../assets/images/Test_5/figura_5.png';
import figura_6 from '../../../assets/images/Test_5/figura_6.png';
import figura_7 from '../../../assets/images/Test_5/figura_7.png';
import figura_8 from '../../../assets/images/Test_5/figura_8.png';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTranslation } from "../../locales";
import { useIsFocused } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const figuraSize = 50;
const margenLateral = 100;
const margenVertical = 50;

const Test_5 = ({ navigation, route }) => {
    const [modalVisible, setModalVisible] = useState(true);
    const [modalEnsayoReal, setModalEnsayoReal] = useState(false);
    const [figuras, setFiguras] = useState([]);
    const [mostrarFiguraCorrecta, setMostrarFiguraCorrecta] = useState(true);
    const [figuraCorrecta, setFiguraCorrecta] = useState(null);
    const [ensayoActual, setEnsayoActual] = useState(0);
    const [figurasSeleccionadas, setFigurasSeleccionadas] = useState([]);
    const [tiempoRestante, setTiempoRestante] = useState(30);
    const [correctos, setCorrectos] = useState(0);
    const [incorrectos, setIncorrectos] = useState(0);
    const [erroresTiempo, setErroresTiempo] = useState(0);
    const [translations, setTranslations] = useState({});
    const isFocused = useIsFocused();
    const imagenesFiguras = { figura_1, figura_2, figura_3, figura_4, figura_5, figura_6, figura_7, figura_8 };

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

    useEffect(() => {
        if (!modalVisible) {
            iniciarEnsayo();
        }
    }, [modalVisible]);

    useEffect(() => {
        if (!mostrarFiguraCorrecta && tiempoRestante > 0) {
            const timer = setInterval(() => {
                setTiempoRestante(prev => prev - 1);
            }, 1000);

            return () => clearInterval(timer);
        } else if (tiempoRestante === 0) {
            manejarErrorDeTiempo();
        }
    }, [tiempoRestante, mostrarFiguraCorrecta]);

    useEffect(() => {
        const guardarResultados = async () => {
            await guardarResultadosTest_5(route.params.idSesion, correctos, incorrectos, erroresTiempo);
            navigation.navigate('Test_6', { idSesion: route.params.idSesion });
        };

        if (ensayoActual === 13) {
            guardarResultados();
        }
    }, [ensayoActual]);

    const generarPosicionAleatoria = (figurasExistentes) => {
        let newX, newY, overlap;
        do {
            overlap = false;
            newX = Math.floor(Math.random() * (screenWidth - figuraSize - margenLateral * 2)) + margenLateral;
            newY = Math.floor(Math.random() * (screenHeight - figuraSize - margenVertical * 2)) + margenVertical;

            overlap = figurasExistentes.some(fig => Math.abs(newX - fig.x) < figuraSize && Math.abs(newY - fig.y) < figuraSize);
        } while (overlap);
        return { x: newX, y: newY };
    };

    const generarFiguras = () => {
        const nuevasFiguras = [];
        const tipos = ["figura_1", "figura_2", "figura_3", "figura_4", "figura_5", "figura_6", "figura_7", "figura_8"];
        const indiceCorrecto = Math.floor(Math.random() * tipos.length);

        // Asegurarse de tener exactamente 2 figuras correctas
        for (let i = 0; i < 2; i++) {
            const { x, y } = generarPosicionAleatoria(nuevasFiguras);
            nuevasFiguras.push({
                tipo: tipos[indiceCorrecto],
                x,
                y,
                esCorrecta: true,
                seleccionada: false
            });
        }

        // Generar figuras incorrectas
        for (let i = 0; i < 18; i++) {
            const { x, y } = generarPosicionAleatoria(nuevasFiguras);
            let tipoIncorrecto;
            do {
                tipoIncorrecto = tipos[Math.floor(Math.random() * tipos.length)];
            } while (tipoIncorrecto === tipos[indiceCorrecto]);

            nuevasFiguras.push({
                tipo: tipoIncorrecto,
                x,
                y,
                esCorrecta: false,
                seleccionada: false
            });
        }

        setFiguras(nuevasFiguras);
        setFiguraCorrecta(imagenesFiguras[tipos[indiceCorrecto]]);
    };

    const iniciarEnsayo = () => {
        if (ensayoActual < 2) {
            // Fase de entrenamiento
            if (ensayoActual === 1) {
                setModalEnsayoReal(true);
            } else {
                generarFiguras();
                setMostrarFiguraCorrecta(true);
                setFigurasSeleccionadas([]);
                setTiempoRestante(30);
                setTimeout(() => {
                    setMostrarFiguraCorrecta(false);
                }, 2000);
            }
        } else if (ensayoActual < 12) {
            // Ensayos reales
            generarFiguras();
            setMostrarFiguraCorrecta(true);
            setFigurasSeleccionadas([]);
            setTiempoRestante(30);
            setTimeout(() => {
                setMostrarFiguraCorrecta(false);
            }, 2000);
        }
    };

    const manejarSeleccionFigura = (index) => {
        const figura = figuras[index];
        if (figura.seleccionada) return;

        const nuevasFiguras = [...figuras];
        nuevasFiguras[index].seleccionada = true;
        setFiguras(nuevasFiguras);

        const nuevasSeleccionadas = [...figurasSeleccionadas, figura];
        setFigurasSeleccionadas(nuevasSeleccionadas);

        if (figura.esCorrecta) {
            if (nuevasSeleccionadas.filter(fig => fig.esCorrecta).length === 2) {
                manejarRespuestaCorrecta();
            }
        } else {
            manejarRespuestaIncorrecta();
        }
    };

    const manejarRespuestaCorrecta = () => {
        let nuevoCorrectos = correctos + 1;
        if (ensayoActual >= 3) setCorrectos(nuevoCorrectos) // Solo contar en ensayos reales
        siguienteEnsayo();
    };

    const manejarRespuestaIncorrecta = () => {
        if (ensayoActual >= 3) setIncorrectos(incorrectos + 1); // Solo contar en ensayos reales
    };

    const manejarErrorDeTiempo = () => {
        if (ensayoActual >= 3) setErroresTiempo(erroresTiempo + 1); // Solo contar en ensayos reales
        siguienteEnsayo();
    };

    const siguienteEnsayo = () => {
        setEnsayoActual(ensayoActual + 1);
        iniciarEnsayo();
    };

    return (
        <View style={stylesComunes.borde_tests}>
            <View style={stylesComunes.contenedor_test}>
                <MenuComponent
                    onToggleVoice={() => { }}
                    onNavigateHome={() => navigation.navigate('Pacientes')}
                    onNavigateNext={() => navigation.navigate('Test_6', { idSesion: route.params.idSesion })}
                    onNavigatePrevious={() => navigation.navigate('Test_4', { idSesion: route.params.idSesion })}
                />
                <InstruccionesModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    title="Test 5"
                    instructions={translations.pr05ItemStart + "\n \n" + translations.ItemStartBasico}
                />
                <InstruccionesModal
                    visible={modalEnsayoReal}
                    onClose={() => {
                        setModalEnsayoReal(false);
                        setEnsayoActual(3); // Iniciar los ensayos reales
                        iniciarEnsayo();
                    }}
                    title= "Test 5"
                    instructions = {translations.ItemStartBasico}
                />
                {!modalVisible && mostrarFiguraCorrecta && figuraCorrecta && (
                    <View style={styles.figuraCorrecta}>
                        <Image
                            source={figuraCorrecta}
                            style={{ height: figuraSize * 2, width: figuraSize * 2 }}
                        />
                    </View>
                )}
                {!modalVisible && !mostrarFiguraCorrecta && (
                    <View>
                        {figuras.map((fig, index) => (
                            <TouchableOpacity
                                key={index}
                                style={{ position: 'absolute', left: fig.x, top: fig.y }}
                                onPress={() => manejarSeleccionFigura(index)}
                            >
                                <Image
                                    source={imagenesFiguras[fig.tipo]}
                                    style={{
                                        height: figuraSize,
                                        width: figuraSize,
                                        tintColor: fig.seleccionada ? (fig.esCorrecta ? 'blue' : 'red') : 'red'
                                    }}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    figuraCorrecta: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -50 }, { translateY: -50 }],
        zIndex: 1
    }
});

export default Test_5;