//TODO: traducir

import React, { useState } from "react";
import Header from "../components/header";
import { Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Alert } from "react-native";
import AgregarPacienteStyles from "../styles/AgregarPacienteStyles";
import styles from "../styles/ComunStyles";
import DateTimePicker from '@react-native-community/datetimepicker';
import { agregarPaciente } from '../api/PacienteApi';

const AgregarPaciente = ({ navigation }) => {

    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [identificacion, setIdentificacion] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState(new Date());
    const [genero, setGenero] = useState('');
    const [observaciones, setObservaciones] = useState('');
    const generos = [
        { label: translations.Hombre, value: 'M' },
        { label: translations.Mujer, value: 'F' },
    ];

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

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || fechaNacimiento;
        setFechaNacimiento(currentDate);
    };

    const handleAddPaciente = async () => {
        if (!nombre || !apellidos || !identificacion || !genero) {
            Alert.alert("Error", "Por favor, rellena todos los campos requeridos.");
            return;
        }

        // Formatear la fecha de nacimiento para la base de datos
        const formattedDate = fechaNacimiento.toISOString().split('T')[0];

        try {
            // Llamar a la función de añadir paciente y esperar el resultado
            agregarPaciente(identificacion, nombre, apellidos, formattedDate, genero, observaciones);
            Alert.alert(translations.RegistroExitoso);
            navigation.navigate('Pacientes');
        } catch (error) {
            console.error(error);
            Alert.alert("Error", translations.ErrorBD);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}

        >
            <Header navigation={navigation} />
            <View style={AgregarPacienteStyles.contenedor}>
                <View>
                    <Text style={AgregarPacienteStyles.titulo}>{translations.RegistroPaciente}</Text>
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
                            <Text style={AgregarPacienteStyles.label}>{translations.Observaciones}:</Text>
                            <TextInput style={[AgregarPacienteStyles.input, AgregarPacienteStyles.observaciones]} multiline value={observaciones} onChangeText={setObservaciones} />
                        </View>
                    </View>
                </View>
                <View style={AgregarPacienteStyles.contenedorBotones}>
                    <TouchableOpacity style={styles.boton} onPress={() => navigation.replace('Pacientes')}>
                        <Text style={styles.textoBoton}>{translations.Cancelar}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.boton} onPress={handleAddPaciente}>
                        <Text style={styles.textoBoton}>{translations.AgregarPaciente}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default AgregarPaciente;
