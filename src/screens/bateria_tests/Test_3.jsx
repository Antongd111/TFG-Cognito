import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import InstruccionesModal from '../../components/instrucciones';
import correct from '../../../assets/images/correct.png';
import incorrect from '../../../assets/images/incorrect.png';
import { Dimensions } from 'react-native';
import stylesComunes from '../../styles/ComunStyles';
import { set } from 'date-fns';

const Test_3 = ({ navigation, route }) => {

    const [modalVisible, setModalVisible] = useState(true);
    const [ensayoActual, setEnsayoActual] = useState(0);
    const [faseLectura, setFaseLectura] = useState(true);

    const { idPaciente } = route.params;

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
        }
    };

    return (
        <View style={stylesComunes.borde_tests}>
            <View style={stylesComunes.contenedor_test}>
                <InstruccionesModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    title="Test 3"
                    instructions="En la pantalla aparecerá una frase que usted debe leer en voz alta. Posteriormente, verá una imagen y debe hacer lo que acaba de leer lo más rápido posible. 
                    Pulse 'Entendido' para comenzar."
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
                                                setEnsayoActual(ensayoActual + 1);
                                                setFaseLectura(false);
                                            }}
                                        >
                                            <Image source={correct} style={{ width: 30, height: 30 }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.botonFallo}
                                            onPress={() => {
                                                setEnsayoActual(ensayoActual + 1);
                                                setFaseLectura(false);
                                            }}
                                        >
                                            <Image source={incorrect} style={{ width: 30, height: 30 }} />
                                        </TouchableOpacity>
                                    </>
                                )}
                            </View>
                        </View>
                    </>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    tarjetaFrase: {
        borderWidth: 2,
        borderColor: 'black',
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
});

export default Test_3;