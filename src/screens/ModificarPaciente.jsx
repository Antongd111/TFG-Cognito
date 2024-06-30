import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView, Platform, Alert } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { obtenerPaciente, actualizarPaciente } from '../api/PacienteApi';
import AgregarPacienteStyles from "../styles/AgregarPacienteStyles";
import styles from "../styles/ComunStyles";

const ModificarPaciente = ({ navigation, route }) => {
    const { idPaciente } = route.params; // Suponemos que el ID se pasa como parámetro

    // Estados para almacenar los datos del paciente
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [identificacion, setIdentificacion] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState(new Date());
    const [genero, setGenero] = useState('');
    const [observaciones, setObservaciones] = useState('');

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || fechaNacimiento;
        setFechaNacimiento(currentDate);
    };

    const generos = [
        { label: 'Hombre', value: 'M' },
        { label: 'Mujer', value: 'F' },
    ];

    // Carga inicial de datos
    useEffect(() => {
        const cargarDatos = async () => {
            const datos = await obtenerPaciente(idPaciente);
            if (datos) {
                setIdentificacion(datos.identificacion);
                setNombre(datos.nombre);
                setApellidos(datos.apellidos);
                setFechaNacimiento(new Date(datos.fecha_nacimiento)); // Asumiendo que viene en formato adecuado
                setGenero(datos.sexo);
                setObservaciones(datos.observaciones);
            }
        };

        cargarDatos();
    }, [idPaciente]);

    const handleUpdatePaciente = async () => {
        if (!nombre || !apellidos || !identificacion || !genero) {
            Alert.alert("Error", "Por favor, rellena todos los campos requeridos.");
            return;
        }

        const formattedDate = fechaNacimiento.toISOString().split('T')[0];

        try {
            const result = await actualizarPaciente(idPaciente, identificacion, nombre, apellidos, formattedDate, genero, observaciones);
            Alert.alert("Éxito", "Datos del paciente actualizados correctamente.");
            navigation.goBack();
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Ha ocurrido un error al actualizar los datos del paciente.");
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
            <ScrollView style={AgregarPacienteStyles.contenedor}>
                <Text style={AgregarPacienteStyles.titulo}>Modificar Datos del Paciente</Text>
                <View style={AgregarPacienteStyles.formulario}>
                    <View style={AgregarPacienteStyles.row}>
                        <View style={AgregarPacienteStyles.inputGroup}>
                            <Text style={AgregarPacienteStyles.label}>Identificación:</Text>
                            <TextInput style={AgregarPacienteStyles.input} value={identificacion} onChangeText={setIdentificacion} />
                        </View>
                        <View style={AgregarPacienteStyles.inputGroup}>
                            <Text style={AgregarPacienteStyles.label}>Nombre:</Text>
                            <TextInput style={AgregarPacienteStyles.input} value={nombre} onChangeText={setNombre} />
                        </View>
                        <View style={AgregarPacienteStyles.inputGroup}>
                            <Text style={AgregarPacienteStyles.label}>Apellidos:</Text>
                            <TextInput style={AgregarPacienteStyles.input} value={apellidos} onChangeText={setApellidos} />
                        </View>
                    </View>
                    <View style={AgregarPacienteStyles.row}>
                        <View style={AgregarPacienteStyles.inputGroupRow}>
                            <Text style={AgregarPacienteStyles.label}>Género:</Text>
                            <View style={AgregarPacienteStyles.radioGroup}>
                                {generos.map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={[AgregarPacienteStyles.radio, genero === item.value && AgregarPacienteStyles.radioSelected]}
                                        onPress={() => setGenero(item.value)}
                                    >
                                        <Text style={AgregarPacienteStyles.radioText}>{item.label}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                        <View style={AgregarPacienteStyles.inputGroupRow}>
                            <Text style={AgregarPacienteStyles.label}>Fecha de nacimiento:</Text>
                            <View style={AgregarPacienteStyles.datePicker}>
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={fechaNacimiento}
                                    mode="date"
                                    is24Hour={true}
                                    display="calendar"
                                    onChange={onChange}
                                    maximumDate={new Date()}
                                />
                            </View>
                        </View>
                        <View style={AgregarPacienteStyles.inputGroup}>
                        </View>
                    </View>
                    <View style={AgregarPacienteStyles.inputGroupObservaciones}>
                        <Text style={AgregarPacienteStyles.label}>Observaciones:</Text>
                        <TextInput style={[AgregarPacienteStyles.input, AgregarPacienteStyles.observaciones]} multiline value={observaciones} onChangeText={setObservaciones} />
                    </View>
                </View>
            </ScrollView>
            <View style={AgregarPacienteStyles.contenedorBotones}>
                <TouchableOpacity style={styles.boton} onPress={() => navigation.goBack()}>
                    <Text style={styles.textoBoton}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boton} onPress={handleUpdatePaciente}>
                    <Text style={styles.textoBoton}>Actualizar Datos</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default ModificarPaciente;