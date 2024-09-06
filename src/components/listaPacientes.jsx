import React from "react";
import { Text, View, FlatList, TextInput } from "react-native";
import ListaPacientesStyles from '../styles/ListaPacientesStyles';
import { useState, useEffect } from 'react';
import { useFocusEffect } from "@react-navigation/native";
import { obtenerPacientes } from '../api/PacienteApi';
import TarjetaPaciente from "./tarjetaPaciente";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTranslation } from "../locales";
import { useIsFocused } from '@react-navigation/native';


const ListaPacientes = ({ navigation }) => {

    const [searchQuery, setSearchQuery] = useState('');
    const [lista_pacientes, setPacientes] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

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
    

    /**
     * Carga la lista de pacientes al iniciar la aplicación
     */
    const cargarPacientes = async () => {
        try {
            const listaPacientes = await obtenerPacientes();
            setPacientes(listaPacientes);
            setFilteredData(listaPacientes);
        } catch (error) {
            console.error("Error al cargar los pacientes:", error);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            cargarPacientes();
        }, [])
    );

    const eliminarPacienteDeLista = (idPaciente) => {
        setPacientes((prevPacientes) => prevPacientes.filter((paciente) => paciente.id !== idPaciente));
        setFilteredData((prevData) => prevData.filter((paciente) => paciente.id !== idPaciente));
    };

    return (
        <View style={ListaPacientesStyles.contenedor}>
            <View style={ListaPacientesStyles.cabeceraBusqueda}>
                <Text style={ListaPacientesStyles.tituloLista}>{translations.ListaPacientes}</Text>
                <TextInput
                    style={ListaPacientesStyles.barraBusqueda}
                    placeholder={translations.Buscar}
                    value={searchQuery}
                    onChangeText={(text) => {
                        setSearchQuery(text);
                        if (text) {
                            const newData = lista_pacientes.filter(item => item.nombre.toLowerCase().includes(text.toLowerCase()));
                            setFilteredData(newData);
                        } else {
                            setFilteredData(lista_pacientes);
                        }
                    }}
                />
            </View>
            <FlatList style={ListaPacientesStyles.listaPacientes}

                data={filteredData}
                renderItem={({ item }) => (
                    <TarjetaPaciente
                        navigation={navigation}
                        id={item.id}
                        nombre={item.nombre}
                        apellidos={item.apellidos}
                        fecha_nacimiento={item.fecha_nacimiento}
                        sexo={item.sexo}
                        observaciones={item.observaciones}
                        onDeletePaciente={eliminarPacienteDeLista}
                    />
                )}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};

export default ListaPacientes