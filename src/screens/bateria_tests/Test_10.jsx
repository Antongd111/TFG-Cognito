// FIXME: EL ULTIMO ENSAYO NO SE GUARDA EN LOS RESULTADOS

import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import InstruccionesModal from '../../components/instrucciones';
import MenuComponent from '../../components/menu';
import { Audio } from 'expo-av';
import stylesComunes from '../../styles/ComunStyles';
import pitido from '../../../assets/sounds/pitido_corto.mp3';
import payaso from '../../../assets/images/payaso.png';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTranslation } from "../../locales";
import { useIsFocused } from '@react-navigation/native';


const secuenciasEntrenamiento = [
    [0, 1],
    [0, 1, 2]
];

const secuenciasPrueba = [
    [0, 2],
    [3, 1, 4],
    [6, 5, 2, 7],
    [8, 0, 4, 3, 1],
    [2, 6, 1, 7, 0, 4],
    [5, 8, 2, 1, 7, 6, 0],
    [3, 0, 6, 1, 8, 4, 7, 5],
    [4, 2, 0, 8, 6, 1, 3, 5, 7]
];

const Test_10 = ({ navigation, route }) => {
    const [modalVisible, setModalVisible] = useState(true);
    const [ensayoActual, setEnsayoActual] = useState(0);
    const [fase, setFase] = useState(1);
    const [cuadradosTocados, setCuadradosTocados] = useState([]);
    const [secuenciaActual, setSecuenciaActual] = useState([]);
    const [trayectoMostrado, setTrayectoMostrado] = useState(false);
    const [inicioEnsayo, setInicioEnsayo] = useState(null);
    const [resultadoEnsayos, setResultadoEnsayos] = useState([]);
    const [payasoPosicion, setPayasoPosicion] = useState(null);
    const [mostrarModalInicioPruebas, setMostrarModalInicioPruebas] = useState(false);
    const [aciertos, setAciertos] = useState(0);
    const [fallos, setFallos] = useState(0);

    const cuadrados = Array.from({ length: 9 }, (_, i) => i);

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
        navigation.navigate('Test_11', { idSesion: route.params.idSesion });
    };

    const handleNavigatePrevious = () => {
        navigation.navigate('Test_9', { idSesion: route.params.idSesion });
    };

    /***************** FIN MENÚ DE EVALUACIÓN *****************/

    const playSound = async () => {
        const { sound } = await Audio.Sound.createAsync(pitido);
        await sound.playAsync();
        sound.unloadAsync();
    };

    useEffect(() => {
        if (!modalVisible && !mostrarModalInicioPruebas && trayectoMostrado) {
            const secuencia = fase === 1 ? secuenciasEntrenamiento[ensayoActual] : secuenciasPrueba[ensayoActual];
            setSecuenciaActual(secuencia);
            mostrarTrayecto(secuencia);
        }
    }, [modalVisible, mostrarModalInicioPruebas, trayectoMostrado]);

    const mostrarTrayecto = async (secuencia) => {
        for (let i = 0; i < secuencia.length; i++) {
            setPayasoPosicion(secuencia[i]);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setPayasoPosicion(null);
            await new Promise((resolve) => setTimeout(resolve, 1000));
        }

        await playSound();
        setInicioEnsayo(Date.now());
        setTrayectoMostrado(false);
    };

    const manejarCuadradoTocado = (indice) => {
        setCuadradosTocados(prev => {
            const nuevosCuadrados = [...prev, indice];

            if (nuevosCuadrados.length === secuenciaActual.length) {
                if (fase === 2) {
                    guardarResultados(nuevosCuadrados).then(() => {
                        if (ensayoActual === secuenciasPrueba.length - 1) {
                            setTimeout(() => {
                                mostrarResultados();
                            }, 500); // Espera un momento antes de mostrar los resultados
                        } else {
                            siguienteEnsayo();
                        }
                    });
                } else {
                    siguienteEnsayo();
                }
            }

            return nuevosCuadrados;
        });
    };

    const guardarResultados = async (nuevosCuadrados) => {
        const finEnsayo = Date.now();
        const tiempoEnsayo = finEnsayo - inicioEnsayo;

        const esCorrecto = secuenciaActual.every((cuadrado, i) => nuevosCuadrados[i] === cuadrado);

        await new Promise((resolve) => {
            setResultadoEnsayos(prev => {
                const nuevosResultados = [...prev, { correcto: esCorrecto, secuencia: nuevosCuadrados, tiempo: tiempoEnsayo }];
                resolve(nuevosResultados);
                return nuevosResultados;
            });

            if (esCorrecto) {
                setAciertos(prev => prev + 1);
            } else {
                setFallos(prev => prev + 1);
            }
        });
    };

    const siguienteEnsayo = () => {
        setCuadradosTocados([]);

        if (fase === 1 && ensayoActual < secuenciasEntrenamiento.length - 1) {
            setEnsayoActual(ensayoActual + 1);
            setTrayectoMostrado(true);
        } else if (fase === 1 && ensayoActual === secuenciasEntrenamiento.length - 1) {
            setFase(2);
            setEnsayoActual(0);
            setMostrarModalInicioPruebas(true);
        } else if (fase === 2 && ensayoActual < secuenciasPrueba.length - 1) {
            setEnsayoActual(ensayoActual + 1);
            setTrayectoMostrado(true);
        }
    };

    const mostrarResultados = () => {
        Alert.alert('Resultados', JSON.stringify(resultadoEnsayos));
    };

    const iniciarEnsayo = () => {
        setTrayectoMostrado(true);
        setModalVisible(false);
    };

    const iniciarPruebasReales = () => {
        setMostrarModalInicioPruebas(false);
        setTrayectoMostrado(true);
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
                    onClose={iniciarEnsayo}
                    title="Test 10"
                    instructions={translations.pr10ItemStart}
                />
                <InstruccionesModal
                    visible={mostrarModalInicioPruebas}
                    onClose={iniciarPruebasReales}
                    title="Test 10"
                    instructions={translations.ItemStartPrueba}
                />
                {!modalVisible && !mostrarModalInicioPruebas && (
                    <>
                        <View style={styles.cuadradosContainer}>
                            {cuadrados.map((_, i) => (
                                <TouchableOpacity
                                    key={i}
                                    style={[
                                        styles.cuadrado,
                                        cuadradosTocados.includes(i) && styles.cuadradoTocado
                                    ]}
                                    onPress={() => manejarCuadradoTocado(i)}
                                    disabled={trayectoMostrado}
                                >
                                    {payasoPosicion === i && <Image source={payaso} style={styles.payaso} />}
                                </TouchableOpacity>
                            ))}
                        </View>
                        <View style={styles.debugContainer}>
                            <Text>Secuencia Tocada: {JSON.stringify(cuadradosTocados)}</Text>
                            <Text>Aciertos: {aciertos}</Text>
                            <Text>Fallos: {fallos}</Text>
                        </View>
                    </>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cuadradosContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 300,
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20,
    },
    cuadrado: {
        width: 90,
        height: 90,
        margin: 5,
        backgroundColor: 'cyan',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cuadradoTocado: {
        backgroundColor: 'red',
    },
    payaso: {
        width: 50,
        height: 50,
    },
    debugContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
});

export default Test_10;