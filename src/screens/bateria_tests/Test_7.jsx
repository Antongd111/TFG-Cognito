import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import InstruccionesModal from '../../components/instrucciones';
import MenuComponent from '../../components/menu';
import stylesComunes from '../../styles/ComunStyles';
import { guardarResultadosTest_7 } from '../../api/TestApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTranslation } from "../../locales";
import { useIsFocused } from '@react-navigation/native';

const Test_7 = ({ navigation, route }) => {
    const [modalVisible, setModalVisible] = useState(true);
    const [testRealVisible, setTestRealVisible] = useState(false);
    const [ensayoActual, setEnsayoActual] = useState(0);
    const [practica, setPractica] = useState(true);
    const [fase, setFase] = useState(1);
    const [colorNombre, setColorNombre] = useState('');
    const [colorFuente, setColorFuente] = useState('');
    const [correctas, setCorrectas] = useState(0);
    const [errores, setErrores] = useState(0);
    const [tiempoInicioFase, setTiempoInicioFase] = useState(0);
    const [tiempoTotal, setTiempoTotal] = useState(0);
    const [tiemposCorrectos, setTiemposCorrectos] = useState([]);
    const [tiempoParte, setTiempoParte] = useState(0);
    const [cronometroActivo, setCronometroActivo] = useState(false);
    const [tiempoFaseTerminado, setTiempoFaseTerminado] = useState(false);
    const [faseCompletada, setFaseCompletada] = useState(false);

    const colorAnteriorRef = useRef('');
    const isFocused = useIsFocused();

    const [translations, setTranslations] = useState({});
    useEffect(() => {
        const loadLanguage = async () => {
            const savedLanguage = await AsyncStorage.getItem('language');
            const lang = savedLanguage || 'es';
            setTranslations(getTranslation(lang));
        };

        if (isFocused) loadLanguage();
    }, [isFocused]);

    const respuestas = [translations.pr07Rojo, translations.pr07Verde, translations.pr07Azul, translations.pr07Amarillo];
    const colores = [translations.pr07Rojo, translations.pr07Verde, translations.pr07Azul, translations.pr07Amarillo];
    const colorMap = {
        [translations.pr07Rojo]: 'red',
        [translations.pr07Verde]: 'green',
        [translations.pr07Azul]: 'blue',
        [translations.pr07Amarillo]: 'yellow'
    };

    useEffect(() => {
        if (!modalVisible && !testRealVisible) {
            iniciarEnsayo();
        }
    }, [modalVisible, testRealVisible]);

    useEffect(() => {
        if (cronometroActivo) {
            const intervalo = setInterval(() => {
                setTiempoParte((prev) => prev + 1000);
            }, 1000);
            return () => clearInterval(intervalo);
        }
    }, [cronometroActivo]);

    useEffect(() => {
        if (tiempoParte >= 5000) {
            setCronometroActivo(false);
            setTiempoFaseTerminado(true);
        }
    }, [tiempoParte]);

    useEffect(() => {
        if (fase > 3) {
            guardarResultados();
        }
    }, [faseCompletada]);

    const guardarResultados = async () => {
        console.log('Guardando resultados del test 7...');
        const tiempoMedio = tiemposCorrectos.length > 0 ? tiemposCorrectos.reduce((a, b) => a + b, 0) / tiemposCorrectos.length : 0;
        await guardarResultadosTest_7(route.params.idSesion, correctas, errores, tiempoMedio);
        navigation.navigate('Test_8', { idSesion: route.params.idSesion });
    };

    const iniciarEnsayo = () => {
        let colorAleatorio;
        let colorFuenteAleatorio;

        do {
            colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
        } while (colorAleatorio === colorAnteriorRef.current);

        do {
            colorFuenteAleatorio = colores[Math.floor(Math.random() * colores.length)];
        } while (fase === 3 && colorFuenteAleatorio === colorAleatorio);

        colorAnteriorRef.current = colorAleatorio;
        setColorNombre(colorAleatorio);
        setColorFuente(fase === 3 ? colorMap[colorFuenteAleatorio] : '');
    };

    const handleRespuesta = (respuesta) => {
        const tiempoRespuesta = Date.now() - tiempoInicioFase;
        const esCorrecta = fase === 3 ? colorMap[respuesta] === colorFuente : respuesta === colorNombre;

        if (!tiempoFaseTerminado) {
            if (esCorrecta) {
                if (!practica) {
                    setCorrectas(prev => prev + 1);
                    setTiempoTotal(prev => prev + tiempoRespuesta);
                    setTiemposCorrectos([...tiemposCorrectos, tiempoRespuesta]);
                }
            } else {
                if (!practica) setErrores(prev => prev + 1);
            }
        }

        if (ensayoActual < 1) {
            setEnsayoActual(prev => prev + 1);
            iniciarEnsayo();
        } else {
            if (practica) {
                setEnsayoActual(0);
                setPractica(false);
                setTestRealVisible(true);
            } else if (!tiempoFaseTerminado) {
                setEnsayoActual(prev => prev + 1);
                iniciarEnsayo();
            } else {
                if (fase < 3) {
                    avanzarFase();
                } else if (fase === 3 && !faseCompletada) {
                    setFaseCompletada(true);
                }
            }
        }
    };

    const iniciarTestReal = () => {
        setTiempoInicioFase(Date.now());
        setTestRealVisible(false);
        setTiempoParte(0);
        setTiempoFaseTerminado(false);
        setCronometroActivo(true);
        iniciarEnsayo();
    };

    const avanzarFase = () => {
        setFase(prevFase => prevFase + 1);
        if (fase < 3) {
            setPractica(true);
            setModalVisible(true);
            setEnsayoActual(0);
            setCorrectas(0);
            setErrores(0);
            setTiempoTotal(0);
            setTiemposCorrectos([]);
            setTiempoParte(0);
            setTiempoFaseTerminado(false);
        } else {
            setFaseCompletada(true); // Marcar la fase como completada correctamente
        }
    };

    return (
        <View style={stylesComunes.borde_tests}>
            <View style={stylesComunes.contenedor_test}>
                <MenuComponent
                    onToggleVoice={() => { }}
                    onNavigateHome={() => navigation.navigate('Pacientes')}
                    onNavigateNext={() => navigation.navigate('Test_8', { idSesion: route.params.idSesion })}
                    onNavigatePrevious={() => navigation.navigate('Test_6', { idSesion: route.params.idSesion })}
                />
                <InstruccionesModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    title={`Test 7 - ${fase}`}
                    instructions={fase === 1 ? translations.pr07ItemStart :
                        fase === 2 ? translations.pr07ItemStart2 :
                        fase === 3 ? translations.pr07ItemStart3 : ''}
                />
                <InstruccionesModal
                    visible={testRealVisible}
                    onClose={iniciarTestReal}
                    title="Test 7"
                    instructions={translations.ItemStartPrueba}
                />
                {!modalVisible && !testRealVisible && (
                    <View style={styles.contenedor}>
                        <Text style={styles.cronometroText}>Tiempo transcurrido: {Math.floor(tiempoParte / 1000)} s</Text>
                        {fase === 1 ? (
                            <Text style={styles.colorNombre}>{colorNombre}</Text>
                        ) : fase === 2 ? (
                            <View style={[styles.rectanguloColor, { backgroundColor: colorMap[colorNombre] }]} />
                        ) : (
                            <Text style={[styles.colorNombre, { color: colorFuente }]}>{colorNombre}</Text>
                        )}
                        <View style={styles.opciones}>
                            {respuestas.map((respuesta, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.boton}
                                    onPress={() => handleRespuesta(respuesta)}
                                >
                                    <Text style={styles.textoBoton}>{respuesta}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    colorNombre: {
        fontSize: 40,
        marginBottom: 20,
    },
    rectanguloColor: {
        width: 100,
        height: 100,
        marginBottom: 20,
        borderRadius: 10,
    },
    opciones: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    boton: {
        backgroundColor: '#DDDDDD',
        padding: 15,
        margin: 10,
        borderRadius: 5,
    },
    textoBoton: {
        fontSize: 20,
    },
    cronometroText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    }
});

export default Test_7;