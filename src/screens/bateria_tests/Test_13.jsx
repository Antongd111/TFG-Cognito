import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import InstruccionesModal from '../../components/instrucciones';
import MenuComponent from '../../components/menu';
import stylesComunes from '../../styles/ComunStyles';

const images = {
    pr13_t10_1: require('../../../assets/images/Test_13/pr13_t10_1.png'),
    pr13_t10_2: require('../../../assets/images/Test_13/pr13_t10_2.png'),
    pr13_t10_3: require('../../../assets/images/Test_13/pr13_t10_3.png'),
    pr13_t10_4: require('../../../assets/images/Test_13/pr13_t10_4.png'),
    pr13_t10_5: require('../../../assets/images/Test_13/pr13_t10_5.png'),
    pr13_t11_1: require('../../../assets/images/Test_13/pr13_t11_1.png'),
    pr13_t11_2: require('../../../assets/images/Test_13/pr13_t11_2.png'),
    pr13_t11_3: require('../../../assets/images/Test_13/pr13_t11_3.png'),
    pr13_t11_4: require('../../../assets/images/Test_13/pr13_t11_4.png'),
    pr13_t11_5: require('../../../assets/images/Test_13/pr13_t11_5.png'),
    pr13_t1_1: require('../../../assets/images/Test_13/pr13_t1_1.png'),
    pr13_t1_2: require('../../../assets/images/Test_13/pr13_t1_2.png'),
    pr13_t1_3: require('../../../assets/images/Test_13/pr13_t1_3.png'),
    pr13_t1_4: require('../../../assets/images/Test_13/pr13_t1_4.png'),
    pr13_t1_5: require('../../../assets/images/Test_13/pr13_t1_5.png'),
    pr13_t2_1: require('../../../assets/images/Test_13/pr13_t2_1.png'),
    pr13_t2_2: require('../../../assets/images/Test_13/pr13_t2_2.png'),
    pr13_t2_3: require('../../../assets/images/Test_13/pr13_t2_3.png'),
    pr13_t2_4: require('../../../assets/images/Test_13/pr13_t2_4.png'),
    pr13_t2_5: require('../../../assets/images/Test_13/pr13_t2_5.png'),
    pr13_t3_1: require('../../../assets/images/Test_13/pr13_t3_1.png'),
    pr13_t3_2: require('../../../assets/images/Test_13/pr13_t3_2.png'),
    pr13_t3_3: require('../../../assets/images/Test_13/pr13_t3_3.png'),
    pr13_t3_4: require('../../../assets/images/Test_13/pr13_t3_4.png'),
    pr13_t3_5: require('../../../assets/images/Test_13/pr13_t3_5.png'),
    pr13_t4_1: require('../../../assets/images/Test_13/pr13_t4_1.png'),
    pr13_t4_2: require('../../../assets/images/Test_13/pr13_t4_2.png'),
    pr13_t4_3: require('../../../assets/images/Test_13/pr13_t4_3.png'),
    pr13_t4_4: require('../../../assets/images/Test_13/pr13_t4_4.png'),
    pr13_t4_5: require('../../../assets/images/Test_13/pr13_t4_5.png'),
    pr13_t5_1: require('../../../assets/images/Test_13/pr13_t5_1.png'),
    pr13_t5_2: require('../../../assets/images/Test_13/pr13_t5_2.png'),
    pr13_t5_3: require('../../../assets/images/Test_13/pr13_t5_3.png'),
    pr13_t5_4: require('../../../assets/images/Test_13/pr13_t5_4.png'),
    pr13_t5_5: require('../../../assets/images/Test_13/pr13_t5_5.png'),
    pr13_t6_1: require('../../../assets/images/Test_13/pr13_t6_1.png'),
    pr13_t6_2: require('../../../assets/images/Test_13/pr13_t6_2.png'),
    pr13_t6_3: require('../../../assets/images/Test_13/pr13_t6_3.png'),
    pr13_t6_4: require('../../../assets/images/Test_13/pr13_t6_4.png'),
    pr13_t6_5: require('../../../assets/images/Test_13/pr13_t6_5.png'),
    pr13_t7_1: require('../../../assets/images/Test_13/pr13_t7_1.png'),
    pr13_t7_2: require('../../../assets/images/Test_13/pr13_t7_2.png'),
    pr13_t7_3: require('../../../assets/images/Test_13/pr13_t7_3.png'),
    pr13_t7_4: require('../../../assets/images/Test_13/pr13_t7_4.png'),
    pr13_t7_5: require('../../../assets/images/Test_13/pr13_t7_5.png'),
    pr13_t8_1: require('../../../assets/images/Test_13/pr13_t8_1.png'),
    pr13_t8_2: require('../../../assets/images/Test_13/pr13_t8_2.png'),
    pr13_t8_3: require('../../../assets/images/Test_13/pr13_t8_3.png'),
    pr13_t8_4: require('../../../assets/images/Test_13/pr13_t8_4.png'),
    pr13_t8_5: require('../../../assets/images/Test_13/pr13_t8_5.png'),
    pr13_t9_1: require('../../../assets/images/Test_13/pr13_t9_1.png'),
    pr13_t9_2: require('../../../assets/images/Test_13/pr13_t9_2.png'),
    pr13_t9_3: require('../../../assets/images/Test_13/pr13_t9_3.png'),
    pr13_t9_4: require('../../../assets/images/Test_13/pr13_t9_4.png'),
    pr13_t9_5: require('../../../assets/images/Test_13/pr13_t9_5.png')
};

const secuencias = [
    {
        objeto: 'pipeta',
        imagenes: [images.pr13_t1_1],
        asociaciones: [
            images.pr13_t1_2,
            images.pr13_t1_3,
            images.pr13_t1_4,
            images.pr13_t1_5
        ],
        correcta: 0,
        errores: {
            general: [1],
            parcial: [2],
            otros: [3]
        }
    },
    {
        objeto: 'teléfono',
        imagenes: [images.pr13_t2_1],
        asociaciones: [
            images.pr13_t2_2,
            images.pr13_t2_3,
            images.pr13_t2_4,
            images.pr13_t2_5
        ],
        correcta: 0,
        errores: {
            general: [2],
            parcial: [3],
            otros: [1]
        }
    },
    {
        objeto: 'avión',
        imagenes: [images.pr13_t3_1],
        asociaciones: [
            images.pr13_t3_2,
            images.pr13_t3_3,
            images.pr13_t3_4,
            images.pr13_t3_5
        ],
        correcta: 0,
        errores: {
            general: [3],
            parcial: [2],
            otros: [1]
        }
    },
    {
        objeto: 'libro',
        imagenes: [images.pr13_t4_1],
        asociaciones: [
            images.pr13_t4_2,
            images.pr13_t4_3,
            images.pr13_t4_4,
            images.pr13_t4_5
        ],
        correcta: 0,
        errores: {
            general: [2],
            parcial: [1],
            otros: [3]
        }
    },
    {
        objeto: 'flor',
        imagenes: [images.pr13_t5_1],
        asociaciones: [
            images.pr13_t5_2,
            images.pr13_t5_3,
            images.pr13_t5_4,
            images.pr13_t5_5
        ],
        correcta: 0,
        errores: {
            general: [3],
            parcial: [1],
            otros: [2]
        }
    },
    {
        objeto: 'guitarra',
        imagenes: [images.pr13_t6_1],
        asociaciones: [
            images.pr13_t6_2,
            images.pr13_t6_3,
            images.pr13_t6_4,
            images.pr13_t6_5
        ],
        correcta: 0,
        errores: {
            general: [1],
            parcial: [2],
            otros: [3]
        }
    },
    {
        objeto: 'zapato',
        imagenes: [images.pr13_t7_1],
        asociaciones: [
            images.pr13_t7_2,
            images.pr13_t7_3,
            images.pr13_t7_4,
            images.pr13_t7_5
        ],
        correcta: 0,
        errores: {
            general: [3],
            parcial: [1],
            otros: [2]
        }
    },
    {
        objeto: 'manzana',
        imagenes: [images.pr13_t8_1],
        asociaciones: [
            images.pr13_t8_2,
            images.pr13_t8_3,
            images.pr13_t8_4,
            images.pr13_t8_5
        ],
        correcta: 0,
        errores: {
            general: [2],
            parcial: [1],
            otros: [3]
        }
    },
    {
        objeto: 'bicicleta',
        imagenes: [images.pr13_t9_1],
        asociaciones: [
            images.pr13_t9_2,
            images.pr13_t9_3,
            images.pr13_t9_4,
            images.pr13_t9_5
        ],
        correcta: 0,
        errores: {
            general: [1],
            parcial: [3],
            otros: [2]
        }
    },
    {
        objeto: 'pelota',
        imagenes: [images.pr13_t10_1],
        asociaciones: [
            images.pr13_t10_2,
            images.pr13_t10_3,
            images.pr13_t10_4,
            images.pr13_t10_5
        ],
        correcta: 0,
        errores: {
            general: [2],
            parcial: [3],
            otros: [1]
        }
    },
    {
        objeto: 'árbol',
        imagenes: [images.pr13_t11_1],
        asociaciones: [
            images.pr13_t11_2,
            images.pr13_t11_3,
            images.pr13_t11_4,
            images.pr13_t11_5
        ],
        correcta: 0,
        errores: {
            general: [1],
            parcial: [3],
            otros: [2]
        }
    }
];

const Test_13 = ({ navigation, route }) => {
    const [modalVisible, setModalVisible] = useState(true);
    const [entrenamiento, setEntrenamiento] = useState(true);
    const [fase, setFase] = useState(1); // 1 para nombrar objeto, 2 para seleccionar relación
    const [ensayoActual, setEnsayoActual] = useState(0);
    const [correctas, setCorrectas] = useState(0);
    const [generalizaciones, setGeneralizaciones] = useState(0);
    const [parciales, setParciales] = useState(0);
    const [otrosErrores, setOtrosErrores] = useState(0);
    const [excesoTiempoObj, setExcesoTiempoObj] = useState(0);
    const [excesoTiempoAsoc, setExcesoTiempoAsoc] = useState(0);
    const [inicioEnsayo, setInicioEnsayo] = useState(null);
    const [respuestaSecuencia, setRespuestaSecuencia] = useState([]);

    /******************** MENÚ DE EVALUACIÓN ********************/
    const handleToggleVoice = () => {
        console.log("Toggle voice feature");
    };

    const handleNavigateHome = () => {
        navigation.navigate('Pacientes');
    };

    const handleNavigateNext = () => {
        navigation.navigate('Test_14', { idSesion: route.params.idSesion });
    };

    const handleNavigatePrevious = () => {
        navigation.navigate('Test_12', { idSesion: route.params.idSesion });
    };

    /***************** FIN MENÚ DE EVALUACIÓN *****************/

    useEffect(() => {
        if (fase === 1) {
            setInicioEnsayo(Date.now());
        }
    }, [fase, ensayoActual]);

    const iniciarPrueba = () => {
        setModalVisible(false);
    };

    const manejarRespuestaCorrecta = () => {
        if (fase === 1) {
            setFase(2);
            setInicioEnsayo(Date.now());
        } else {
            manejarSeleccion(secuencias[ensayoActual].correcta, true);
        }
    };

    const manejarSeleccion = (index, esCorrecta = false) => {
        const tiempoRespuesta = Date.now() - inicioEnsayo;
        const secuenciaActual = secuencias[ensayoActual];

        if (fase === 1) {
            if (tiempoRespuesta > 20000) {
                setExcesoTiempoObj(prev => prev + 1);
            }
            if (!entrenamiento) {
                setRespuestaSecuencia(prev => [...prev, { fase: 1, tiempo: tiempoRespuesta, correcta: esCorrecta }]);
            }
        } else {
            if (tiempoRespuesta > 20000) {
                setExcesoTiempoAsoc(prev => prev + 1);
            }

            if (!entrenamiento) {
                if (index === secuenciaActual.correcta) {
                    setCorrectas(prev => prev + 1);
                } else {
                    setRespuestaSecuencia(prev => [...prev, { fase: 2, tiempo: tiempoRespuesta, seleccion: index }]);
                    if (secuenciaActual.errores.general.includes(index)) {
                        setGeneralizaciones(prev => prev + 1);
                    } else if (secuenciaActual.errores.parcial.includes(index)) {
                        setParciales(prev => prev + 1);
                    } else {
                        setOtrosErrores(prev => prev + 1);
                    }
                }
            }

            if (ensayoActual < secuencias.length - 1) {
                setEnsayoActual(prev => prev + 1);
                setFase(1);
            } else {
                mostrarResultados();
            }
        }
    };

    const manejarError = (tipo) => {
        const tiempoRespuesta = Date.now() - inicioEnsayo;
        if (tiempoRespuesta > 20000) {
            setExcesoTiempoObj(prev => prev + 1);
        }
        if (!entrenamiento) {
            setRespuestaSecuencia(prev => [...prev, { fase: 1, tiempo: tiempoRespuesta, correcta: false }]);
        }
        if (tipo === 'G') {
            setGeneralizaciones(prev => prev + 1);
        } else if (tipo === 'P') {
            setParciales(prev => prev + 1);
        } else {
            setOtrosErrores(prev => prev + 1);
        }
        setFase(2);
        setInicioEnsayo(Date.now());
    };

    useEffect(() => {
        if (entrenamiento && ensayoActual === 1) {
            setEntrenamiento(false);
            setModalVisible(true);
        }
    }, [ensayoActual]);

    const mostrarResultados = () => {
        Alert.alert('Resultados', `Total respuestas correctas: ${correctas}\nGeneralizaciones: ${generalizaciones}\nRespuestas parciales: ${parciales}\nOtros errores: ${otrosErrores}\nExceso de tiempo (objeto): ${excesoTiempoObj}\nExceso de tiempo (asociaciones): ${excesoTiempoAsoc}`);
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
                    instructions={entrenamiento ? "Mire el objeto en la pantalla y nómbrelo. Pulse el botón 'RC' si el objeto ha sido identificado correctamente. Para realizar el ensayo de entrenamiento pulse el botón 'comenzar'." : "Preste atención, la prueba va a empezar, responda lo más rápido posible. Para realizarla pulse el botón 'comenzar'."}
                />
                {!modalVisible && (
                    <View style={styles.container}>
                        {fase === 1 ? (
                            <View style={styles.fila}>
                                <Image source={secuencias[ensayoActual].imagenes[0]} style={styles.imagenModelo} resizeMode="contain" />
                                <View style={styles.column}>
                                    <TouchableOpacity style={styles.botonRC} onPress={manejarRespuestaCorrecta}>
                                        <Text style={styles.textoBotonRC}>RC</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.botonRC} onPress={() => manejarError('G')}>
                                        <Text style={styles.textoBotonRC}>G</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.botonRC} onPress={() => manejarError('P')}>
                                        <Text style={styles.textoBotonRC}>P</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.botonRC} onPress={() => manejarError('O')}>
                                        <Text style={styles.textoBotonRC}>O</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ) : (
                            <View style={styles.contenedorImagenes}>
                                {secuencias[ensayoActual].asociaciones.map((opcion, index) => (
                                    <TouchableOpacity key={index} onPress={() => manejarSeleccion(index)}>
                                        <Image source={opcion} style={styles.imagen} resizeMode="contain"/>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>
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
    fila: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20
    },
    column: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginLeft: 20,
        height: 500
    },
    contenedorImagenes: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    imagenModelo: {
        maxWidth: 500,
        maxHeight: 500,
        margin: 10,
        borderColor: '#D2B48C',
        borderWidth: 2,
        borderRadius: 10,
    },
    imagen: {
        width: 250,
        height: 250,
        margin: 10,
        borderColor: '#D2B48C',
        borderWidth: 2,
        borderRadius: 10,
    },
    botonRC: {
        backgroundColor: '#D2B48C',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
        width: 100,
    },
    textoBotonRC: {
        fontSize: 40,
        color: 'white',
        textAlign: 'center'
    }
});

export default Test_13;