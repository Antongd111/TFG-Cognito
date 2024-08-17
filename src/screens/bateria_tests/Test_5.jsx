//FIXME: EL SONIDO SE SIGUE ESCUCHANDO AL CAMBIAR DE TEST

import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import InstruccionesModal from '../../components/instrucciones';
import MenuComponent from '../../components/menu';
import stylesComunes from '../../styles/ComunStyles';

import figura_1 from '../../../assets/images/Test_5/figura_1.png';
import figura_2 from '../../../assets/images/Test_5/figura_2.png';
import figura_3 from '../../../assets/images/Test_5/figura_3.png';
import figura_4 from '../../../assets/images/Test_5/figura_4.png';
import figura_5 from '../../../assets/images/Test_5/figura_5.png';
import figura_6 from '../../../assets/images/Test_5/figura_6.png';
import figura_7 from '../../../assets/images/Test_5/figura_7.png';
import figura_8 from '../../../assets/images/Test_5/figura_8.png';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTranslation } from "../../locales";
import { useIsFocused } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const figuraSize = 50;
const margenLateral = 100;
const margenVertical = 50;

const Test_5 = ({ navigation, route }) => {

    const [modalVisible, setModalVisible] = useState(true);
    const [figuras, setFiguras] = useState([]);
    const [mostrarFiguraCorrecta, setMostrarFiguraCorrecta] = useState(true);
    const [figuraCorrecta, setFiguraCorrecta] = useState(null);

    const [faseEntrenamiento, setFaseEntrenamiento] = useState(true);

    const imagenesFiguras = {
        figura_1: figura_1,
        figura_2: figura_2,
        figura_3: figura_3,
        figura_4: figura_4,
        figura_5: figura_5,
        figura_6: figura_6,
        figura_7: figura_7,
        figura_8: figura_8
    };

    /** CARGA DE TRADUCCIONES **************************************/

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

    /** FIN CARGA DE TRADUCCIONES **************************************/

    /******************** MENÚ DE EVALUACIÓN ********************/
    const handleToggleVoice = () => {
        console.log("Toggle voice feature");
    };

    const handleNavigateHome = () => {
        navigation.navigate('Pacientes');
    };

    const handleNavigateNext = () => {
        navigation.navigate('Test_6', { idSesion: route.params.idSesion });
    };

    const handleNavigatePrevious = () => {
        navigation.navigate('Test_4', { idSesion: route.params.idSesion });
    };

    /***************** FIN MENÚ DE EVALUACIÓN *****************/

    useEffect(() => {
        generarFiguras();
    }, []);

    const generarPosicionAleatoria = (figurasExistentes) => {
        let newX, newY, overlap;
        do {
            overlap = false;
            newX = Math.floor(Math.random() * (screenWidth - figuraSize - margenLateral * 2)) + margenLateral;
            newY = Math.floor(Math.random() * (screenHeight - figuraSize - margenVertical * 2)) + margenVertical;

            // Verifica que no se solape con otras figuras
            overlap = figurasExistentes.some(fig => {
                return Math.abs(newX - fig.x) < figuraSize && Math.abs(newY - fig.y) < figuraSize;
            });
            console.log("Overlap: ", overlap);
        } while (overlap);
        return { x: newX, y: newY };
    };

    const generarFiguras = () => {
        console.log("Generando figuras");
        const nuevasFiguras = [];
        // Suponiendo que hay 8 tipos de figuras y solo dos deben ser correctas
        const tipos = ["figura_1", "figura_2", "figura_3", "figura_4", "figura_5", "figura_6", "figura_7", "figura_8"];
        const indiceCorrecto = Math.floor(Math.random() * tipos.length);

        for (let i = 0; i < 20; i++) {
            const { x, y } = generarPosicionAleatoria(nuevasFiguras);
            nuevasFiguras.push({
                tipo: i < 2 ? tipos[indiceCorrecto] : tipos[Math.floor(Math.random() * tipos.length)],
                x,
                y,
                esCorrecta: i < 2
            });
        }

        console.log(nuevasFiguras);
        setFiguras(nuevasFiguras);
        setFiguraCorrecta(imagenesFiguras[tipos[indiceCorrecto]]);
    };

    const handleStartTest = () => {
        setModalVisible(false);
        generarFiguras();

        setTimeout(() => {
            setMostrarFiguraCorrecta(false);
        }, 2000); // Oculta la figura correcta después de 2 segundos
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
                    onClose={handleStartTest}
                    title="Test 5"
                    instructions={translations.pr05ItemStart + "\n \n" + translations.ItemStartBasico}
                />
                {!modalVisible && mostrarFiguraCorrecta && figuraCorrecta && (
                    <View style={styles.figuraCorrecta}>
                        <Image
                            source={figuraCorrecta}
                            style={{ height: figuraSize * 2, width: figuraSize * 2 }}
                        />
                    </View>
                )}
                {!modalVisible && !mostrarFiguraCorrecta && (
                    <View>
                        {figuras.map((fig, index) => (
                            <Image
                                key={index}
                                source={imagenesFiguras[fig.tipo]}
                                style={{ height: 50, width: 50, position: 'absolute', left: fig.x, top: fig.y }}
                            />
                        ))}
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    figuraCorrecta: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -50 }, { translateY: -50 }],
        zIndex: 1
    }
});

export default Test_5;
