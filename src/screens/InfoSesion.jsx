//TODO: TRADUCIR ESTO Y PONER TODOS LOS DATOS

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTranslation } from "../locales";
import { obtenerResultadosSesion } from '../api/TestApi';

const InfoSesion = ({ navigation, route }) => {
  const { idSesion, idPaciente } = route.params;
  const [resultados, setResultados] = useState(null);
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
    // Aquí deberías manejar la lógica para navegar a la pantalla del test específico
    switch (testId) {
      case 1:
        navigation.navigate('Test_1', { idPaciente, idSesion });
        break;
      case 3:
        navigation.navigate('Test_3', { idPaciente, idSesion });
        break;
      case 4:
        navigation.navigate('Test_4', { idPaciente, idSesion });
        break;
      case 5:
        navigation.navigate('Test_5', { idPaciente, idSesion });
        break;
      default:
        console.log('Test no encontrado');
        break;
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.testItem}>
      <Text style={styles.testName}>{item.nombre}</Text>
      <Text style={styles.testResult}>{item.resultado}</Text>
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
      resultado: `Ensayos: ${resultados.test_1[0]?.numero_ensayos || 0}, Correctas: ${resultados.test_1[0]?.tiempos_reaccion.length || 0}`,
    },
    {
      id: 3,
      nombre: 'Test 3',
      resultado: `Aciertos: ${resultados.test_3[0]?.numero_aciertos || 0}, Errores de Tiempo: ${resultados.test_3[0]?.errores_tiempo || 0}`,
    },
    {
      id: 4,
      nombre: 'Test 4',
      resultado: `Aciertos: ${resultados.test_4[0]?.numero_aciertos || 0}, Sobreestimaciones: ${resultados.test_4[0]?.numero_sobreestimaciones || 0}, Subestimaciones: ${resultados.test_4[0]?.numero_subestimaciones || 0}`,
    },
    {
      id: 5,
      nombre: 'Test 5',
      resultado: `Correctos: ${resultados.test_5[0]?.ensayos_correctos || 0}, Errores: ${resultados.test_5[0]?.numero_errores || 0}, Errores de Tiempo: ${resultados.test_5[0]?.errores_tiempo || 0}`,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{translations.ResumenSesion || 'Resumen de la Sesión'}</Text>
      <FlatList
        data={testsData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },
  listContainer: {
    paddingBottom: 20
  },
  testItem: {
    backgroundColor: '#fff',
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
    alignItems: 'center'
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
});

export default InfoSesion;