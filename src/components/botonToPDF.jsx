import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTranslation } from "../locales";
import { useIsFocused } from '@react-navigation/native';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const BotonToPDF = ({ datosPaciente, datosTests }) => {

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
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};



  const createAndDownloadPDF = async () => {

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

      //TODO: fecha de sesion bien puesta

      const { uri } = await Print.printToFileAsync({
        html: `
          <html>
          <head>
            <style>
              * { print-color-adjust: exact !important; }
              h1 { font-family: verdana; font-size: 30px; }
              h2 { font-family: verdana; font-size: 20px; }
              body { font-family: verdana; font-size: 20px; margin: 15px; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              th, td { padding: 12px; text-align: left; border: 1px solid #ddd; }
              h3 { font-family: verdana; font-size: 24px; margin-top: 20px; text-align: center; }
              th { background-color: #4e5bf0; font-weight: bold; }
              .prueba th { text-align: center; }
              .prueba td { text-align: center; }
              .tabla-container { page-break-inside: avoid; margin-top: 20px; }
              .datosPaciente th {text-align: center; margin-top: 20px; }
              .observaciones { text-align: center; }
            </style>
          </head>
          <body>
            <h1>Batería de tests para detección de desarrollo cognitivo</h1>
            <h2>Resultados de la sesión - ${fechaSesion}</h2>
            <table class="datosPaciente">
              <tr><th colspan="2">${translations.FichaPaciente}</th></tr>
              <tr><td><b>${translations.Identificacion}:</b></td><td>${identificacion}</td></tr>
              <tr><td><b>${translations.Nombre}:</b></td><td>${nombre} ${apellidos}</td></tr>
              <tr><td><b>${translations.FechaNacimiento}:</b></td><td>${fechaFormateada}</td></tr>
              <tr><td><b>${translations.Sexo}:</b></td><td>${sexo == 'M' ? 'Hombre' : 'Mujer'}</td></tr>
              <tr><td colspan="2" class="observaciones"><b>${translations.Observaciones}</b></td></tr>
              <tr><td colspan="2">${observaciones}</td></tr>
            </table>

            <!-- Test 1 -->
            <div class="tabla-container">
              <h3>Test 1 - ${translations.Pr01Titulo}</h3>
              <table class="prueba">
                <tr>
                  <th>${translations.pdfNumeroEnsayosCorrectos}</th>
                  <th>${translations.pdfTiempoMedio}</th>
                  <th>${translations.pdfErroresAnticipacion}</th>
                  <th>${translations.pdfRetrasos}</th>
                  <th>${translations.pdfErroresTiempo}</th>
                </tr>
                <tr>
                  <td>${test1.numero_ensayos || '0'}</td>
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
                <tr><th colspan="5">${translations.pdfTiemposReaccion}</th></tr>
                <tr><td colspan="5">${(test1.tiempos_reaccion && JSON.parse(test1.tiempos_reaccion).join(' - ')) || ''}</td></tr>
              </table>
            </div>

            <!-- Test 3 -->
            <div class="tabla-container">
              <h3>Test 3 - ${translations.Pr03Titulo}</h3>
              <table class="prueba">
                <tr>
                  <th>${translations.pdfLecturasCorrectas}</th>
                  <th>${translations.pdfLecturasIncorrectas}</th>
                  <th>${translations.pdfAciertos}</th>
                  <th>${translations.pdfFallos}</th>
                  <th>${translations.pdfErroresTiempo}</th>
                </tr>
                <tr>
                  <td>${test3.lectura_correcta || '0'}</td>
                  <td>${(6 - test3.lectura_correcta) || '0'}</td>
                  <td>${test3.numero_aciertos || '0'}</td>
                  <td>${(6 - test3.numero_aciertos) || '0'}</td>
                  <td>${test3.errores_tiempo || '0'}</td>
                </tr>
              </table>
            </div>

            <!-- Test 4 -->
            <div class="tabla-container">
              <h3>Test 4 - ${translations.Pr04Titulo}</h3>
              <table class="prueba">
                <tr>
                  <th>${translations.pdfRespuestasCorrectas}</th>
                  <th>${translations.pdfRespuestasIncorrectas}</th>
                  <th>${translations.pdfSobreestimaciones}</th>
                  <th>${translations.pdfSubestimaciones}</th>
                </tr>
                <tr>
                  <td>${test4.numero_aciertos || '0'}</td>
                  <td>${(test4.numero_sobreestimaciones + test4.numero_subestimaciones) || '0'}</td>
                  <td>${test4.numero_sobreestimaciones || '0'}</td>
                  <td>${test4.numero_subestimaciones || '0'}</td>
                </tr>
              </table>
            </div>

            <!-- Test 5 -->
            <div class="tabla-container">
              <h3>Test 5 - ${translations.Pr05Titulo}</h3>
              <table class="prueba">
                <tr>
                  <th>${translations.pdfEnsayosCorrectos}</th>
                  <th>${translations.pdfErrores}</th>
                  <th>${translations.pdfErroresTiempo}</th>
                </tr>
                <tr>
                  <td>${test5.ensayos_correctos || '0'}</td>
                  <td>${test5.numero_errores || '0'}</td>
                  <td>${test5.errores_tiempo || '0'}</td>
                </tr>
              </table>
            </div>

            <!-- Test 6 -->
            <div class="tabla-container">
              <h3>Test 6 - ${translations.Pr06Titulo}</h3>
              <table class="prueba">
                <tr>
                  <th>${translations.pdfEnsayosCorrectos}</th>
                  <th>${translations.pdfErrores}</th>
                  <th>${translations.pdfErroresTiempo}</th>
                  <th>${translations.pdfSonidosCorrectos}</th>
                </tr>
                <tr>
                  <td>${test6.ensayos_correctos || '0'}</td>
                  <td>${test6.numero_errores || '0'}</td>
                  <td>${test6.errores_tiempo || '0'}</td>
                  <td>${test6.sonidos_correctos || '0'}</td>
                </tr>
              </table>
            </div>

            <!-- Test 7 -->
            <div class="tabla-container">
              <h3>Test 7 - ${translations.Pr07Titulo}</h3>
              <table class="prueba">
                <tr>
                  <th>${translations.pdfRespuestasCorrectas}</th>
                  <th>${translations.pdfErrores}</th>
                  <th>${translations.pdfTiempoMedioAcierto}</th>
                </tr>
                <tr>
                  <td>${test7.numero_aciertos || '0'}</td>
                  <td>${test7.numero_errores || '0'}</td>
                  <td>${test7.tiempo_medio || '0'}</td>
                </tr>
              </table>
            </div>

            <!-- Test 8 -->
            <div class="tabla-container">
              <h3>Test 8 - ${translations.Pr08Titulo}</h3>
              <table class="prueba">
                <tr>
                  <th>${translations.pdfPronunciacionesCorrectas}</th>
                  <th>${translations.pdfPronunciacionesIncorrectas}</th>
                  <th>${translations.pdfNombresRecordados}</th>
                  <th>${translations.pdfIntrusiones}</th>
                  <th>${translations.pdfPerseveraciones}</th>
                  <th>${translations.pdfRechazos}</th>
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
            </div>

            <!-- Test 10 -->
            <div class="tabla-container">
              <h3>Test 10 - ${translations.Pr10Titulo}</h3>
              <table class="prueba">
                <tr>
                  <th>${translations.pdfNumeroEnsayo}</th>
                  <th>${translations.pdfValidez}</th>
                  <th>${translations.pdfSecuenciaTocada}</th>
                  <th>${translations.pdfTiempoEmpleado}</th>
                </tr>
                ${(test10.secuencias_tocadas && JSON.parse(test10.secuencias_tocadas).map((resultado, index) => `
                  <tr>
                    <td>${index + 1}</td>
                    <td>${JSON.parse(test10.correctas)[index] === true ? translations.pdfCorrecto : translations.pdfIncorrecto}</td>
                    <td>${resultado}</td>
                    <td>${JSON.parse(test10.tiempos_ensayos)[index] || ''}</td>
                  </tr>
                `).join('')) || ''}
              </table>
            </div>

          <!-- Test 11 -->
          <div class="tabla-container">
            <h3>Test 11 - ${translations.Pr11Titulo}</h3>
            <table class="prueba">
              <tr>
                <th>${translations.pdfEnsayosCorrectos}</th>
                <th>${translations.pdfNumeroInversiones}</th>
                <th>${translations.pdfErroresTiempo}</th>
              </tr>
              <tr>
                <td>${test11.correctas || '0'}</td>
                <td>${test11.inversiones || '0'}</td>
                <td>${test11.rectificaciones || '0'}</td>
              </tr>
              <tr>
                <th>${translations.pdfNumeroEnsayo}</th>
                <th>${translations.pdfFiguraSeleccionada}</th>
                <th>${translations.pdfTiempoEmpleado}</th>
              </tr>
              ${(test11.figuras_seleccionadas && JSON.parse(test11.figuras_seleccionadas).map((figura, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${figura}</td>
                  <td>${JSON.parse(test11.tiempos_respuestas)[index] || ''}</td>
                </tr>
              `).join('')) || ''}
            </table>
          </div>

          <!-- Test 12 -->
          <div class="tabla-container">
            <h3>Test 12 - ${translations.Pr12Titulo}</h3>
            <table class="prueba">
              <tr>
                <th>${translations.pdfEnsayosCorrectos}</th>
                <th>${translations.pdfEnsayosIncorrectos}</th>
                <th>${translations.pdfErroresMorfo}</th>
                <th>${translations.pdfErroresFoneticos}</th>
                <th>${translations.pdfErroresSemanticos}</th>
                <th>${translations.pdfErroresTiempo}</th>
              </tr>
              <tr>
                <td>${test12.correctas || '0'}</td>
                <td>${test12.respuesta_incorrecta || '0'}</td>
                <td>${test12.errores_morfologicos || '0'}</td>
                <td>${test12.errores_foneticos || '0'}</td>
                <td>${test12.errores_semanticos || '0'}</td>
                <td>${test12.excedido_tiempo || '0'}</td>
              </tr>
            </table>
          </div>

          <!-- Test 13 -->
          <div class="tabla-container">
            <h3>Test 13 - ${translations.Pr13Titulo}</h3>
            <table class="prueba">
              <tr>
                <th>${translations.pdfRespuestasCorrectas}</th>
                <th>${translations.pdfErrorAsociacion}</th>
                <th>${translations.pdfGeneralizaciones}</th>
                <th>${translations.pdfRespuestasParciales}</th>
                <th>${translations.pdfExcesoTiempoReconocimiento}</th>
                <th>${translations.pdfExcesoTiempoAsociacion}</th>
              </tr>
              <tr>
                <td>${test13.correctas || '0'}</td>
                <td>${test13.error_asociacion || '0'}</td>
                <td>${test13.generalizaciones || '0'}</td>
                <td>${test13.parciales || '0'}</td>
                <td>${test13.exceso_tiempo_obj || '0'}</td>
                <td>${test13.exceso_tiempo_asoc || '0'}</td>
              </tr>
            </table>
          </div>

          <!-- Test 14 -->
          <div class="tabla-container">
            <h3>Test 14 - ${translations.Pr14Titulo}</h3>
            <table class="prueba">
              <tr>
                <th>${translations.pdfEnsayosCorrectos}</th>
                <th>${translations.pdfEnsayosIncorrectos}</th>
                <th>${translations.pdfTiempoTotal}</th>
              </tr>
              <tr>
                <td>${test14.correctas || '0'}</td>
                <td>${test14.errores || '0'}</td>
                <td>${test14.tiempo_total || ''}</td>
              </tr>
            </table>
          </div>

          <!-- Test 15 -->
          <div class="tabla-container">
            <h3>Test 15 - ${translations.Pr15Titulo}</h3>
            <table class="prueba">
              <tr>
                <th>${translations.pdfImposibilidad}</th>
                <th>${translations.pdfRechazo}</th>
                <th>${translations.pdfPerspectiva}</th>
                <th>${translations.pdfElementos}</th>
              </tr>
              <tr>
                <td>${test15.imposibilidad ? translations.Si : translations.No}</td>
                <td>${test15.rechazo ? translations.Si : translations.No}</td>
                <td>${test15.perspectiva ? translations.Si : translations.No}</td>
                <td>${(test15.elementos && JSON.parse(test15.elementos).join(' - ')) || ''}</td>
              </tr>
            </table>
          </div>

          <!-- Test 16 -->
          <div class="tabla-container">
            <h3>Test 16 - ${translations.Pr16Titulo}</h3>
            <table class="prueba">
              <tr>
                <th>${translations.pdfImposibilidad}</th>
                <th>${translations.pdfRechazo}</th>
                <th>${translations.pdfPerspectiva}</th>
                <th>${translations.pdfElementos}</th>
              </tr>
              <tr>
                <td>${test16.imposibilidad ? translations.Si : translations.No}</td>
                <td>${test16.rechazo ? translations.Si : translations.No}</td>
                <td>${test16.perspectiva ? translations.Si : translations.No}</td>
                <td>${(test16.elementos && JSON.parse(test16.elementos).join(' - ')) || ''}</td>
              </tr>
            </table>
          </div>

          <!-- Test 17 -->
          <div class="tabla-container">
            <h3>Test 17 - ${translations.Pr17Titulo}</h3>
            <table class="prueba">
              <tr><th colspan="4">FASE 1</th></tr>
              <tr>
                <th>${translations.pdfNombresRecordados}</th>
                <th>${translations.pdfIntrusiones}</th>
                <th>${translations.pdfPerseveraciones}</th>
                <th>${translations.pdfRechazos}</th>
              </tr>
              <tr>
                <td>${(test17.nombres_recordados_fase1 && JSON.parse(test17.nombres_recordados_fase1).join(', ')) || ''}</td>
                <td>${test17.intrusiones_fase1 || '0'}</td>
                <td>${test17.perseveraciones_fase1 || '0'}</td>
                <td>${test17.rechazos_fase1 || '0'}</td>
              </tr>
              <tr><th colspan="4">FASE 2</th></tr>
              <tr>
                <th>${translations.pdfNombresRecordados}</th>
                <th>${translations.pdfIntrusiones}</th>
                <th>${translations.pdfPerseveraciones}</th>
                <th>${translations.pdfRechazos}</th>
              </tr>
              <tr>
                <td>${(test17.nombres_recordados_fase2 && JSON.parse(test17.nombres_recordados_fase2).join(', ')) || ''}</td>
                <td>${test17.intrusiones_fase2 || '0'}</td>
                <td>${test17.perseveraciones_fase2 || '0'}</td>
                <td>${test17.rechazos_fase2 || '0'}</td>
              </tr>
              <tr><th colspan="3">FASE 3</th></tr>
              <tr>
                <th>${translations.pdfNombresIdentificados}</th>
                <th>${translations.pdfErroresIdentificacion}</th>
                <th>${translations.pdfRechazos}</th>
              </tr>
              <tr>
                <td>${(test17.nombres_identificados_fase3 && JSON.parse(test17.nombres_identificados_fase3).join(', ')) || ''}</td>
                <td>${(test17.errores_identificados_fase3 && JSON.parse(test17.errores_identificados_fase3).join(', ')) || ''}</td>
                <td>${test17.rechazos_reconocimiento_fase3 || '0'}</td>
              </tr>
            </table>
          </div>

          <!-- Test 18 -->
          <div class="tabla-container">
            <h3>Test 18 - ${translations.Pr18Titulo}</h3>
            <table class="prueba">
              <tr>
                <th>${translations.pdfCarasReconocidasCorrectamente}</th>
                <th>${translations.pdfCarasIncorrectamenteReconocidas}</th>
                <th>${translations.pdfNombresReconocidos}</th>
              </tr>
              <tr>
                <td>${test18.caras_reconocidas || '0'}</td>
                <td>${test18.caras_reconocidas_incorrectamente || '0'}</td>
                <td>${test18.nombres_reconocidos || '0'}</td>
              </tr>
            </table>
          </div>

          <!-- Test 19 -->
          <div class="tabla-container">
            <h3>Test 19 - ${translations.Pr19Titulo}</h3>
            <table class="prueba">
              <tr>
                <th></th>
                <th>15 ms</th>
                <th>30 ms</th>
                <th>45 ms</th>
                <th>60 ms</th>
              </tr>
              <tr><td><b>${translations.pdfRespuestasCorrectas}</b></td>
              ${(test19.respuestas_correctas_tiempo && JSON.parse(test19.respuestas_correctas_tiempo).map((res, index) => `<td>${res}</td>`).join('')) || ''}</tr>
              <tr><td><b>${translations.pdfIntrusiones}</b></td>
              ${(test19.intrusiones_tiempo && JSON.parse(test19.intrusiones_tiempo).map((res, index) => `<td>${res}</td>`).join('')) || ''}</tr>
              <tr><td><b>${translations.pdfPerseveraciones}</b></td>
              ${(test19.perseveraciones_tiempo && JSON.parse(test19.perseveraciones_tiempo).map((res, index) => `<td>${res}</td>`).join('')) || ''}</tr>
            </table>
          </div>

          <!-- Test 20 -->
          <div class="tabla-container">
            <h3>Test 20 - ${translations.Pr20Titulo}</h3>
            <table class="prueba">
              <tr>
                <th></th>
                <th>15 ms</th>
                <th>30 ms</th>
                <th>45 ms</th>
                <th>60 ms</th>
              </tr>
              <tr><td><b>${translations.pdfRespuestasCorrectas}</b></td>
              ${(test20.respuestas_correctas_tiempo && JSON.parse(test20.respuestas_correctas_tiempo).map((res, index) => `<td>${res}</td>`).join('')) || ''}</tr>
              <tr><td><b>${translations.pdfIntrusiones}</b></td>
              ${(test20.intrusiones_tiempo && JSON.parse(test20.intrusiones_tiempo).map((res, index) => `<td>${res}</td>`).join('')) || ''}</tr>
              <tr><td><b>${translations.pdfPerseveraciones}</b></td>
              ${(test20.perseveraciones_tiempo && JSON.parse(test20.perseveraciones_tiempo).map((res, index) => `<td>${res}</td>`).join('')) || ''}</tr>
            </table>
          </div>

          <!-- Test 21 -->
          <div class="tabla-container">
            <h3>Test 21 - ${translations.Pr21Titulo}</h3>
            <table class="prueba">
              <tr>
                <th>${translations.pdfIntrusiones}</th>
                <th>${translations.pdfRechazos}</th>
              </tr>
              <tr>
                <td>${test21.intrusiones || ''}</td>
                <td>${test21.rechazos || ''}</td>
              </tr>
              <tr>
                <th colspan="2">${translations.pdfIndicesSeleccionados}</th>
              </tr>
              <tr>
                <td colspan="2">${(test21.indices_seleccionados && JSON.parse(test21.indices_seleccionados).join(', ')) || ''}</td>
              </tr>
            </table>
          </div>

          <!-- Test 22 -->
          <div class="tabla-container">
            <h3>Test 22 - ${translations.Pr22Titulo}</h3>
            <table class="prueba">
              <tr>
                <th>${translations.pdfIntrusiones}</th>
                <th>${translations.pdfRechazos}</th>
              </tr>
              <tr>
                <td>${test22.intrusiones || ''}</td>
                <td>${test22.rechazos || ''}</td>
              </tr>
              <tr>
                <th colspan="2">${translations.pdfIndicesSeleccionados}</th>
              </tr>
              <tr>
                <td colspan="2">${(test22.indices_seleccionados && JSON.parse(test22.indices_seleccionados).join(', ')) || ''}</td>
              </tr>
            </table>
          </div>

          <!-- Test 23 -->
          <div class="tabla-container">
            <h3>Test 23 - ${translations.Pr23Titulo}</h3>
            <table class="prueba">
              <tr>
                <th>${translations.pdfRespuestasCorrectas}</th>
                <th>${translations.pdfErrores}</th>
                <th>${translations.pdfExcesosTiempo}</th>
              </tr>
              <tr>
                <td>${test23.correctas || '0'}</td>
                <td>${test23.errores || '0'}</td>
                <td>${test23.excesos_tiempo || '0'}</td>
              </tr>
              <tr>
                <th>${translations.pdfNumeroEnsayo}</th>
                <th>${translations.pdfRespuestaEscogida}</th>
                <th>${translations.pdfTiempoEmpleado}</th>
              </tr>
              ${(test23.respuestas && JSON.parse(test23.respuestas).map((respuesta, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${respuesta}</td>
                  <td>${JSON.parse(test23.tiempos)[index] || ''}</td>
                </tr>
              `).join('')) || ''}
            </table>
          </div>

          <!-- Test 24 -->
          <div class="tabla-container">
            <h3>Test 24 - ${translations.Pr24Titulo}</h3>
            <table class="prueba">
              <tr>
                <th>${translations.pdfNumeroEnsayo}</th>
                <th>${translations.pdfExitoFracaso}</th>
                <th>${translations.pdfNumeroReconstrucciones}</th>
                <th>${translations.pdfMediaConocidos}</th>
                <th>${translations.pdfMediaDesconocidos}</th>
                <th>${translations.pdfDiferenciaMedias}</th>
              </tr>
              ${(test24.validez_ensayo && test24.etapas_ensayo && JSON.parse(test24.validez_ensayo).map((valido, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${valido ? translations.pdfExito : translations.pdfFracaso}</td>
                  <td>${JSON.parse(test24.etapas_ensayo)[index]}</td>
                  ${index === 0 ? `
                  <td rowspan="${JSON.parse(test24.validez_ensayo).length}">${test24.media_conocidos || ''}</td>
                  <td rowspan="${JSON.parse(test24.validez_ensayo).length}">${test24.media_desconocidos || ''}</td>
                  <td rowspan="${JSON.parse(test24.validez_ensayo).length}">${test24.diferencia || ''}</td>
                  ` : ''}
                </tr>
              `).join('')) || ''}
            </table>
          </div>
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
      <Text style={styles.pdfButtonText}>{translations.GenerarPdf}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pdfButton: {
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  pdfButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default BotonToPDF;