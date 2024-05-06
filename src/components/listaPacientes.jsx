import React from "react";
import Constants from "expo-constants";
import { Text, View, FlatList, TextInput} from "react-native";
import ListaPacientesStyles from '../styles/ListaPacientesStyles';
import { useState, useEffect } from 'react';
import { getPacientes } from '../database/db';
import TarjetaPaciente from "./tarjetaPaciente";


const ListaPacientes = () => {

    
    const [searchQuery, setSearchQuery] = useState('');
    const [lista_pacientes, setPacientes] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    /**
     * Carga la lista de pacientes al iniciar la aplicación
     */
    useEffect(() => {
        const cargarPacientes = () => {
            getPacientes((pacientesObtenidos) => {
                setPacientes(pacientesObtenidos);
                setFilteredData(pacientesObtenidos);
                console.log(pacientesObtenidos);
            });
        };
        
        cargarPacientes();
        
    }, []);    

    return (
        <View style={ListaPacientesStyles.contenedor}>
            <View style={ListaPacientesStyles.cabeceraBusqueda}>
                <Text style={ListaPacientesStyles.tituloLista}>Lista de Pacientes</Text>  
                <TextInput
                    style={ListaPacientesStyles.barraBusqueda}
                    placeholder="Buscar..."
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
                renderItem={({item}) => (
                    <TarjetaPaciente
                        nombre={item.nombre}
                        apellidos={item.apellidos}
                        fecha_nacimiento={item.fecha_nacimiento}
                        sexo={item.sexo}
                        observaciones={item.observaciones}
                    />
                )}
                keyExtractor={item => item.id.toString()}
            />
        </View>
      );
};

export default ListaPacientes