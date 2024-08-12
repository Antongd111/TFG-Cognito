import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import MenuComponent from '../../components/menu';
import stylesComunes from '../../styles/ComunStyles';

const historia = [
    "El salón",
    "que está en la planta baja",
    "de la casa",
    "es enorme.",
    "Las alfombras",
    "Que cubren el suelo",
    "lo hacen",
    "acogedor.",
    "En el centro",
    "hay",
    "una mesa,",
    "un sofá,",
    "y dos sillones,",
    "uno enfrente del otro.",
    "Un fuego",
    "arde",
    "en la chimenea.",
    "Hay", 
    "una televisión",
    "cerca de",
    "la ventana",
    "y una escultura",
    "con un jarrón",
    "a cada lado.",
    "También hay un gato",
    "durmiendo",
    "en un cojín.",
];

const Test_21 = ({ navigation, route }) => {
    const [selecciones, setSelecciones] = useState(new Array(historia.length).fill(false));
    const [respuestas, setRespuestas] = useState(0);
    const [intrusiones, setIntrusiones] = useState(0);
    const [rechazado, setRechazado] = useState(false);

    /******************** MENÚ DE EVALUACIÓN ********************/
    const handleToggleVoice = () => {
        console.log("Toggle voice feature");
    };

    const handleNavigateHome = () => {
        navigation.navigate('Pacientes');
    };

    const handleNavigateNext = () => {
        navigation.navigate('Test_23', { idSesion: route.params.idSesion });
    };

    const handleNavigatePrevious = () => {
        navigation.navigate('Test_21', { idSesion: route.params.idSesion });
    };

    /***************** FIN MENÚ DE EVALUACIÓN *****************/

    const toggleSeleccion = (index) => {
        const nuevasSelecciones = [...selecciones];
        nuevasSelecciones[index] = !nuevasSelecciones[index];
        setSelecciones(nuevasSelecciones);

        if (nuevasSelecciones[index]) {
            setRespuestas(respuestas + 1);
        } else {
            setRespuestas(respuestas - 1);
        }
    };

    const registrarIntrusion = () => {
        setIntrusiones(intrusiones + 1);
    };

    const rechazarPrueba = () => {
        setRechazado(true);
        Alert.alert('Prueba rechazada', 'El sujeto ha decidido rechazar la prueba.');
    };

    const validarRespuestas = () => {
        const respuestasCorrectas = historia.filter((_, index) => selecciones[index]);
        Alert.alert('Resultados',
            `Respuestas correctas: ${respuestasCorrectas.length}\n` +
            `Intrusiones: ${intrusiones}\n` +
            `Rechazado: ${rechazado ? 'Sí' : 'No'}`);
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
                <View style={styles.historiaContainer}>
                    {historia.map((frase, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => toggleSeleccion(index)}
                            style={[
                                styles.fraseContainer,
                                selecciones[index] ? styles.fraseSeleccionada : styles.fraseNoSeleccionada
                            ]}
                        >
                            <Text style={styles.fraseTexto}>{`${(index + 1).toString().padStart(2, '0')}. ${frase}`}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={styles.botonesContainer}>
                    <TouchableOpacity style={styles.botonIntrusion} onPress={registrarIntrusion}>
                        <Text style={styles.textoBoton}>INTRUSIÓN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botonRechazar} onPress={rechazarPrueba}>
                        <Text style={styles.textoBoton}>RECHAZAR</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.resultadosContainer}>
                    <View style={styles.tablaFila}>
                        <Text style={styles.tablaCeldaHeader}>Respuestas</Text>
                        <Text style={styles.tablaCelda}>{respuestas}</Text>
                    </View>
                    <View style={styles.tablaFila}>
                        <Text style={styles.tablaCeldaHeader}>Intrusiones</Text>
                        <Text style={styles.tablaCelda}>{intrusiones}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.botonValidar} onPress={validarRespuestas}>
                    <Text style={styles.textoBotonValidar}>Validar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    historiaContainer: {
        marginTop: '6%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    fraseContainer: {
        width: '25%',
        margin: 5,
        marginHorizontal: 20,
        padding: 10,
        borderRadius: 5,
    },
    fraseSeleccionada: {
        backgroundColor: '#D2B48C',
    },
    fraseNoSeleccionada: {
        backgroundColor: '#F2E8E1',
    },
    fraseTexto: {
        fontSize: 18,
        textAlign: 'left',
    },
    botonesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginHorizontal: '9%',
    },
    botonIntrusion: {
        backgroundColor: '#D2B48C',
        padding: 10,
        borderRadius: 10,
        width: '40%',
    },
    botonRechazar: {
        backgroundColor: '#F04343',
        padding: 10,
        borderRadius: 10,
        width: '40%',
    },
    resultadoTexto: {
        fontSize: 18,
        marginHorizontal: 20,
    },
    botonValidar: {
        backgroundColor: '#47F251',
        padding: 15,
        borderRadius: 10,
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    textoBoton: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
    },
    textoBotonValidar: {
        fontSize: 25,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    resultadosContainer: {
        marginTop: 40,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 5,
        width: '30%',
        marginLeft: '9%'
    },
    tablaFila: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
    },
    tablaCeldaHeader: {
        fontWeight: 'bold',
        fontSize: 18,
        width: '50%',
        textAlign: 'left',
    },
    tablaCelda: {
        width: '50%',
        fontSize: 18,
        textAlign: 'right',
    },
});

export default Test_21;