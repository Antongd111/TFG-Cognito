// PARA ARREGLAR: EL ULTIMO ENSAYO NO SE REGISTRA EN LOS RESULTADOS

import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import InstruccionesModal from '../../components/instrucciones';
import MenuComponent from '../../components/menu';
import stylesComunes from '../../styles/ComunStyles';

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
        correcta: 0
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
        correcta: 0
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
        correcta: 0
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
        correcta: 0
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
        correcta: 0
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
        correcta: 0
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
        correcta: 0
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
        correcta: 0
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
        correcta: 0
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
        correcta: 0
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
        correcta: 0
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
        correcta: 0
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
        correcta: 0
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
        correcta: 0
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
    }
];

const Test_14 = ({ navigation, route }) => {
    const [modalVisible, setModalVisible] = useState(true);
    const [entrenamiento, setEntrenamiento] = useState(true);
    const [ensayoActual, setEnsayoActual] = useState(0);
    const [correctas, setCorrectas] = useState(0);
    const [errores, setErrores] = useState(0);
    const [tiempoTotal, setTiempoTotal] = useState(0);
    const [inicioEnsayo, setInicioEnsayo] = useState(null);

    /******************** MENÚ DE EVALUACIÓN ********************/
    const handleToggleVoice = () => {
        console.log("Toggle voice feature");
    };

    const handleNavigateHome = () => {
        navigation.navigate('Pacientes');
    };

    const handleNavigateNext = () => {
        navigation.navigate('Test_15', { idSesion: route.params.idSesion });
    };

    const handleNavigatePrevious = () => {
        navigation.navigate('Test_13', { idSesion: route.params.idSesion });
    };

    /***************** FIN MENÚ DE EVALUACIÓN *****************/

    useEffect(() => {
        setInicioEnsayo(Date.now());
    }, [ensayoActual]);

    const iniciarPrueba = () => {
        setModalVisible(false);
    };

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
            if (ensayoActual < secuencias.length - 1) {
                setEnsayoActual(prev => prev + 1);
            } else {
                mostrarResultados();
            }
        }
    };

    const mostrarResultados = () => {
        Alert.alert('Resultados', `Total respuestas correctas: ${correctas}\nTotal errores: ${errores}\nTiempo total empleado: ${tiempoTotal / 1000} segundos`);
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
                    onClose={iniciarPrueba}
                    title={entrenamiento ? "Entrenamiento" : "Inicio de Prueba"}
                    instructions={entrenamiento ? "Usted tiene tres ensayos de entrenamiento. Toque la pieza que completa correctamente el diseño. Aquí hay un diseño que ha perdido una pieza abajo a la derecha. Sólo una de estas piezas puede completar el diseño horizontal o verticalmente. Toque la pieza correcta." : "Preste atención, la prueba va a empezar, responda lo más rapido posible. Para realizarla toque el botón 'comenzar'."}
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