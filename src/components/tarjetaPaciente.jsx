import react from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import styles from "../styles/TarjetaPacienteStyles";
import { format, parseISO } from 'date-fns';

export default function TarjetaPaciente({id, nombre, apellidos, fecha_nacimiento, sexo}) {

    const fecha_formateada = format(parseISO(fecha_nacimiento), 'dd/MM/yyyy');

    return ( 
        <View style={styles.tarjeta}>
            <View style={styles.paciente}>
                <View style={styles.datos}>
                    <Text style={styles.nombre}>{nombre} {apellidos}</Text>
                    <Text style={styles.fechaNacimiento}>Fecha de nacimiento: {fecha_formateada}</Text>
                    <Text style={styles.sexo}>Sexo: {sexo === 'M' ? 'Hombre' : 'Mujer'}</Text>
                </View>
            </View>
            <View style={styles.contenedor_botones}>
                <TouchableOpacity style={styles.boton}>
                    <Text style={styles.textoBoton} onPress={() => navigation.navigate('FichaPaciente', {idPaciente: id})}>Ver ficha</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boton}>
                    <Text style={styles.textoBoton}>Modificar datos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boton}>
                    <Text style={styles.textoBoton}>Comenzar test</Text>
                </TouchableOpacity>                                
            </View>
        </View>
    );
}