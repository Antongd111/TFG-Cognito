import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import stylesComunes from '../../styles/ComunStyles';
import InstruccionesModal from '../../components/instrucciones';
import pitidoCorto from '../../../assets/sounds/pitido_corto.mp3';
import pitidoLargo from '../../../assets/sounds/pitido_largo.mp3';
import { set } from 'date-fns';

const Test_4 = ({ navigation, route }) => {
    const [modalVisible, setModalVisible] = useState(true);
    const [ensayoActual, setEnsayoActual] = useState(0);
    const [faseEscucha, setFaseEscucha] = useState(true);
    const [sonidosLargosContados, setSonidosLargosContados] = useState(0);
    const [contadorUsuario, setContadorUsuario] = useState(0);
    const [contadorCorrecto, setContadorCorrecto] = useState(0);
    const [sound, setSound] = useState();
    const [inputValue, setInputValue] = useState('');

    const [numeroAciertos, setNumeroAciertos] = useState(0);
    const [numeroSobreestimaciones, setNumeroSobreestimaciones] = useState(0);
    const [numeroSubestimaciones, setNumeroSubestimaciones] = useState(0);

    const numeroEnsayos = 10;

    // Efecto para limpiar el sonido
    useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const handleNumberPress = (number) => {
        setInputValue(inputValue + number);
    };

    const handleSubmit = () => {

        if (inputValue == contadorCorrecto) {
            setNumeroAciertos(numeroAciertos + 1);
        } else if (inputValue > contadorCorrecto) {
            setNumeroSobreestimaciones(numeroSobreestimaciones + 1);
        } else {
            setNumeroSubestimaciones(numeroSubestimaciones + 1);
        }

        setFaseEscucha(true);
        setInputValue('');
        handleStartTest();
    };

    /**
     * Reproduce el sonido pasado como argumento.
     * @param {*} soundFile 
     */
    const playSound = async (soundFile) => {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync(
            soundFile
        );
        setSound(sound);

        console.log('Playing Sound');
        await sound.playAsync();
    };

    const ejecutarEnsayo = async () => {

        const numSonidos = Math.floor(Math.random() * (10 - 5 + 1)) + 5;
        setContadorCorrecto(0);

        for (let i = 0; i < numSonidos; i++) {
            const espera = Math.floor(Math.random() * (6000 - 3000 + 1)) + 3000;
            await sleep(espera);
            const largo = Math.floor(Math.random() * 2);

            if (largo) {
                await playSound(pitidoLargo);
                setContadorCorrecto(contadorCorrecto + 1);
            } else
                await playSound(pitidoCorto);
        }

        setFaseEscucha(false);
    }

    /**
     * Se ejecuta al empezar el test, cuando se cierra el modal de instrucciones.
     */
    const handleStartTest = async () => {
        setModalVisible(false);

        await ejecutarEnsayo();
        setEnsayoActual(ensayoActual + 1);

        setFaseEscucha(false);
    };

    const handleSubmitCount = () => {
        // Aquí puedes agregar la lógica para verificar si el conteo del usuario es correcto
    };

    return (
        <View style={stylesComunes.borde_tests}>
            <View style={stylesComunes.contenedor_test}>
                <InstruccionesModal
                    visible={modalVisible}
                    onClose={handleStartTest}
                    title="Test 4"
                    instructions="Escuche atentamente y cuente los sonidos largos."
                />
                {!modalVisible && faseEscucha && (
                    <>
                        <Text>Sobreestimaciones: {numeroSobreestimaciones}</Text>
                        <Text>Subestimaciones: {numeroSubestimaciones}</Text>
                        <Text>Aciertos: {numeroAciertos}</Text>
                        <Text>Ensayo {ensayoActual + 1}</Text>
                    </>
                )}
                {!modalVisible && !faseEscucha && (
                    <>
                        <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center', }}>
                        <View style={styles.numberPad}>
                            <Text style={styles.inputDisplay}>{inputValue}</Text>
                            <View style={styles.row}>
                                {['1', '2', '3'].map(number => (
                                    <TouchableOpacity key={number} style={styles.numberButton} onPress={() => handleNumberPress(number)}>
                                        <Text style={styles.numberText}>{number}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <View style={styles.row}>
                                {['4', '5', '6'].map(number => (
                                    <TouchableOpacity key={number} style={styles.numberButton} onPress={() => handleNumberPress(number)}>
                                        <Text style={styles.numberText}>{number}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <View style={styles.row}>
                                {['7', '8', '9'].map(number => (
                                    <TouchableOpacity key={number} style={styles.numberButton} onPress={() => handleNumberPress(number)}>
                                        <Text style={styles.numberText}>{number}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <View style={styles.row}>
                                <TouchableOpacity style={styles.numberButton} onPress={() => setInputValue(inputValue.slice(0, -1))}>
                                    <Text style={styles.numberText}>Del</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.numberButton} onPress={() => handleNumberPress('0')}>
                                    <Text style={styles.numberText}>0</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.numberButton} onPress={handleSubmit}>
                                    <Text style={styles.numberText}>OK</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        </View>
                    </>
                )}

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    numberPad: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        borderWidth: 1,
        width: '40%',
        borderRadius: 10,
        borderColor: '#ccc',
        height: '80%',
        alignSelf: 'center',
    },
    inputDisplay: {
        fontSize: 24,
        marginBottom: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        width: '70%',
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginTop: 10,
    },
    numberButton: {
        backgroundColor: '#F2E8E1',
        padding: 30,
        borderRadius: 30,
        marginHorizontal: 20,
    },
    numberText: {
        fontSize: 20,
    },
});

export default Test_4;