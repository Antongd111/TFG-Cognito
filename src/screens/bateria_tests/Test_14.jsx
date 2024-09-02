import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import InstruccionesModal from '../../components/instrucciones';
import MenuComponent from '../../components/menu';
import stylesComunes from '../../styles/ComunStyles';
import { guardarResultadosTest_14 } from '../../api/TestApi';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTranslation } from "../../locales";
import { useIsFocused } from '@react-navigation/native';


const images = {
    pr14_t10_1: require('../../../assets/images/Test_14/pr14_t10_1.png'),
    pr14_t10_2: require('../../../assets/images/Test_14/pr14_t10_2.png'),
    pr14_t10_3: require('../../../assets/images/Test_14/pr14_t10_3.png'),
    pr14_t10_4: require('../../../assets/images/Test_14/pr14_t10_4.png'),
    pr14_t10_5: require('../../../assets/images/Test_14/pr14_t10_5.png'),
    pr14_t10_6: require('../../../assets/images/Test_14/pr14_t10_6.png'),
    pr14_t10_7: require('../../../assets/images/Test_14/pr14_t10_7.png'),
    pr14_t11_1: require('../../../assets/images/Test_14/pr14_t11_1.png'),
    pr14_t11_2: require('../../../assets/images/Test_14/pr14_t11_2.png'),
    pr14_t11_3: require('../../../assets/images/Test_14/pr14_t11_3.png'),
    pr14_t11_4: require('../../../assets/images/Test_14/pr14_t11_4.png'),
    pr14_t11_5: require('../../../assets/images/Test_14/pr14_t11_5.png'),
    pr14_t11_6: require('../../../assets/images/Test_14/pr14_t11_6.png'),
    pr14_t11_7: require('../../../assets/images/Test_14/pr14_t11_7.png'),
    pr14_t12_1: require('../../../assets/images/Test_14/pr14_t12_1.png'),
    pr14_t12_2: require('../../../assets/images/Test_14/pr14_t12_2.png'),
    pr14_t12_3: require('../../../assets/images/Test_14/pr14_t12_3.png'),
    pr14_t12_4: require('../../../assets/images/Test_14/pr14_t12_4.png'),
    pr14_t12_5: require('../../../assets/images/Test_14/pr14_t12_5.png'),
    pr14_t12_6: require('../../../assets/images/Test_14/pr14_t12_6.png'),
    pr14_t12_7: require('../../../assets/images/Test_14/pr14_t12_7.png'),
    pr14_t13_1: require('../../../assets/images/Test_14/pr14_t13_1.png'),
    pr14_t13_2: require('../../../assets/images/Test_14/pr14_t13_2.png'),
    pr14_t13_3: require('../../../assets/images/Test_14/pr14_t13_3.png'),
    pr14_t13_4: require('../../../assets/images/Test_14/pr14_t13_4.png'),
    pr14_t13_5: require('../../../assets/images/Test_14/pr14_t13_5.png'),
    pr14_t13_6: require('../../../assets/images/Test_14/pr14_t13_6.png'),
    pr14_t13_7: require('../../../assets/images/Test_14/pr14_t13_7.png'),
    pr14_t14_1: require('../../../assets/images/Test_14/pr14_t14_1.png'),
    pr14_t14_2: require('../../../assets/images/Test_14/pr14_t14_2.png'),
    pr14_t14_3: require('../../../assets/images/Test_14/pr14_t14_3.png'),
    pr14_t14_4: require('../../../assets/images/Test_14/pr14_t14_4.png'),
    pr14_t14_5: require('../../../assets/images/Test_14/pr14_t14_5.png'),
    pr14_t14_6: require('../../../assets/images/Test_14/pr14_t14_6.png'),
    pr14_t14_7: require('../../../assets/images/Test_14/pr14_t14_7.png'),
    pr14_t14_8: require('../../../assets/images/Test_14/pr14_t14_8.png'),
    pr14_t14_9: require('../../../assets/images/Test_14/pr14_t14_9.png'),
    pr14_t15_1: require('../../../assets/images/Test_14/pr14_t15_1.png'),
    pr14_t15_2: require('../../../assets/images/Test_14/pr14_t15_2.png'),
    pr14_t15_3: require('../../../assets/images/Test_14/pr14_t15_3.png'),
    pr14_t15_4: require('../../../assets/images/Test_14/pr14_t15_4.png'),
    pr14_t15_5: require('../../../assets/images/Test_14/pr14_t15_5.png'),
    pr14_t15_6: require('../../../assets/images/Test_14/pr14_t15_6.png'),
    pr14_t15_7: require('../../../assets/images/Test_14/pr14_t15_7.png'),
    pr14_t15_8: require('../../../assets/images/Test_14/pr14_t15_8.png'),
    pr14_t15_9: require('../../../assets/images/Test_14/pr14_t15_9.png'),
    pr14_t16_1: require('../../../assets/images/Test_14/pr14_t16_1.png'),
    pr14_t16_2: require('../../../assets/images/Test_14/pr14_t16_2.png'),
    pr14_t16_3: require('../../../assets/images/Test_14/pr14_t16_3.png'),
    pr14_t16_4: require('../../../assets/images/Test_14/pr14_t16_4.png'),
    pr14_t16_5: require('../../../assets/images/Test_14/pr14_t16_5.png'),
    pr14_t16_6: require('../../../assets/images/Test_14/pr14_t16_6.png'),
    pr14_t16_7: require('../../../assets/images/Test_14/pr14_t16_7.png'),
    pr14_t16_8: require('../../../assets/images/Test_14/pr14_t16_8.png'),
    pr14_t16_9: require('../../../assets/images/Test_14/pr14_t16_9.png'),
    pr14_t17_1: require('../../../assets/images/Test_14/pr14_t17_1.png'),
    pr14_t17_2: require('../../../assets/images/Test_14/pr14_t17_2.png'),
    pr14_t17_3: require('../../../assets/images/Test_14/pr14_t17_3.png'),
    pr14_t17_4: require('../../../assets/images/Test_14/pr14_t17_4.png'),
    pr14_t17_5: require('../../../assets/images/Test_14/pr14_t17_5.png'),
    pr14_t17_6: require('../../../assets/images/Test_14/pr14_t17_6.png'),
    pr14_t17_7: require('../../../assets/images/Test_14/pr14_t17_7.png'),
    pr14_t17_8: require('../../../assets/images/Test_14/pr14_t17_8.png'),
    pr14_t17_9: require('../../../assets/images/Test_14/pr14_t17_9.png'),
    pr14_t18_1: require('../../../assets/images/Test_14/pr14_t18_1.png'),
    pr14_t18_2: require('../../../assets/images/Test_14/pr14_t18_2.png'),
    pr14_t18_3: require('../../../assets/images/Test_14/pr14_t18_3.png'),
    pr14_t18_4: require('../../../assets/images/Test_14/pr14_t18_4.png'),
    pr14_t18_5: require('../../../assets/images/Test_14/pr14_t18_5.png'),
    pr14_t18_6: require('../../../assets/images/Test_14/pr14_t18_6.png'),
    pr14_t18_7: require('../../../assets/images/Test_14/pr14_t18_7.png'),
    pr14_t18_8: require('../../../assets/images/Test_14/pr14_t18_8.png'),
    pr14_t18_9: require('../../../assets/images/Test_14/pr14_t18_9.png'),
    pr14_t1_1: require('../../../assets/images/Test_14/pr14_t1_1.png'),
    pr14_t1_2: require('../../../assets/images/Test_14/pr14_t1_2.png'),
    pr14_t1_3: require('../../../assets/images/Test_14/pr14_t1_3.png'),
    pr14_t1_4: require('../../../assets/images/Test_14/pr14_t1_4.png'),
    pr14_t1_5: require('../../../assets/images/Test_14/pr14_t1_5.png'),
    pr14_t1_6: require('../../../assets/images/Test_14/pr14_t1_6.png'),
    pr14_t1_7: require('../../../assets/images/Test_14/pr14_t1_7.png'),
    pr14_t2_1: require('../../../assets/images/Test_14/pr14_t2_1.png'),
    pr14_t2_2: require('../../../assets/images/Test_14/pr14_t2_2.png'),
    pr14_t2_3: require('../../../assets/images/Test_14/pr14_t2_3.png'),
    pr14_t2_4: require('../../../assets/images/Test_14/pr14_t2_4.png'),
    pr14_t2_5: require('../../../assets/images/Test_14/pr14_t2_5.png'),
    pr14_t2_6: require('../../../assets/images/Test_14/pr14_t2_6.png'),
    pr14_t2_7: require('../../../assets/images/Test_14/pr14_t2_7.png'),
    pr14_t3_1: require('../../../assets/images/Test_14/pr14_t3_1.png'),
    pr14_t3_2: require('../../../assets/images/Test_14/pr14_t3_2.png'),
    pr14_t3_3: require('../../../assets/images/Test_14/pr14_t3_3.png'),
    pr14_t3_4: require('../../../assets/images/Test_14/pr14_t3_4.png'),
    pr14_t3_5: require('../../../assets/images/Test_14/pr14_t3_5.png'),
    pr14_t3_6: require('../../../assets/images/Test_14/pr14_t3_6.png'),
    pr14_t3_7: require('../../../assets/images/Test_14/pr14_t3_7.png'),
    pr14_t3_8: require('../../../assets/images/Test_14/pr14_t3_8.png'),
    pr14_t3_9: require('../../../assets/images/Test_14/pr14_t3_9.png'),
    pr14_t4_1: require('../../../assets/images/Test_14/pr14_t4_1.png'),
    pr14_t4_2: require('../../../assets/images/Test_14/pr14_t4_2.png'),
    pr14_t4_3: require('../../../assets/images/Test_14/pr14_t4_3.png'),
    pr14_t4_4: require('../../../assets/images/Test_14/pr14_t4_4.png'),
    pr14_t4_5: require('../../../assets/images/Test_14/pr14_t4_5.png'),
    pr14_t4_6: require('../../../assets/images/Test_14/pr14_t4_6.png'),
    pr14_t4_7: require('../../../assets/images/Test_14/pr14_t4_7.png'),
    pr14_t4_8: require('../../../assets/images/Test_14/pr14_t4_8.png'),
    pr14_t4_9: require('../../../assets/images/Test_14/pr14_t4_9.png'),
    pr14_t5_1: require('../../../assets/images/Test_14/pr14_t5_1.png'),
    pr14_t5_2: require('../../../assets/images/Test_14/pr14_t5_2.png'),
    pr14_t5_3: require('../../../assets/images/Test_14/pr14_t5_3.png'),
    pr14_t5_4: require('../../../assets/images/Test_14/pr14_t5_4.png'),
    pr14_t5_5: require('../../../assets/images/Test_14/pr14_t5_5.png'),
    pr14_t5_6: require('../../../assets/images/Test_14/pr14_t5_6.png'),
    pr14_t5_7: require('../../../assets/images/Test_14/pr14_t5_7.png'),
    pr14_t6_1: require('../../../assets/images/Test_14/pr14_t6_1.png'),
    pr14_t6_2: require('../../../assets/images/Test_14/pr14_t6_2.png'),
    pr14_t6_3: require('../../../assets/images/Test_14/pr14_t6_3.png'),
    pr14_t6_4: require('../../../assets/images/Test_14/pr14_t6_4.png'),
    pr14_t6_5: require('../../../assets/images/Test_14/pr14_t6_5.png'),
    pr14_t6_6: require('../../../assets/images/Test_14/pr14_t6_6.png'),
    pr14_t6_7: require('../../../assets/images/Test_14/pr14_t6_7.png'),
    pr14_t7_1: require('../../../assets/images/Test_14/pr14_t7_1.png'),
    pr14_t7_2: require('../../../assets/images/Test_14/pr14_t7_2.png'),
    pr14_t7_3: require('../../../assets/images/Test_14/pr14_t7_3.png'),
    pr14_t7_4: require('../../../assets/images/Test_14/pr14_t7_4.png'),
    pr14_t7_5: require('../../../assets/images/Test_14/pr14_t7_5.png'),
    pr14_t7_6: require('../../../assets/images/Test_14/pr14_t7_6.png'),
    pr14_t8_1: require('../../../assets/images/Test_14/pr14_t8_1.png'),
    pr14_t8_2: require('../../../assets/images/Test_14/pr14_t8_2.png'),
    pr14_t8_3: require('../../../assets/images/Test_14/pr14_t8_3.png'),
    pr14_t8_4: require('../../../assets/images/Test_14/pr14_t8_4.png'),
    pr14_t8_5: require('../../../assets/images/Test_14/pr14_t8_5.png'),
    pr14_t8_6: require('../../../assets/images/Test_14/pr14_t8_6.png'),
    pr14_t8_7: require('../../../assets/images/Test_14/pr14_t8_7.png'),
    pr14_t9_1: require('../../../assets/images/Test_14/pr14_t9_1.png'),
    pr14_t9_2: require('../../../assets/images/Test_14/pr14_t9_2.png'),
    pr14_t9_3: require('../../../assets/images/Test_14/pr14_t9_3.png'),
    pr14_t9_4: require('../../../assets/images/Test_14/pr14_t9_4.png'),
    pr14_t9_5: require('../../../assets/images/Test_14/pr14_t9_5.png'),
    pr14_t9_6: require('../../../assets/images/Test_14/pr14_t9_6.png'),
    pr14_t9_7: require('../../../assets/images/Test_14/pr14_t9_7.png'),
    pr14_t9_8: require('../../../assets/images/Test_14/pr14_t9_8.png'),
    pr14_t9_9: require('../../../assets/images/Test_14/pr14_t9_9.png')
};

const secuencias = [
    {
        modelo: images.pr14_t1_1,
        opciones: [
            images.pr14_t1_2,
            images.pr14_t1_3,
            images.pr14_t1_4,
            images.pr14_t1_5,
            images.pr14_t1_6,
            images.pr14_t1_7
        ],
        correcta: 4
    },
    {
        modelo: images.pr14_t2_1,
        opciones: [
            images.pr14_t2_2,
            images.pr14_t2_3,
            images.pr14_t2_4,
            images.pr14_t2_5,
            images.pr14_t2_6,
            images.pr14_t2_7
        ],
        correcta: 4
    },
    {
        modelo: images.pr14_t3_1,
        opciones: [
            images.pr14_t3_2,
            images.pr14_t3_3,
            images.pr14_t3_4,
            images.pr14_t3_5,
            images.pr14_t3_6,
            images.pr14_t3_7
        ],
        correcta: 5
    },
    {
        modelo: images.pr14_t4_1,
        opciones: [
            images.pr14_t4_2,
            images.pr14_t4_3,
            images.pr14_t4_4,
            images.pr14_t4_5,
            images.pr14_t4_6,
            images.pr14_t4_7
        ],
        correcta: 3
    },
    {
        modelo: images.pr14_t5_1,
        opciones: [
            images.pr14_t5_2,
            images.pr14_t5_3,
            images.pr14_t5_4,
            images.pr14_t5_5,
            images.pr14_t5_6,
            images.pr14_t5_7
        ],
        correcta: 2
    },
    {
        modelo: images.pr14_t6_1,
        opciones: [
            images.pr14_t6_2,
            images.pr14_t6_3,
            images.pr14_t6_4,
            images.pr14_t6_5,
            images.pr14_t6_6,
            images.pr14_t6_7
        ],
        correcta: 5
    },
    {
        modelo: images.pr14_t7_1,
        opciones: [
            images.pr14_t7_2,
            images.pr14_t7_3,
            images.pr14_t7_4,
            images.pr14_t7_5,
            images.pr14_t7_6,
            images.pr14_t7_7
        ],
        correcta: 0
    },
    {
        modelo: images.pr14_t8_1,
        opciones: [
            images.pr14_t8_2,
            images.pr14_t8_3,
            images.pr14_t8_4,
            images.pr14_t8_5,
            images.pr14_t8_6,
            images.pr14_t8_7
        ],
        correcta: 3
    },
    {
        modelo: images.pr14_t9_1,
        opciones: [
            images.pr14_t9_2,
            images.pr14_t9_3,
            images.pr14_t9_4,
            images.pr14_t9_5,
            images.pr14_t9_6,
            images.pr14_t9_7
        ],
        correcta: 5
    },
    {
        modelo: images.pr14_t10_1,
        opciones: [
            images.pr14_t10_2,
            images.pr14_t10_3,
            images.pr14_t10_4,
            images.pr14_t10_5,
            images.pr14_t10_6,
            images.pr14_t10_7
        ],
        correcta: 0
    },
    {
        modelo: images.pr14_t11_1,
        opciones: [
            images.pr14_t11_2,
            images.pr14_t11_3,
            images.pr14_t11_4,
            images.pr14_t11_5,
            images.pr14_t11_6,
            images.pr14_t11_7
        ],
        correcta: 5
    },
    {
        modelo: images.pr14_t12_1,
        opciones: [
            images.pr14_t12_2,
            images.pr14_t12_3,
            images.pr14_t12_4,
            images.pr14_t12_5,
            images.pr14_t12_6,
            images.pr14_t12_7
        ],
        correcta: 3
    },
    {
        modelo: images.pr14_t13_1,
        opciones: [
            images.pr14_t13_2,
            images.pr14_t13_3,
            images.pr14_t13_4,
            images.pr14_t13_5,
            images.pr14_t13_6,
            images.pr14_t13_7
        ],
        correcta: 0
    },
    {
        modelo: images.pr14_t14_1,
        opciones: [
            images.pr14_t14_2,
            images.pr14_t14_3,
            images.pr14_t14_4,
            images.pr14_t14_5,
            images.pr14_t14_6,
            images.pr14_t14_7
        ],
        correcta: 5
    },
    {
        modelo: images.pr14_t15_1,
        opciones: [
            images.pr14_t15_2,
            images.pr14_t15_3,
            images.pr14_t15_4,
            images.pr14_t15_5,
            images.pr14_t15_6,
            images.pr14_t15_7
        ],
        correcta: 1
    },
    {
        modelo: images.pr14_t16_1,
        opciones: [
            images.pr14_t16_2,
            images.pr14_t16_3,
            images.pr14_t16_4,
            images.pr14_t16_5,
            images.pr14_t16_6,
            images.pr14_t16_7
        ],
        correcta: 4
    },
    {
        modelo: images.pr14_t17_1,
        opciones: [
            images.pr14_t17_2,
            images.pr14_t17_3,
            images.pr14_t17_4,
            images.pr14_t17_5,
            images.pr14_t17_6,
            images.pr14_t17_7
        ],
        correcta: 2
    },
    {
        modelo: images.pr14_t18_1,
        opciones: [
            images.pr14_t18_2,
            images.pr14_t18_3,
            images.pr14_t18_4,
            images.pr14_t18_5,
            images.pr14_t18_6,
            images.pr14_t18_7
        ],
        correcta: 0
        //TODO: PREGUNTAR LA RESPUESTA DE ESTO
    }
];

const Test_14 = ({ navigation, route }) => {
    const [modalVisible, setModalVisible] = useState(true);
    const [entrenamiento, setEntrenamiento] = useState(true);
    const [ensayoActual, setEnsayoActual] = useState(0);
    const [inicioEnsayo, setInicioEnsayo] = useState(null);

    // RESULTADOS
    const [correctas, setCorrectas] = useState(0);
    const [errores, setErrores] = useState(0);
    const [tiempoTotal, setTiempoTotal] = useState(0);

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

    // Guarda los resultados al finalizar todos los ensayos
    useEffect(() => {
        const guardarResultados = async () => {
            await guardarResultadosTest_14(route.params.idSesion, correctas, errores, tiempoTotal);
            navigation.replace('Test_15', { idSesion: route.params.idSesion });
        };

        if (ensayoActual >= secuencias.length) {
            guardarResultados();
        }
    }, [ensayoActual]);

    // Establece el tiempo de inicio del ensayo
    useEffect(() => {
        setInicioEnsayo(Date.now());
    }, [ensayoActual]);

    /**
     * Inicia la prueba después de cerrar el modal.
     */
    const iniciarPrueba = () => {
        setModalVisible(false);
    };

    /**
     * Maneja la selección del usuario y evalúa si es correcta o incorrecta.
     * @param {number} index - El índice de la opción seleccionada.
     */
    const manejarSeleccion = (index) => {
        const tiempoRespuesta = Date.now() - inicioEnsayo;
        if (!entrenamiento) {
            setTiempoTotal(prev => prev + tiempoRespuesta);

            if (index === secuencias[ensayoActual].correcta) {
                setCorrectas(prev => prev + 1);
            } else {
                setErrores(prev => prev + 1);
            }
        }

        if (entrenamiento) {
            if (ensayoActual < 2) {
                setEnsayoActual(prev => prev + 1);
            } else {
                setEntrenamiento(false);
                setModalVisible(true);
                setEnsayoActual(3); // Empezar la prueba real desde el cuarto ensayo
            }
        } else {
            setEnsayoActual(prev => prev + 1);
        }
    };

    /**
     * Muestra una alerta con los resultados al finalizar el test.
     */
    const mostrarResultados = () => {
        Alert.alert('Resultados', `Total respuestas correctas: ${correctas}\nTotal errores: ${errores}\nTiempo total empleado: ${tiempoTotal / 1000} segundos`);
    };

    // Se evita renderizar si ya se ha completado la prueba
    if (ensayoActual >= secuencias.length) {
        return null;
    }

    return (
        <View style={stylesComunes.borde_tests}>
            <View style={stylesComunes.contenedor_test}>
                <MenuComponent
                    onToggleVoice={() => { }}
                    onNavigateHome={() => navigation.replace('Pacientes')}
                    onNavigateNext={() => navigation.replace('Test_15', { idSesion: route.params.idSesion })}
                    onNavigatePrevious={() => navigation.replace('Test_13', { idSesion: route.params.idSesion })}
                />
                <InstruccionesModal
                    visible={modalVisible}
                    onClose={iniciarPrueba}
                    title="Test 14"
                    instructions={entrenamiento ? translations.pr14ItemStart : translations.ItemStartPrueba}
                />
                {!modalVisible && (
                    <>
                        <View style={styles.modeloContainer}>
                            <Image source={secuencias[ensayoActual].modelo} style={styles.imagenModelo} />
                        </View>
                        <View style={styles.contenedorImagenes}>
                            {secuencias[ensayoActual].opciones.map((opcion, index) => (
                                <TouchableOpacity key={index} onPress={() => manejarSeleccion(index)}>
                                    <Image source={opcion} style={styles.imagen} />
                                </TouchableOpacity>
                            ))}
                        </View>
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
        alignItems: 'center'
    },
    modeloContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 20,
        borderColor: '#D2B48C',
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        marginHorizontal: '15%'
    },
    contenedorImagenes: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginVertical: 20,
        padding: 10
    },
    imagenModelo: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
        margin: 10
    },
    imagen: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        margin: 10,
        borderColor: '#D2B48C',
        borderWidth: 2,
        borderRadius: 10,
        padding: 10
    }
});

export default Test_14;