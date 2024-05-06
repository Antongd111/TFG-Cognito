import React, { useState } from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import AgregarPacienteStyles from "../styles/AgregarPacienteStyles";

const AgregarPaciente = () => {

    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [identificacion, setIdentificacion] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [genero, setGenero] = useState('');
    const [observaciones, setObservaciones] = useState('');


    return (
        <View style={AgregarPacienteStyles.contenedor}> 
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
                    <View style={AgregarPacienteStyles.inputGroup}>
                        <Text style={AgregarPacienteStyles.label}>Género:</Text>
                        <TextInput style={AgregarPacienteStyles.input} value={genero} onChangeText={setGenero} />
                    </View>
                    <View style={AgregarPacienteStyles.inputGroup}>
                        <Text style={AgregarPacienteStyles.label}>Fecha de nacimiento:</Text>
                        <TextInput style={AgregarPacienteStyles.input} keyboardType="numeric" value={fechaNacimiento} onChangeText={setFechaNacimiento} />
                    </View>
                </View>
                <View style={AgregarPacienteStyles.inputGroup}>
                    <Text style={AgregarPacienteStyles.label}>Observaciones:</Text>
                    <TextInput style={[AgregarPacienteStyles.input, AgregarPacienteStyles.inputLarge]} multiline value={observaciones} onChangeText={setObservaciones} />
                </View>          
            </View>
            <View style={AgregarPacienteStyles.contenedorBotones}>
                <TouchableOpacity style={styles.boton}>
                    <Text style={styles.textoBoton}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boton}>
                    <Text style={styles.textoBoton}>Agregar Paciente</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AgregarPaciente;
