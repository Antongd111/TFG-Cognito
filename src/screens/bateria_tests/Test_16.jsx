import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import InstruccionesModal from '../../components/instrucciones';
import MenuComponent from '../../components/menu';
import stylesComunes from '../../styles/ComunStyles';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTranslation } from "../../locales";
import { useIsFocused } from '@react-navigation/native';

// Importar la imagen abstracta
const images = {
    abstracta: require('../../../assets/images/Test_16/abstracta.png')
};

const Test_16 = ({ navigation, route }) => {
    const [modalVisible, setModalVisible] = useState(true);

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

    const iniciarPrueba = () => {
        setModalVisible(false);
    };

    const avanzarPrueba = () => {
        navigation.replace('Test_17', { idSesion: route.params.idSesion });
    };

    return (
        <View style={stylesComunes.borde_tests}>
            <View style={stylesComunes.contenedor_test}>
                <MenuComponent
                    
                    onNavigateHome={() => navigation.replace('Pacientes')}
                    onNavigateNext={() => navigation.replace('Test_17', { idSesion: route.params.idSesion })}
                    onNavigatePrevious={() => navigation.replace('Test_15', { idSesion: route.params.idSesion })}
                />
                <InstruccionesModal
                    visible={modalVisible}
                    onClose={iniciarPrueba}
                    title={translations.Pr16Titulo}
                    instructions={translations.pr16ItemStart} 
                />
                {!modalVisible && (
                    <View style={styles.container}>
                        <Image source={images.abstracta} style={styles.imagen} />
                        <TouchableOpacity style={styles.botonSiguiente} onPress={avanzarPrueba}>
                            <Text style={styles.textoBoton}>Siguiente</Text>
                        </TouchableOpacity>
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
        alignItems: 'center',
        padding: 20
    },
    imagen: {
        width: '80%',
        height: '80%',
        resizeMode: 'contain',
        marginVertical: 20
    },
    botonSiguiente: {
        backgroundColor: '#D2B48C',
        padding: 20,
        borderRadius: 10,
        marginVertical: 20,
        alignSelf: 'flex-end',
        marginRight: 30
    },
    textoBoton: {
        fontSize: 30,
        color: 'white',
        textAlign: 'center'
    }
});

export default Test_16;