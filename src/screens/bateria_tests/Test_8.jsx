import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import InstruccionesModal from '../../components/instrucciones';
import MenuComponent from '../../components/menu';
import stylesComunes from '../../styles/ComunStyles';
import correct from '../../../assets/images/correct.png';
import incorrect from '../../../assets/images/incorrect.png';
import { guardarResultadosTest_8 } from '../../api/TestApi';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTranslation } from "../../locales";
import { useIsFocused } from '@react-navigation/native';

const Test_8 = ({ navigation, route }) => {
    const [modalVisible, setModalVisible] = useState(true);
    const [ensayoActual, setEnsayoActual] = useState(0);
    const [fase, setFase] = useState(1); // 1 para la primera parte, 2 para la segunda parte
    const [pronunciacionesCorrectas, setPronunciacionesCorrectas] = useState(0);
    const [pronunciacionesIncorrectas, setPronunciacionesIncorrectas] = useState(0);
    const [recordadasCorrectas, setRecordadasCorrectas] = useState(0);
    const [intrusiones, setIntrusiones] = useState(0);
    const [perseveraciones, setPerseveraciones] = useState(0);
    const [rechazos, setRechazos] = useState(0);
    const [nombresMemorizados, setNombresMemorizados] = useState([]);
    const [nombreActual, setNombreActual] = useState('');
    const [mostrarNombres, setMostrarNombres] = useState(false);
    const [memorizarNombres, setMemorizarNombres] = useState(false);
    const [faseCompletada, setFaseCompletada] = useState(false); // Nuevo estado para controlar la finalización de la fase

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
        navigation.replace('Pacientes');
    };

    const handleNavigateNext = () => {
        navigation.replace('Test_9', { idSesion: route.params.idSesion });
    };

    const handleNavigatePrevious = () => {
        navigation.replace('Test_7', { idSesion: route.params.idSesion });
    };

    /***************** FIN MENÚ DE EVALUACIÓN *****************/

    const nombres = [
        translations.pr08Nombre1, translations.pr08Nombre2, translations.pr08Nombre3,
        translations.pr08Nombre4, translations.pr08Nombre5, translations.pr08Nombre6,
        translations.pr08Nombre7, translations.pr08Nombre8, translations.pr08Nombre9
    ];

    useEffect(() => {
        if (fase === 2 && memorizarNombres && !faseCompletada) {
            if (ensayoActual < nombres.length) {
                setNombreActual(nombres[ensayoActual]);
                const timer = setTimeout(() => {
                    setEnsayoActual(ensayoActual + 1);
                }, 3000);
                return () => clearTimeout(timer);
            } else {
                // Fase 2 completada
                setMemorizarNombres(false);
                setFaseCompletada(true); // Indicamos que la fase ha terminado
                setModalVisible(true); // Mostramos el modal de la siguiente parte
            }
        }
    }, [fase, memorizarNombres, ensayoActual]);

    const manejarRespuesta = (respuesta) => {
        if (respuesta === 'correcto') {
            setPronunciacionesCorrectas(pronunciacionesCorrectas + 1);
        } else {
            setPronunciacionesIncorrectas(pronunciacionesIncorrectas + 1);
        }
        siguienteNombre();
    };

    const siguienteNombre = () => {
        if (ensayoActual < nombres.length - 1) {
            setEnsayoActual(ensayoActual + 1);
        } else {
            if (fase === 1) {
                // Al finalizar la fase 1, mostrar el modal antes de iniciar la fase 2
                setModalVisible(true);
                setFase(2);
            }
        }
    };

    const iniciarFase2 = () => {
        setMemorizarNombres(true);
        setEnsayoActual(0);
        setFaseCompletada(false); // Reiniciar el control de la fase
        setModalVisible(false);
    };

    const iniciarEvaluacion = () => {
        setModalVisible(false);
        setMostrarNombres(true);
    };

    const manejarSeleccionNombre = (nombre) => {
        if (nombresMemorizados.includes(nombre)) {
            setNombresMemorizados(nombresMemorizados.filter(item => item !== nombre));
            setRecordadasCorrectas(recordadasCorrectas - 1);
        } else {
            setNombresMemorizados([...nombresMemorizados, nombre]);
            setRecordadasCorrectas(recordadasCorrectas + 1);
        }
    };

    const validarFase2 = async () => { 
        await guardarResultadosTest_8(route.params.idSesion, pronunciacionesCorrectas, pronunciacionesIncorrectas, recordadasCorrectas, intrusiones, perseveraciones, rechazos);
        navigation.replace('Test_9', { idSesion: route.params.idSesion });
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
                {fase === 1 && (
                    <InstruccionesModal
                        visible={modalVisible}
                        onClose={() => setModalVisible(false)}
                        title="Test 8 - 1"
                        instructions={translations.pr08ItemStart}
                    />
                )}
                {fase === 2 && !memorizarNombres && !faseCompletada && (
                    <InstruccionesModal
                        visible={modalVisible}
                        onClose={iniciarFase2} // Iniciar memorización al cerrar el modal
                        title="Test 8 - 2"
                        instructions={translations.pr08ItemStart2}
                    />
                )}
                {fase === 2 && faseCompletada && !mostrarNombres && (
                    <InstruccionesModal
                        visible={modalVisible}
                        onClose={iniciarEvaluacion}
                        title="Test 8 - 3"
                        instructions={translations.pr08ItemStart3}
                    />
                )}
                {!modalVisible && fase === 1 && (
                    <View style={styles.contenedorCentrado}>
                        <View style={styles.tarjetaFrase}>
                            <Text style={styles.texto_instruccion}>
                                {nombres[ensayoActual]}
                            </Text>
                            <View style={styles.botones}>
                                <TouchableOpacity
                                    style={styles.botonAcierto}
                                    onPress={() => manejarRespuesta('correcto')}
                                >
                                    <Image source={correct} style={{ width: 50, height: 50 }} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.botonFallo}
                                    onPress={() => manejarRespuesta('incorrecto')}
                                >
                                    <Image source={incorrect} style={{ width: 50, height: 50 }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
                {!modalVisible && fase === 2 && memorizarNombres && (
                    <View style={styles.contenedorCentrado}>
                        <Text style={styles.texto_instruccion}>{nombreActual}</Text>
                    </View>
                )}
                {!modalVisible && fase === 2 && mostrarNombres && (
                    <View style={styles.contenedor}>
                        {nombres.map((nombre, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[styles.nombre, nombresMemorizados.includes(nombre) && styles.nombreSeleccionado]}
                                onPress={() => manejarSeleccionNombre(nombre)}
                            >
                                <Text style={styles.textoNombre}>{nombre}</Text>
                            </TouchableOpacity>
                        ))}
                        <View style={styles.botonesFase2}>
                            <TouchableOpacity
                                style={stylesComunes.boton}
                                onPress={() => setIntrusiones(intrusiones + 1)}
                            >
                                <Text style={stylesComunes.textoBoton}>{translations.Intrusion}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={stylesComunes.boton}
                                onPress={() => setPerseveraciones(perseveraciones + 1)}
                            >
                                <Text style={stylesComunes.textoBoton}>{translations.Perseveracion}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={stylesComunes.boton}
                                onPress={() => setRechazos(rechazos + 1)}
                            >
                                <Text style={stylesComunes.textoBoton}>{translations.Rechazo}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={stylesComunes.boton}
                                onPress={validarFase2}
                            >
                                <Text style={stylesComunes.textoBoton}>{translations.Validar}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    contenedorCentrado: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tarjetaFrase: {
        borderWidth: 2,
        borderColor: '#D2B48C',
        borderRadius: 10,
        width: '90%',
        height: '30%',
        alignSelf: 'center',
        marginTop: 0,
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'space-between',
        alignItems: 'center',
    },
    texto_instruccion: {
        fontSize: 70,
        textAlign: 'center',
        marginLeft: 20,
    },
    botones: {
        display: 'flex',
        flexDirection: 'column',
    },
    botonAcierto: {
        width: 100,
        height: '50%',
        alignSelf: 'center',
        backgroundColor: '#47F251',
        borderTopRightRadius: 8,
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
    },
    botonFallo: {
        width: 100,
        height: '50%',
        alignSelf: 'center',
        backgroundColor: '#F04343',
        borderBottomRightRadius: 8,
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
    },
    nombre: {
        padding: 10,
        margin: 5,
        backgroundColor: '#DDDDDD',
        borderRadius: 5,
        width: 150,
        alignItems: 'center',
    },
    nombreSeleccionado: {
        backgroundColor: '#AAAAAA',
    },
    textoNombre: {
        fontSize: 20,
    },
    contenedor: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    botonesFase2: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
});

export default Test_8;