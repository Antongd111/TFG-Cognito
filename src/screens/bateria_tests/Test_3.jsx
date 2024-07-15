import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import InstruccionesModal from '../../components/instrucciones';
import correct from '../../../assets/images/correct.png';
import incorrect from '../../../assets/images/incorrect.png';
import perroGrande from '../../../assets/images/perro_alto.png';
import perroPequeno from '../../../assets/images/perro_bajo.png';
import payasoAlto from '../../../assets/images/payaso_alto.png';
import payasoBajo from '../../../assets/images/payaso_bajo.png';
import stylesComunes from '../../styles/ComunStyles';
import { guardarResultadosTest_3 } from '../../api/TestApi';

const Test_3 = ({ navigation, route }) => {
    const [modalVisible, setModalVisible] = useState(true);
    const [ensayoActual, setEnsayoActual] = useState(0);
    const [faseLectura, setFaseLectura] = useState(true);
    const [secuenciaTocada, setSecuenciaTocada] = useState('');
    const [numeroAciertos, setNumeroAciertos] = useState(0);
    const [lecturaCorrecta, setLecturaCorrecta] = useState(0);
    const [erroresTiempo, setErroresTiempo] = useState(0);
    const [timeoutId, setTimeoutId] = useState(null);

    const { idPaciente, idSesion } = route.params;

    // Función que retorna la frase según el ensayo actual
    const obtenerFrase = (ensayo) => {
        switch (ensayo) {
            case 0:
                return "Toque los perros";
            case 1:
                return "Toque el payaso pequeño";
            case 2:
                return "Toque el perro que mira el payaso grande";
            case 3:
                return "Toque el payaso que está entre el perro blanco y el otro payaso";
            case 4:
                return "Toque el payaso pequeño y después el perro grande";
            case 5:
                return "Toque el perro blanco después de haber tocado el perro negro";
            default:
                return "Instrucción no definida";
        }
    };

    const respuestasCorrectas = [
        ['1', '4'],
        ['3'],
        ['1'],
        ['3'],
        ['3', '1'],
        ['1', '4']
    ];

    useEffect(() => {
        if (faseLectura) {
            const id = setTimeout(() => {
                setErroresTiempo(erroresTiempo + 1);
                setFaseLectura(false);  // Simula el fin del tiempo de lectura
            }, 10000);
            setTimeoutId(id);
        }

        return () => clearTimeout(timeoutId);
    }, [faseLectura, ensayoActual]);

    useEffect(() => {
        if (!faseLectura && secuenciaTocada.length === respuestasCorrectas[ensayoActual].length) {
            let esCorrecto = false;

            // Verifica si el ensayo actual es el primero y si la secuencia tocada contiene los dos perros
            if (ensayoActual === 0) {
                const perros = ["1", "4"]; // Suponiendo que "1" y "4" representan los dos perros
                esCorrecto = secuenciaTocada.split('').sort().join('') === perros.sort().join('');
            } else {
                // Lógica para otros ensayos donde el orden importa
                esCorrecto = respuestasCorrectas[ensayoActual].every((val, idx) => val === secuenciaTocada[idx]);
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
    
        // Aumentar el contador de ensayo actual
        const nuevoEnsayoActual = ensayoActual + 1;
        setEnsayoActual(nuevoEnsayoActual);
    
        // Verifica si es el último ensayo
        if (nuevoEnsayoActual > 5) { // Asumiendo que 5 es el índice del último ensayo
            // Navegar al siguiente test
            almacenarResultados();
        } else {
            setFaseLectura(true);
            setSecuenciaTocada('');
        }
    }

    const almacenarResultados = async () => {
        try {
          // Llamar a la función de añadir paciente y esperar el resultado
          await guardarResultadosTest_3(idSesion, numeroAciertos, lecturaCorrecta, erroresTiempo);
          console.log("Éxito", "Resultados almacenados.");
          navigation.navigate('Test_4', { idPaciente: idPaciente, idSesion: idSesion });
        } catch (error) {
          console.error(error);
          Alert.alert("Error", "Ha ocurrido un error al añadir los resultados a la Base de Datos.");
        }
      }

    const handleImagenTocada = (numeroImagen) => {
        setSecuenciaTocada(secuenciaTocada + numeroImagen);
    };

    return (
        <View style={stylesComunes.borde_tests}>
            <View style={stylesComunes.contenedor_test}>
                <InstruccionesModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    title="Test 3"
                    instructions="En la pantalla aparecerá una frase que usted debe leer en voz alta. Posteriormente, verá una imagen y debe hacer lo que acaba de leer lo más rápido posible. Pulse 'Entendido' para comenzar."
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