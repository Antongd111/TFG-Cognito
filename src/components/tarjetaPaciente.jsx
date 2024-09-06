import { Text, View, Image, TouchableOpacity, Alert } from "react-native";
import styles from "../styles/TarjetaPacienteStyles";
import { format, parseISO } from 'date-fns';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTranslation } from "../locales";
import { useIsFocused } from '@react-navigation/native';
import { eliminarPaciente } from '../api/PacienteApi';

export default function TarjetaPaciente({ navigation, id, nombre, apellidos, fecha_nacimiento, sexo, onDeletePaciente }) {

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

    const fecha_formateada = format(parseISO(fecha_nacimiento), 'dd/MM/yyyy');

    const EliminarPaciente = async () => {
        try {
            await eliminarPaciente(id);
            if (onDeletePaciente)
                onDeletePaciente(id);
        } catch (error) {
            console.error("Error al eliminar el paciente:", error);
        }
    }
           
    const confirmarEliminacion = () => {
        Alert.alert(
            translations.PreguntarEliminar,
            " ",
            [
                { text: translations.Cancelar, style: "cancel" },
                { text: translations.Eliminar, onPress: () => EliminarPaciente() }
            ]
        );
    };

    return (
        <View style={styles.tarjeta}>
            <View style={styles.paciente}>
                <View style={styles.datos}>
                    <Text style={styles.nombre}>{nombre} {apellidos}</Text>
                    <Text style={styles.fechaNacimiento}>{translations.FechaNacimiento}: {fecha_formateada}</Text>
                    <Text style={styles.sexo}>{translations.Sexo}: {sexo === 'M' ? translations.Hombre : translations.Mujer}</Text>
                </View>
            </View>
            <View style={styles.contenedor_botones}>
                <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('FichaPaciente', { idPaciente: id })}>
                    <Text style={styles.textoBoton}>{translations.VerFicha}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('ModificarPaciente', { idPaciente: id })}>
                    <Text style={styles.textoBoton}>{translations.ModificarDatos}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('Test_1', { idPaciente: id })}>
                    <Text style={styles.textoBoton}>{translations.ComenzarTest}</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.eliminarBoton} onPress={confirmarEliminacion}>
                <Image source={require('../../assets/images/delete.png')} style={styles.eliminar} />
            </TouchableOpacity>
        </View>
    );
}