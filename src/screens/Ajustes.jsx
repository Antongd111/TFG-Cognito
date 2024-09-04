import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Alert, Switch } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/header';
import stylesComunes from '../styles/ComunStyles';
import { getTranslation } from "../locales";

const Ajustes = ({ navigation }) => {
    const [language, setLanguage] = useState('es'); // Manejaremos solo un estado para el idioma
    const [translations, setTranslations] = useState({});
    const [voiceEnabled, setVoiceEnabled] = useState(false); // Estado para el narrador

    useEffect(() => {
        const loadSettings = async () => {
            const savedLanguage = await AsyncStorage.getItem('language');
            const lang = savedLanguage || 'es'; // Usa 'es' como valor predeterminado
            setLanguage(lang);
            setTranslations(getTranslation(lang)); // Carga las traducciones del idioma

            const savedVoiceEnabled = await AsyncStorage.getItem('voiceEnabled');
            setVoiceEnabled(savedVoiceEnabled === 'true'); // Carga el estado del narrador
        };

        loadSettings();
    }, []);

    const handleLanguageChange = async (newLanguage) => {
        setLanguage(newLanguage);
        setTranslations(getTranslation(newLanguage)); // Actualiza las traducciones
        await AsyncStorage.setItem('language', newLanguage); // Guarda el idioma seleccionado
    };

    const toggleVoice = async (value) => {
        setVoiceEnabled(value);
        await AsyncStorage.setItem('voiceEnabled', value.toString()); // Guarda el estado del narrador
    };

    const resetSettings = async () => {
        await AsyncStorage.clear();
        const defaultLanguage = 'es';
        setLanguage(defaultLanguage);
        setTranslations(getTranslation(defaultLanguage)); // Resetea a las traducciones por defecto
        setVoiceEnabled(false); // Restablece el narrador a desactivado
        Alert.alert("Configuración Restablecida", "La configuración ha sido restablecida a los valores predeterminados.");
    };

    return (
        <View style={styles.container}>
            <Header navigation={navigation} />

            <View style={styles.contenedorAjustes}>
                <Text style={styles.title}>{translations.Ajustes}</Text>

                <View style={styles.ajustes}>
                    <View style={styles.ajuste}>
                        <Text style={styles.settingLabel}>{translations.CabeceraIdioma}</Text>
                        <View style={styles.languageOptions}>
                            <TouchableOpacity
                                style={[styles.languageButton, language === 'en' && styles.selectedLanguageButton]}
                                onPress={() => handleLanguageChange('en')}
                            >
                                <Text style={styles.languageButtonText}>English</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.languageButton, language === 'es' && styles.selectedLanguageButton]}
                                onPress={() => handleLanguageChange('es')}
                            >
                                <Text style={styles.languageButtonText}>Español</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.languageButton, language === 'fr' && styles.selectedLanguageButton]}
                                onPress={() => handleLanguageChange('fr')}
                            >
                                <Text style={styles.languageButtonText}>Français</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Ajuste para habilitar o deshabilitar el narrador */}
                    <View style={styles.ajusteVoz}>
                        <Text style={styles.settingLabel}>{translations.Narrador}</Text>
                        <Switch
                            onValueChange={toggleVoice}
                            value={voiceEnabled}
                            trackColor={{ false: "#767577", true: "#D2B48C" }}
                        />
                    </View>
                </View>

                <View style={styles.botonera}>
                    <TouchableOpacity style={styles.resetButton} onPress={resetSettings}>
                        <Text style={styles.resetButtonText}>{translations.ReestablecerAjustes}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[stylesComunes.boton, { width: '40%' }]} onPress={() => navigation.goBack()}>
                        <Text style={[stylesComunes.textoBoton, { fontWeight: 'bold' }]}>{translations["Volver"]}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contenedorAjustes: {
        margin: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '70%',
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    ajustes: {
        display: 'flex',
        flexDirection: 'column',
        height: '80%',
    },
    ajuste: {
        marginTop: 50,
        display: 'flex',
        flexDirection: 'row',
        width: '50%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    ajusteVoz: {
        marginTop: 50,
        display: 'flex',
        flexDirection: 'row',
        width: '20%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    settingLabel: {
        fontSize: 30,
    },
    languageOptions: {
        flexDirection: 'row',
    },
    languageButton: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#D2B48C',
        backgroundColor: '#F2E8E1',
        marginHorizontal: 30,
    },
    selectedLanguageButton: {
        backgroundColor: '#D2B48C',
    },
    languageButtonText: {
        fontSize: 16,
    },
    resetButton: {
        backgroundColor: '#FF6347',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: '40%',
        height: 60,
        margin: 10,
    },
    resetButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    botonera: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default Ajustes;