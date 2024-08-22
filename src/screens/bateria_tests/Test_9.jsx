import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import InstruccionesModal from '../../components/instrucciones';
import MenuComponent from '../../components/menu';
import stylesComunes from '../../styles/ComunStyles';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTranslation } from "../../locales";
import { useIsFocused } from '@react-navigation/native';


// Importa las imágenes de las caras
import miguel from '../../../assets/images/Caras/cara1.png';
import mario from '../../../assets/images/Caras/cara2.png';
import jorge from '../../../assets/images/Caras/cara3.png';
import maria from '../../../assets/images/Caras/cara4.png';
import jesus from '../../../assets/images/Caras/cara5.png';
import marina from '../../../assets/images/Caras/cara6.png';
import guillermo from '../../../assets/images/Caras/cara7.png';
import judith from '../../../assets/images/Caras/cara8.png';
import gabriela from '../../../assets/images/Caras/cara9.png';

const Test_9 = ({ navigation, route }) => {

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
        navigation.replace('Pacientes');
    };

    const handleNavigateNext = () => {
        navigation.replace('Test_10', { idSesion: route.params.idSesion });
    };

    const handleNavigatePrevious = () => {
        navigation.replace('Test_8', { idSesion: route.params.idSesion });
    };

    /***************** FIN MENÚ DE EVALUACIÓN *****************/

    const nombresYCaras = [
        { nombre: translations.pr08Nombre1, cara: miguel },
        { nombre: translations.pr08Nombre2, cara: mario },
        { nombre: translations.pr08Nombre3, cara: jorge },
        { nombre: translations.pr08Nombre4, cara: maria },
        { nombre: translations.pr08Nombre5, cara: jesus },
        { nombre: translations.pr08Nombre6, cara: marina },
        { nombre: translations.pr08Nombre7, cara: guillermo },
        { nombre: translations.pr08Nombre8, cara: judith },
        { nombre: translations.pr08Nombre9, cara: gabriela }
    ];

    const [modalVisible, setModalVisible] = useState(true);
    const [indexActual, setIndexActual] = useState(0);
    const [mostrarCara, setMostrarCara] = useState(false);
    const [caraCargada, setCaraCargada] = useState(false);

    useEffect(() => {
        if (!modalVisible && indexActual < nombresYCaras.length) {
            setMostrarCara(true);
        }
    }, [modalVisible, indexActual]);

    useEffect(() => {
        if (indexActual >= nombresYCaras.length) {
            navigation.replace('Test_10', { idSesion: route.params.idSesion });
        }
    }, [indexActual]);

    const handleImageLoad = () => {
        setCaraCargada(true);
        const timer = setTimeout(() => {
            setMostrarCara(false);
            setCaraCargada(false);
            setIndexActual(indexActual + 1);
        }, 5000);
        return () => clearTimeout(timer);
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
                    onClose={() => setModalVisible(false)}
                    title="Test 9"
                    instructions = {translations.pr09ItemStart}
                />
                {!modalVisible && (
                    <View style={styles.caraContainer}>
                        {mostrarCara && (
                            <>
                                <Image
                                    source={nombresYCaras[indexActual].cara}
                                    style={styles.cara}
                                    onLoad={handleImageLoad}
                                />
                                {caraCargada && (
                                    <Text style={styles.nombre}>{nombresYCaras[indexActual].nombre}</Text>
                                )}
                            </>
                        )}
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    caraContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cara: {
        maxWidth: 300,
        maxHeight: 400,
        marginBottom: 20,
        borderRadius: 20,
        borderColor: '#D2B48C',
        borderWidth: 2,
    },
    nombre: {
        fontSize: 50,
        fontWeight: 'bold',
    },
});

export default Test_9;