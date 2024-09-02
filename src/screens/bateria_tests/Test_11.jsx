import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import InstruccionesModal from '../../components/instrucciones';
import MenuComponent from '../../components/menu';
import stylesComunes from '../../styles/ComunStyles';
import { guardarResultadosTest_11 } from '../../api/TestApi';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTranslation } from "../../locales";
import { useIsFocused } from '@react-navigation/native';

// Importar imágenes
import pr11_t1_1 from '../../../assets/images/Test_11/pr11_t1_1.png';
import pr11_t1_2 from '../../../assets/images/Test_11/pr11_t1_2.png';
import pr11_t1_3 from '../../../assets/images/Test_11/pr11_t1_3.png';
import pr11_t1_4 from '../../../assets/images/Test_11/pr11_t1_4.png';
import pr11_t1_5 from '../../../assets/images/Test_11/pr11_t1_5.png';
import pr11_t1_6 from '../../../assets/images/Test_11/pr11_t1_6.png';
import pr11_t2_1 from '../../../assets/images/Test_11/pr11_t2_1.png';
import pr11_t2_2 from '../../../assets/images/Test_11/pr11_t2_2.png';
import pr11_t2_3 from '../../../assets/images/Test_11/pr11_t2_3.png';
import pr11_t2_4 from '../../../assets/images/Test_11/pr11_t2_4.png';
import pr11_t2_5 from '../../../assets/images/Test_11/pr11_t2_5.png';
import pr11_t2_6 from '../../../assets/images/Test_11/pr11_t2_6.png';
import pr11_t3_1 from '../../../assets/images/Test_11/pr11_t3_1.png';
import pr11_t3_2 from '../../../assets/images/Test_11/pr11_t3_2.png';
import pr11_t3_3 from '../../../assets/images/Test_11/pr11_t3_3.png';
import pr11_t3_4 from '../../../assets/images/Test_11/pr11_t3_4.png';
import pr11_t3_5 from '../../../assets/images/Test_11/pr11_t3_5.png';
import pr11_t3_6 from '../../../assets/images/Test_11/pr11_t3_6.png';
import pr11_t4_1 from '../../../assets/images/Test_11/pr11_t4_1.png';
import pr11_t4_2 from '../../../assets/images/Test_11/pr11_t4_2.png';
import pr11_t4_3 from '../../../assets/images/Test_11/pr11_t4_3.png';
import pr11_t4_4 from '../../../assets/images/Test_11/pr11_t4_4.png';
import pr11_t4_5 from '../../../assets/images/Test_11/pr11_t4_5.png';
import pr11_t4_6 from '../../../assets/images/Test_11/pr11_t4_6.png';
import pr11_t5_1 from '../../../assets/images/Test_11/pr11_t5_1.png';
import pr11_t5_2 from '../../../assets/images/Test_11/pr11_t5_2.png';
import pr11_t5_3 from '../../../assets/images/Test_11/pr11_t5_3.png';
import pr11_t5_4 from '../../../assets/images/Test_11/pr11_t5_4.png';
import pr11_t5_5 from '../../../assets/images/Test_11/pr11_t5_5.png';
import pr11_t5_6 from '../../../assets/images/Test_11/pr11_t5_6.png';
import pr11_t6_1 from '../../../assets/images/Test_11/pr11_t6_1.png';
import pr11_t6_2 from '../../../assets/images/Test_11/pr11_t6_2.png';
import pr11_t6_3 from '../../../assets/images/Test_11/pr11_t6_3.png';
import pr11_t6_4 from '../../../assets/images/Test_11/pr11_t6_4.png';
import pr11_t6_5 from '../../../assets/images/Test_11/pr11_t6_5.png';
import pr11_t6_6 from '../../../assets/images/Test_11/pr11_t6_6.png';
import pr11_t7_1 from '../../../assets/images/Test_11/pr11_t7_1.png';
import pr11_t7_2 from '../../../assets/images/Test_11/pr11_t7_2.png';
import pr11_t7_3 from '../../../assets/images/Test_11/pr11_t7_3.png';
import pr11_t7_4 from '../../../assets/images/Test_11/pr11_t7_4.png';
import pr11_t7_5 from '../../../assets/images/Test_11/pr11_t7_5.png';
import pr11_t7_6 from '../../../assets/images/Test_11/pr11_t7_6.png';
import pr11_t8_1 from '../../../assets/images/Test_11/pr11_t8_1.png';
import pr11_t8_2 from '../../../assets/images/Test_11/pr11_t8_2.png';
import pr11_t8_3 from '../../../assets/images/Test_11/pr11_t8_3.png';
import pr11_t8_4 from '../../../assets/images/Test_11/pr11_t8_4.png';
import pr11_t8_5 from '../../../assets/images/Test_11/pr11_t8_5.png';
import pr11_t8_6 from '../../../assets/images/Test_11/pr11_t8_6.png';
import pr11_t9_1 from '../../../assets/images/Test_11/pr11_t9_1.png';
import pr11_t9_2 from '../../../assets/images/Test_11/pr11_t9_2.png';
import pr11_t9_3 from '../../../assets/images/Test_11/pr11_t9_3.png';
import pr11_t9_4 from '../../../assets/images/Test_11/pr11_t9_4.png';
import pr11_t9_5 from '../../../assets/images/Test_11/pr11_t9_5.png';
import pr11_t9_6 from '../../../assets/images/Test_11/pr11_t9_6.png';

const figuras = {
    pr11_t1_1, pr11_t1_2, pr11_t1_3, pr11_t1_4, pr11_t1_5, pr11_t1_6,
    pr11_t2_1, pr11_t2_2, pr11_t2_3, pr11_t2_4, pr11_t2_5, pr11_t2_6,
    pr11_t3_1, pr11_t3_2, pr11_t3_3, pr11_t3_4, pr11_t3_5, pr11_t3_6,
    pr11_t4_1, pr11_t4_2, pr11_t4_3, pr11_t4_4, pr11_t4_5, pr11_t4_6,
    pr11_t5_1, pr11_t5_2, pr11_t5_3, pr11_t5_4, pr11_t5_5, pr11_t5_6,
    pr11_t6_1, pr11_t6_2, pr11_t6_3, pr11_t6_4, pr11_t6_5, pr11_t6_6,
    pr11_t7_1, pr11_t7_2, pr11_t7_3, pr11_t7_4, pr11_t7_5, pr11_t7_6,
    pr11_t8_1, pr11_t8_2, pr11_t8_3, pr11_t8_4, pr11_t8_5, pr11_t8_6,
    pr11_t9_1, pr11_t9_2, pr11_t9_3, pr11_t9_4, pr11_t9_5, pr11_t9_6
};

const secuencias = [
    { modelo: figuras.pr11_t1_1, opciones: [figuras.pr11_t1_4, figuras.pr11_t1_2, figuras.pr11_t1_3, figuras.pr11_t1_1, figuras.pr11_t1_5, figuras.pr11_t1_6], correcta: 3, inversion: 2 },
    { modelo: figuras.pr11_t2_1, opciones: [figuras.pr11_t2_6, figuras.pr11_t2_2, figuras.pr11_t2_3, figuras.pr11_t2_4, figuras.pr11_t2_5, figuras.pr11_t2_1], correcta: 5, inversion: 1 },
    { modelo: figuras.pr11_t3_1, opciones: [figuras.pr11_t3_2, figuras.pr11_t3_1, figuras.pr11_t3_3, figuras.pr11_t3_4, figuras.pr11_t3_5, figuras.pr11_t3_6], correcta: 1, inversion: 7 },
    { modelo: figuras.pr11_t4_1, opciones: [figuras.pr11_t4_1, figuras.pr11_t4_2, figuras.pr11_t4_3, figuras.pr11_t4_4, figuras.pr11_t4_5, figuras.pr11_t4_6], correcta: 0, inversion: 7 },
    { modelo: figuras.pr11_t5_1, opciones: [figuras.pr11_t5_3, figuras.pr11_t5_2, figuras.pr11_t5_1, figuras.pr11_t5_4, figuras.pr11_t5_5, figuras.pr11_t5_6], correcta: 2, inversion: 1 },
    { modelo: figuras.pr11_t6_1, opciones: [figuras.pr11_t6_2, figuras.pr11_t6_1, figuras.pr11_t6_3, figuras.pr11_t6_4, figuras.pr11_t6_5, figuras.pr11_t6_6], correcta: 1, inversion: 0 },
    { modelo: figuras.pr11_t7_1, opciones: [figuras.pr11_t7_5, figuras.pr11_t7_2, figuras.pr11_t7_3, figuras.pr11_t7_4, figuras.pr11_t7_1, figuras.pr11_t7_6], correcta: 4, inversion: 7 },
    { modelo: figuras.pr11_t8_1, opciones: [figuras.pr11_t8_2, figuras.pr11_t8_1, figuras.pr11_t8_3, figuras.pr11_t8_4, figuras.pr11_t8_5, figuras.pr11_t8_6], correcta: 1, inversion: 7 },
    { modelo: figuras.pr11_t9_1, opciones: [figuras.pr11_t9_4, figuras.pr11_t9_2, figuras.pr11_t9_3, figuras.pr11_t9_1, figuras.pr11_t9_5, figuras.pr11_t9_6], correcta: 3, inversion: 7 }
];

const Test_11 = ({ navigation, route }) => {
    const [modalVisible, setModalVisible] = useState(true);
    const [entrenamiento, setEntrenamiento] = useState(true);
    const [ensayoActual, setEnsayoActual] = useState(0);
    const [seleccion, setSeleccion] = useState(null);
    const [tiempoInicio, setTiempoInicio] = useState(null);
    const [tiemposRespuesta, setTiemposRespuesta] = useState([]);  // Tiempos de respuesta
    const [seleccionesFiguras, setSeleccionesFiguras] = useState([]);  // Figuras seleccionadas
    const [rectificaciones, setRectificaciones] = useState(0);
    const [correctas, setCorrectas] = useState(0);
    const [inversiones, setInversiones] = useState(0);
    const [campoNegligencia, setCampoNegligencia] = useState(false);
    const [tiempoRestante, setTiempoRestante] = useState(20); // Tiempo máximo por ensayo

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

    // Temporizador para los 20 segundos por ensayo
    useEffect(() => {
        if (tiempoRestante > 0 && !modalVisible) {
            const timer = setTimeout(() => setTiempoRestante(tiempoRestante - 1), 1000);
            return () => clearTimeout(timer);
        } else if (tiempoRestante === 0 && !modalVisible) {
            manejarSeleccion(null); // Si se acaba el tiempo, se pasa al siguiente ensayo
        }
    }, [tiempoRestante, modalVisible]);

    useEffect(() => {
        const guardarResultados = async () => {

            await guardarResultadosTest_11(route.params.idSesion, correctas, inversiones, rectificaciones,  JSON.stringify(tiemposRespuesta), JSON.stringify(seleccionesFiguras));

            navigation.replace('Test_12', { idSesion: route.params.idSesion });
        };

        if (ensayoActual === secuencias.length) {
            guardarResultados();
        }
    }, [ensayoActual]);

    const iniciarPrueba = () => {
        setModalVisible(false);
        setTiempoInicio(Date.now());
        setTiempoRestante(20); // Reinicia el tiempo para cada ensayo
    };

    const manejarSeleccion = (indice) => {
        const tiempoRespuesta = Date.now() - tiempoInicio;
        const esCorrecta = indice === secuencias[ensayoActual]?.correcta;
        const esInversion = indice === secuencias[ensayoActual]?.inversion;

        // Almacenamos el tiempo de respuesta y la figura seleccionada
        setTiemposRespuesta([...tiemposRespuesta, tiempoRespuesta]);
        setSeleccionesFiguras([...seleccionesFiguras, indice !== null ? indice + 1 : "0"]);

        if (esCorrecta) {
            setCorrectas(correctas + 1);
        } else if (esInversion) {
            setInversiones(inversiones + 1);
        }

        if (entrenamiento) {
            setEntrenamiento(false);
            setModalVisible(true);
            setEnsayoActual(1); // Aquí se inicia el primer ensayo real después del entrenamiento
        } else if (ensayoActual < secuencias.length - 1) {
            setEnsayoActual(ensayoActual + 1);
            setSeleccion(null);
            setTiempoInicio(Date.now());
            setTiempoRestante(20);
        } else {
            setEnsayoActual(secuencias.length);  // Dispara el useEffect para guardar los resultados sin intentar renderizar más secuencias
        }
    };

    if (ensayoActual >= secuencias.length) {
        return null; // Evita renderizar si ya se ha completado la prueba
    }

    return (
        <View style={stylesComunes.borde_tests}>
            <View style={stylesComunes.contenedor_test}>
                <MenuComponent
                    onToggleVoice={() => { }}
                    onNavigateHome={() => navigation.replace('Pacientes')}
                    onNavigateNext={() => navigation.replace('Test_12', { idSesion: route.params.idSesion })}
                    onNavigatePrevious={() => navigation.replace('Test_10', { idSesion: route.params.idSesion })}
                />
                <InstruccionesModal
                    visible={modalVisible}
                    onClose={iniciarPrueba}
                    title="Test 11"
                    instructions={entrenamiento ? translations.pr11ItemStart : translations.ItemStartPrueba}
                />
                {!modalVisible && (
                    <>
                        <View style={styles.contenedorImagenes}>
                            <Image source={secuencias[ensayoActual].modelo} style={styles.imagenModelo} />
                            <View style={styles.opcionesContainer}>
                                <View style={styles.column}>
                                    {secuencias[ensayoActual].opciones.slice(0, 3).map((opcion, index) => (
                                        <TouchableOpacity key={index} onPress={() => manejarSeleccion(index)}>
                                            <Image source={opcion} style={styles.imagenOpcion} />
                                        </TouchableOpacity>
                                    ))}
                                </View>
                                <View style={styles.column}>
                                    {secuencias[ensayoActual].opciones.slice(3, 6).map((opcion, index) => (
                                        <TouchableOpacity key={index} onPress={() => manejarSeleccion(index + 3)}>
                                            <Image source={opcion} style={styles.imagenOpcion} />
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => setRectificaciones(rectificaciones + 1)} style={stylesComunes.boton}>
                                <Text style={stylesComunes.textoBoton}>Rectificación</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    contenedorImagenes: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
        flex: 1
    },
    imagenModelo: {
        width: 200,
        height: 200,
        margin: 10,
        marginLeft: 100,
        resizeMode: 'contain'

    },
    opcionesContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center'
    },
    imagenOpcion: {
        width: 200,
        height: 200,
        margin: 10,
        resizeMode: 'contain'
    },
});

export default Test_11;