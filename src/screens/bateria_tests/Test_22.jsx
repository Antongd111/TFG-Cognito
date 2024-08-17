import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import MenuComponent from '../../components/menu';
import stylesComunes from '../../styles/ComunStyles';
import InstruccionesModal from '../../components/instrucciones';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTranslation } from "../../locales";
import { useIsFocused } from '@react-navigation/native';

const Test_22 = ({ navigation, route }) => {
    const [respuestas, setRespuestas] = useState(0);
    const [intrusiones, setIntrusiones] = useState(0);
    const [rechazado, setRechazado] = useState(false);
    const [modalVisible, setModalVisible] = useState(true);

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
        navigation.navigate('Test_23', { idSesion: route.params.idSesion });
    };

    const handleNavigatePrevious = () => {
        navigation.navigate('Test_21', { idSesion: route.params.idSesion });
    };

    /***************** FIN MENÚ DE EVALUACIÓN *****************/

    const historia = [
        translations.pr22txt1,
        translations.pr22txt2,
        translations.pr22txt3,
        translations.pr22txt4,
        translations.pr22txt5,
        translations.pr22txt6,
        translations.pr22txt7,
        translations.pr22txt8,
        translations.pr22txt9,
        translations.pr22txt10,
        translations.pr22txt11,
        translations.pr22txt12,
        translations.pr22txt13,
        translations.pr22txt14,
        translations.pr22txt15,
        translations.pr22txt16,
        translations.pr22txt17,
        translations.pr22txt18,
        translations.pr22txt19,
        translations.pr22txt20,
        translations.pr22txt21,
        translations.pr22txt22,
        translations.pr22txt23,
        translations.pr22txt24,
        translations.pr22txt25,
        translations.pr22txt26,
        translations.pr22txt27,
    ];
    
    const [selecciones, setSelecciones] = useState(new Array(historia.length).fill(false));

    const iniciarPrueba = () => {
        setModalVisible(false);
    };

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
                <InstruccionesModal
                    visible={modalVisible}
                    onClose={iniciarPrueba}
                    title="Test 22"
                    instructions={translations.pr22ItemStart} />
                {!modalVisible && (
                    <>
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
                                <Text style={styles.textoBoton}>{translations.Intrusion}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.botonRechazar} onPress={rechazarPrueba}>
                                <Text style={styles.textoBoton}>{translations.Rechazar}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.resultadosContainer}>
                            <View style={styles.tablaFila}>
                                <Text style={styles.tablaCeldaHeader}>{translations.Respuestas}</Text>
                                <Text style={styles.tablaCelda}>{respuestas}</Text>
                            </View>
                            <View style={styles.tablaFila}>
                                <Text style={styles.tablaCeldaHeader}>{translations.Intrusiones}</Text>
                                <Text style={styles.tablaCelda}>{intrusiones}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.botonValidar} onPress={validarRespuestas}>
                            <Text style={styles.textoBotonValidar}>{translations.Validar}</Text>
                        </TouchableOpacity>
                    </>
                )}
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

export default Test_22;