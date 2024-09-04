import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import InstruccionesModal from '../../components/instrucciones';
import MenuComponent from '../../components/menu';
import stylesComunes from '../../styles/ComunStyles';
import { guardarResultadosTest_20 } from '../../api/TestApi';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTranslation } from "../../locales";
import { useIsFocused } from '@react-navigation/native';

const Test_19 = ({ navigation, route }) => {
    const [modalVisible, setModalVisible] = useState(true);
    const [tiempoActual, setTiempoActual] = useState(0);
    const [progress, setProgress] = useState(0);
    const [respuestasCorrectas, setRespuestasCorrectas] = useState(0);
    const [intrusiones, setIntrusiones] = useState(0);
    const [perseveraciones, setPerseveraciones] = useState(0);

    const [respuestasCorrectasTiempos, setRespuestasCorrectasTiempos] = useState([0, 0, 0, 0]);
    const [intrusionesTiempos, setIntrusionesTiempos] = useState([0, 0, 0, 0]);
    const [perseveracionesTiempos, setPerseveracionesTiempos] = useState([0, 0, 0, 0]);

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
        if (!modalVisible && tiempoActual < 60) {
            const interval = setInterval(() => {
                setTiempoActual((prevTiempo) => prevTiempo + 1);
                setProgress((prevProgress) => prevProgress + 1 / 60);
            }, 1000);

            return () => clearInterval(interval);
        } else if (tiempoActual >= 60) {
            guardarResultados();
        }
    }, [modalVisible, tiempoActual]);

    const handleRespuestaCorrecta = () => {
        setRespuestasCorrectas(respuestasCorrectas + 1);
        actualizarContadorPorTiempo(respuestasCorrectasTiempos, setRespuestasCorrectasTiempos, respuestasCorrectas);
    };

    const handleIntrusion = () => {
        setIntrusiones(intrusiones + 1);
        actualizarContadorPorTiempo(intrusionesTiempos, setIntrusionesTiempos, intrusiones);
    };

    const handlePerseveracion = () => {
        setPerseveraciones(perseveraciones + 1);
        actualizarContadorPorTiempo(perseveracionesTiempos, setPerseveracionesTiempos, perseveraciones);
    };

    const actualizarContadorPorTiempo = (contador, setContador, tipo) => {
        let indice = 0;
        if (tiempoActual >= 15) indice = 1;
        if (tiempoActual >= 30) indice = 2;
        if (tiempoActual >= 45) indice = 3;

        const nuevoContador = contador;
        nuevoContador[indice] = tipo + 1;
        setContador(nuevoContador);
    };

    const guardarResultados = async () => {
        await guardarResultadosTest_20(route.params.idSesion, respuestasCorrectasTiempos, intrusionesTiempos, perseveracionesTiempos);
        navigation.replace('Test_21', { idSesion: route.params.idSesion });
    };

    const iniciarTarea = () => {
        setModalVisible(false);
    };

    return (
        <View style={stylesComunes.borde_tests}>
            <View style={stylesComunes.contenedor_test}>
                <MenuComponent
                    
                    onNavigateHome={() => navigation.navigate('Pacientes')}
                    onNavigateNext={() => navigation.navigate('Test_21', { idSesion: route.params.idSesion })}
                    onNavigatePrevious={() => navigation.navigate('Test_19', { idSesion: route.params.idSesion })}
                />
                <InstruccionesModal
                    visible={modalVisible}
                    onClose={iniciarTarea}
                    title={translations.Pr20Titulo}
                    instructions = {translations.pr20ItemStart}
                />
                {!modalVisible && (
                    <View style={styles.container}>
                        <View style={styles.contadorContainer}>
                            <Text style={styles.tiempoTexto}>{tiempoActual}s</Text>
                            <ProgressBar progress={progress} color="#4CAF50" style={styles.progressBar} />
                        </View>

                        <View style={styles.botonera}>
                            <TouchableOpacity style={styles.boton} onPress={handleRespuestaCorrecta}>
                                <Text style={styles.textoBoton}>{translations.RespuestaCorrecta}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.boton} onPress={handleIntrusion}>
                                <Text style={styles.textoBoton}>{translations.Intrusion}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.boton} onPress={handlePerseveracion}>
                                <Text style={styles.textoBoton}>{translations.Perseveracion}</Text>
                            </TouchableOpacity>
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
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 50,
        paddingHorizontal: 20,
        height: '80%',
    },
    contadorContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tiempoTexto: {
        fontSize: 100,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    progressBar: {
        width: '100%',
        height: 10,
    },
    botonera: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        marginLeft: 20,
    },
    boton: {
        padding: 15,
        backgroundColor: '#D2B48C',
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        marginBottom: 15,
    },
    textoBoton: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default Test_19;