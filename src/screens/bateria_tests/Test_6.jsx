//TODO: tiempo ensayo

import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import InstruccionesModal from '../../components/instrucciones';
import MenuComponent from '../../components/menu';
import stylesComunes from '../../styles/ComunStyles';
import { guardarResultadosTest_6 } from '../../api/TestApi';
import pitidoLargo from '../../../assets/sounds/pitido_largo.mp3';
import { Audio } from 'expo-av';

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

const Test_6 = ({ navigation, route }) => {
    const [modalVisible, setModalVisible] = useState(true);
    const [modalEnsayoReal, setModalEnsayoReal] = useState(false);
    const [figuras, setFiguras] = useState([]);
    const [mostrarFiguraCorrecta, setMostrarFiguraCorrecta] = useState(true);
    const [figuraCorrecta, setFiguraCorrecta] = useState(null);
    const [ensayoActual, setEnsayoActual] = useState(0);
    const [figurasSeleccionadas, setFigurasSeleccionadas] = useState([]);
    const [tiempoRestante, setTiempoRestante] = useState(30);
    const [translations, setTranslations] = useState({});
    const isFocused = useIsFocused();
    const imagenesFiguras = { figura_1, figura_2, figura_3, figura_4, figura_5, figura_6, figura_7, figura_8 };
    const isMountedRef = useRef(true);

    const [contadorSonidos, setContadorSonidos] = useState(0);
    const [faseEscucha, setFaseEscucha] = useState(true);
    const [inputValue, setInputValue] = useState('');
    const [ultimoContadorSonidos, setultimoContadorSonidos] = useState(0);
    const faseEscuchaRef = useRef(faseEscucha);
    const contadorSonidosRef = useRef(contadorSonidos);

    const [correctos, setCorrectos] = useState(0);
    const [incorrectos, setIncorrectos] = useState(0);
    const [aciertosSonidos, setAciertosSonidos] = useState(0);
    const [erroresSonidos, setErroresSonidos] = useState(0);
    const [erroresTiempo, setErroresTiempo] = useState(0);

    /** CARGA DE TRADUCCIONES **************************************/

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
     * Cuando se cierre el modal, inicia el primer ensayo
     */
    useEffect(() => {
        if (!modalVisible) {
            iniciarEnsayo();
        }
    }, [modalVisible]);

    useEffect(() => {
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    /**
     * Actualiza el contador de tiempo cada segundo. Si el tiempo llega a 0, maneja un error de tiempo y pasa al siguiente ensayo.
     */
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

    /**
     * Guarda los resultados cuando se completan los 13 ensayos y navega al siguiente test.
     */
    useEffect(() => {
        const guardarResultados = async () => {
            await guardarResultadosTest_6(route.params.idSesion, correctos, incorrectos, erroresTiempo, aciertosSonidos, erroresSonidos);
            navigation.navigate('Test_7', { idSesion: route.params.idSesion });
        };

        if (ensayoActual === 13) {
            guardarResultados();
        }
    }, [ensayoActual]);

    /**
     * Genera una posición aleatoria para una figura nueva a colocar. 
     * Comprueba si se sobrepone a otra, y genera posiciones hasta que una no se superponga, la cual devuelve.
     * @param {*} figurasExistentes figuras que ya se han colocado
     * @returns 
     */
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

    /**
     * Función para pausar la ejecución durante un período de tiempo determinado
     * @param {number} ms - Milisegundos a esperar
     * @returns Promesa que se resuelve después de los milisegundos especificados
     */
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Actualiza la referencia de faseEscucha cada vez que se modifica.
     */
    useEffect(() => {
        faseEscuchaRef.current = faseEscucha;
    }, [faseEscucha]);

    /**
     * Actualiza la referencia de contadorSonidos cada vez que se modifica.
     */
    useEffect(() => {
        contadorSonidosRef.current = contadorSonidos;
    }, [contadorSonidos]);

    /**
     * Ejecuta los sonidos de manera asíncrona mientras la fase de escucha esté activa.
     */
    const ejecutarSonidos = async () => {

        console.log("Fase de escucha: ", faseEscuchaRef.current);
        do {
            console.log("Ejecutando sonidos");

            setContadorSonidos(contadorSonidosRef.current + 1);

            const { sound } = await Audio.Sound.createAsync(pitidoLargo);

            await sound.playAsync();
            const espera = Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000;
            await sleep(espera);

            if (!isMountedRef.current) {
                await sound.stopAsync();
                break;
            }
            
        } while (faseEscuchaRef.current);

        console.log("Fin de ejecutar sonidos");
        setultimoContadorSonidos(contadorSonidosRef.current);
        setContadorSonidos(0);
    };

    /**
     * Maneja la selección de un número en el panel de entrada de sonido.
     * @param {string} number Número seleccionado
     */
    const handleNumberPress = (number) => {
        setInputValue(inputValue + number);
    };

    /**
     * Verifica si el número de sonidos ingresados es correcto. Si es correcto, se contabiliza un acierto, si no, un error.
     */
    const handleSubmit = () => {

        if (ensayoActual >= 3) {
            if (inputValue == ultimoContadorSonidos) {
                setAciertosSonidos(aciertosSonidos + 1);
            } else {
                setErroresSonidos(erroresSonidos + 1);
            }
        }

        setFaseEscucha(true);

        setInputValue('');
        siguienteEnsayo();

    };

    /**
     * Genera las figuras, asegurando que dos sean correctas y las demás incorrectas.
     */
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

    /**
     * Inicializa variables y funciones para comenzar el ensayo dependiendo del número de ensayo.
     * La fase de entrenamiento tiene dos ensayos y los ensayos reales comienzan después.
     */
    const iniciarEnsayo = () => {
        if (ensayoActual < 2) {
            // Fase de entrenamiento
            if (ensayoActual === 1) {
                setModalEnsayoReal(true);
            } else {
                console.log("Iniciando ensayo");
                generarFiguras();
                setFaseEscucha(true);
                setMostrarFiguraCorrecta(true);
                setFigurasSeleccionadas([]);
                ejecutarSonidos();
                setTiempoRestante(30);
                setTimeout(() => {
                    setMostrarFiguraCorrecta(false);
                }, 2000);
            }
        } else if (ensayoActual < 12) {
            // Ensayos reales
            generarFiguras();
            setFaseEscucha(true);
            setMostrarFiguraCorrecta(true);
            setFigurasSeleccionadas([]);
            ejecutarSonidos();
            setTiempoRestante(30);
            setTimeout(() => {
                setMostrarFiguraCorrecta(false);
            }, 2000);
        }
    };

    /**
     * Maneja la selección de una figura. Si se selecciona una figura correcta, 
     * se verifica si ambas figuras correctas ya están seleccionadas.
     * @param {number} index Índice de la figura seleccionada
     */
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

    /**
     * Maneja una respuesta correcta, deteniendo la fase de escucha y aumentando el contador de correctos.
     */
    const manejarRespuestaCorrecta = () => {
        setFaseEscucha(false);

        let nuevoCorrectos = correctos + 1;

        if (ensayoActual >= 3) setCorrectos(nuevoCorrectos);
    };

    /**
     * Maneja una respuesta incorrecta, aumentando el contador de incorrectos.
     */
    const manejarRespuestaIncorrecta = () => {
        if (ensayoActual >= 3) setIncorrectos(incorrectos + 1);
    };

    /**
     * Maneja el error por tiempo excedido, aumentando el contador de errores de tiempo.
     */
    const manejarErrorDeTiempo = () => {
        if (ensayoActual >= 3) setErroresTiempo(erroresTiempo + 1);
        siguienteEnsayo();
    };

    /**
     * Avanza al siguiente ensayo y reinicia las variables necesarias.
     */
    const siguienteEnsayo = () => {
        setEnsayoActual(ensayoActual + 1);
        iniciarEnsayo();
    };

    return (
        <View style={stylesComunes.borde_tests}>
            <View style={stylesComunes.contenedor_test}>
                <MenuComponent
                    onToggleVoice={() => { }}
                    onNavigateHome={() => navigation.replace('Pacientes')}
                    onNavigateNext={() => navigation.replace('Test_7', { idSesion: route.params.idSesion })}
                    onNavigatePrevious={() => navigation.replace('Test_5', { idSesion: route.params.idSesion })}
                />
                <InstruccionesModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    title={translations.Pr06Titulo}
                    instructions={translations.pr06ItemStart + "\n \n" + translations.ItemStartBasico}
                />
                <InstruccionesModal
                    visible={modalEnsayoReal}
                    onClose={() => {
                        setModalEnsayoReal(false);
                        setEnsayoActual(3); // Iniciar los ensayos reales
                        iniciarEnsayo();
                    }}
                    title={translations.Pr06Titulo}
                    instructions={translations.ItemStartPrueba}
                />
                {!modalVisible && mostrarFiguraCorrecta && figuraCorrecta && (
                    <View style={styles.figuraCorrecta}>
                        <Image
                            source={figuraCorrecta}
                            style={{ height: figuraSize * 2, width: figuraSize * 2 }}
                        />
                    </View>
                )}
                {!modalVisible && !mostrarFiguraCorrecta && faseEscucha && (
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
                {!modalVisible && !mostrarFiguraCorrecta && !faseEscucha && (
                    <View style={styles.numberPad}>
                        <Text style={styles.inputDisplay}>{inputValue}</Text>
                        <View style={styles.row}>
                            {['1', '2', '3'].map(number => (
                                <TouchableOpacity key={number} style={styles.numberButton} onPress={() => handleNumberPress(number)}>
                                    <Text style={styles.numberText}>{number}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <View style={styles.row}>
                            {['4', '5', '6'].map(number => (
                                <TouchableOpacity key={number} style={styles.numberButton} onPress={() => handleNumberPress(number)}>
                                    <Text style={styles.numberText}>{number}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <View style={styles.row}>
                            {['7', '8', '9'].map(number => (
                                <TouchableOpacity key={number} style={styles.numberButton} onPress={() => handleNumberPress(number)}>
                                    <Text style={styles.numberText}>{number}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <View style={styles.row}>
                            <TouchableOpacity style={styles.numberButton} onPress={() => setInputSonidos(inputSonidos.slice(0, -1))}>
                                <Text style={styles.numberText}>Del</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.numberButton} onPress={() => handleNumberPress('0')}>
                                <Text style={styles.numberText}>0</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.numberButton} onPress={handleSubmit}>
                                <Text style={styles.numberText}>OK</Text>
                            </TouchableOpacity>
                        </View>
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
    },
    numberPad: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        borderWidth: 1,
        width: '40%',
        borderRadius: 10,
        borderColor: '#ccc',
        height: '80%',
        alignSelf: 'center',
    },
    inputDisplay: {
        fontSize: 24,
        marginBottom: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        width: '70%',
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginTop: 10,
    },
    numberButton: {
        backgroundColor: '#F2E8E1',
        padding: 30,
        borderRadius: 30,
        marginHorizontal: 20,
    },
    numberText: {
        fontSize: 20,
    },
});

export default Test_6;