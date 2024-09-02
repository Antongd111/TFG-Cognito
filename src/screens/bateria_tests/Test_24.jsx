import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import InstruccionesModal from '../../components/instrucciones';
import MenuComponent from '../../components/menu';
import stylesComunes from '../../styles/ComunStyles';
import { guardarResultadosTest_24 } from '../../api/TestApi';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTranslation } from '../../locales';
import correct from '../../../assets/images/correct.png';


const Test_24 = ({ navigation, route }) => {
    const [modalVisible, setModalVisible] = useState(true);
    const [modalInicioRealesVisible, setModalInicioRealesVisible] = useState(false);
    const [ensayoActual, setEnsayoActual] = useState(0);
    const [etapaActual, setEtapaActual] = useState(0);
    const [nombreActual, setNombreActual] = useState('');
    const [transparencia, setTransparencia] = useState(1);
    const [translations, setTranslations] = useState({});
    const isFocused = useIsFocused();
    const numeroEnsayos = 10; // Solo los ensayos reales
    const etapas = 15;
    const [nombresTotales, setNombresTotales] = useState([]);
    const [nombresConocidos, setNombresConocidos] = useState([]);
    const [nombresDesconocidos, setNombresDesconocidos] = useState([]);
    const [nombreDePrueba, setNombreDePrueba] = useState('');
    const [indiceNombreActual, setIndiceNombreActual] = useState(0);

    const [validezEnsayo, setValidezEnsayo] = useState([]);
    const [etapasEnsayo, setEtapasEnsayo] = useState([]);

    useEffect(() => {
        const loadLanguage = async () => {
            const savedLanguage = await AsyncStorage.getItem('language');
            const lang = savedLanguage || 'es';
            const loadedTranslations = getTranslation(lang);
            setTranslations(loadedTranslations);

            const nombres = loadedTranslations?.pr24Nombre1?.split(",")?.map(nombre => nombre.trim()) || [];

            // El primer nombre es el de prueba
            setNombreDePrueba(nombres[0]);

            // Los nombres conocidos y desconocidos según los índices
            const conocidos = [2, 3, 6, 8, 10].map(index => nombres[index]);
            const desconocidos = [1, 4, 5, 7, 9].map(index => nombres[index]);

            setNombresTotales(nombres);
            setNombresConocidos(conocidos);
            setNombresDesconocidos(desconocidos);
        };

        if (isFocused) {
            loadLanguage();
        }
    }, [isFocused]);

    useEffect(() => {
        if (!modalVisible && ensayoActual === 0) {
            iniciarEnsayo();
        }
    }, [modalVisible]);

    useEffect(() => {
        if (etapaActual < etapas && ensayoActual <= numeroEnsayos) {
            const timer = setInterval(() => {
                setEtapaActual(prev => prev + 1);
                setTransparencia((etapaActual + 1) / etapas);
            }, 1000);

            return () => clearInterval(timer);
        } else if (etapaActual === etapas && ensayoActual <= numeroEnsayos) {
            manejarFallo();
        }
    }, [etapaActual, ensayoActual]);

    const iniciarEnsayo = () => {
        setEtapaActual(0);
        setTransparencia(0);

        let nombre = nombresTotales[indiceNombreActual];
        setIndiceNombreActual(indiceNombreActual + 1);

        setNombreActual(nombre);

    };

    const manejarExito = () => {
        if (ensayoActual > 0) { // Ignora el ensayo de prueba
            setValidezEnsayo([...validezEnsayo, true]);
            setEtapasEnsayo([...etapasEnsayo, etapaActual]);
        }
        siguienteEnsayo();
    };

    const manejarFallo = () => {
        if (ensayoActual > 0) { // Ignora el ensayo de prueba
            setValidezEnsayo([...validezEnsayo, false]);
            setEtapasEnsayo([...etapasEnsayo, 16]);
        }
        siguienteEnsayo();
    };

    const siguienteEnsayo = () => {
        if (ensayoActual === 0) {
            // Finaliza ensayo de prueba y muestra modal antes de iniciar ensayos reales
            setModalInicioRealesVisible(true);
        } else {
            setEnsayoActual(ensayoActual + 1);
            iniciarEnsayo();
        }
    };

    useEffect(() => {
        const calcularResultados = async () => {
            // Filtra los resultados de las etapas correspondientes a nombres conocidos y desconocidos
            const etapasConocidos = etapasEnsayo.filter((_, index) => [2, 3, 6, 8, 10].includes(index + 1));
            const etapasDesconocidos = etapasEnsayo.filter((_, index) => [1, 4, 5, 7, 9].includes(index + 1));
        
            // Calcula la media de etapas para nombres conocidos y desconocidos
            const mediaConocidos = etapasConocidos.reduce((acc, cur) => acc + cur, 0) / etapasConocidos.length;
            const mediaDesconocidos = etapasDesconocidos.reduce((acc, cur) => acc + cur, 0) / etapasDesconocidos.length;
        
            const diferencia = Math.abs(mediaConocidos - mediaDesconocidos);
        
            await guardarResultadosTest_24(route.params.idSesion, etapasEnsayo, mediaConocidos, mediaDesconocidos, diferencia);
        
            navigation.navigate('Test_25', { idSesion: route.params.idSesion });
        };

        if (ensayoActual > numeroEnsayos) {
            calcularResultados();
        }
    }, [ensayoActual]);

    if (ensayoActual >= 11) {
        return null;
    }

    return (
        <View style={stylesComunes.borde_tests}>
            <View style={stylesComunes.contenedor_test}>
                <MenuComponent
                    onToggleVoice={() => { }}
                    onNavigateHome={() => navigation.navigate('Pacientes')}
                    onNavigateNext={() => navigation.navigate('Test_25', { idSesion: route.params.idSesion })}
                    onNavigatePrevious={() => navigation.navigate('Test_23', { idSesion: route.params.idSesion })}
                />
                <InstruccionesModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    title="Test 24"
                    instructions={translations?.pr24ItemStart + "\n \n" + translations?.ItemStartBasico}
                />
                <InstruccionesModal
                    visible={modalInicioRealesVisible}
                    onClose={() => {
                        setModalInicioRealesVisible(false);
                        setEnsayoActual(ensayoActual + 1);
                        iniciarEnsayo();
                    }}
                    title="Test 24"
                    instructions={translations.ItemStartPrueba}
                />

                {!modalVisible && (
                    <>
                                        <TouchableOpacity style={styles.botonOK} onPress={manejarExito}>
                        <Image source={correct} style={{ width: 60, height: 60 }} />
                    </TouchableOpacity>
                    <View style={[styles.nombreContainer, { opacity: transparencia }]}>
                        <Text style={styles.nombreTexto}>{nombreActual}</Text>
                    </View>
                    </>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    nombreContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    nombreTexto: {
        fontSize: '50%',
        fontWeight: 'bold',
        color: 'cyan',
    },
    botonOK: {
        position: 'absolute',
        bottom: 40,
        right: 20,
        backgroundColor: '#47F251',
        padding: 10,
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        zIndex: 1,
    },
    textoBotonOK: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Test_24;