//TODO: TRADUCIR ESTO Y PONER TODOS LOS DATOS

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTranslation } from "../locales";
import { obtenerResultadosSesion } from '../api/TestApi';

import BotonToPDF from '../components/botonToPDF';

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
    navigation.navigate(`Test_${testId}`, { idPaciente, idSesion });
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
      nombre: translations.Test1 || 'Test 1',
      resultado: `Ensayos: ${resultados.test_1[0]?.numero_ensayos || 0}, Correctas: ${resultados.test_1[0]?.tiempos_reaccion.length || 0}, Errores de Anticipación: ${resultados.test_1[0]?.errores_anticipacion || 0}, Errores por Retrasos: ${resultados.test_1[0]?.errores_retrasos || 0}, Errores de Tiempo: ${resultados.test_1[0]?.errores_tiempo || 0}`,
    },
    {
      id: 3,
      nombre: translations.Test3 || 'Test 3',
      resultado: `Aciertos: ${resultados.test_3[0]?.numero_aciertos || 0}, Lectura Correcta: ${resultados.test_3[0]?.lectura_correcta || 0}, Errores de Tiempo: ${resultados.test_3[0]?.errores_tiempo || 0}`,
    },
    {
      id: 4,
      nombre: translations.Test4 || 'Test 4',
      resultado: `Aciertos: ${resultados.test_4[0]?.numero_aciertos || 0}, Sobreestimaciones: ${resultados.test_4[0]?.numero_sobreestimaciones || 0}, Subestimaciones: ${resultados.test_4[0]?.numero_subestimaciones || 0}`,
    },
    {
      id: 5,
      nombre: translations.Test5 || 'Test 5',
      resultado: `Ensayos Correctos: ${resultados.test_5[0]?.ensayos_correctos || 0}, Errores: ${resultados.test_5[0]?.numero_errores || 0}, Errores de Tiempo: ${resultados.test_5[0]?.errores_tiempo || 0}`,
    },
    {
      id: 6,
      nombre: translations.Test6 || 'Test 6',
      resultado: `Aciertos: ${resultados.test_6[0]?.numero_aciertos || 0}, Errores: ${resultados.test_6[0]?.numero_errores || 0}`,
    },
    {
      id: 7,
      nombre: translations.Test7 || 'Test 7',
      resultado: `Aciertos: ${resultados.test_7[0]?.numero_aciertos || 0}, Errores: ${resultados.test_7[0]?.numero_errores || 0}, Tiempo Medio: ${resultados.test_7[0]?.tiempo_medio || 0} ms`,
    },
    {
      id: 8,
      nombre: translations.Test8 || 'Test 8',
      resultado: `Pronunciaciones Correctas: ${resultados.test_8[0]?.pronunciaciones_correctas || 0}, Pronunciaciones Incorrectas: ${resultados.test_8[0]?.pronunciaciones_incorrectas || 0}, Recordados: ${resultados.test_8[0]?.recordados || 0}, Intrusiones: ${resultados.test_8[0]?.intrusiones || 0}, Perseveraciones: ${resultados.test_8[0]?.perseveraciones || 0}, Rechazos: ${resultados.test_8[0]?.rechazos || 0}`,
    },
    {
      id: 10,
      nombre: translations.Test10 || 'Test 10',
      resultado: `Resultados: ${JSON.stringify(resultados.test_10[0]?.resultados || {})}`,
    },
    {
      id: 11,
      nombre: translations.Test11 || 'Test 11',
      resultado: `Correctas: ${resultados.test_11[0]?.correctas || 0}, Inversiones: ${resultados.test_11[0]?.inversiones || 0}, Rectificaciones: ${resultados.test_11[0]?.rectificaciones || 0}, Tiempos de Respuesta: ${JSON.stringify(resultados.test_11[0]?.tiempos_respuestas || [])}, Figuras Seleccionadas: ${JSON.stringify(resultados.test_11[0]?.figuras_seleccionadas || [])}`,
    },
    {
      id: 12,
      nombre: translations.Test12 || 'Test 12',
      resultado: `Correctas: ${resultados.test_12[0]?.correctas || 0}, Errores Morfológicos: ${resultados.test_12[0]?.errores_morfológicos || 0}, Errores Fonéticos: ${resultados.test_12[0]?.errores_fonéticos || 0}, Errores Semánticos: ${resultados.test_12[0]?.errores_semánticos || 0}, Excedido Tiempo: ${resultados.test_12[0]?.excedido_tiempo || 0}, Respuesta Incorrecta: ${resultados.test_12[0]?.respuesta_incorrecta || 0}`,
    },
    {
      id: 13,
      nombre: translations.Test13 || 'Test 13',
      resultado: `Correctas: ${resultados.test_13[0]?.correctas || 0}, Errores de Asociación: ${resultados.test_13[0]?.error_asociacion || 0}, Generalizaciones: ${resultados.test_13[0]?.generalizaciones || 0}, Parciales: ${resultados.test_13[0]?.parciales || 0}, Otros Errores: ${resultados.test_13[0]?.otros_errores || 0}, Exceso de Tiempo en Objetos: ${resultados.test_13[0]?.exceso_tiempo_obj || 0}, Exceso de Tiempo en Asociación: ${resultados.test_13[0]?.exceso_tiempo_asoc || 0}, Respuesta de Secuencia: ${JSON.stringify(resultados.test_13[0]?.respuesta_secuencia || [])}`,
    },
    {
      id: 14,
      nombre: translations.Test14 || 'Test 14',
      resultado: `Correctas: ${resultados.test_14[0]?.correctas || 0}, Errores: ${resultados.test_14[0]?.errores || 0}, Tiempo Total: ${resultados.test_14[0]?.tiempo_total || 0} ms`,
    },
    {
      id: 17,
      nombre: translations.Test17 || 'Test 17',
      resultado: `Fase 1 - Nombres Recordados: ${resultados.test_17[0]?.nombres_recordados_fase1 || 0}, Intrusiones: ${resultados.test_17[0]?.intrusiones_fase1 || 0}, Perseveraciones: ${resultados.test_17[0]?.perseveraciones_fase1 || 0}, Rechazos: ${resultados.test_17[0]?.rechazos_fase1 || 0}\nFase 2 - Nombres Recordados: ${resultados.test_17[0]?.nombres_recordados_fase2 || 0}, Intrusiones: ${resultados.test_17[0]?.intrusiones_fase2 || 0}, Perseveraciones: ${resultados.test_17[0]?.perseveraciones_fase2 || 0}, Rechazos: ${resultados.test_17[0]?.rechazos_fase2 || 0}\nFase 3 - Nombres Identificados: ${resultados.test_17[0]?.nombres_identificados_fase3 || 0}, Errores: ${resultados.test_17[0]?.errores_identificados_fase3 || 0}, Rechazos de Reconocimiento: ${resultados.test_17[0]?.rechazos_reconocimiento_fase3 || 0}`,
    },
    {
      id: 18,
      nombre: translations.Test18 || 'Test 18',
      resultado: `Caras Reconocidas Correctamente: ${resultados.test_18[0]?.correctas || 0}, Caras Reconocidas Incorrectamente: ${resultados.test_18[0]?.errores || 0}, Nombres Reconocidos Correctamente: ${resultados.test_18[0]?.tiempo_total || 0}`,
    },
    {
      id: 19,
      nombre: translations.Test19 || 'Test 19',
      resultado: `Respuestas Correctas (por tiempo): ${JSON.stringify(resultados.test_19[0]?.respuestas_correctas_tiempo || [])}, Intrusiones (por tiempo): ${JSON.stringify(resultados.test_19[0]?.intrusiones_tiempo || [])}, Perseveraciones (por tiempo): ${JSON.stringify(resultados.test_19[0]?.perseveraciones_tiempo || [])}`,
    },
    {
      id: 20,
      nombre: translations.Test20 || 'Test 20',
      resultado: `Respuestas Correctas (por tiempo): ${JSON.stringify(resultados.test_20[0]?.respuestas_correctas_tiempo || [])}, Intrusiones (por tiempo): ${JSON.stringify(resultados.test_20[0]?.intrusiones_tiempo || [])}, Perseveraciones (por tiempo): ${JSON.stringify(resultados.test_20[0]?.perseveraciones_tiempo || [])}`,
    },
    {
      id: 21,
      nombre: translations.Test21 || 'Test 21',
      resultado: `Intrusiones: ${resultados.test_21[0]?.intrusiones || 0}, Rechazos: ${resultados.test_21[0]?.rechazos || 0}, Índices Seleccionados: ${JSON.stringify(resultados.test_21[0]?.indices_seleccionados || [])}`,
    },
    {
      id: 22,
      nombre: translations.Test22 || 'Test 22',
      resultado: `Intrusiones: ${resultados.test_22[0]?.intrusiones || 0}, Rechazos: ${resultados.test_22[0]?.rechazos || 0}, Índices Seleccionados: ${JSON.stringify(resultados.test_22[0]?.indices_seleccionados || [])}`,
    },
    {
      id: 23,
      nombre: translations.Test23 || 'Test 23',
      resultado: `Correctas: ${resultados.test_23[0]?.correctas || 0}, Errores: ${resultados.test_23[0]?.errores || 0}, Excesos de Tiempo: ${resultados.test_23[0]?.excesos_tiempo || 0}, Respuestas: ${JSON.stringify(resultados.test_23[0]?.respuestas || [])}, Tiempos: ${JSON.stringify(resultados.test_23[0]?.tiempos || [])}`,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{translations.ResumenSesion || 'Resumen de la Sesión'}</Text>
      <View style={styles.contenedorLista}>
      <FlatList
        data={testsData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      </View>
      <View>
        <BotonToPDF datosTests={testsData} />
      </View>
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
  contenedorLista: {
    height: '80%',
    marginBottom: 20
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