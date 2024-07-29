import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import InstruccionesModal from '../../components/instrucciones';
import MenuComponent from '../../components/menu';
import stylesComunes from '../../styles/ComunStyles';

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

const nombresYCaras = [
    { nombre: 'Miguel', cara: miguel },
    { nombre: 'Mario', cara: mario },
    { nombre: 'Jorge', cara: jorge },
    { nombre: 'María', cara: maria },
    { nombre: 'Jesús', cara: jesus },
    { nombre: 'Marina', cara: marina },
    { nombre: 'Guillermo', cara: guillermo },
    { nombre: 'Judith', cara: judith },
    { nombre: 'Gabriela', cara: gabriela }
];

const Test_9 = ({ navigation, route }) => {

    /******************** MENÚ DE EVALUACIÓN ********************/
    const handleToggleVoice = () => {
        console.log("Toggle voice feature");
    };

    const handleNavigateHome = () => {
        navigation.navigate('Pacientes');
    };

    const handleNavigateNext = () => {
        navigation.navigate('Test_10', { idSesion: route.params.idSesion });
    };

    const handleNavigatePrevious = () => {
        navigation.navigate('Test_8', { idSesion: route.params.idSesion });
    };

    /***************** FIN MENÚ DE EVALUACIÓN *****************/

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
            navigation.navigate('Test_10', { idSesion: route.params.idSesion });
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
                    instructions="Los nombres de persona utilizados en la tarea previa son presentados de nuevo pero asociados a una cara que deberá recordar más tarde durante el transcurso del examen. Cada cara se presenta durante 5 segundos."
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