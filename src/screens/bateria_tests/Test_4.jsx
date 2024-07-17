import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import InstruccionesModal from '../../components/instrucciones';
import pitidoCorto from '../../../assets/sounds/pitido_corto.mp3';
import pitidoLargo from '../../../assets/sounds/pitido_largo.mp3';

const Test_4 = ({ navigation, route }) => {
    const [modalVisible, setModalVisible] = useState(true);
    const [ensayoActual, setEnsayoActual] = useState(0);
    const [sonidosLargosContados, setSonidosLargosContados] = useState(0);
    const [contadorUsuario, setContadorUsuario] = useState(0);
    const [sound, setSound] = useState();

    // Efecto para limpiar el sonido
    useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync(); 
            }
            : undefined;
    }, [sound]);

    const playSound = async (soundFile) => {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync(
           soundFile
        );
        setSound(sound);

        console.log('Playing Sound');
        await sound.playAsync(); 
    };

    const handleStartTest = async () => {
        setModalVisible(false);
        await playSound(pitidoLargo); // Puedes controlar el flujo de sonidos aquí
    };

    const handleSubmitCount = () => {
        // Aquí puedes agregar la lógica para verificar si el conteo del usuario es correcto
    };

    return (
        <View style={styles.container}>
            <InstruccionesModal
                visible={modalVisible}
                onClose={handleStartTest}
                title="Test 4"
                instructions="Escuche atentamente y cuente los sonidos largos."
            />
            {!modalVisible && (
                <>
                    <Text>Escuchando sonidos...</Text>
                    <TouchableOpacity onPress={handleSubmitCount}>
                        <Text>Confirmar conteo</Text>
                    </TouchableOpacity>
                    <Text>Ensayo {ensayoActual + 1}</Text>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Test_4;