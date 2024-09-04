import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import InstruccionesModal from '../../components/instrucciones';
import correct from '../../../assets/images/correct.png';
import incorrect from '../../../assets/images/incorrect.png';
import perroGrande from '../../../assets/images/perro_alto.png';
import perroPequeno from '../../../assets/images/perro_bajo.png';
import payasoAlto from '../../../assets/images/payaso_alto.png';
import payasoBajo from '../../../assets/images/payaso_bajo.png';
import stylesComunes from '../../styles/ComunStyles';
import { guardarResultadosTest_3 } from '../../api/TestApi';
import MenuComponent from '../../components/menu';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTranslation } from "../../locales";
import { useIsFocused } from '@react-navigation/native';

const Test_3 = ({ navigation, route }) => {
    const { idSesion } = route.params;
    const [modalVisible, setModalVisible] = useState(true);
    const [ensayoActual, setEnsayoActual] = useState(0);
    const [faseLectura, setFaseLectura] = useState(true);
    const [secuenciaTocada, setSecuenciaTocada] = useState('');
    const [timeoutId, setTimeoutId] = useState(null);
    const respuestasCorrectas = [
        ['1', '4'],
        ['3'],
        ['1'],
        ['3', '1'],
        ['1', '4'],
        ['3']
    ];

    // RESULTADOS
    const [numeroAciertos, setNumeroAciertos] = useState(0);
    const [lecturaCorrecta, setLecturaCorrecta] = useState(0);
    const [erroresTiempo, setErroresTiempo] = useState(0);

    /** CARGA DE TRADUCCIONES **************************************/
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
    /** FIN CARGA DE TRADUCCIONES **************************************/

    const obtenerFrase = (ensayo) => {
        switch (ensayo) {
            case 0:
                return translations.pr03frase1;
            case 1:
                return translations.pr03frase2;
            case 2:
                return translations.pr03frase3;
            case 3:
                return translations.pr03frase4;
            case 4:
                return translations.pr03frase5;
            case 5:
                return translations.pr03frase6;
            default:
                return ". . .";
        }
    };

    useEffect(() => {
        if (faseLectura && ensayoActual <= 5) {
            const id = setTimeout(() => {
                setErroresTiempo(erroresTiempo + 1);
                setFaseLectura(false);
            }, 10000);
            setTimeoutId(id);
        }

        return () => clearTimeout(timeoutId);
    }, [faseLectura, ensayoActual]);

    useEffect(() => {
        if (ensayoActual > 5) {
            almacenarResultados();
        }
    }, [ensayoActual]);

    useEffect(() => {
        if (!faseLectura && secuenciaTocada.length === respuestasCorrectas[ensayoActual]?.length) {
            let esCorrecto = false;

            if (ensayoActual === 0) {
                const perros = ["1", "4"];
                esCorrecto = secuenciaTocada.split('').sort().join('') === perros.sort().join('');
            } else {
                esCorrecto = respuestasCorrectas[ensayoActual]?.every((val, idx) => val === secuenciaTocada[idx]);
            }

            if (esCorrecto) {
                setNumeroAciertos(numeroAciertos + 1);
            }
            siguienteCaso(esCorrecto);
        }
    }, [secuenciaTocada]);

    const siguienteCaso = (acierto) => {
        if (acierto) {
            setNumeroAciertos(numeroAciertos + 1);
        }

        const nuevoEnsayoActual = ensayoActual + 1;
        setEnsayoActual(nuevoEnsayoActual);

        if (nuevoEnsayoActual <= 5) {
            setFaseLectura(true);
            setSecuenciaTocada('');
        }
    };

    const almacenarResultados = async () => {
        try {
            await guardarResultadosTest_3(idSesion, numeroAciertos, lecturaCorrecta, erroresTiempo);
            navigation.replace('Test_4', { idSesion: idSesion });
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Ha ocurrido un error al añadir los resultados a la Base de Datos.");
        }
    };

    const handleImagenTocada = (numeroImagen) => {
        setSecuenciaTocada(secuenciaTocada + numeroImagen);
    };

    if (ensayoActual > 5) {
        return null;
    }    

    return (
        <View style={stylesComunes.borde_tests}>
            <View style={stylesComunes.contenedor_test}>
                <MenuComponent
                    
                    onNavigateHome={() => navigation.replace('Pacientes')}
                    onNavigateNext={() => navigation.replace('Test_4', { idSesion: idSesion })}
                    onNavigatePrevious={() => navigation.replace('Test_2', { idSesion: idSesion })}
                />
                <InstruccionesModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    title={translations.Pr03Titulo}
                    instructions={translations.pr03ItemStart + "\n \n" + translations.ItemStartBasico}
                />
                {!modalVisible && (
                    <>
                        <View style={styles.tarjetaFrase}>
                            <Text style={styles.texto_instruccion}>
                                {obtenerFrase(ensayoActual)}
                            </Text>

                            <View style={styles.botones}>
                                {faseLectura && (
                                    <>
                                        <TouchableOpacity
                                            style={styles.botonAcierto}
                                            onPress={() => {
                                                setFaseLectura(false);
                                                setLecturaCorrecta(lecturaCorrecta + 1);
                                            }}
                                        >
                                            <Image source={correct} style={{ width: 30, height: 30 }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.botonFallo}
                                            onPress={() => {
                                                setFaseLectura(false);
                                            }}
                                        >
                                            <Image source={incorrect} style={{ width: 30, height: 30 }} />
                                        </TouchableOpacity>
                                    </>
                                )}
                            </View>
                        </View>
                        {!faseLectura && (
                            <View style={styles.contenedorImagen}>
                                <TouchableOpacity onPress={() => { handleImagenTocada('1') }}>
                                    <Image
                                        source={perroGrande}
                                        style={[styles.imagen, { marginBottom: -50 }]}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { handleImagenTocada('2') }}>
                                    <Image
                                        source={payasoAlto}
                                        style={styles.imagen}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { handleImagenTocada('3') }}>
                                    <Image
                                        source={payasoBajo}
                                        style={[styles.imagen, { marginBottom: -20 }]}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { handleImagenTocada('4') }}>
                                    <Image
                                        source={perroPequeno}
                                        style={[styles.imagen, { marginBottom: -20 }]}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                            </View>
                        )}
                    </>
                )}
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    tarjetaFrase: {
        borderWidth: 2,
        borderColor: '#D2B48C',
        borderRadius: 10,
        width: '90%',
        height: '15%',
        alignSelf: 'center',
        marginTop: 20,
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'space-between',
        alignItems: 'center',
    },
    texto_instruccion: {
        fontSize: 30,
        textAlign: 'center',
        marginLeft: 20,
    },
    botones: {
        display: 'flex',
        flexDirection: 'column',
    },
    botonAcierto: {
        width: 50,
        height: '50%',
        alignSelf: 'center',
        backgroundColor: '#47F251',
        borderTopRightRadius: 8,
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
    },
    botonFallo: {
        width: 50,
        height: '50%',
        alignSelf: 'center',
        backgroundColor: '#F04343',
        borderBottomRightRadius: 8,
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
    },
    imagen: {
        width: 250,
        maxHeight: 400,
    },
    contenedorImagen: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'center',
        alignItems: 'flex-end',
    },
});

export default Test_3;