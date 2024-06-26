import React from "react";
import { Text, View , TouchableOpacity, StyleSheet} from "react-native";
import ListaPacientes from '../components/listaPacientes';

const PantallaPacientes = ({navigation}) => {

  return (
    <View>
      <TouchableOpacity style={styles.botonAgregarPaciente} onPress={() => navigation.navigate('AgregarPaciente')}>
        <Text style={styles.textoAgregarPaciente}>Agregar Paciente</Text>
      </TouchableOpacity>
      <ListaPacientes navigation={navigation}/>
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