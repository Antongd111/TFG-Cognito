import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import InstruccionesModal from '../../components/instrucciones';
import MenuComponent from '../../components/menu';
import stylesComunes from '../../styles/ComunStyles';
import { guardarResultadosTest_17 } from '../../api/TestApi';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTranslation } from "../../locales";
import { useIsFocused } from '@react-navigation/native';

const Test_17 = ({ navigation, route }) => {
    // Estados para la lógica de fases y control del modal
    const [fase, setFase] = useState(1);
    const [modalVisible, setModalVisible] = useState(true);

    // Fase 1: Recordar nombres
    const [nombresRecordadosFase1, setNombresRecordadosFase1] = useState([]);
    const [intrusionesFase1, setIntrusionesFase1] = useState(0);
    const [perseveracionesFase1, setPerseveracionesFase1] = useState(0);
    const [rechazosFase1, setRechazosFase1] = useState(0);

    // Fase 2: Repetir nombres
    const [nombresRecordadosFase2, setNombresRecordadosFase2] = useState([]);
    const [intrusionesFase2, setIntrusionesFase2] = useState(0);
    const [perseveracionesFase2, setPerseveracionesFase2] = useState(0);
    const [rechazosFase2, setRechazosFase2] = useState(0);

    // Fase 3: Reconocimiento
    const [nombresIdentificados, setNombresIdentificados] = useState([]);
    const [erroresIdentificados, setErroresIdentificados] = useState([]);
    const [rechazosReconocimiento, setRechazosReconocimiento] = useState(0);

    /******************** CARGA DE TRADUCCIONES ********************/
    const [translations, setTranslations] = useState({});
    const isFocused = useIsFocused();
    const [idioma, setIdioma] = useState('es');

    useEffect(() => {
        const loadLanguage = async () => {
            const savedLanguage = await AsyncStorage.getItem('language');
            const lang = savedLanguage || 'es';
            setTranslations(getTranslation(lang));
            setIdioma(lang);
        };

        if (isFocused) {
            loadLanguage();
        }
    }, [isFocused]);
    /***************** FIN DE CARGA DE TRADUCCIONES ****************/

    const nombresAprendidos = [
        translations.pr08Nombre1, translations.pr08Nombre2, translations.pr08Nombre3,
        translations.pr08Nombre4, translations.pr08Nombre5, translations.pr08Nombre6,
        translations.pr08Nombre7, translations.pr08Nombre8, translations.pr08Nombre9
    ];
    
    const nombresDistractores = [
        translations.pr17Nombre1, translations.pr17Nombre2, translations.pr17Nombre3,
        translations.pr17Nombre4, translations.pr17Nombre5, translations.pr17Nombre6,
        translations.pr17Nombre7, translations.pr17Nombre8, translations.pr17Nombre9
    ];

    const handleRecordarNombreFase1 = (nombre) => {
        setNombresRecordadosFase1((prev) => {
            if (prev.includes(nombre)) {
                return prev.filter((n) => n !== nombre); // Deseleccionar
            } else {
                return [...prev, nombre]; // Seleccionar
            }
        });
    };

    const handleRecordarNombreFase2 = (nombre) => {
        setNombresRecordadosFase2((prev) => {
            if (prev.includes(nombre)) {
                return prev.filter((n) => n !== nombre); // Deseleccionar
            } else {
                return [...prev, nombre]; // Seleccionar
            }
        });
    };

    const handleNombreIdentificado = (nombre) => {
        if (nombresAprendidos.includes(nombre)) {
            // Si el nombre está en nombresAprendidos, lo agregamos a nombresIdentificados
            setNombresIdentificados((prev) => {
                if (prev.includes(nombre)) {
                    return prev.filter((n) => n !== nombre); // Deseleccionar
                } else {
                    return [...prev, nombre]; // Seleccionar
                }
            });
        } else if (nombresDistractores.includes(nombre)) {
            // Si el nombre está en nombresDistractores, lo agregamos a erroresIdentificados
            setErroresIdentificados((prev) => {
                if (prev.includes(nombre)) {
                    return prev.filter((n) => n !== nombre); // Deseleccionar
                } else {
                    return [...prev, nombre]; // Seleccionar
                }
            });
        }
    };

    const handlePerseveracion = () => {
        if (fase === 1) {
            setPerseveracionesFase1(prev => prev + 1);
        } else if (fase === 2) {
            setPerseveracionesFase2(prev => prev + 1);
        }
    };

    const handleIntrusion = () => {
        if (fase === 1) {
            setIntrusionesFase1(prev => prev + 1);
        } else if (fase === 2) {
            setIntrusionesFase2(prev => prev + 1);
        }
    };

    const handleRechazo = () => {
        if (fase === 1) {
            setRechazosFase1(prev => prev + 1);
        } else if (fase === 2) {
            setRechazosFase2(prev => prev + 1);
        }
    };

    const handleRechazoReconocimiento = () => {
        setRechazosReconocimiento(rechazosReconocimiento + 1);
    };

    const validarFase = () => {
        if (fase === 1) {
            setModalVisible(true);
            setFase(2);
        } else if (fase === 2) {
            setModalVisible(true);
            setFase(3);
        } else if (fase === 3) {
            guardarResultados();
        }
    };

    const guardarResultados = async () => {
        await guardarResultadosTest_17(
            route.params.idSesion,
            nombresRecordadosFase1,
            intrusionesFase1,
            perseveracionesFase1,
            rechazosFase1,
            nombresRecordadosFase2,
            intrusionesFase2,
            perseveracionesFase2,
            rechazosFase2,
            nombresIdentificados,
            erroresIdentificados,
            rechazosReconocimiento
        );

        navigation.replace('Test_18', { idSesion: route.params.idSesion });
    };

    const iniciarTarea = () => {
        setModalVisible(false);
    };

    const renderNombreItemFase1 = ({ item }) => (
        <TouchableOpacity
            style={[styles.nombreItem, nombresRecordadosFase1.includes(item) && styles.nombreItemSeleccionado]}
            onPress={() => handleRecordarNombreFase1(item)}
        >
            <Text style={styles.nombreTexto}>{item}</Text>
        </TouchableOpacity>
    );

    const renderNombreItemFase2 = ({ item }) => (
        <TouchableOpacity
            style={[styles.nombreItem, nombresRecordadosFase2.includes(item) && styles.nombreItemSeleccionado]}
            onPress={() => handleRecordarNombreFase2(item)}
        >
            <Text style={styles.nombreTexto}>{item}</Text>
        </TouchableOpacity>
    );

    const renderReconocimientoItem = ({ item }) => (
        <TouchableOpacity
            style={[styles.nombreItem, (nombresIdentificados.includes(item) || erroresIdentificados.includes(item)) && styles.nombreItemSeleccionado]}
            onPress={() => handleNombreIdentificado(item)}
        >
            <Text style={styles.nombreTexto}>{item}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={stylesComunes.borde_tests}>
            <View style={stylesComunes.contenedor_test}>
                <MenuComponent
                    onToggleVoice={() => { }}
                    onNavigateHome={() => navigation.navigate('Pacientes')}
                    onNavigateNext={() => navigation.navigate('Test_18', { idSesion: route.params.idSesion })}
                    onNavigatePrevious={() => navigation.navigate('Test_16', { idSesion: route.params.idSesion })}
                />
                <InstruccionesModal
                    visible={modalVisible && fase === 1}
                    onClose={iniciarTarea}
                    title="Test 17 - 1"
                    instructions={translations.pr17ItemStart}
                />
                <InstruccionesModal
                    visible={modalVisible && fase === 2}
                    onClose={iniciarTarea}
                    title="Test 17 - 2"
                    instructions={translations.pr17ItemStart2}
                />
                <InstruccionesModal
                    visible={modalVisible && fase === 3}
                    onClose={iniciarTarea}
                    title="Test 17 - 3"
                    instructions={translations.pr17ItemStart3}
                />
                {!modalVisible && fase === 1 && (
                    <View>
                        <FlatList
                            data={nombresAprendidos}
                            renderItem={renderNombreItemFase1}
                            keyExtractor={(item) => item}
                            style={styles.nombreLista}
                        />
                        <View style={styles.botonera}>
                            <TouchableOpacity style={[styles.boton, { width: '40%' }]} onPress={handlePerseveracion}>
                                <Text style={styles.textoBotonValidar}>{translations.Perseveracion}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.boton, { width: '40%' }]} onPress={handleIntrusion}>
                                <Text style={styles.textoBotonValidar}>{translations.Intrusion}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.botonera}>
                            <TouchableOpacity style={styles.botonRechazo} onPress={handleRechazo}>
                                <Text style={styles.textoBotonValidar}>{translations.Rechazo}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.botonValidar} onPress={validarFase}>
                                <Text style={styles.textoBotonValidar}>{translations.Validar}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                {!modalVisible && fase === 2 && (
                    <View>
                        <View style={styles.fase2Container}>
                            <View style={styles.listaContainer}>
                                <Text style={styles.sectionHeader}>M</Text>
                                <FlatList
                                    data={nombresAprendidos.filter((nombre) => nombre.startsWith('M'))}
                                    renderItem={renderNombreItemFase2}
                                    keyExtractor={(item) => item}
                                    style={styles.nombreLista}
                                />
                            </View>
                            <View style={styles.listaContainer}>
                                <Text style={styles.sectionHeader}>J</Text>
                                <FlatList
                                    data={nombresAprendidos.filter((nombre) => nombre.startsWith('J'))}
                                    renderItem={renderNombreItemFase2}
                                    keyExtractor={(item) => item}
                                    style={styles.nombreLista}
                                />
                            </View>
                            <View style={styles.listaContainer}>
                                <Text style={styles.sectionHeader}>{idioma === 'es' ? 'G' : 'C'}</Text>
                                <FlatList
                                    data={nombresAprendidos.filter((nombre) => idioma === 'es' ? nombre.startsWith('G') : nombre.startsWith('C'))}
                                    renderItem={renderNombreItemFase2}
                                    keyExtractor={(item) => item}
                                    style={styles.nombreLista}
                                />
                            </View>
                        </View>
                        <View style={styles.botonera}>
                            <TouchableOpacity style={[styles.boton, { width: '40%' }]} onPress={handlePerseveracion}>
                                <Text style={styles.textoBotonValidar}>{translations.Perseveracion}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.boton, { width: '40%' }]} onPress={handleIntrusion}>
                                <Text style={styles.textoBotonValidar}>{translations.Intrusion}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.botonera}>
                            <TouchableOpacity style={styles.botonRechazo} onPress={handleRechazo}>
                                <Text style={styles.textoBotonValidar}>{translations.Rechazo}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.botonValidar} onPress={validarFase}>
                                <Text style={styles.textoBotonValidar}>{translations.Validar}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                {!modalVisible && fase === 3 && (
                    <View>
                        <FlatList
                            data={[...nombresAprendidos, ...nombresDistractores].sort()}
                            renderItem={renderReconocimientoItem}
                            keyExtractor={(item) => item}
                            numColumns={2}
                            columnWrapperStyle={styles.columnWrapper}
                            style={[styles.nombreLista, { marginTop: 60 }]}
                        />
                        <View style={styles.botonera}>
                            <TouchableOpacity style={styles.botonRechazo} onPress={handleRechazoReconocimiento}>
                                <Text style={styles.textoBotonValidar}>{translations.Rechazo}</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.botonValidar} onPress={validarFase}>
                            <Text style={styles.textoBotonValidar}>{translations.Validar}</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    nombreLista: {
        marginTop: 10,
        marginBottom: 20,
    },
    nombreItem: {
        padding: 10,
        margin: 5,
        backgroundColor: '#F2E8E1',
        borderRadius: 5,
        alignSelf: 'center',
    },
    nombreItemSeleccionado: {
        backgroundColor: '#D2B48C',
    },
    nombreTexto: {
        fontSize: 20,
    },
    botonera: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    boton: {
        padding: 15,
        backgroundColor: '#D2B48C',
        alignItems: 'center',
        borderRadius: 10,
        width: '40%',
    },
    botonValidar: {
        padding: 15,
        backgroundColor: '#47F251',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20,
        width: '40%',
        alignSelf: 'center',
    },
    botonRechazo: {
        padding: 15,
        backgroundColor: '#F04343',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20,
        width: '40%',
        alignSelf: 'center',
    },
    textoBotonValidar: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    columnWrapper: {
        justifyContent: 'space-around',
    },
    fase2Container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        marginTop: 20,
    },
    listaContainer: {
        flex: 1,
        alignItems: 'center',
    },
    sectionHeader: {
        fontSize: 20,
        marginTop: 50,
        fontWeight: 'bold',
        backgroundColor: '#D2B48C',
        padding: 5,
        textAlign: 'center',
        width: '100%',
    },
});

export default Test_17;