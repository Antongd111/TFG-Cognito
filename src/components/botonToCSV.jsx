import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTranslation } from "../locales";
import { useIsFocused } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const BotonToCSV = ({ datosPaciente, datosTests }) => {
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

  const formatearFecha = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const createAndDownloadCSV = async () => {
    try {
      const {
        identificacion = '',
        nombre = '',
        apellidos = '',
        fecha_nacimiento = '',
        sexo = '',
        observaciones = '',
      } = datosPaciente || {};

      const fechaFormateada = formatearFecha(fecha_nacimiento);
      const fechaSesion = datosTests.fecha;
      const test1 = datosTests.test_1[0] || {};
      const test3 = datosTests.test_3[0] || {};
      const test4 = datosTests.test_4[0] || {};
      const test5 = datosTests.test_5[0] || {};
      const test6 = datosTests.test_6[0] || {};
      const test7 = datosTests.test_7[0] || {};
      const test8 = datosTests.test_8[0] || {};
      const test10 = datosTests.test_10[0] || {};
      const test11 = datosTests.test_11[0] || {};
      const test12 = datosTests.test_12[0] || {};
      const test13 = datosTests.test_13[0] || {};
      const test14 = datosTests.test_14[0] || {};
      const test15 = datosTests.test_15[0] || {};
      const test16 = datosTests.test_16[0] || {};
      const test17 = datosTests.test_17[0] || {};
      const test18 = datosTests.test_18[0] || {};
      const test19 = datosTests.test_19[0] || {};
      const test20 = datosTests.test_20[0] || {};
      const test21 = datosTests.test_21[0] || {};
      const test22 = datosTests.test_22[0] || {};
      const test23 = datosTests.test_23[0] || {};
      const test24 = datosTests.test_24[0] || {};

      const header = [];
      const rows = [
        ['Fecha de test', '', fechaSesion],
        ['Identificacion', '', identificacion],
        ['Nombre', '', `${nombre} ${apellidos}`],
        ['Fecha de nacimiento', '', fechaFormateada],
        ['Genero', '', sexo === 'M' ? 'Hombre' : 'Mujer'],
        ['Observaciones', '', observaciones],
        [],
        ['Test', 'Titulo', 'Datos'],
        ['Test 1', translations.Pr01Titulo, 
            `Ensayos correctos: ${test1.numero_ensayos || '0'}, Tiempo medio (ms): ${(() => {
              const tiempos = JSON.parse(test1.tiempos_reaccion || "[]");
              const total = tiempos.reduce((acc, curr) => acc + curr, 0);
              return tiempos.length > 0 ? (total / tiempos.length).toFixed(2) : '0';
            })()}, Errores de anticipacion: ${test1.errores_anticipacion || '0'}, Retrasos: ${test1.errores_retrasos || '0'}, Errores de tiempo: ${test1.errores_tiempo || '0'}`],
        ['Test 3', translations.Pr03Titulo, 
            `Lecturas correctas: ${test3.lectura_correcta || '0'}, Aciertos: ${test3.numero_aciertos || '0'}, Errores de tiempo: ${test3.errores_tiempo || '0'}`],
        ['Test 4', translations.Pr04Titulo, 
            `Respuestas correctas: ${test4.numero_aciertos || '0'}, Sobreestimaciones: ${test4.numero_sobreestimaciones || '0'}, Subestimaciones: ${test4.numero_subestimaciones || '0'}`],
        ['Test 5', translations.Pr05Titulo, 
            `Ensayos correctos: ${test5.ensayos_correctos || '0'}, Errores: ${test5.numero_errores || '0'}, Errores de tiempo: ${test5.errores_tiempo || '0'}`],
        ['Test 6', translations.Pr06Titulo, 
            `Ensayos correctos: ${test6.ensayos_correctos || '0'}, Errores: ${test6.numero_errores || '0'}, Errores de tiempo: ${test6.errores_tiempo || '0'}, Sonidos correctos: ${test6.sonidos_correctos || '0'}`],
        ['Test 7', translations.Pr07Titulo, 
            `Respuestas correctas: ${test7.numero_aciertos || '0'}, Errores: ${test7.numero_errores || '0'}, Tiempo medio de acierto (ms): ${test7.tiempo_medio || '0'}`],
        ['Test 8', translations.Pr08Titulo, 
            `Pronunciaciones correctas: ${test8.pronunciaciones_correctas || '0'}, Nombres recordados: ${test8.recordados || '0'}, Intrusiones: ${test8.intrusiones || '0'}, Perseveraciones: ${test8.perseveraciones || '0'}, Rechazos: ${test8.rechazos || '0'}`],
        ['Test 10', translations.Pr10Titulo, 
            `Numero de ensayo: ${(test10.secuencias_tocadas && JSON.parse(test10.secuencias_tocadas).length) || '0'}, Validez: ${(test10.correctas && JSON.parse(test10.correctas).map(c => c ? 'Correcto' : 'Incorrecto')).join(', ') || 'N/A'}`],
        ['Test 11', translations.Pr11Titulo, 
            `Ensayos correctos: ${test11.correctas || '0'}, Inversiones: ${test11.inversiones || '0'}, Errores de tiempo: ${test11.rectificaciones || '0'}`],
        ['Test 12', translations.Pr12Titulo, 
            `Ensayos correctos: ${test12.correctas || '0'}, Errores morfologicos: ${test12.errores_morfologicos || '0'}, Errores foneticos: ${test12.errores_foneticos || '0'}, Errores semanticos: ${test12.errores_semanticos || '0'}, Errores de tiempo: ${test12.excedido_tiempo || '0'}`],
        ['Test 13', translations.Pr13Titulo, 
            `Respuestas correctas (RC): ${test13.correctas || '0'}, Error de asociacion: ${test13.error_asociacion || '0'}, Generalizaciones: ${test13.generalizaciones || '0'}, Respuestas parciales: ${test13.parciales || '0'}, Excesos de tiempo reconocimiento: ${test13.exceso_tiempo_obj || '0'}, Excesos de tiempo asociacion: ${test13.exceso_tiempo_asoc || '0'}`],
        ['Test 14', translations.Pr14Titulo, 
            `Ensayos correctos: ${test14.correctas || '0'}, Ensayos incorrectos: ${test14.errores || '0'}, Tiempo total empleado (ms): ${test14.tiempo_total || '0'}`],
        ['Test 15', translations.Pr15Titulo, 
            `Imposibilidad: ${test15.imposibilidad ? 'Si' : 'No'}, Rechazo: ${test15.rechazo ? 'Si' : 'No'}, Perspectiva: ${test15.perspectiva ? 'Si' : 'No'}, Elementos: ${(test15.elementos && JSON.parse(test15.elementos).join(' - ')) || ''}`],
        ['Test 16', translations.Pr16Titulo, 
            `Imposibilidad: ${test16.imposibilidad ? 'Si' : 'No'}, Rechazo: ${test16.rechazo ? 'Si' : 'No'}, Perspectiva: ${test16.perspectiva ? 'Si' : 'No'}, Elementos: ${(test16.elementos && JSON.parse(test16.elementos).join(' - ')) || ''}`],
        ['Test 17', translations.Pr17Titulo, 
            `Fase 1 - Nombres recordados: ${(test17.nombres_recordados_fase1 && JSON.parse(test17.nombres_recordados_fase1).join(', ')) || ''}, Fase 2 - Nombres recordados: ${(test17.nombres_recordados_fase2 && JSON.parse(test17.nombres_recordados_fase2).join(', ')) || ''}, Fase 3 - Nombres identificados: ${(test17.nombres_identificados_fase3 && JSON.parse(test17.nombres_identificados_fase3).join(', ')) || ''}`],
        ['Test 18', translations.Pr18Titulo, 
            `Caras reconocidas correctamente: ${test18.caras_reconocidas || '0'}, Caras incorrectamente reconocidas: ${test18.caras_reconocidas_incorrectamente || '0'}, Nombres reconocidos: ${test18.nombres_reconocidos || '0'}`],
        ['Test 19', translations.Pr19Titulo, 
            `Respuestas correctas: ${(test19.respuestas_correctas_tiempo && JSON.parse(test19.respuestas_correctas_tiempo).join(', ')) || ''}, Intrusiones: ${(test19.intrusiones_tiempo && JSON.parse(test19.intrusiones_tiempo).join(', ')) || ''}, Perseveraciones: ${(test19.perseveraciones_tiempo && JSON.parse(test19.perseveraciones_tiempo).join(', ')) || ''}`],
        ['Test 20', translations.Pr20Titulo, 
            `Respuestas correctas: ${(test20.respuestas_correctas_tiempo && JSON.parse(test20.respuestas_correctas_tiempo).join(', ')) || ''}, Intrusiones: ${(test20.intrusiones_tiempo && JSON.parse(test20.intrusiones_tiempo).join(', ')) || ''}, Perseveraciones: ${(test20.perseveraciones_tiempo && JSON.parse(test20.perseveraciones_tiempo).join(', ')) || ''}`],
        ['Test 21', translations.Pr21Titulo, 
            `Intrusiones: ${test21.intrusiones || ''}, Rechazos: ${test21.rechazos || ''}, Indices seleccionados: ${(test21.indices_seleccionados && JSON.parse(test21.indices_seleccionados).join(', ')) || ''}`],
        ['Test 22', translations.Pr22Titulo, 
            `Intrusiones: ${test22.intrusiones || ''}, Rechazos: ${test22.rechazos || ''}, Indices seleccionados: ${(test22.indices_seleccionados && JSON.parse(test22.indices_seleccionados).join(', ')) || ''}`],
        ['Test 23', translations.Pr23Titulo, 
            `Respuestas correctas: ${test23.correctas || '0'}, Errores: ${test23.errores || '0'}, Excesos de tiempo: ${test23.excesos_tiempo || '0'}, Respuestas: ${(test23.respuestas && JSON.parse(test23.respuestas).join(', ')) || ''}, Tiempos: ${(test23.tiempos && JSON.parse(test23.tiempos).join(', ')) || ''}`],
        ['Test 24', translations.Pr24Titulo, 
            `Numero de Ensayo: ${(test24.validez_ensayo && test24.etapas_ensayo && JSON.parse(test24.validez_ensayo).map((valido, index) => `${index + 1}`).join(', ')) || ''}, Exito o Fracaso: ${(test24.validez_ensayo && test24.etapas_ensayo && JSON.parse(test24.validez_ensayo).map(valido => valido ? 'Exito' : 'Fracaso').join(', ')) || ''}, Numero de Reconstrucciones: ${(test24.etapas_ensayo && JSON.parse(test24.etapas_ensayo).join(', ')) || ''}, Media Conocidos: ${test24.media_conocidos || ''}, Media Desconocidos: ${test24.media_desconocidos || ''}, Diferencia de Medias: ${test24.diferencia || ''}`],
    ];
      let csvContent = `${header.join(';')}\n`;
      rows.forEach(row => {
        csvContent += `${row.map(value => `"${value}"`).join(';')}\n`;
      });

      // Crear el archivo CSV
      const csvUri = `${FileSystem.documentDirectory}ResultadosSesion.csv`;
      await FileSystem.writeAsStringAsync(csvUri, csvContent, { encoding: FileSystem.EncodingType.UTF8 });

      // Compartir el archivo CSV
      Alert.alert('CSV generado', 'El archivo CSV ha sido generado.');
      await Sharing.shareAsync(csvUri);

    } catch (error) {
      Alert.alert('Error', 'No se pudo generar el CSV.');
      console.error(error);
    }
  };

  return (
    <TouchableOpacity style={styles.csvButton} onPress={createAndDownloadCSV}>
      <Text style={styles.csvButtonText}>{translations.GenerarCsv}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  csvButton: {
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  csvButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default BotonToCSV;