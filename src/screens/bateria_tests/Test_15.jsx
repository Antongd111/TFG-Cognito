import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import InstruccionesModal from '../../components/instrucciones';
import MenuComponent from '../../components/menu';
import stylesComunes from '../../styles/ComunStyles';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTranslation } from "../../locales";
import { useIsFocused } from '@react-navigation/native';

// Importar la imagen de la casa
const images = {
    casa: require('../../../assets/images/Test_15/casa.png')
};

const Test_15 = ({ navigation, route }) => {
    // Estado para controlar la visibilidad del modal de instrucciones
    const [modalVisible, setModalVisible] = useState(true);

    // Estado para almacenar las traducciones cargadas según el idioma seleccionado
    const [translations, setTranslations] = useState({});

    // Hook para detectar si la pantalla está en foco
    const isFocused = useIsFocused();

    useEffect(() => {
        // Función para cargar el idioma guardado en AsyncStorage
        const loadLanguage = async () => {
            const savedLanguage = await AsyncStorage.getItem('language');
            const lang = savedLanguage || 'es';
            setTranslations(getTranslation(lang));
        };

        if (isFocused) {
            loadLanguage();
        }
    }, [isFocused]);

    // Función para iniciar la prueba ocultando el modal de instrucciones
    const iniciarPrueba = () => {
        setModalVisible(false);
    };

    // Función para avanzar a la siguiente prueba (Test 16)
    const avanzarPrueba = () => {
        navigation.replace('Test_16', { idSesion: route.params.idSesion });
    };

    return (
        <View style={stylesComunes.borde_tests}>
            <View style={stylesComunes.contenedor_test}>
                <MenuComponent
                    
                    onNavigateHome={() => navigation.replace('Pacientes')}
                    onNavigateNext={() => navigation.replace('Test_16', { idSesion: route.params.idSesion })}
                    onNavigatePrevious={() => navigation.replace('Test_14', { idSesion: route.params.idSesion })}
                />
                <InstruccionesModal
                    visible={modalVisible}
                    onClose={iniciarPrueba}
                    title={translations.Pr15Titulo}
                    instructions={translations.pr15ItemStart} 
                />
                {!modalVisible && (
                    <View style={styles.container}>
                        <Image source={images.casa} style={styles.imagen} />
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

export default Test_15;