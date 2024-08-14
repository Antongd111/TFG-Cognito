import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import InstruccionesModal from '../../components/instrucciones';
import MenuComponent from '../../components/menu';
import stylesComunes from '../../styles/ComunStyles';

const TOTAL_ENSAYOS = 35; // Total de ensayos incluyendo los de práctica

const opcionesEnsayo = [
    { palabra: "inteligente", opciones: ["asesinado", "astuto", "lira", "vulgar", "motivado", "audaz"], correcta: 1 },
    { palabra: "gremio", opciones: ["trampa", "líder", "empresa", "construcción", "explorador", "medalla"], correcta: 2 },
    { palabra: "ramillete", opciones: ["actividad", "ramo", "bolsillo", "aroma", "color", "palabra"], correcta: 1 },
    { palabra: "taciturno", opciones: ["restringido", "estúpido", "sobrio", "habitual", "esponjoso", "melancólico"], correcta: 5 },
    { palabra: "ambiguo", opciones: ["mediocre", "analógico", "equívoco", "torturado", "estrecho", "aspirante"], correcta: 2 },
    { palabra: "andanza", opciones: ["aventura", "adversidad", "creación", "evasión", "pala", "fuga"], correcta: 0 },
    { palabra: "anteponer", opciones: ["supervisar", "cambiar", "deslizar", "brillar", "llevar", "prevalecer"], correcta: 5 },
    { palabra: "obsoleto", opciones: ["arcaico", "privado", "frustrado", "tangible", "pobre", "visible"], correcta: 0 },
    { palabra: "alcaide", opciones: ["conductor", "sargento", "arquitecto", "árbitro", "guardián", "enfermero"], correcta: 4 },
    { palabra: "presunto", opciones: ["descalificado", "violento", "planeado", "supuesto", "indeciso", "premeditado"], correcta: 3 },
    { palabra: "manivela", opciones: ["caja", "zapato", "anillo", "flauta", "linterna", "palanca"], correcta: 5 },
    { palabra: "audaz", opciones: ["inteligente", "repentino", "intenso", "fácil", "ingenioso", "valiente"], correcta: 5 },
    { palabra: "pelea", opciones: ["disputa", "igualar", "multitud", "contenedor", "medir", "mina"], correcta: 0 },
    { palabra: "pueril", opciones: ["repugnante", "podrido", "siniestro", "inmaduro", "agotado", "estéril"], correcta: 3 },
    { palabra: "insípido", opciones: ["graso", "coherente", "soso", "ligero", "miedoso", "inofensivo"], correcta: 2 },
    { palabra: "adherir", opciones: ["exaltar", "reñir", "aconsejar", "pegar", "censurar", "idolatrar"], correcta: 3 },
    { palabra: "ubicuo", opciones: ["indiferente", "ulcerado", "virtuoso", "abandonado", "omnipresente", "ambivalente"], correcta: 5 },
    { palabra: "aparato", opciones: ["cortina", "lámpara", "cerradura", "tazón", "compañero", "dispositivo"], correcta: 5 },
    { palabra: "volante", opciones: ["brújula", "timón", "ventilador", "borrador", "mama", "bomba"], correcta: 1 },
    { palabra: "decreto", opciones: ["división", "reparto", "señal", "expulsión", "dictamen", "etapa"], correcta: 4 },
    { palabra: "colador", opciones: ["filtro", "purificar", "lavabo", "abusar", "apuesta", "embudo"], correcta: 0 },
    { palabra: "bochornoso", opciones: ["discordante", "aceptable", "depravado", "vergonzoso", "digno", "respetado"], correcta: 3 },
    { palabra: "cadena", opciones: ["teoría", "grillete", "esclavo", "creencia", "engranaje", "cebolleta"], correcta: 1 },
    { palabra: "ataque", opciones: ["recibir", "cántico", "apoyar", "apaciguar", "agresión", "planear"], correcta: 4 },
    { palabra: "muesca", opciones: ["mosaico", "cornisa", "marca", "cemento", "ataúd", "aglomerado"], correcta: 2 },
    { palabra: "obsequioso", opciones: ["pretencioso", "miserable", "atento", "servicial", "decorativo", "pervertido"], correcta: 3 },
    { palabra: "esotérico", opciones: ["banal", "abovedado", "misterioso", "sabio", "profundo", "antiguo"], correcta: 2 },
    { palabra: "espasmo", opciones: ["repetición", "derrota", "contradicción", "parálisis", "convulsión", "infección"], correcta: 4 },
    { palabra: "indemnización", opciones: ["compensación", "obligación", "condimento", "responsabilidad", "impuesto", "deber"], correcta: 0 },
    { palabra: "arcilla", opciones: ["aceite", "instrumento", "pájaro", "deporte", "marsupial", "roca"], correcta: 5 },
    { palabra: "revocar", opciones: ["abolir", "oponer", "revelar", "difamar", "agravar", "elicitar"], correcta: 0 },
    { palabra: "deambular", opciones: ["reparar", "enfurecer", "lamentar", "pasear", "protestar", "titubear"], correcta: 3 },
    { palabra: "apócrifo", opciones: ["autorizado", "complicado", "catastrófico", "revelador", "falso", "arrepentido"], correcta: 4 },
    { palabra: "adulador", opciones: ["pez", "zalamero", "deportista", "gigante", "escarabajo", "maníaco"], correcta: 1 },
    { palabra: "epígono", opciones: ["clímax", "abdomen", "sucesor", "sátira", "sobre", "rectángulo"], correcta: 2 },
];

const Test_23 = ({ navigation, route }) => {
    const [modalVisible, setModalVisible] = useState(true);
    const [ensayoActual, setEnsayoActual] = useState(0);
    const [resultados, setResultados] = useState([]);
    const [correctas, setCorrectas] = useState(0);
    const [errores, setErrores] = useState(0);
    const [excesosDeTiempo, setExcesosDeTiempo] = useState(0);
    const [tiempoRestante, setTiempoRestante] = useState(10);
    const [tiempoInicial, setTiempoInicial] = useState(null);
    const [modalPruebaVisible, setModalPruebaVisible] = useState(false);

    useEffect(() => {
        if (!modalVisible && tiempoRestante > 0) {
            const interval = setInterval(() => {
                setTiempoRestante((prevTiempo) => prevTiempo - 1);
            }, 1000);

            return () => clearInterval(interval);
        } else if (tiempoRestante === 0) {
            manejarExcesoDeTiempo();
        }
    }, [modalVisible, tiempoRestante]);

    useEffect(() => {
        if (!modalVisible) {
            iniciarEnsayo();
        }
    }, [ensayoActual, modalVisible]);

    const iniciarEnsayo = () => {
        setTiempoRestante(10);
        setTiempoInicial(Date.now());
    };

    const manejarExcesoDeTiempo = () => {
        if (ensayoActual >= 2) {
            setExcesosDeTiempo(excesosDeTiempo + 1);
            guardarResultado(null, true);
        } else {
            siguienteEnsayo();
        }
    };

    const manejarRespuesta = (indiceOpcion) => {
        const tiempoRespuesta = Date.now() - tiempoInicial;
        const esCorrecta = indiceOpcion === opcionesEnsayo[ensayoActual].correcta;

        if (ensayoActual >= 2) {
            if (esCorrecta) {
                setCorrectas(correctas + 1);
            } else {
                setErrores(errores + 1);
            }
            guardarResultado(indiceOpcion, false, tiempoRespuesta);
        } else {
            siguienteEnsayo();
        }
    };

    const guardarResultado = (indiceOpcion, excesoDeTiempo, tiempoRespuesta = 10001) => {
        const resultado = {
            ensayo: ensayoActual + 1,
            respuesta: indiceOpcion !== null ? indiceOpcion + 1 : null,
            tiempo: excesoDeTiempo ? 10001 : tiempoRespuesta,
        };

        setResultados([...resultados, resultado]);

        siguienteEnsayo();
    };

    const siguienteEnsayo = () => {
        if (ensayoActual < TOTAL_ENSAYOS - 1) {
            if (ensayoActual === 1) {
                setModalPruebaVisible(true);
            } else {
                setEnsayoActual(ensayoActual + 1);
            }
        } else {
            mostrarResultados();
        }
    };

    const mostrarResultados = () => {
        const resultadosFinales = {
            correctas,
            errores,
            excesosDeTiempo,
            detalles: resultados,
        };

        console.log('Resultados Finales:', resultadosFinales);
        Alert.alert('Resultados', JSON.stringify(resultadosFinales));
    };

    const iniciarPruebaReal = () => {
        setModalPruebaVisible(false);
        setEnsayoActual(ensayoActual + 1);
    };

    const iniciarTarea = () => {
        setModalVisible(false);
    };

    return (
        <View style={stylesComunes.borde_tests}>
            <View style={[stylesComunes.contenedor_test, styles.contenedor_test23]}>
                <MenuComponent
                    onToggleVoice={() => { }}
                    onNavigateHome={() => navigation.navigate('Pacientes')}
                    onNavigateNext={() => navigation.navigate('Test_24', { idSesion: route.params.idSesion })}
                    onNavigatePrevious={() => navigation.navigate('Test_22', { idSesion: route.params.idSesion })}
                />
                <InstruccionesModal
                    visible={modalVisible}
                    onClose={iniciarTarea}
                    title="Test 23"
                    instructions="Usted va a ver 6 palabras en la parte derecha de la pantalla, quiero que toque la palabra que tenga el mismo significado que la situada a la izquierda. Para comenzar los ensayos de entrenamiento pulse el botón 'empezar'."
                />
                <InstruccionesModal
                    visible={modalPruebaVisible}
                    onClose={iniciarPruebaReal}
                    title="Inicio de la Prueba"
                    instructions="La prueba real va a comenzar ahora. Por favor, toque la palabra que tenga el mismo significado que la situada a la izquierda."
                />
                {!modalVisible && !modalPruebaVisible && (
                    <View style={styles.container}>
                        <View style={styles.palabraContainer}>
                            <Text style={styles.palabraTexto}>{opcionesEnsayo[ensayoActual].palabra}</Text>
                        </View>
                        <View style={styles.opcionesContainer}>
                            {opcionesEnsayo[ensayoActual].opciones.map((opcion, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.opcionBoton}
                                    onPress={() => manejarRespuesta(index)}
                                >
                                    <Text style={styles.opcionTexto}>{opcion}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    contenedor_test23: {
        justifyContent: 'center',
    },
    palabraContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    palabraTexto: {
        fontSize: 50,
        marginBottom: 20,
        marginLeft: 50,
    },
    opcionesContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    opcionBoton: {
        padding: 15,
        backgroundColor: '#D2B48C',
        borderRadius: 10,
        width: '80%',
        marginVertical: 20,
        alignItems: 'center',
    },
    opcionTexto: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default Test_23;