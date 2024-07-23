import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import InstruccionesModal from '../../components/instrucciones';
import MenuComponent from '../../components/menu';
import stylesComunes from '../../styles/ComunStyles';

const Test_7 = ({ navigation, route }) => {
    const [modalVisible, setModalVisible] = useState(true);
    const [testRealVisible, setTestRealVisible] = useState(false);
    const [ensayoActual, setEnsayoActual] = useState(0);
    const [practica, setPractica] = useState(true);
    const [fase, setFase] = useState(1); // 1 para parte 1, 2 para parte 2, 3 para parte 3
    const [colorNombre, setColorNombre] = useState('');
    const [colorFuente, setColorFuente] = useState('');
    const [respuestas] = useState(['Rojo', 'Verde', 'Azul', 'Amarillo']);
    const [correctas, setCorrectas] = useState(0);
    const [errores, setErrores] = useState(0);
    const [tiempoInicio, setTiempoInicio] = useState(0);
    const [tiempoTotal, setTiempoTotal] = useState(0);

    const colorAnteriorRef = useRef('');

    const colores = ['Rojo', 'Verde', 'Azul', 'Amarillo'];
    const colorMap = {
        Rojo: 'red',
        Verde: 'green',
        Azul: 'blue',
        Amarillo: 'yellow'
    };

    /******************** MENÚ DE EVALUACIÓN ********************/
    const handleToggleVoice = () => {
        console.log("Toggle voice feature");
    };

    const handleNavigateHome = () => {
        navigation.navigate('Pacientes');
    };

    const handleNavigateNext = () => {
        navigation.navigate('Test_8', { idSesion: route.params.idSesion });
    };

    const handleNavigatePrevious = () => {
        navigation.navigate('Test_7', { idSesion: route.params.idSesion });
    };

    /***************** FIN MENÚ DE EVALUACIÓN *****************/

    useEffect(() => {
        if (!modalVisible && !testRealVisible) {
            iniciarEnsayo();
        }
    }, [modalVisible, testRealVisible]);

    const iniciarEnsayo = () => {
        let colorAleatorio;
        let colorFuenteAleatorio;
        do {
            colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
        } while (colorAleatorio === colorAnteriorRef.current);

        do {
            colorFuenteAleatorio = colores[Math.floor(Math.random() * colores.length)];
        } while (fase === 3 && colorFuenteAleatorio === colorAleatorio);

        colorAnteriorRef.current = colorAleatorio;
        setColorNombre(colorAleatorio);
        setColorFuente(fase === 3 ? colorMap[colorFuenteAleatorio] : '');
        setTiempoInicio(Date.now());
    };

    const handleRespuesta = (respuesta) => {
        const tiempoRespuesta = Date.now() - tiempoInicio;

        const esCorrecta = fase === 3 ? colorMap[respuesta] === colorFuente : respuesta === colorNombre;

        if (esCorrecta) {
            if (!practica) {
                setCorrectas(correctas + 1);
                setTiempoTotal(tiempoTotal + tiempoRespuesta);
            }
        } else {
            if (!practica) {
                setErrores(errores + 1);
            }
        }

        if (ensayoActual < 1) {
            setEnsayoActual(ensayoActual + 1);
            iniciarEnsayo();
        } else {
            if (practica) {
                setEnsayoActual(0);
                setPractica(false);
                setTestRealVisible(true);
            } else {
                setEnsayoActual(0);
                iniciarEnsayo();
                // Aquí puedes guardar los resultados y continuar con la lógica deseada.
            }
        }
    };

    const iniciarTestReal = () => {
        setTestRealVisible(false);
        iniciarEnsayo();
    };

    const avanzarFase = () => {
        setFase(fase + 1);
        setPractica(true);
        setModalVisible(true);
        setEnsayoActual(0);
        setCorrectas(0);
        setErrores(0);
        setTiempoTotal(0);
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
                    title={`Test 7 - Parte ${fase}`}
                    instructions={fase === 1 ?
                        "En esta prueba, debe asociar el nombre del color que aparece en la pantalla con un botón del mismo nombre. Vamos a comenzar con unos ensayos de práctica." :
                        fase === 2 ?
                            "En esta prueba, debe asociar el color del rectángulo que aparece en la pantalla con un botón del mismo nombre. Vamos a comenzar con unos ensayos de práctica." :
                            "En esta prueba, debe asociar el color de la fuente con el botón del nombre del color correspondiente. Vamos a comenzar con unos ensayos de práctica."
                    }
                />
                <InstruccionesModal
                    visible={testRealVisible}
                    onClose={iniciarTestReal}
                    title="Test Real"
                    instructions="Vamos a comenzar el test real."
                />
                {!modalVisible && !testRealVisible && (
                    <View style={styles.contenedor}>
                        {fase === 1 ? (
                            <Text style={styles.colorNombre}>{colorNombre}</Text>
                        ) : fase === 2 ? (
                            <View style={[styles.rectanguloColor, { backgroundColor: colorMap[colorNombre] }]} />
                        ) : (
                            <Text style={[styles.colorNombre, { color: colorFuente }]}>{colorNombre}</Text>
                        )}
                        <View style={styles.opciones}>
                            {respuestas.map((respuesta, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.boton}
                                    onPress={() => handleRespuesta(respuesta)}
                                >
                                    <Text style={styles.textoBoton}>{respuesta}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <View style={styles.estadisticas}>
                            {/* <Text>Correctas: {correctas}</Text>
                            <Text>Errores: {errores}</Text>
                            <Text>Tiempo total: {tiempoTotal} ms</Text>
                            <Text>Ensayos completados: {ensayoActual}</Text> */}
                        </View>
                        {fase < 3 && ensayoActual === 0 && !practica && (
                            <TouchableOpacity onPress={avanzarFase} style={styles.botonSiguiente}>
                                <Text style={styles.textoBoton}>Pasar a la siguiente parte</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    colorNombre: {
        fontSize: 40,
        marginBottom: 20,
    },
    rectanguloColor: {
        width: 100,
        height: 100,
        marginBottom: 20,
        borderRadius: 10,
    },
    opciones: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    boton: {
        backgroundColor: '#DDDDDD',
        padding: 15,
        margin: 10,
        borderRadius: 5,
    },
    textoBoton: {
        fontSize: 20,
    },
    estadisticas: {
        marginTop: 20,
        alignItems: 'center',
    },
    botonSiguiente: {
        backgroundColor: '#DDDDDD',
        padding: 15,
        marginTop: 20,
        borderRadius: 5,
    }
});

export default Test_7;
