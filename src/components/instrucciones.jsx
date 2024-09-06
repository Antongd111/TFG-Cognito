import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/ComunStyles';
import { useState, useEffect, useRef } from 'react';
import * as Speech from 'expo-speech';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTranslation } from "../locales";
import { useIsFocused } from '@react-navigation/native';

const InstruccionesModal = ({ visible, onClose, title, instructions }) => {

    const [translations, setTranslations] = useState({});
    const [narracionHabilitada, setNarracionHabilitada] = useState(false);
    const isFocused = useIsFocused();
    const narrationStarted = useRef(false);

    useEffect(() => {
        const loadSettings = async () => {
            const savedLanguage = await AsyncStorage.getItem('language');
            const lang = savedLanguage || 'es';
            setTranslations(getTranslation(lang));

            const narracion = await AsyncStorage.getItem('voiceEnabled');
            setNarracionHabilitada(narracion === 'true');
        };

        if (isFocused) {
            loadSettings();
        }
    }, [isFocused]);

    useEffect(() => {
        const startNarrationOnce = async () => {
            if (!narrationStarted.current && instructions && narracionHabilitada && translations.Idioma) {
                narrationStarted.current = true;  // Marcar que la narración ha comenzado

                // Espera un poco para asegurarte de que translations está cargado
                await new Promise(resolve => setTimeout(resolve, 300)); 

                // Inicia la narración
                await Speech.speak(instructions, {
                    language: translations.Idioma || 'es',
                    onDone: () => { narrationStarted.current = false; },  // Reinicia el flag cuando termine
                    onError: () => { narrationStarted.current = false; }  // Reinicia en caso de error
                });
            }
        };

        if (visible) {
            startNarrationOnce();
        }

        return () => {
            Speech.stop();  // Detener la narración cuando el modal se cierra
            narrationStarted.current = false;  // Reiniciar el control para la próxima vez
        };
    }, [visible, instructions, translations, narracionHabilitada]); // Asegúrate de que todas las dependencias estén bien cargadas


    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.tituloInstrucciones}>{title}</Text>
                    <View style={styles.separador} />
                    <Text style={styles.textoInstrucciones}>{instructions}</Text>
                    <TouchableOpacity
                        style={styles.boton}
                        onPress={() => {
                            Speech.stop();
                            onClose();
                        }}>
                        <Text style={styles.textoBoton}>{translations.Comenzar}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default InstruccionesModal;