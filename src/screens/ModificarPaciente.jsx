import React, { useState, useEffect } from "react";
import Header from "../components/header";
import { Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView, Platform, Alert } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { obtenerPaciente, actualizarPaciente } from '../api/PacienteApi';
import AgregarPacienteStyles from "../styles/AgregarPacienteStyles";
import styles from "../styles/ComunStyles";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTranslation } from "../locales";
import { useIsFocused } from '@react-navigation/native';

const ModificarPaciente = ({ navigation, route }) => {
    const { idPaciente } = route.params;

    // Estados para almacenar los datos del paciente
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [identificacion, setIdentificacion] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState(new Date());
    const [genero, setGenero] = useState('');
    const [observaciones, setObservaciones] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false); // Controla la visibilidad del picker en Android


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || fechaNacimiento;
        setFechaNacimiento(currentDate);
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

    // Carga inicial de datos
    useEffect(() => {
        const cargarDatos = async () => {
            const datos = await obtenerPaciente(idPaciente);
            if (datos) {
                setIdentificacion(datos.identificacion);
                setNombre(datos.nombre);
                setApellidos(datos.apellidos);
                setFechaNacimiento(new Date(datos.fecha_nacimiento));
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
            Alert.alert(translations.ModificacionExitosa);
            navigation.navigate('Pacientes');
        } catch (error) {
            console.error(error);
            Alert.alert("Error", translations.ErrorBD);
        }
    };

    const generos = [
        { label: translations.Hombre, value: 'M' },
        { label: translations.Mujer, value: 'F' },
    ];

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
            <Header navigation={navigation} />
            <ScrollView style={AgregarPacienteStyles.contenedor}>
                <Text style={AgregarPacienteStyles.titulo}>{translations.ModificarDatosPaciente}</Text>
                <View style={AgregarPacienteStyles.formulario}>
                    <View style={AgregarPacienteStyles.row}>
                        <View style={AgregarPacienteStyles.inputGroup}>
                            <Text style={AgregarPacienteStyles.label}>{translations.Identificacion}:</Text>
                            <TextInput style={AgregarPacienteStyles.input} value={identificacion} onChangeText={setIdentificacion} />
                        </View>
                        <View style={AgregarPacienteStyles.inputGroup}>
                            <Text style={AgregarPacienteStyles.label}>{translations.Nombre}:</Text>
                            <TextInput style={AgregarPacienteStyles.input} value={nombre} onChangeText={setNombre} />
                        </View>
                        <View style={AgregarPacienteStyles.inputGroup}>
                            <Text style={AgregarPacienteStyles.label}>{translations.Apellidos}:</Text>
                            <TextInput style={AgregarPacienteStyles.input} value={apellidos} onChangeText={setApellidos} />
                        </View>
                    </View>
                    <View style={AgregarPacienteStyles.row}>
                        <View style={AgregarPacienteStyles.inputGroupRow}>
                            <Text style={AgregarPacienteStyles.label}>{translations.Sexo}:</Text>
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
                            <Text style={AgregarPacienteStyles.label}>{translations.FechaNacimiento}:</Text>
                            <View style={AgregarPacienteStyles.datePicker}>
                            {Platform.OS === 'ios' ? (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={fechaNacimiento}
                                        mode="date"
                                        is24Hour={true}
                                        display="calendar"
                                        onChange={onChange}
                                        maximumDate={new Date()}
                                    />
                                ) : (
                                    <>
                                        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={AgregarPacienteStyles.datePickerButton}>
                                            <Text style={AgregarPacienteStyles.datePickerText}>{fechaNacimiento.toDateString()}</Text>
                                        </TouchableOpacity>
                                        {showDatePicker && (
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={fechaNacimiento}
                                                mode="date"
                                                display="calendar"
                                                onChange={onChange}
                                                maximumDate={new Date()}
                                            />
                                        )}
                                    </>
                                )}
                            </View>
                        </View>
                        <View style={AgregarPacienteStyles.inputGroup}>
                        </View>
                    </View>
                    <View style={AgregarPacienteStyles.inputGroupObservaciones}>
                        <Text style={AgregarPacienteStyles.label}>{translations.Observaciones}:</Text>
                        <TextInput style={[AgregarPacienteStyles.input, AgregarPacienteStyles.observaciones]} multiline value={observaciones} onChangeText={setObservaciones} />
                    </View>
                </View>
            </ScrollView>
            <View style={AgregarPacienteStyles.contenedorBotones}>
                <TouchableOpacity style={styles.boton} onPress={() => navigation.goBack()}>
                    <Text style={styles.textoBoton}>{translations.Cancelar}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boton} onPress={handleUpdatePaciente}>
                    <Text style={styles.textoBoton}>{translations.ActualizarDatos}</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default ModificarPaciente;