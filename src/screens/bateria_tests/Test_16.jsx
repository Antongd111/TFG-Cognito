import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import InstruccionesModal from '../../components/instrucciones';
import MenuComponent from '../../components/menu';
import stylesComunes from '../../styles/ComunStyles';
import correct from '../../../assets/images/correct.png';
import incorrect from '../../../assets/images/incorrect.png';

// Importar la imagen abstracta
const images = {
    abstracta: require('../../../assets/images/Test_16/abstracta.png')
};

const Test_16 = ({ navigation, route }) => {
    const [modalVisible, setModalVisible] = useState(true);
    const [fase, setFase] = useState(1); // 1: preguntar incapacidad, 2: preguntar si acepta, 3: evaluación
    const [incapacidad, setIncapacidad] = useState(false);
    const [aceptaPrueba, setAceptaPrueba] = useState(false);
    const [dibujoCorrecto, setDibujoCorrecto] = useState(null);
    const [perspectivaCorrecta, setPerspectivaCorrecta] = useState(null);

    /******************** MENÚ DE EVALUACIÓN ********************/
    const handleToggleVoice = () => {
        console.log("Toggle voice feature");
    };

    const handleNavigateHome = () => {
        navigation.navigate('Pacientes');
    };

    const handleNavigateNext = () => {
        navigation.navigate('Test_17', { idSesion: route.params.idSesion });
    };

    const handleNavigatePrevious = () => {
        navigation.navigate('Test_15', { idSesion: route.params.idSesion });
    };

    /***************** FIN MENÚ DE EVALUACIÓN *****************/

    const iniciarPrueba = () => {
        setModalVisible(false);
        setFase(1);
    };

    const manejarIncapacidad = (respuesta) => {
        setIncapacidad(respuesta);
        if (respuesta) {
            mostrarResultados();
        } else {
            setFase(2);
        }
    };

    const manejarAceptacion = (respuesta) => {
        setAceptaPrueba(respuesta);
        if (!respuesta) {
            mostrarResultados();
        } else {
            setFase(3);
        }
    };

    const manejarEvaluacionDibujo = (respuesta) => {
        setDibujoCorrecto(respuesta);
        setFase(4);
    };

    const manejarPerspectiva = (respuesta) => {
        setPerspectivaCorrecta(respuesta);
        mostrarResultados();
    };

    const mostrarResultados = () => {
        Alert.alert('Resultados',
            `Incapacidad para realizar la prueba: ${incapacidad ? 'Sí' : 'No'}\n` +
            `Aceptación de la prueba: ${aceptaPrueba ? 'Sí' : 'No'}\n` +
            `Dibujo correcto: ${dibujoCorrecto === null ? 'N/A' : dibujoCorrecto ? 'Sí' : 'No'}\n` +
            `Perspectiva correcta: ${perspectivaCorrecta === null ? 'N/A' : perspectivaCorrecta ? 'Sí' : 'No'}`);
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
                    title="Instrucciones"
                    instructions="Aquí tiene una hoja de papel, reproduzca esta figura lo mejor posible. Tiene todo el tiempo que necesite. Puede mirar el modelo tantas veces como desee." />
                {!modalVisible && (
                    <>
                        {fase === 1 && (
                            <View style={styles.container}>
                                <Text style={styles.pregunta}>¿Tiene alguna incapacidad para realizar la prueba?</Text>
                                <View style={styles.botonesContainer}>
                                    <TouchableOpacity style={styles.botonNo} onPress={() => manejarIncapacidad(true)}>
                                        <Text style={styles.textoBoton}>Sí</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.botonSi} onPress={() => manejarIncapacidad(false)}>
                                        <Text style={styles.textoBoton}>No</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                        {fase === 2 && (
                            <View style={styles.container}>
                                <Text style={styles.pregunta}>¿Desea realizar la prueba?</Text>
                                <View style={styles.botonesContainer}>
                                    <TouchableOpacity style={styles.botonSi} onPress={() => manejarAceptacion(true)}>
                                        <Text style={styles.textoBoton}>Sí</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.botonNo} onPress={() => manejarAceptacion(false)}>
                                        <Text style={styles.textoBoton}>No</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                        {fase === 3 && (
                            <View style={styles.containerFase3}>
                                <Image source={images.abstracta} style={styles.imagen} />
                                <View style={styles.botonesContainerFase3}>
                                    <TouchableOpacity style={styles.botonCorrecto} onPress={() => manejarEvaluacionDibujo(true)}>
                                        <Image source={correct} style={{ width: 60, height: 60 }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.botonIncorrecto} onPress={() => manejarEvaluacionDibujo(false)}>
                                        <Image source={incorrect} style={{ width: 60, height: 60 }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                        {fase === 4 && (
                            <View style={styles.container}>
                                <Text style={styles.pregunta}>¿La perspectiva del dibujo es correcta?</Text>
                                <View style={styles.botonesContainer}>
                                    <TouchableOpacity style={styles.botonSi} onPress={() => manejarPerspectiva(true)}>
                                        <Text style={styles.textoBoton}>Sí</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.botonNo} onPress={() => manejarPerspectiva(false)}>
                                        <Text style={styles.textoBoton}>No</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
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
        alignItems: 'center',
        padding: 20
    },
    containerFase3: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        marginBottom: 20,
        width: '100%',
        height: '100%'
    },
    pregunta: {
        fontSize: 40,
        textAlign: 'center',
        marginBottom: 20
    },
    botonesContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
    },
    botonesContainerFase3: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        width: '10%',
        marginBottom: 20
    },
    botonSi: {
        backgroundColor: '#47F251',
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        width: '40%'
    },
    botonNo: {
        backgroundColor: '#F04343',
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        width: '40%'
    },
    botonCorrecto: {
        backgroundColor: '#47F251',
        padding: 10,
        borderRadius: 50,
        marginHorizontal: 10,
        marginVertical: 20,
        width: 100,
        height: 100,
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
    },
    botonIncorrecto: {
        backgroundColor: '#F04343',
        padding: 10,
        borderRadius: 50,
        marginHorizontal: 10,
        marginVertical: 20,
        width: 100,
        height: 100,
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
    },
    textoBoton: {
        fontSize: 40,
        color: 'white',
        textAlign: 'center'
    },
    imagen: {
        width: '80%',
        height: '80%',
        resizeMode: 'contain',
        marginVertical: 20
    }
});

export default Test_16;