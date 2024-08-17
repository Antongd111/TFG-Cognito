import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import InstruccionesModal from '../../components/instrucciones';
import MenuComponent from '../../components/menu';
import stylesComunes from '../../styles/ComunStyles';

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

const figuras = {
    pr11_t1_1, pr11_t1_2, pr11_t1_3, pr11_t1_4, pr11_t1_5, pr11_t1_6,
    pr11_t2_1, pr11_t2_2, pr11_t2_3, pr11_t2_4, pr11_t2_5, pr11_t2_6,
    pr11_t3_1, pr11_t3_2, pr11_t3_3, pr11_t3_4, pr11_t3_5, pr11_t3_6,
    pr11_t4_1, pr11_t4_2, pr11_t4_3, pr11_t4_4, pr11_t4_5, pr11_t4_6,
    pr11_t5_1, pr11_t5_2, pr11_t5_3, pr11_t5_4, pr11_t5_5, pr11_t5_6,
    pr11_t6_1, pr11_t6_2, pr11_t6_3, pr11_t6_4, pr11_t6_5, pr11_t6_6,
    pr11_t7_1, pr11_t7_2, pr11_t7_3, pr11_t7_4, pr11_t7_5, pr11_t7_6
};

const secuencias = [
    { modelo: figuras.pr11_t1_1, opciones: [figuras.pr11_t1_1, figuras.pr11_t1_2, figuras.pr11_t1_3, figuras.pr11_t1_4, figuras.pr11_t1_5, figuras.pr11_t1_6], correcta: 0 },
    { modelo: figuras.pr11_t2_1, opciones: [figuras.pr11_t2_1, figuras.pr11_t2_2, figuras.pr11_t2_3, figuras.pr11_t2_4, figuras.pr11_t2_5, figuras.pr11_t2_6], correcta: 1 },
    { modelo: figuras.pr11_t3_1, opciones: [figuras.pr11_t3_1, figuras.pr11_t3_2, figuras.pr11_t3_3, figuras.pr11_t3_4, figuras.pr11_t3_5, figuras.pr11_t3_6], correcta: 2 },
    { modelo: figuras.pr11_t4_1, opciones: [figuras.pr11_t4_1, figuras.pr11_t4_2, figuras.pr11_t4_3, figuras.pr11_t4_4, figuras.pr11_t4_5, figuras.pr11_t4_6], correcta: 3 },
    { modelo: figuras.pr11_t5_1, opciones: [figuras.pr11_t5_1, figuras.pr11_t5_2, figuras.pr11_t5_3, figuras.pr11_t5_4, figuras.pr11_t5_5, figuras.pr11_t5_6], correcta: 4 },
    { modelo: figuras.pr11_t6_1, opciones: [figuras.pr11_t6_1, figuras.pr11_t6_2, figuras.pr11_t6_3, figuras.pr11_t6_4, figuras.pr11_t6_5, figuras.pr11_t6_6], correcta: 5 },
    { modelo: figuras.pr11_t7_1, opciones: [figuras.pr11_t7_1, figuras.pr11_t7_2, figuras.pr11_t7_3, figuras.pr11_t7_4, figuras.pr11_t7_5, figuras.pr11_t7_6], correcta: 0 }
];

const Test_11 = ({ navigation, route }) => {
    const [modalVisible, setModalVisible] = useState(true);
    const [entrenamiento, setEntrenamiento] = useState(true);
    const [ensayoActual, setEnsayoActual] = useState(0);
    const [seleccion, setSeleccion] = useState(null);
    const [tiempoInicio, setTiempoInicio] = useState(null);
    const [tiemposRespuesta, setTiemposRespuesta] = useState([]);
    const [rectificaciones, setRectificaciones] = useState(0);
    const [correctas, setCorrectas] = useState(0);
    const [inversiones, setInversiones] = useState(0);
    const [campoNegligencia, setCampoNegligencia] = useState(false);

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
        navigation.navigate('Pacientes');
    };

    const handleNavigateNext = () => {
        navigation.navigate('Test_12', { idSesion: route.params.idSesion });
    };

    const handleNavigatePrevious = () => {
        navigation.navigate('Test_10', { idSesion: route.params.idSesion });
    };

    /***************** FIN MENÚ DE EVALUACIÓN *****************/

    useEffect(() => {
        if (!modalVisible && entrenamiento) {
            setTimeout(() => {
                setEntrenamiento(false);
                setModalVisible(true);
            }, 20000); // 20 segundos para el ensayo de entrenamiento
        }
    }, [modalVisible, entrenamiento]);

    const iniciarPrueba = () => {
        setModalVisible(false);
        setTiempoInicio(Date.now());
    };

    const manejarSeleccion = (indice) => {
        const tiempoRespuesta = Date.now() - tiempoInicio;
        setTiemposRespuesta([...tiemposRespuesta, tiempoRespuesta]);

        if (indice === secuencias[ensayoActual].correcta) {
            setCorrectas(correctas + 1);
        } else {
            setInversiones(inversiones + 1);
        }

        if (entrenamiento) {
            setEntrenamiento(false);
            setModalVisible(true);
            setEnsayoActual(0);
        } else if (ensayoActual < secuencias.length - 1) {
            setEnsayoActual(ensayoActual + 1);
            setSeleccion(null);
            setTiempoInicio(Date.now());
        } else {
            mostrarResultados();
        }
    };

    const mostrarResultados = () => {
        const resultados = {
            tiemposRespuesta,
            correctas,
            inversiones,
            rectificaciones,
            campoNegligencia
        };

        Alert.alert('Resultados', JSON.stringify(resultados));
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
        marginLeft: 100
    },
    opcionesContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center'
    },
    imagenOpcion: {
        width: 200,
        height: 200,
        margin: 10
    },
    botonRectificacion: {
        backgroundColor: '#D2B48C',
        padding: 10,
        borderRadius: 5,
        alignSelf: 'center',
        marginLeft: 20
    },
    textoBotonRectificacion: {
        fontSize: 18,
        color: 'white'
    }
});

export default Test_11;