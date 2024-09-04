import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import InstruccionesModal from '../../components/instrucciones';
import MenuComponent from '../../components/menu';
import stylesComunes from '../../styles/ComunStyles';
import { guardarResultadosTest_25, guardarResultadosTest_15, guardarResultadosTest_16 } from '../../api/TestApi';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTranslation } from '../../locales';

import dibujo1 from '../../../assets/images/Test_25/casa.png';
import dibujo2 from '../../../assets/images/Test_25/abstracta.png';

const Test_25 = ({ navigation, route }) => {
    const [modalVisible, setModalVisible] = useState(true);
    const [evaluandoDibujo1, setEvaluandoDibujo1] = useState(true);
    const [aristasDibujo1, setAristasDibujo1] = useState(Array(13).fill('0'));
    const [aristasDibujo2, setAristasDibujo2] = useState(Array(21).fill('0'));

    const [imposibilidadDibujo1, setImposibilidadDibujo1] = useState(0); // Cambiado a 0
    const [rechazoDibujo1, setRechazoDibujo1] = useState(0); // Cambiado a 0
    const [perspectivaDibujo1, setPerspectivaDibujo1] = useState(1); // Ya estaba en 0 o 1

    const [imposibilidadDibujo2, setImposibilidadDibujo2] = useState(0); // Cambiado a 0
    const [rechazoDibujo2, setRechazoDibujo2] = useState(0); // Cambiado a 0
    const [perspectivaDibujo2, setPerspectivaDibujo2] = useState(1); // Ya estaba en 0 o 1

    const [evaluacionCompleta, setEvaluacionCompleta] = useState(false);
    const [translations, setTranslations] = useState({});
    const isFocused = useIsFocused();

    useEffect(() => {
        const loadLanguage = async () => {
            const savedLanguage = await AsyncStorage.getItem('language');
            const lang = savedLanguage || 'es';
            const loadedTranslations = getTranslation(lang);
            setTranslations(loadedTranslations);
        };

        if (isFocused) {
            loadLanguage();
        }
    }, [isFocused]);

    useEffect(() => {
        if (!modalVisible) {
            iniciarEvaluacion();
        }
    }, [modalVisible]);

    const iniciarEvaluacion = () => {
        setEvaluandoDibujo1(true);
    };

    const manejarToqueArista = (index, dibujo) => {
        const aristas = dibujo === 1 ? [...aristasDibujo1] : [...aristasDibujo2];
        if (aristas[index] === '0') {
            aristas[index] = '1';
        } else if (aristas[index] === '1') {
            aristas[index] = '2';
        } else {
            aristas[index] = '0';
        }

        if (dibujo === 1) {
            setAristasDibujo1(aristas);
        } else {
            setAristasDibujo2(aristas);
        }
    };

    const manejarToggleImposibilidad = (dibujo) => {
        if (dibujo === 1) {
            setImposibilidadDibujo1(prev => (prev === 0 ? 1 : 0)); // Alternar entre 0 y 1
        } else {
            setImposibilidadDibujo2(prev => (prev === 0 ? 1 : 0)); // Alternar entre 0 y 1
        }
    };

    const manejarToggleRechazo = (dibujo) => {
        if (dibujo === 1) {
            setRechazoDibujo1(prev => (prev === 0 ? 1 : 0)); // Alternar entre 0 y 1
        } else {
            setRechazoDibujo2(prev => (prev === 0 ? 1 : 0)); // Alternar entre 0 y 1
        }
    };

    const manejarPerspectiva = (dibujo, valor) => {
        const valorPerspectiva = valor === 'si' ? 1 : 0;
        if (dibujo === 1) {
            setPerspectivaDibujo1(valorPerspectiva);
        } else {
            setPerspectivaDibujo2(valorPerspectiva);
        }
    };

    const finalizarEvaluacionDibujo1 = () => {
        setEvaluandoDibujo1(false);
    };

    const finalizarEvaluacion = async () => {
        await guardarResultadosTest_15(route.params.idSesion, aristasDibujo1, imposibilidadDibujo1, rechazoDibujo1, perspectivaDibujo1);
        await guardarResultadosTest_16(route.params.idSesion, aristasDibujo2, imposibilidadDibujo2, rechazoDibujo2, perspectivaDibujo2);
        navigation.navigate('Pacientes');
    };

    return (
        <View style={stylesComunes.borde_tests}>
            <View style={stylesComunes.contenedor_test}>
                <MenuComponent
                    onToggleVoice={() => { }}
                    onNavigateHome={() => navigation.navigate('Pacientes')}
                    onNavigateNext={() => navigation.navigate('Pacientes')}
                    onNavigatePrevious={() => navigation.navigate('Test_24', { idSesion: route.params.idSesion })}
                />
                <InstruccionesModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    title="Test 15 - 16"
                    instructions={translations?.pr25Registro}
                />

                {!modalVisible && evaluandoDibujo1 && (
                    <View>
                        <Image source={dibujo1} style={styles.dibujo} />

                        <View style={styles.contenedor_botones}>
                            {aristasDibujo1.map((estado, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.indice}
                                    onPress={() => manejarToqueArista(index, 1)}
                                >
                                    <Text style={styles.textoBotonArista}>{index + 1}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <View style={styles.contenedor_botones}>
                            {aristasDibujo1.map((estado, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.botonArista}
                                    onPress={() => manejarToqueArista(index, 1)}
                                >
                                    <Text style={styles.textoBotonArista}>{estado === '0' ? '🔲' : estado === '1' ? '❌' : '✅'}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <View style={styles.contenedorExtras}>
                            <TouchableOpacity style={[styles.botonExtra, imposibilidadDibujo1 === 1 && styles.botonExtraSeleccionado]} onPress={() => manejarToggleImposibilidad(1)}>
                                <Text style={styles.textoBotonExtra}>{translations.pdfImposibilidad}: {imposibilidadDibujo1 ? translations.Si : translations.No}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.botonExtra, rechazoDibujo1 === 1 && styles.botonExtraSeleccionado]} onPress={() => manejarToggleRechazo(1)}>
                                <Text style={styles.textoBotonExtra}>{translations.pdfRechazo}: {rechazoDibujo1 ? translations.Si : translations.No}</Text>
                            </TouchableOpacity>

                            <View style={styles.perspectivaContainer}>
                                <Text style={styles.textoBotonExtra}>{translations.pdfPerspectiva}:</Text>
                                <TouchableOpacity
                                    style={[styles.botonExtra, perspectivaDibujo1 === 1 && styles.botonExtraSeleccionado]}
                                    onPress={() => manejarPerspectiva(1, 'si')}
                                >
                                    <Text style={styles.textoBotonExtra}>{translations.Si}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.botonExtra, perspectivaDibujo1 === 0 && styles.botonExtraSeleccionado]}
                                    onPress={() => manejarPerspectiva(1, 'no')}
                                >
                                    <Text style={styles.textoBotonExtra}>{translations.No}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.botonOK} onPress={finalizarEvaluacionDibujo1}>
                            <Text style={styles.textoBotonOK}>{translations.InicioTxtAceptar}</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {!modalVisible && !evaluandoDibujo1 && !evaluacionCompleta && (
                    <View>
                        <Image source={dibujo2} style={styles.dibujo} />
                        <View style={styles.contenedor_botones}>
                            {aristasDibujo2.map((estado, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.indice}
                                    onPress={() => manejarToqueArista(index, 2)}
                                >
                                    <Text style={styles.textoBotonArista}>{index + 1}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <View style={styles.contenedor_botones}>
                            {aristasDibujo2.map((estado, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.botonArista}
                                    onPress={() => manejarToqueArista(index, 2)}
                                >
                                    <Text style={styles.textoBotonArista}>{estado === '0' ? '🔲' : estado === '1' ? '❌' : '✅'}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <View style={styles.contenedorExtras}>
                            <TouchableOpacity style={[styles.botonExtra, imposibilidadDibujo2 === 1 && styles.botonExtraSeleccionado]} onPress={() => manejarToggleImposibilidad(2)}>
                                <Text style={styles.textoBotonExtra}>{translations.pdfImposibilidad}: {imposibilidadDibujo2 ? translations.Si : translations.No}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.botonExtra, rechazoDibujo2 === 1 && styles.botonExtraSeleccionado]} onPress={() => manejarToggleRechazo(2)}>
                                <Text style={styles.textoBotonExtra}>{translations.pdfRechazo}: {rechazoDibujo2 ? translations.Si : translations.No}</Text>
                            </TouchableOpacity>

                            <View style={styles.perspectivaContainer}>
                                <Text style={styles.textoBotonExtra}>{translations.pdfPerspectiva}:</Text>
                                <TouchableOpacity
                                    style={[styles.botonExtra, perspectivaDibujo2 === 1 && styles.botonExtraSeleccionado]}
                                    onPress={() => manejarPerspectiva(2, 'si')}
                                >
                                    <Text style={styles.textoBotonExtra}>{translations.Si}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.botonExtra, perspectivaDibujo2 === 0 && styles.botonExtraSeleccionado]}
                                    onPress={() => manejarPerspectiva(2, 'no')}
                                >
                                    <Text style={styles.textoBotonExtra}>{translations.No}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.botonOK} onPress={finalizarEvaluacion}>
                            <Text style={styles.textoBotonOK}>{translations.InicioTxtAceptar}</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    dibujo: {
        height: '60%',
        alignSelf: 'center',
        marginVertical: 20,
        resizeMode: 'contain',
    },
    tituloDibujo: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    botonArista: {
        backgroundColor: '#F2E8E1',
        padding: 10,
        borderRadius: 5,
        width: 40,
        marginTop: 10,
        marginHorizontal: 5,
    },
    indice: {
        padding: 10,
        borderRadius: 5,
        width: 40,
        marginHorizontal: 5,
    },
    textoBotonArista: {
        fontSize: 15,
        textAlign: 'center',
    },
    botonOK: {
        backgroundColor: '#47F251',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        margin: 20,
    },
    textoBotonOK: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    contenedor_botones: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    contenedorExtras: {
        marginVertical: 10,
        paddingHorizontal: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    botonExtra: {
        backgroundColor: '#F2E8E1',
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '20%',
    },
    textoBotonExtra: {
        fontSize: 16,
        textAlign: 'center',
    },
    perspectivaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 10,
    },
    botonExtraSeleccionado: {
        backgroundColor: '#D2B48C',
    },
});

export default Test_25;