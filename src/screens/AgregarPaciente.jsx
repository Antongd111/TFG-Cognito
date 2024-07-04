import React, { useState } from "react";
import Header from "../components/header";
import { Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView, Platform, Alert} from "react-native";
import AgregarPacienteStyles from "../styles/AgregarPacienteStyles";
import styles from "../styles/ComunStyles";
import DateTimePicker from '@react-native-community/datetimepicker';
import { agregarPaciente } from '../api/PacienteApi';

const AgregarPaciente = ({navigation}) => {

    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [identificacion, setIdentificacion] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState(new Date());
    const [genero, setGenero] = useState('');
    const [observaciones, setObservaciones] = useState('');

    const generos = [
        { label: 'Hombre', value: 'M' },
        { label: 'Mujer', value: 'F' },
    ];

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
          const result = await agregarPaciente(identificacion, nombre, apellidos, formattedDate, genero, observaciones);
          Alert.alert("Éxito", "Paciente añadido correctamente.");
          navigation.navigate('Pacientes');
        } catch (error) {
          console.error(error);
          Alert.alert("Error", "Ha ocurrido un error al añadir el paciente.");
        }
      };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
            <Header />
            <ScrollView style={AgregarPacienteStyles.contenedor}>
                <Text style={AgregarPacienteStyles.titulo}>Registro de paciente</Text>
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
                            <View style={AgregarPacienteStyles.inputGroup }>
                        </View>  
                    </View>
                    <View style={AgregarPacienteStyles.inputGroupObservaciones}>
                        <Text style={AgregarPacienteStyles.label}>Observaciones:</Text>
                        <TextInput style={[AgregarPacienteStyles.input, AgregarPacienteStyles.observaciones]} multiline value={observaciones} onChangeText={setObservaciones} />
                    </View>          
                </View>
            </ScrollView>
            <View style={AgregarPacienteStyles.contenedorBotones}>
                <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('Pacientes')}>
                    <Text style={styles.textoBoton}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boton} onPress={handleAddPaciente}>
                    <Text style={styles.textoBoton}>Agregar Paciente</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default AgregarPaciente;
