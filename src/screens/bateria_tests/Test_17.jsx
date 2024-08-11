import React, { useState } from 'react';
import { View, Text, FlatList, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import InstruccionesModal from '../../components/instrucciones';
import MenuComponent from '../../components/menu';
import stylesComunes from '../../styles/ComunStyles';

const nombresAprendidos = ['Carlos', 'Marta', 'Juan', 'María', 'Jorge', 'Clara', 'Carmen', 'José', 'Miguel'];
const nombresDistractores = ['Ana', 'Pedro', 'Laura', 'Antonio', 'Lucía', 'Manuel', 'Sara', 'David', 'Elena'];

const Test_17 = ({ navigation, route }) => {
    const [fase, setFase] = useState(1);
    const [modalVisible, setModalVisible] = useState(true);
    const [nombresRecordados, setNombresRecordados] = useState([]);
    const [intrusiones, setIntrusiones] = useState(0);
    const [perseveraciones, setPerseveraciones] = useState(0);
    const [rechazos, setRechazos] = useState(0);
    const [nombresIdentificados, setNombresIdentificados] = useState([]);
    const [erroresIdentificados, setErroresIdentificados] = useState(0);
    const [rechazosReconocimiento, setRechazosReconocimiento] = useState(0);

    const handleRecordarNombre = (nombre) => {
        setNombresRecordados((prev) => {
            if (prev.includes(nombre)) {
                return prev.filter((n) => n !== nombre); // Deseleccionar
            } else {
                return [...prev, nombre]; // Seleccionar
            }
        });
    };

    const handleNombreIdentificado = (nombre) => {
        setNombresIdentificados((prev) => {
            if (prev.includes(nombre)) {
                return prev.filter((n) => n !== nombre); // Deseleccionar
            } else {
                return [...prev, nombre]; // Seleccionar
            }
        });
    };

    const handlePerseveracion = () => {
        setPerseveraciones(perseveraciones + 1);
    };

    const handleIntrusion = () => {
        setIntrusiones(intrusiones + 1);
    };

    const handleRechazo = () => {
        setRechazos(rechazos + 1);
    };

    const handleRechazoReconocimiento = () => {
        setRechazosReconocimiento(rechazosReconocimiento + 1);
    };

    const validarFase = () => {
        if (fase === 1) {
            setNombresRecordados([]); // Resetear la selección
            setModalVisible(true);
            setFase(2);
        } else if (fase === 2) {
            setNombresIdentificados([]); // Resetear la selección
            setModalVisible(true);
            setFase(3);
        } else if (fase === 3) {
            mostrarResultados();
        }
    };

    const mostrarResultados = () => {
        const resultados = {
            nombresRecordados,
            intrusiones,
            perseveraciones,
            rechazos,
            nombresIdentificados,
            erroresIdentificados,
            rechazosReconocimiento,
        };
        console.log('Resultados:', resultados);
        Alert.alert('Resultados', JSON.stringify(resultados));
    };

    const iniciarTarea = () => {
        setModalVisible(false);
    };

    const renderNombreItem = ({ item }) => (
        <TouchableOpacity
            style={[styles.nombreItem, nombresRecordados.includes(item) && styles.nombreItemSeleccionado]}
            onPress={() => handleRecordarNombre(item)}
        >
            <Text style={styles.nombreTexto}>{item}</Text>
        </TouchableOpacity>
    );

    const renderReconocimientoItem = ({ item }) => (
        <TouchableOpacity
            style={[styles.nombreItem, nombresIdentificados.includes(item) && styles.nombreItemSeleccionado]}
            onPress={() => handleNombreIdentificado(item)}
        >
            <Text style={styles.nombreTexto}>{item}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={stylesComunes.borde_tests}>
            <View style={stylesComunes.contenedor_test}>
                <MenuComponent
                    onToggleVoice={() => { }}
                    onNavigateHome={() => navigation.navigate('Pacientes')}
                    onNavigateNext={() => navigation.navigate('Test_18', { idSesion: route.params.idSesion })}
                    onNavigatePrevious={() => navigation.navigate('Test_16', { idSesion: route.params.idSesion })}
                />
                <InstruccionesModal
                    visible={modalVisible && fase === 1}
                    onClose={iniciarTarea}
                    title="Test 17"
                    instructions="Por favor, gire la pantalla hacia usted para que el sujeto no la vea. Ahora quiero que me diga todos los nombres de persona que le pedí que aprendiera antes."
                />
                <InstruccionesModal
                    visible={modalVisible && fase === 2}
                    onClose={iniciarTarea}
                    title="Segunda Tarea"
                    instructions="Continúe con la pantalla girada hacia usted. Ahora vamos a continuar con la tarea. Dígame los nombres que empiezan por M, luego por J, y finalmente por C."
                />
                <InstruccionesModal
                    visible={modalVisible && fase === 3}
                    onClose={iniciarTarea}
                    title="Tercera Tarea"
                    instructions="Ahora puede girar la pantalla hacia el paciente. Pida al sujeto que seleccione los nombres que aprendió anteriormente entre la lista que se muestra."
                />
                {!modalVisible && fase === 1 && (
                    <View>
                        <FlatList
                            data={nombresAprendidos}
                            renderItem={renderNombreItem}
                            keyExtractor={(item) => item}
                            style={styles.nombreLista}
                        />
                        <View style={styles.botonera}>
                            <TouchableOpacity style={[styles.boton, { width: '40%' }]} onPress={handlePerseveracion}>
                                <Text style={styles.textoBotonValidar}>Perseveración</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.boton, { width: '40%' }]} onPress={handleIntrusion}>
                                <Text style={styles.textoBotonValidar}>Intrusión</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.botonera}>
                            <TouchableOpacity style={styles.botonRechazo} onPress={handleRechazo}>
                                <Text style={styles.textoBotonValidar}>Rechazo</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.botonValidar} onPress={validarFase}>
                                <Text style={styles.textoBotonValidar}>Validar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                {!modalVisible && fase === 2 && (
                    <View>
                        <View style={styles.fase2Container}>
                            <View style={styles.listaContainer}>
                                <Text style={styles.sectionHeader}>M</Text>
                                <FlatList
                                    data={nombresAprendidos.filter((nombre) => nombre.startsWith('M'))}
                                    renderItem={renderNombreItem}
                                    keyExtractor={(item) => item}
                                    style={styles.nombreLista}
                                />
                            </View>
                            <View style={styles.listaContainer}>
                                <Text style={styles.sectionHeader}>J</Text>
                                <FlatList
                                    data={nombresAprendidos.filter((nombre) => nombre.startsWith('J'))}
                                    renderItem={renderNombreItem}
                                    keyExtractor={(item) => item}
                                    style={styles.nombreLista}
                                />
                            </View>
                            <View style={styles.listaContainer}>
                                <Text style={styles.sectionHeader}>C</Text>
                                <FlatList
                                    data={nombresAprendidos.filter((nombre) => nombre.startsWith('C'))}
                                    renderItem={renderNombreItem}
                                    keyExtractor={(item) => item}
                                    style={styles.nombreLista}
                                />
                            </View>
                        </View>
                        <View style={styles.botonera}>
                            <TouchableOpacity style={[styles.boton, { width: '40%' }]} onPress={handlePerseveracion}>
                                <Text style={styles.textoBotonValidar}>Perseveración</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.boton, { width: '40%' }]} onPress={handleIntrusion}>
                                <Text style={styles.textoBotonValidar}>Intrusión</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.botonera}>
                            <TouchableOpacity style={styles.botonRechazo} onPress={handleRechazo}>
                                <Text style={styles.textoBotonValidar}>Rechazo</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.botonValidar} onPress={validarFase}>
                                <Text style={styles.textoBotonValidar}>Validar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                {!modalVisible && fase === 3 && (
                    <View>
                        <FlatList
                            data={[...nombresAprendidos, ...nombresDistractores].sort()}
                            renderItem={renderReconocimientoItem}
                            keyExtractor={(item) => item}
                            numColumns={2}
                            columnWrapperStyle={styles.columnWrapper}
                            style={[styles.nombreLista, { marginTop: 60 }]}
                        />
                        <View style={styles.botonera}>
                            <TouchableOpacity style={styles.botonRechazo} onPress={handleRechazoReconocimiento}>
                                <Text style={styles.textoBotonValidar}>Rechazo</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.botonValidar} onPress={validarFase}>
                            <Text style={styles.textoBotonValidar}>Validar</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    nombreLista: {
        marginTop: 10,
        marginBottom: 20,
    },
    nombreItem: {
        padding: 10,
        margin: 5,
        backgroundColor: '#F2E8E1',
        borderRadius: 5,
        alignSelf: 'center',
    },
    nombreItemSeleccionado: {
        backgroundColor: '#D2B48C',
    },
    nombreTexto: {
        fontSize: 20,
    },
    botonera: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    boton: {
        padding: 15,
        backgroundColor: '#D2B48C',
        alignItems: 'center',
        borderRadius: 10,
        width: '40%',
    },
    botonValidar: {
        padding: 15,
        backgroundColor: '#47F251',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20,
        width: '40%',
        alignSelf: 'center',
    },
    botonRechazo: {
        padding: 15,
        backgroundColor: '#F04343',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20,
        width: '40%',
        alignSelf: 'center',
    },
    textoBotonValidar: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    columnWrapper: {
        justifyContent: 'space-around',
    },
    fase2Container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        marginTop: 20,
    },
    listaContainer: {
        flex: 1,
        alignItems: 'center',
    },
    sectionHeader: {
        fontSize: 20,
        marginTop: 50,
        fontWeight: 'bold',
        backgroundColor: '#D2B48C',
        padding: 5,
        textAlign: 'center',
        width: '100%',
    },
});

export default Test_17;