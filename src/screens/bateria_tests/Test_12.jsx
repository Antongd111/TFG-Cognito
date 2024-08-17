import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import InstruccionesModal from '../../components/instrucciones';
import MenuComponent from '../../components/menu';
import stylesComunes from '../../styles/ComunStyles';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTranslation } from "../../locales";
import { useIsFocused } from '@react-navigation/native';

// Importar todas las imágenes de la carpeta Test_12
const images = {
    pr12_t1_1_copa: require('../../../assets/images/Test_12/pr12_t1_1_copa.jpg'),
    pr12_t1_2_plato: require('../../../assets/images/Test_12/pr12_t1_2_plato.jpg'),
    pr12_t1_3_sopa: require('../../../assets/images/Test_12/pr12_t1_3_sopa.jpg'),
    pr12_t1_4_ventilador: require('../../../assets/images/Test_12/pr12_t1_4_ventilador.jpg'),
    pr12_t1_5_perro: require('../../../assets/images/Test_12/pr12_t1_5_perro.jpg'),
    pr12_t1_6_martillo: require('../../../assets/images/Test_12/pr12_t1_6_martillo.jpg'),
    pr12_t2_1_tarta: require('../../../assets/images/Test_12/pr12_t2_1_tarta.jpg'),
    pr12_t2_2_carta: require('../../../assets/images/Test_12/pr12_t2_2_carta.jpg'),
    pr12_t2_3_cepillodientes: require('../../../assets/images/Test_12/pr12_t2_3_cepillodientes.jpg'),
    pr12_t2_4_serpiente: require('../../../assets/images/Test_12/pr12_t2_4_serpiente.jpg'),
    pr12_t2_5_pandereta: require('../../../assets/images/Test_12/pr12_t2_5_pandereta.jpg'),
    pr12_t2_6_cruasan: require('../../../assets/images/Test_12/pr12_t2_6_cruasan.jpg'),
    pr12_t3_1_pato: require('../../../assets/images/Test_12/pr12_t3_1_pato.jpg'),
    pr12_t3_2_pinguino: require('../../../assets/images/Test_12/pr12_t3_2_pinguino.jpg'),
    pr12_t3_3_zanahoria: require('../../../assets/images/Test_12/pr12_t3_3_zanahoria.jpg'),
    pr12_t3_4_silbato: require('../../../assets/images/Test_12/pr12_t3_4_silbato.jpg'),
    pr12_t3_5_tetera: require('../../../assets/images/Test_12/pr12_t3_5_tetera.jpg'),
    pr12_t3_6_barbacoa: require('../../../assets/images/Test_12/pr12_t3_6_barbacoa.jpg'),
    pr12_t4_1_mano: require('../../../assets/images/Test_12/pr12_t4_1_mano.jpg'),
    pr12_t4_2_hoja: require('../../../assets/images/Test_12/pr12_t4_2_hoja.jpg'),
    pr12_t4_3_tijeras: require('../../../assets/images/Test_12/pr12_t4_3_tijeras.jpg'),
    pr12_t4_4_triciclo: require('../../../assets/images/Test_12/pr12_t4_4_triciclo.jpg'),
    pr12_t4_5_pie: require('../../../assets/images/Test_12/pr12_t4_5_pie.jpg'),
    pr12_t4_6_piano: require('../../../assets/images/Test_12/pr12_t4_6_piano.jpg'),
    pr12_t5_1_cama: require('../../../assets/images/Test_12/pr12_t5_1_cama.jpg'),
    pr12_t5_2_sofa: require('../../../assets/images/Test_12/pr12_t5_2_sofa.jpg'),
    pr12_t5_3_carreta: require('../../../assets/images/Test_12/pr12_t5_3_carreta.jpg'),
    pr12_t5_4_lana: require('../../../assets/images/Test_12/pr12_t5_4_lana.jpg'),
    pr12_t5_5_tambor: require('../../../assets/images/Test_12/pr12_t5_5_tambor.jpg'),
    pr12_t5_6_gato: require('../../../assets/images/Test_12/pr12_t5_6_gato.jpg'),
    pr12_t6_1_boton: require('../../../assets/images/Test_12/pr12_t6_1_boton.jpg'),
    pr12_t6_2_melon: require('../../../assets/images/Test_12/pr12_t6_2_melon.jpg'),
    pr12_t6_3_cremallera: require('../../../assets/images/Test_12/pr12_t6_3_cremallera.jpg'),
    pr12_t6_4_enchufe: require('../../../assets/images/Test_12/pr12_t6_4_enchufe.jpg'),
    pr12_t6_5_barco: require('../../../assets/images/Test_12/pr12_t6_5_barco.jpg'),
    pr12_t6_6_reloj: require('../../../assets/images/Test_12/pr12_t6_6_reloj.jpg'),
    pr12_t7_1_cereza: require('../../../assets/images/Test_12/pr12_t7_1_cereza.jpg'),
    pr12_t7_2_paraguas: require('../../../assets/images/Test_12/pr12_t7_2_paraguas.jpg'),
    pr12_t7_3_percha: require('../../../assets/images/Test_12/pr12_t7_3_percha.jpg'),
    pr12_t7_4_cerveza: require('../../../assets/images/Test_12/pr12_t7_4_cerveza.jpg'),
    pr12_t7_5_fresa: require('../../../assets/images/Test_12/pr12_t7_5_fresa.jpg'),
    pr12_t7_6_lupa: require('../../../assets/images/Test_12/pr12_t7_6_lupa.jpg'),
    pr12_t8_1_bombilla: require('../../../assets/images/Test_12/pr12_t8_1_bombilla.jpg'),
    pr12_t8_2_tortilla: require('../../../assets/images/Test_12/pr12_t8_2_tortilla.jpg'),
    pr12_t8_3_pera: require('../../../assets/images/Test_12/pr12_t8_3_pera.jpg'),
    pr12_t8_4_elefante: require('../../../assets/images/Test_12/pr12_t8_4_elefante.jpg'),
    pr12_t8_5_guitarra: require('../../../assets/images/Test_12/pr12_t8_5_guitarra.jpg'),
    pr12_t8_6_linterna: require('../../../assets/images/Test_12/pr12_t8_6_linterna.jpg'),
    pr12_t9_1_rastrillo: require('../../../assets/images/Test_12/pr12_t9_1_rastrillo.jpg'),
    pr12_t9_2_rana: require('../../../assets/images/Test_12/pr12_t9_2_rana.jpg'),
    pr12_t9_3_peine: require('../../../assets/images/Test_12/pr12_t9_3_peine.jpg'),
    pr12_t9_4_pala: require('../../../assets/images/Test_12/pr12_t9_4_pala.jpg'),
    pr12_t9_5_anillo: require('../../../assets/images/Test_12/pr12_t9_5_anillo.jpg'),
    pr12_t9_6_bicicleta: require('../../../assets/images/Test_12/pr12_t9_6_bicicleta.jpg'),
    pr12_t10_1_castania: require('../../../assets/images/Test_12/pr12_t10_1_castania.jpg'),
    pr12_t10_2_casco: require('../../../assets/images/Test_12/pr12_t10_2_casco.jpg'),
    pr12_t10_3_sillaoficina: require('../../../assets/images/Test_12/pr12_t10_3_sillaoficina.jpg'),
    pr12_t10_4_pipas: require('../../../assets/images/Test_12/pr12_t10_4_pipas.jpg'),
    pr12_t10_5_regadera: require('../../../assets/images/Test_12/pr12_t10_5_regadera.jpg'),
    pr12_t10_6_arania: require('../../../assets/images/Test_12/pr12_t10_6_arania.jpg'),
    pr12_t11_1_secador: require('../../../assets/images/Test_12/pr12_t11_1_secador.jpg'),
    pr12_t11_2_maza: require('../../../assets/images/Test_12/pr12_t11_2_maza.jpg'),
    pr12_t11_3_margarita: require('../../../assets/images/Test_12/pr12_t11_3_margarita.jpg'),
    pr12_t11_4_manzana: require('../../../assets/images/Test_12/pr12_t11_4_manzana.jpg'),
    pr12_t11_5_baniador: require('../../../assets/images/Test_12/pr12_t11_5_baniador.jpg'),
    pr12_t11_6_lavadora: require('../../../assets/images/Test_12/pr12_t11_6_lavadora.jpg')
};

const Test_12 = ({ navigation, route }) => {
    const [modalVisible, setModalVisible] = useState(true);
    const [entrenamiento, setEntrenamiento] = useState(true);
    const [ensayoActual, setEnsayoActual] = useState(0);
    const [correctas, setCorrectas] = useState(0);
    const [erroresMorfológicos, setErroresMorfológicos] = useState(0);
    const [erroresFonéticos, setErroresFonéticos] = useState(0);
    const [erroresSemánticos, setErroresSemánticos] = useState(0);
    const [excedidoTiempo, setExcedidoTiempo] = useState(0);
    const [respuestaIncorrecta, setRespuestaIncorrecta] = useState(0);
    const [inicioEnsayo, setInicioEnsayo] = useState(null);

    /******************** CARGA DE TRADUCCIONES ********************/

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

    /***************** FIN DE CARGA DE TRADUCCIONES ****************/

    /******************** MENÚ DE EVALUACIÓN ********************/
    const handleToggleVoice = () => {
        console.log("Toggle voice feature");
    };

    const handleNavigateHome = () => {
        navigation.navigate('Pacientes');
    };

    const handleNavigateNext = () => {
        navigation.navigate('Test_13', { idSesion: route.params.idSesion });
    };

    const handleNavigatePrevious = () => {
        navigation.navigate('Test_11', { idSesion: route.params.idSesion });
    };

    /***************** FIN MENÚ DE EVALUACIÓN *****************/

    const secuencias = [
        {
            palabra: translations.pr12Nombre1,
            imagenes: [
                images.pr12_t1_1_copa,
                images.pr12_t1_2_plato,
                images.pr12_t1_3_sopa,
                images.pr12_t1_4_ventilador,
                images.pr12_t1_5_perro,
                images.pr12_t1_6_martillo
            ],
            correcta: 0,
            errores: {
                morfologicos: [1],
                foneticos: [3],
                semanticos: [2, 4]
            }
        },
        {
            palabra: translations.pr12Nombre2,
            imagenes: [
                images.pr12_t2_1_tarta,
                images.pr12_t2_2_carta,
                images.pr12_t2_3_cepillodientes,
                images.pr12_t2_4_serpiente,
                images.pr12_t2_5_pandereta,
                images.pr12_t2_6_cruasan
            ],
            correcta: 0,
            errores: {
                morfologicos: [1],
                foneticos: [2],
                semanticos: [3, 5]
            }
        },
        {
            palabra: translations.pr12Nombre3,
            imagenes: [
                images.pr12_t3_1_pato,
                images.pr12_t3_2_pinguino,
                images.pr12_t3_3_zanahoria,
                images.pr12_t3_4_silbato,
                images.pr12_t3_5_tetera,
                images.pr12_t3_6_barbacoa
            ],
            correcta: 0,
            errores: {
                morfologicos: [2],
                foneticos: [3],
                semanticos: [1, 5]
            }
        },
        {
            palabra: translations.pr12Nombre4,
            imagenes: [
                images.pr12_t4_1_mano,
                images.pr12_t4_2_hoja,
                images.pr12_t4_3_tijeras,
                images.pr12_t4_4_triciclo,
                images.pr12_t4_5_pie,
                images.pr12_t4_6_piano
            ],
            correcta: 0,
            errores: {
                morfologicos: [4],
                foneticos: [5],
                semanticos: [2, 3]
            }
        },
        {
            palabra: translations.pr12Nombre5,
            imagenes: [
                images.pr12_t5_1_cama,
                images.pr12_t5_2_sofa,
                images.pr12_t5_3_carreta,
                images.pr12_t5_4_lana,
                images.pr12_t5_5_tambor,
                images.pr12_t5_6_gato
            ],
            correcta: 0,
            errores: {
                morfologicos: [1],
                foneticos: [5],
                semanticos: [2, 4]
            }
        },
        {
            palabra: translations.pr12Nombre6,
            imagenes: [
                images.pr12_t6_1_boton,
                images.pr12_t6_2_melon,
                images.pr12_t6_3_cremallera,
                images.pr12_t6_4_enchufe,
                images.pr12_t6_5_barco,
                images.pr12_t6_6_reloj
            ],
            correcta: 0,
            errores: {
                morfologicos: [4],
                foneticos: [5],
                semanticos: [2, 3]
            }
        },
        {
            palabra: translations.pr12Nombre7,
            imagenes: [
                images.pr12_t7_1_cereza,
                images.pr12_t7_2_paraguas,
                images.pr12_t7_3_percha,
                images.pr12_t7_4_cerveza,
                images.pr12_t7_5_fresa,
                images.pr12_t7_6_lupa
            ],
            correcta: 0,
            errores: {
                morfologicos: [3],
                foneticos: [4],
                semanticos: [2, 5]
            }
        },
        {
            palabra: translations.pr12Nombre8,
            imagenes: [
                images.pr12_t8_1_bombilla,
                images.pr12_t8_2_tortilla,
                images.pr12_t8_3_pera,
                images.pr12_t8_4_elefante,
                images.pr12_t8_5_guitarra,
                images.pr12_t8_6_linterna
            ],
            correcta: 0,
            errores: {
                morfologicos: [2],
                foneticos: [3],
                semanticos: [1, 5]
            }
        },
        {
            palabra: translations.pr12Nombre9,
            imagenes: [
                images.pr12_t9_1_rastrillo,
                images.pr12_t9_2_rana,
                images.pr12_t9_3_peine,
                images.pr12_t9_4_pala,
                images.pr12_t9_5_anillo,
                images.pr12_t9_6_bicicleta
            ],
            correcta: 0,
            errores: {
                morfologicos: [3],
                foneticos: [4],
                semanticos: [1, 5]
            }
        },
        {
            palabra: translations.pr12Nombre10,
            imagenes: [
                images.pr12_t10_1_castania,
                images.pr12_t10_2_casco,
                images.pr12_t10_3_sillaoficina,
                images.pr12_t10_4_pipas,
                images.pr12_t10_5_regadera,
                images.pr12_t10_6_arania
            ],
            correcta: 0,
            errores: {
                morfologicos: [2],
                foneticos: [3],
                semanticos: [1, 5]
            }
        },
        {
            palabra: translations.pr12Nombre11,
            imagenes: [
                images.pr12_t11_1_secador,
                images.pr12_t11_2_maza,
                images.pr12_t11_3_margarita,
                images.pr12_t11_4_manzana,
                images.pr12_t11_5_baniador,
                images.pr12_t11_6_lavadora
            ],
            correcta: 0,
            errores: {
                morfologicos: [4],
                foneticos: [5],
                semanticos: [2, 3]
            }
        }
    ];

    const iniciarPrueba = () => {
        setModalVisible(false);
        setInicioEnsayo(Date.now());
    };

    const manejarSeleccion = (index) => {
        const tiempoRespuesta = Date.now() - inicioEnsayo;
        const secuenciaActual = secuencias[ensayoActual];

        if (!entrenamiento) {
            if (tiempoRespuesta > 10000) {
                setExcedidoTiempo(prev => prev + 1);
            } else if (index === secuenciaActual.correcta) {
                setCorrectas(prev => prev + 1);
            } else {
                setRespuestaIncorrecta(prev => prev + 1);
                if (secuenciaActual.errores.morfologicos.includes(index)) {
                    setErroresMorfológicos(prev => prev + 1);
                } else if (secuenciaActual.errores.foneticos.includes(index)) {
                    setErroresFonéticos(prev => prev + 1);
                } else if (secuenciaActual.errores.semanticos.includes(index)) {
                    setErroresSemánticos(prev => prev + 1);
                }
            }
        }

        if (entrenamiento) {
            setEntrenamiento(false);
            setModalVisible(true);
        } else if (ensayoActual < secuencias.length - 1) {
            setEnsayoActual(prev => prev + 1);
            setInicioEnsayo(Date.now());
        } else {
            mostrarResultados();
        }
    };

    const mostrarResultados = () => {
        Alert.alert('Resultados', `Total respuestas correctas: ${correctas}\nErrores morfológicos: ${erroresMorfológicos}\nErrores fonéticos: ${erroresFonéticos}\nErrores semánticos: ${erroresSemánticos}\nExcediendo el tiempo: ${excedidoTiempo}\nRespuestas incorrectas: ${respuestaIncorrecta}`);
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
                    onClose={iniciarPrueba}
                    title="Test 12"
                    instructions={entrenamiento ? translations.pr12ItemStart : translations.ItemStartPrueba}
                />
                {!modalVisible && (
                    <>
                        <Text style={styles.palabra}>{secuencias[ensayoActual].palabra}</Text>
                        <View style={styles.contenedorImagenes}>
                            {secuencias[ensayoActual].imagenes.map((opcion, index) => (
                                <TouchableOpacity key={index} onPress={() => manejarSeleccion(index)}>
                                    <Image source={opcion} style={styles.imagen} />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    palabra: {
        fontSize: 50,
        textAlign: 'center',
        marginVertical: 20,
        marginTop: 200,
        backgroundColor: '#D2B48C',
        color: 'white',
        width: '50%',
        alignSelf: 'center',
        borderRadius: 10,
    },
    contenedorImagenes: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    imagen: {
        width: 150,
        height: 150,
        margin: 10,
        borderColor: '#D2B48C',
        borderWidth: 2,
        borderRadius: 10,
    }
});

export default Test_12;