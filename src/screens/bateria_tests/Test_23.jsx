//TODO: mezclar respuestas para que la correcta no sea siempre la primera

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import InstruccionesModal from '../../components/instrucciones';
import MenuComponent from '../../components/menu';
import stylesComunes from '../../styles/ComunStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTranslation } from "../../locales";
import { useIsFocused } from '@react-navigation/native';
import { guardarResultadosTest_23 } from '../../api/TestApi';

const TOTAL_ENSAYOS = 35;

const Test_23 = ({ navigation, route }) => {
    const [modalVisible, setModalVisible] = useState(true);
    const [ensayoActual, setEnsayoActual] = useState(0);
    const [opcionesEnsayo, setOpcionesEnsayo] = useState([]);
    const [respuestas, setRespuestas] = useState([]); // Nuevo array para guardar las respuestas
    const [tiempos, setTiempos] = useState([]); // Nuevo array para guardar los tiempos
    const [correctas, setCorrectas] = useState(0);
    const [errores, setErrores] = useState(0);
    const [excesosDeTiempo, setExcesosDeTiempo] = useState(0);
    const [tiempoRestante, setTiempoRestante] = useState(10);
    const [tiempoInicial, setTiempoInicial] = useState(null);
    const [modalPruebaVisible, setModalPruebaVisible] = useState(false);

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

    useEffect(() => {
        const guardarResultados = async () => {
            try {
                await guardarResultadosTest_23(route.params.idSesion, correctas, errores, excesosDeTiempo, respuestas, tiempos);
                navigation.replace('Test_24', { idSesion: route.params.idSesion });
            } catch (e) {
                console.error('No se pudo guardar los resultados en el almacenamiento interno.');
            }
        };

        if (ensayoActual === TOTAL_ENSAYOS) {
            guardarResultados();
        }
    }, [ensayoActual]);

    useEffect(() => {
        if (translations && Object.keys(translations).length > 0) {
            // Construye la estructura de opcionesEnsayo usando los datos de translations
            const opcionesEnsayoGeneradas = [];
            for (let i = 1; i <= TOTAL_ENSAYOS; i++) {
                const palabras = translations[`pr23txt${i}`]?.split(',').filter(Boolean) || [];
                if (palabras.length > 0) {
                    opcionesEnsayoGeneradas.push({
                        palabra: palabras[0],
                        opciones: palabras.slice(1),
                        correcta: 0, // Ajusta esto según la lógica de cuál es la opción correcta.
                    });
                }
            }
            setOpcionesEnsayo(opcionesEnsayoGeneradas);
        }
    }, [translations]);

    useEffect(() => {
        if (!modalVisible && tiempoRestante > 0) {
            const interval = setInterval(() => {
                setTiempoRestante((prevTiempo) => prevTiempo - 1);
            }, 1000);

            return () => clearInterval(interval);
        } else if (tiempoRestante === 0) {
            manejarExcesoDeTiempo();
        }
    }, [modalVisible, tiempoRestante]);

    useEffect(() => {
        if (!modalVisible) {
            iniciarEnsayo();
        }
    }, [ensayoActual, modalVisible]);

    const iniciarEnsayo = () => {
        setTiempoRestante(10);
        setTiempoInicial(Date.now());
    };

    const manejarExcesoDeTiempo = () => {
        if (ensayoActual >= 2) {
            setExcesosDeTiempo(excesosDeTiempo + 1);
            guardarResultado(null, true);
        } else {
            siguienteEnsayo();
        }
    };

    const manejarRespuesta = (indiceOpcion) => {
        const tiempoRespuesta = Date.now() - tiempoInicial;
        const esCorrecta = indiceOpcion === opcionesEnsayo[ensayoActual].correcta;

        if (ensayoActual >= 2) {
            if (esCorrecta) {
                setCorrectas(correctas + 1);
            } else {
                setErrores(errores + 1);
            }
            guardarResultado(indiceOpcion, false, tiempoRespuesta);
        } else {
            siguienteEnsayo();
        }
    };

    const guardarResultado = (indiceOpcion, excesoDeTiempo, tiempoRespuesta = 10001) => {
        // Añade la respuesta y el tiempo a los arrays correspondientes
        setRespuestas((prevRespuestas) => [
            ...prevRespuestas,
            indiceOpcion !== null ? indiceOpcion + 1 : null,
        ]);

        setTiempos((prevTiempos) => [
            ...prevTiempos,
            excesoDeTiempo ? 10001 : tiempoRespuesta,
        ]);

        siguienteEnsayo();
    };

    const siguienteEnsayo = () => {
        if (ensayoActual === 1) {
            setModalPruebaVisible(true);
        } else {
            setEnsayoActual(ensayoActual + 1);
        }
    };

    const mostrarResultados = () => {
        const resultadosFinales = {
            correctas,
            errores,
            excesosDeTiempo,
            respuestas, // Array de respuestas
            tiempos, // Array de tiempos
        };

        console.log('Resultados Finales:', resultadosFinales);
        Alert.alert('Resultados', JSON.stringify(resultadosFinales));
    };

    const iniciarPruebaReal = () => {
        setModalPruebaVisible(false);
        setEnsayoActual(ensayoActual + 1);
    };

    const iniciarTarea = () => {
        setModalVisible(false);
    };

    // Se evita renderizar si ya se ha completado la prueba
    if (ensayoActual >= TOTAL_ENSAYOS) {
        return null;
    }

    return (
        <View style={stylesComunes.borde_tests}>
            <View style={[stylesComunes.contenedor_test, styles.contenedor_test23]}>
                <MenuComponent
                    onToggleVoice={() => { }}
                    onNavigateHome={() => navigation.replace('Pacientes')}
                    onNavigateNext={() => navigation.replace('Test_24', { idSesion: route.params.idSesion })}
                    onNavigatePrevious={() => navigation.replace('Test_22', { idSesion: route.params.idSesion })}
                />
                <InstruccionesModal
                    visible={modalVisible}
                    onClose={iniciarTarea}
                    title={translations.Pr23Titulo}
                    instructions={translations.pr23ItemStart}
                />
                <InstruccionesModal
                    visible={modalPruebaVisible}
                    onClose={iniciarPruebaReal}
                    title={translations.Pr23Titulo}
                    instructions={translations.ItemStartPrueba}
                />
                {!modalVisible && !modalPruebaVisible && (
                    <View style={styles.container}>
                        <View style={styles.palabraContainer}>
                            <Text style={styles.palabraTexto}>{opcionesEnsayo[ensayoActual]?.palabra}</Text>
                        </View>
                        <View style={styles.opcionesContainer}>
                            {opcionesEnsayo[ensayoActual]?.opciones.map((opcion, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.opcionBoton}
                                    onPress={() => manejarRespuesta(index)}
                                >
                                    <Text style={styles.opcionTexto}>{opcion}</Text>
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
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    contenedor_test23: {
        justifyContent: 'center',
    },
    palabraContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    palabraTexto: {
        fontSize: 50,
        marginBottom: 20,
        marginLeft: 50,
    },
    opcionesContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    opcionBoton: {
        padding: 15,
        backgroundColor: '#D2B48C',
        borderRadius: 10,
        width: '80%',
        marginVertical: 20,
        alignItems: 'center',
    },
    opcionTexto: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default Test_23;