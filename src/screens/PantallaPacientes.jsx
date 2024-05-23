import React from "react";
import { Text, View , TouchableOpacity, StyleSheet, Button} from "react-native";
import ListaPacientes from '../components/listaPacientes';
import { addPaciente } from '../database/db';
import { Alert } from "react-native";

const PantallaPacientes = ({navigation}) => {

  return (
    <View>
      <TouchableOpacity style={styles.botonAgregarPaciente} onPress={() => navigation.navigate('AgregarPaciente')}>
        <Text style={styles.textoAgregarPaciente}>Agregar Paciente</Text>
      </TouchableOpacity>
      <ListaPacientes />
    </View>
  );
};

const styles = StyleSheet.create({
    botonAgregarPaciente : {
        backgroundColor: '#D2B48C',
        padding: 10,
        margin: '2%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
    },

    textoAgregarPaciente : {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
  });

export default PantallaPacientes 