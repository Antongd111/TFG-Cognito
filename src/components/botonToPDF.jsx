import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const BotonToPDF = ({ datosPaciente, datosTests }) => {
  const createAndDownloadPDF = async () => {

    try {
      const {
        identificacion = '',
        nombre = '',
        apellidos = '',
        fecha_nacimiento = '',
        genero = '',
        observaciones = '',
      } = datosPaciente || {};

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
      const test17 = datosTests.test_17[0] || {};
      const test18 = datosTests.test_18[0] || {};
      const test19 = datosTests.test_19[0] || {};
      const test20 = datosTests.test_20[0] || {};
      const test21 = datosTests.test_21[0] || {};
      const test22 = datosTests.test_22[0] || {};
      const test23 = datosTests.test_23[0] || {};

      //TODO: traducir html
      //FIXME: genero
      const { uri } = await Print.printToFileAsync({
        html: `
          <html>
            <head>
              <style>
                h1 { font-family: verdana; font-size: 30px; }
                h2 { font-family: verdana; font-size: 20px; }
                body { font-family: verdana; font-size: 20px; margin: 15px; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
                th { background-color: #4e5bf0; font-weight: bold; }
                .prueba th { text-align: center; }
                .prueba td { text-align: center; }
              </style>
            </head>
            <body>
              <h1>Batería de tests para detección de desarrollo cognitivo</h1>
              <h2>Resultados de la sesión - ${new Date().toLocaleDateString()}</h2>
              <table>
                <tr><th colspan="2">Datos del paciente</th></tr>
                <tr><td><b>Identificación:</b></td><td>${identificacion}</td></tr>
                <tr><td><b>Nombre:</b></td><td>${nombre} ${apellidos}</td></tr>
                <tr><td><b>Fecha de nacimiento:</b></td><td>${fecha_nacimiento}</td></tr>
                <tr><td><b>Género:</b></td><td>${genero}</td></tr>
                <tr><td><b>Observaciones:</b></td><td>${observaciones}</td></tr>
              </table>

              <h3>Test 1 - Tiempo de reacción</h3>
              <table class="prueba">
                <tr>
                  <th>Nº de ensayos correctos</th>
                  <th>Tiempo medio (ms)</th>
                  <th>Errores de anticipación</th>
                  <th>Retrasos</th>
                  <th>Errores de tiempo</th>
                </tr>
                <tr>
                  <td>${test1.numero_ensayos || ''}</td>
                  <td>${(() => {
                    const tiempos = JSON.parse(test1.tiempos_reaccion || "[]");
                    const total = tiempos.reduce((acc, curr) => acc + curr, 0);
                    const media = tiempos.length > 0 ? (total / tiempos.length).toFixed(2) : '';
                    return media;
                  })()}</td>
                  <td>${test1.errores_anticipacion || '0'}</td>
                  <td>${test1.errores_retrasos || '0'}</td>
                  <td>${test1.errores_tiempo || '0'}</td>
                </tr>
                <tr><th colspan="5">Tiempos de reacción (ms)</th></tr>
                <tr><td colspan="5">${(test1.tiempos_reaccion && JSON.parse(test1.tiempos_reaccion).join(' - ')) || ''}</td></tr>
              </table>

              <h3>Test 3 - Lectura y compresión de frases</h3>
              <table class="prueba">
                <tr>
                  <th>Lecturas correctas</th>
                  <th>Lecturas incorrectas</th>
                  <th>Aciertos</th>
                  <th>Fallos</th>
                  <th>Errores de tiempo</th>
                </tr>
                <tr>
                  <td>${test3.lectura_correcta || '0'}</td>
                  <td>${(6 - test3.lectura_correcta) || '0'}</td>
                  <td>${test3.numero_aciertos || '0'}</td>
                  <td>${(6 - test3.numero_aciertos) || '0'}</td>
                  <td>${test3.errores_tiempo || '0'}</td>
                </tr>
              </table>

              <h3>Test 4 - Estimaciones</h3>
              <table class="prueba">
                <tr>
                  <th>Respuestas correctas</th>
                  <th>Respuestas incorrectas</th>
                  <th>Sobreestimaciones</th>
                  <th>Subestimaciones</th>
                </tr>
                <tr>
                  <td>${test4.numero_aciertos || '0'}</td>
                  <td>${(test4.numero_sobreestimaciones + test4.numero_subestimaciones) || '0'}</td>
                  <td>${test4.numero_sobreestimaciones || '0'}</td>
                  <td>${test4.numero_subestimaciones || '0'}</td>
                </tr>
              </table>

              <h3>Test 5 - Errores de tiempo</h3>
              <table class="prueba">
                <tr>
                  <th>Ensayos correctos</th>
                  <th>Errores</th>
                  <th>Errores de tiempo</th>
                </tr>
                <tr>
                  <td>${test5.ensayos_correctos || '0'}</td>
                  <td>${test5.numero_errores || '0'}</td>
                  <td>${test5.errores_tiempo || '0'}</td>
                </tr>
              </table>

              <h3>Test 6 - Acertijos auditivos</h3>
              <table class="prueba">
                <tr>
                  <th>Ensayos correctos</th>
                  <th>Errores</th>
                  <th>Errores de tiempo</th>
                  <th>Sonidos correctos</th>
                </tr>
                <tr>
                  <td>${test6.ensayos_correctos || '0'}</td>
                  <td>${test6.numero_errores || '0'}</td>
                  <td>${test6.errores_tiempo || '0'}</td>
                  <td>${test6.sonidos_correctos || '0'}</td>
                </tr>
              </table>

              <h3>Test 7 - Tiempo de acierto</h3>
              <table class="prueba">
                <tr>
                  <th>Respuestas correctas</th>
                  <th>Errores</th>
                  <th>Tiempo medio de acierto (ms)</th>
                </tr>
                <tr>
                  <td>${test7.numero_aciertos || '0'}</td>
                  <td>${test7.numero_errores || '0'}</td>
                  <td>${test7.tiempo_medio || '0'}</td>
                </tr>
              </table>

              <h3>Test 8 - Pronunciaciones</h3>
              <table class="prueba">
                <tr>
                  <th>Pronunciaciones correctas</th>
                  <th>Pronunciaciones incorrectas</th>
                  <th>Nombres recordados</th>
                  <th>Intrusiones</th>
                  <th>Perseveraciones</th>
                  <th>Rechazos</th>
                </tr>
                <tr>
                  <td>${test8.pronunciaciones_correctas || '0'}</td>
                  <td>${test8.pronunciaciones_incorrectas || '0'}</td>
                  <td>${test8.recordados || '0'}</td>
                  <td>${test8.intrusiones || '0'}</td>
                  <td>${test8.perseveraciones || '0'}</td>
                  <td>${test8.rechazos || '0'}</td>
                </tr>
              </table>

              <h3>Test 10 - Validez</h3>
              <table class="prueba">
                <tr>
                  <th>Número de ensayo</th>
                  <th>Validez</th>
                  <th>Tiempo empleado (ms)</th>
                </tr>
                ${(test10.resultados && JSON.parse(test10.resultados).map((resultado, index) => `
                  <tr>
                    <td>${index + 1}</td>
                    <td>${resultado.validez}</td>
                    <td>${resultado.tiempo || ''}</td>
                  </tr>
                `).join('')) || ''}
              </table>

              <h3>Test 11 - Figuras seleccionadas</h3>
              <table class="prueba">
                <tr>
                  <th>Ensayos correctos</th>
                  <th>Número de inversiones</th>
                  <th>Errores de tiempo</th>
                </tr>
                <tr>
                  <td>${test11.correctas || ''}</td>
                  <td>${test11.inversiones || ''}</td>
                  <td>${test11.rectificaciones || ''}</td>
                </tr>
                <tr>
                  <th>Número de ensayo</th>
                  <th>Figura seleccionada</th>
                  <th>Tiempo empleado (ms)</th>
                </tr>
                ${(test11.figuras_seleccionadas && JSON.parse(test11.figuras_seleccionadas).map((figura, index) => `
                  <tr>
                    <td>${index + 1}</td>
                    <td>${figura.figura}</td>
                    <td>${figura.tiempo || ''}</td>
                  </tr>
                `).join('')) || ''}
              </table>

              <h3>Test 12 - Errores morfológicos, fonéticos y semánticos</h3>
              <table class="prueba">
                <tr>
                  <th>Ensayos correctos</th>
                  <th>Errores morfológicos</th>
                  <th>Errores fonéticos</th>
                  <th>Errores semánticos</th>
                  <th>Errores de tiempo</th>
                </tr>
                <tr>
                  <td>${test12.correctas || ''}</td>
                  <td>${test12.errores_morfológicos || ''}</td>
                  <td>${test12.errores_fonéticos || ''}</td>
                  <td>${test12.errores_semánticos || ''}</td>
                  <td>${test12.excedido_tiempo || ''}</td>
                </tr>
              </table>

              <h3>Test 13 - Asociaciones y errores</h3>
              <table class="prueba">
                <tr>
                  <th>Respuestas correctas (RC)</th>
                  <th>Error de asociación</th>
                  <th>Generalizaciones</th>
                  <th>Respuestas parciales</th>
                  <th>Excesos de tiempo reconocimiento</th>
                  <th>Excesos de tiempo asociación</th>
                </tr>
                <tr>
                  <td>${test13.correctas || ''}</td>
                  <td>${test13.error_asociacion || ''}</td>
                  <td>${test13.generalizaciones || ''}</td>
                  <td>${test13.parciales || ''}</td>
                  <td>${test13.exceso_tiempo_obj || ''}</td>
                  <td>${test13.exceso_tiempo_asoc || ''}</td>
                </tr>
              </table>

              <h3>Test 14 - Tiempo total y errores</h3>
              <table class="prueba">
                <tr>
                  <th>Ensayos correctos</th>
                  <th>Ensayos incorrectos</th>
                  <th>Tiempo total empleado (ms)</th>
                </tr>
                <tr>
                  <td>${test14.correctas || ''}</td>
                  <td>${test14.errores || ''}</td>
                  <td>${test14.tiempo_total || ''}</td>
                </tr>
              </table>

              <h3>Test 17 - Fases de reconocimiento</h3>
              <table class="prueba">
                <tr><th colspan="4">FASE 1</th></tr>
                <tr>
                  <th>Nombres recordados</th>
                  <th>Intrusiones</th>
                  <th>Perseveraciones</th>
                  <th>Rechazos</th>
                </tr>
                <tr>
                  <td>${test17.nombres_recordados_fase1 || ''}</td>
                  <td>${test17.intrusiones_fase1 || ''}</td>
                  <td>${test17.perseveraciones_fase1 || ''}</td>
                  <td>${test17.rechazos_fase1 || ''}</td>
                </tr>
                <tr><th colspan="4">FASE 2</th></tr>
                <tr>
                  <th>Nombres recordados</th>
                  <th>Intrusiones</th>
                  <th>Perseveraciones</th>
                  <th>Rechazos</th>
                </tr>
                <tr>
                  <td>${test17.nombres_recordados_fase2 || ''}</td>
                  <td>${test17.intrusiones_fase2 || ''}</td>
                  <td>${test17.perseveraciones_fase2 || ''}</td>
                  <td>${test17.rechazos_fase2 || ''}</td>
                </tr>
                <tr><th colspan="3">FASE 3</th></tr>
                <tr>
                  <th>Nombres identificados</th>
                  <th>Errores de identificación</th>
                  <th>Rechazos</th>
                </tr>
                <tr>
                  <td>${test17.nombres_identificados_fase3 || ''}</td>
                  <td>${test17.errores_identificados_fase3 || ''}</td>
                  <td>${test17.rechazos_reconocimiento_fase3 || ''}</td>
                </tr>
              </table>

              <h3>Test 18 - Reconocimiento de caras</h3>
              <table class="prueba">
                <tr>
                  <th>Caras reconocidas correctamente</th>
                  <th>Caras incorrectamente reconocidas</th>
                  <th>Nombres recordados</th>
                </tr>
                <tr>
                  <td>${test18.caras_reconocidas_correctamente || ''}</td>
                  <td>${test18.caras_incorrectamente_reconocidas || ''}</td>
                  <td>${test18.nombres_reconocidos_correctamente || ''}</td>
                </tr>
              </table>

              <h3>Test 19 - Respuestas por intervalo de tiempo</h3>
              <table class="prueba">
                <tr>
                  <th></th>
                  <th>15 s</th>
                  <th>30 s</th>
                  <th>45 s</th>
                  <th>60 s</th>
                </tr>
                <tr><th>Respuestas correctas</th></tr>
                <tr>${(test19.respuestas_correctas_tiempo && JSON.parse(test19.respuestas_correctas_tiempo).map((res, index) => `<td>${res}</td>`).join('')) || ''}</tr>
                <tr><th>Intrusiones</th></tr>
                <tr>${(test19.intrusiones_tiempo && JSON.parse(test19.intrusiones_tiempo).map((res, index) => `<td>${res}</td>`).join('')) || ''}</tr>
                <tr><th>Perseveraciones</th></tr>
                <tr>${(test19.perseveraciones_tiempo && JSON.parse(test19.perseveraciones_tiempo).map((res, index) => `<td>${res}</td>`).join('')) || ''}</tr>
              </table>

              <h3>Test 20 - Respuestas por intervalo de tiempo</h3>
              <table class="prueba">
                <tr>
                  <th></th>
                  <th>15 s</th>
                  <th>30 s</th>
                  <th>45 s</th>
                  <th>60 s</th>
                </tr>
                <tr><th>Respuestas correctas</th></tr>
                <tr>${(test20.respuestas_correctas_tiempo && JSON.parse(test20.respuestas_correctas_tiempo).map((res, index) => `<td>${res}</td>`).join('')) || ''}</tr>
                <tr><th>Intrusiones</th></tr>
                <tr>${(test20.intrusiones_tiempo && JSON.parse(test20.intrusiones_tiempo).map((res, index) => `<td>${res}</td>`).join('')) || ''}</tr>
                <tr><th>Perseveraciones</th></tr>
                <tr>${(test20.perseveraciones_tiempo && JSON.parse(test20.perseveraciones_tiempo).map((res, index) => `<td>${res}</td>`).join('')) || ''}</tr>
              </table>

              <h3>Test 21 - Secuencias recordadas</h3>
              <table class="prueba">
                <tr>
                  <th>Recordados</th>
                  <th>Intrusiones</th>
                  <th>Rechazos</th>
                </tr>
                <tr>
                  <td>${test21.recordados || ''}</td>
                  <td>${test21.intrusiones || ''}</td>
                  <td>${test21.rechazos || ''}</td>
                </tr>
                <tr>
                  <th colspan="3">Secuencia recordada</th>
                </tr>
                <tr>
                  <td colspan="3">${(test21.indices_seleccionados && JSON.parse(test21.indices_seleccionados).join(', ')) || ''}</td>
                </tr>
              </table>

              <h3>Test 22 - Secuencias recordadas</h3>
              <table class="prueba">
                <tr>
                  <th>Recordados</th>
                  <th>Intrusiones</th>
                  <th>Rechazos</th>
                </tr>
                <tr>
                  <td>${test22.recordados || ''}</td>
                  <td>${test22.intrusiones || ''}</td>
                  <td>${test22.rechazos || ''}</td>
                </tr>
                <tr>
                  <th colspan="3">Secuencia recordada</th>
                </tr>
                <tr>
                  <td colspan="3">${(test22.indices_seleccionados && JSON.parse(test22.indices_seleccionados).join(', ')) || ''}</td>
                </tr>
              </table>

              <h3>Test 23 - Respuestas y tiempos</h3>
              <table class="prueba">
                <tr>
                  <th>Respuestas correctas</th>
                  <th>Respuestas incorrectas</th>
                  <th>Excesos de tiempo</th>
                </tr>
                <tr>
                  <td>${test23.correctas || ''}</td>
                  <td>${test23.errores || ''}</td>
                  <td>${test23.excesos_tiempo || ''}</td>
                </tr>
                <tr>
                  <th>Número de ensayo</th>
                  <th>Respuesta escogida</th>
                  <th>Tiempo empleado (ms)</th>
                </tr>
                ${(test23.respuestas && JSON.parse(test23.respuestas).map((respuesta, index) => `
                  <tr>
                    <td>${index + 1}</td>
                    <td>${respuesta.respuesta}</td>
                    <td>${respuesta.tiempo || ''}</td>
                  </tr>
                `).join('')) || ''}
              </table>
            </body>
          </html>
        `
      });

      // Definir la ruta donde se guardará el archivo PDF
      const pdfUri = `${FileSystem.documentDirectory}ResultadosSesion.pdf`;

      // Mover el archivo generado a la ruta deseada
      await FileSystem.moveAsync({
        from: uri,
        to: pdfUri,
      });

      // Abrir el archivo PDF usando el sistema de archivos
      Alert.alert('PDF generado', 'El archivo PDF ha sido descargado.');
      await Sharing.shareAsync(pdfUri);

    } catch (error) {
      Alert.alert('Error', 'No se pudo generar el PDF.');
      console.error(error);
    }
  };

  return (
    <TouchableOpacity style={styles.pdfButton} onPress={createAndDownloadPDF}>
      <Text style={styles.pdfButtonText}>Generar y Descargar PDF</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pdfButton: {
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    marginBottom: 20,
  },
  pdfButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default BotonToPDF;