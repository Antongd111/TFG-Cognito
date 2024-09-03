import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTranslation } from "../locales";
import { obtenerResultadosSesion } from '../api/TestApi';
import Header from "../components/header";
import BotonToPDF from '../components/botonToPDF';
import BotonToCSV from '../components/botonToCSV';

import { obtenerPaciente } from '../database/db';

const InfoSesion = ({ navigation, route }) => {
  const { idSesion, idPaciente } = route.params;
  const [resultados, setResultados] = useState(null);
  const [datosPaciente, setDatosPaciente] = useState({});
  const [translations, setTranslations] = useState({});
  const [loading, setLoading] = useState(true); // Para manejar el estado de carga

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await AsyncStorage.getItem('language');
      const lang = savedLanguage || 'es';
      setTranslations(getTranslation(lang));
    };

    loadLanguage();
  }, []);

  useEffect(() => {
    const cargarResultados = async () => {
      try {
        const resultadosSesion = await obtenerResultadosSesion(idSesion);
        const paciente = await obtenerPaciente(idPaciente);
        setDatosPaciente(paciente);

        if (resultadosSesion === null) {
          console.log("No hay resultados para esta sesión.");
          setResultados([]); // Establece un array vacío si no hay resultados
        } else {
          setResultados(resultadosSesion);
        }

      } catch (error) {
        console.error("Error al cargar los resultados:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarResultados();
  }, [idSesion]);

  const repetirTest = (testId) => {
    navigation.navigate(`Test_${testId}`, { idPaciente, idSesion });
  };
  const renderItem = ({ item }) => (
    <View style={styles.testItem}>
      <View style={styles.columna}>
        <Text style={styles.testName}>{item.nombre} - {item.titulo}</Text>
        <Text style={styles.testResult}>{translations.Completado}?   {item.resultado}</Text>
      </View>
      <TouchableOpacity
        style={styles.repetirButton}
        onPress={() => repetirTest(item.id)}
      >
        <Text style={styles.repetirButtonText}>{translations.RepetirTest || 'Repetir Test'}</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  if (!resultados || resultados.length === 0) {
    return (
      <View style={styles.noResultsContainer}>
        <Text style={styles.noResultsText}>{translations.NoResultados || 'No hay resultados para esta sesión.'}</Text>
      </View>
    );
  }

// Generación de la lista de datos a mostrar
const testsData = [
  {
    id: 1,
    nombre: 'Test 1',
    titulo: translations.Pr01Titulo || 'Título del Test 1',
    resultado: resultados.test_1?.length > 0 ? '✅' : '❌',
  },
  {
    id: 3,
    nombre: 'Test 3',
    titulo: translations.Pr03Titulo || 'Título del Test 3',
    resultado: resultados.test_3?.length > 0 ? '✅' : '❌',
  },
  {
    id: 4,
    nombre: 'Test 4',
    titulo: translations.Pr04Titulo || 'Título del Test 4',
    resultado: resultados.test_4?.length > 0 ? '✅' : '❌',
  },
  {
    id: 5,
    nombre: 'Test 5',
    titulo: translations.Pr05Titulo || 'Título del Test 5',
    resultado: resultados.test_5?.length > 0 ? '✅' : '❌',
  },
  {
    id: 6,
    nombre: 'Test 6',
    titulo: translations.Pr06Titulo || 'Título del Test 6',
    resultado: resultados.test_6?.length > 0 ? '✅' : '❌',
  },
  {
    id: 7,
    nombre: 'Test 7',
    titulo: translations.Pr07Titulo || 'Título del Test 7',
    resultado: resultados.test_7?.length > 0 ? '✅' : '❌',
  },
  {
    id: 8,
    nombre: 'Test 8',
    titulo: translations.Pr08Titulo || 'Título del Test 8',
    resultado: resultados.test_8?.length > 0 ? '✅' : '❌',
  },
  {
    id: 10,
    nombre: 'Test 10',
    titulo: translations.Pr10Titulo || 'Título del Test 10',
    resultado: resultados.test_10?.length > 0 ? '✅' : '❌',
  },
  {
    id: 11,
    nombre: 'Test 11',
    titulo: translations.Pr11Titulo || 'Título del Test 11',
    resultado: resultados.test_11?.length > 0 ? '✅' : '❌',
  },
  {
    id: 12,
    nombre: 'Test 12',
    titulo: translations.Pr12Titulo || 'Título del Test 12',
    resultado: resultados.test_12?.length > 0 ? '✅' : '❌',
  },
  {
    id: 13,
    nombre: 'Test 13',
    titulo: translations.Pr13Titulo || 'Título del Test 13',
    resultado: resultados.test_13?.length > 0 ? '✅' : '❌',
  },
  {
    id: 14,
    nombre: 'Test 14',
    titulo: translations.Pr14Titulo || 'Título del Test 14',
    resultado: resultados.test_14?.length > 0 ? '✅' : '❌',
  },
  {
    id: 15,
    nombre: 'Test 15',
    titulo: translations.Pr15Titulo || 'Título del Test 15',
    resultado: resultados.test_15?.length > 0 ? '✅' : '❌',
  },
  {
    id: 16,
    nombre: 'Test 16',
    titulo: translations.Pr16Titulo || 'Título del Test 16',
    resultado: resultados.test_16?.length > 0 ? '✅' : '❌',
  },    
  {
    id: 17,
    nombre: 'Test 17',
    titulo: translations.Pr17Titulo || 'Título del Test 17',
    resultado: resultados.test_17?.length > 0 ? '✅' : '❌',
  },
  {
    id: 18,
    nombre: 'Test 18',
    titulo: translations.Pr18Titulo || 'Título del Test 18',
    resultado: resultados.test_18?.length > 0 ? '✅' : '❌',
  },
  {
    id: 19,
    nombre: 'Test 19',
    titulo: translations.Pr19Titulo || 'Título del Test 19',
    resultado: resultados.test_19?.length > 0 ? '✅' : '❌',
  },
  {
    id: 20,
    nombre: 'Test 20',
    titulo: translations.Pr20Titulo || 'Título del Test 20',
    resultado: resultados.test_20?.length > 0 ? '✅' : '❌',
  },
  {
    id: 21,
    nombre: 'Test 21',
    titulo: translations.Pr21Titulo || 'Título del Test 21',
    resultado: resultados.test_21?.length > 0 ? '✅' : '❌',
  },
  {
    id: 22,
    nombre: 'Test 22',
    titulo: translations.Pr22Titulo || 'Título del Test 22',
    resultado: resultados.test_22?.length > 0 ? '✅' : '❌',
  },
  {
    id: 23,
    nombre: 'Test 23',
    titulo: translations.Pr23Titulo || 'Título del Test 23',
    resultado: resultados.test_23?.length > 0 ? '✅' : '❌',
  },
  {
    id: 24,
    nombre: 'Test 24',
    titulo: translations.Pr24Titulo || 'Título del Test 24',
    resultado: resultados.test_24?.length > 0 ? '✅' : '❌',
  },
];
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <Text style={styles.title}>{translations.ResumenSesion || 'Resumen de la Sesión'}</Text>
      <View style={styles.contenedorLista}>
      <FlatList
        data={testsData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      </View>
      <View>
        <BotonToPDF datosPaciente={datosPaciente} datosTests={resultados}/>
        <BotonToCSV datosPaciente={datosPaciente} datosTests={resultados}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10
  },
  contenedorLista: {
    height: '50%',
    marginBottom: 20,
    marginHorizontal: 20
  },
  testItem: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  testName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },
  testResult: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10
  },
  repetirButton: {
    backgroundColor: '#D2B48C',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center'
  },
  repetirButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 18,
  },
  columna: {
    display: 'flex',
    flexDirection: 'column',
  },
});

export default InfoSesion;