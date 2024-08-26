import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const BotonToPDF = ({ datosTests }) => {
  const createAndDownloadPDF = async () => {
    try {
      const { uri } = await Print.printToFileAsync({
        html: `
<html>

<head>
  <style>
    h1 {
      font-family: verdana;
      font-size: 30px;
    }

    h2 {
      font-family: verdana;
      font-size: 20px;
    }

    body {
      font-family: verdana;
      font-size: 20px;
      margin: 15px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }

    th,
    td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }

    th {
      background-color: #4e5bf0;
      font-weight: bold;
    }

    .prueba th {
      text-align: center;
    }

    .prueba td {
      text-align: center;
    }
  </style>
</head>

<body>
  <h1>Batería de tests Cognito</h1>
  <h2>Resultados de la sesión - 25/08/2024</h2>
  <table>
    <tr>
      <th colspan="2">Datos del paciente</th>
    </tr>
    <tr>
      <td><b>Identificación:</b></td>
      <td>11665836</td>
    </tr>
    <tr>
      <td><b>Nombre:</b></td>
      <td>Antonio Gálvez Delgado</td>
    </tr>
    <tr>
      <td><b>Fecha de nacimiento:</b></td>
      <td>12/12/1990</td>
    </tr>

    <tr>
      <td><b>Género:</b></td>
      <td>Hombre</td>
    </tr>
    <tr>
      <td><b>Observaciones:</b></td>
      <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum aliquid minus veniam fugit voluptate
        reiciendis perferendis atque omnis? Explicabo cum dolor minima fugit hic. Ratione qui possimus sit temporibus
        odio?</td>
    </tr>
  </table>

  <h3>Test 1 - Tiempo de reacción</h3>
  <table class="prueba">
    <tr>
      <th>Nº de ensayos</th>
      <th>Tiempo medio (ms)</th>
      <th>Errores de anticipación</th>
      <th>Retrasos</th>
      <th>Errores de tiempo</th>
    </tr>
    <tr>
      <td>10</td>
      <td>250</td>
      <td>2</td>
      <td>1</td>
      <td>0</td>
    </tr>
    <tr>
      <th colspan="5">Tiempos de reacción (ms)</th>
    </tr>
    <tr>
      <td colspan="5">250 - 180 - 123 - 123 - 4545 - 123</td>
    </tr>
  </table>

  <h3>Test 3 - Lectura y compresión de frases</h3>

  <table class="prueba">
    <tr>
      <th>
        Lecturas correctas
      </th>
      <th>
        Lecturas incorrectas
      </th>
      <th>
        Aciertos
      </th>
      <th>
        Fallos
      </th>
      <th>
        Errores de tiempo
      </th>

    <tr>
      <td>10</td>
      <td>2</td>
      <td>8</td>
      <td>2</td>
      <td>0</td>
    </tr>

    </tr>

  </table>

  <h3>Test 4 - titulo</h3>
  <table class="prueba">
    <tr>
      <th>
        Respuestas correctas
      </th>
      <th>
        Respuestas incorrectas
      </th>
      <th>
        Sobreestimaciones
      </th>
      <th>
        Subestimaciones
      </th>
    <tr>
      <td>10</td>
      <td>2</td>
      <td>8</td>
      <td>2</td>
    </tr>

    </tr>
  </table>

  <h3>Test 5 - titulo</h3>
  <table class="prueba">
    <tr>
      <th>
        Ensayos correctos
      </th>
      <th>
        Errores
      </th>
      <th>
        Errores de tiempo
      </th>
    <tr>
      <td>10</td>
      <td>2</td>
      <td>8</td>
    </tr>
    <tr>
      <th colspan="3">Tiempos por ensayo</th>
    </tr>
    <tr>
      <td colspan="3">250 - 180 - 123 - 123 - 4545 - 123</td>
    </tr>
    </tr>

  </table>

  <h3>Test 6 - titulo</h3>
  <table class="prueba">
    <tr>
      <th>
        Ensayos correctos
      </th>
      <th>
        Errores
      </th>
      <th>
        Errores de tiempo
      </th>
      <th>
        Sonidos correctos
      </th>
    <tr>
      <td>10</td>
      <td>2</td>
      <td>8</td>
      <td>8</td>
    </tr>
    <tr>
      <th colspan="4">Tiempos por ensayo</th>
    </tr>
    <tr>
      <td colspan="4">250 - 180 - 123 - 123 - 4545 - 123</td>
    </tr>
    </tr>
  </table>

  <h3>Test 7 - titulo</h3>
  <table class="prueba">
    <tr>
      <th>
        Respuestas correctas
      </th>
      <th>
        Errores
      </th>
      <th>
        Tiempo medio de acierto (ms)
      </th>
    <tr>
      <td>10</td>
      <td>2</td>
      <td>800</td>
    </tr>
    </tr>
  </table>

  <h3>Test 8 - titulo</h3>
  <table class="prueba">
    <tr>
      <th>
        Pronunciaciones correctas
      </th>
      <th>
        Pronunciaciones incorrectas
      </th>
      <th>
        Nombres recordados
      </th>
      <th>
        Intrusiones
      </th>
      <th>
        Perseveraciones
      </th>
      <th>
        Rechazos
      </th>
    <tr>
      <td>10</td>
      <td>2</td>
      <td>8</td>
      <td>8</td>
      <td>8</td>
      <td>8</td>
    </tr>
    </tr>
  </table>

  <h3>Test 10 - titulo</h3>
  <table class="prueba">
    <tr>
      <th>
        Número de ensayo
      </th>
      <th>
        Validez
      </th>
      <th>
        Tiempo empleado (ms)
      </th>
    </tr>
    <tr>
      <td>1</td>
      <td>Correcto</td>
      <td>800</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Incorrecto</td>
      <td>800</td>
    </tr>
    <tr>
      <td>3</td>
      <td>Correcto</td>
      <td>800</td>
    </tr>
    <tr>
      <td>4</td>
      <td>Incorrecto</td>
      <td>800</td>
    </tr>
  </table>

  <h3>Test 11 - titulo</h3>
  <table class="prueba">
    <tr>
      <th>
        Ensayos correctos
      </th>
      <th>
        Número de inversiones
      </th>
      <th>
        Errores de tiempo
      </th>
    </tr>
    <tr>
      <td>10</td>
      <td>2</td>
      <td>8</td>
    </tr>
    <tr>
      <th>
        Número de ensayo
      </th>
      <th>
        Figura seleccionada
      </th>
      <th>
        Tiempo empleado (ms)
      </th>
    </tr>
    <tr>
      <td>1</td>
      <td>2</td>
      <td>800</td>
    </tr>
    <tr>
      <td>2</td>
      <td>3</td>
      <td>800</td>
    </tr>
    <tr>
      <td>3</td>
      <td>4</td>
      <td>800</td>
    </tr>
  </table>

  <h3>Test 12 - titulo</h3>
  <table class="prueba">
    <tr>
      <th>
        Ensayos correctos
      </th>
      <th>
        Errores
      </th>
      <th>
        Errores morfológicos
      </th>
      <th>
        Errores semánticos
      </th>
      <th>
        Errores fonéticos
      </th>
      <th>
        Errores de tiempo
      </th>
    </tr>
    <tr>
      <td>10</td>
      <td>2</td>
      <td>8</td>
    </tr>
    <tr>
      <th>
        Número de ensayo
      </th>
      <th>
        Tiempo empleado (ms)
      </th>
    </tr>
    <tr>
      <td>1</td>
      <td>800</td>
    </tr>
    <tr>
      <td>2</td>
      <td>800</td>
    </tr>
    <tr>
      <td>3</td>
      <td>800</td>
    </tr>
  </table>

  <h3>Test 13 - titulo</h3>
  <table class="prueba">
    <tr>
      <th>
        Respuestas correctas (RC)
      </th>
      <th>
        Generalizaciones (G)
      </th>
      <th>
        Respuestas parciales (P)
      </th>
      <th>
        Excesos de tiempo reconocimiento
      </th>
      <th>
        Excesos de tiempo asociación
      </th>
    </tr>
  </table>

  <h3>Test 14 - titulo</h3>
  <table class="prueba">
    <tr>
      <th>
        Ensayos correctos
      </th>
      <th>
        Ensayos incorrectos
      </th>
      <th>
        Tiempo total empleado (ms)
      </th>
    </tr>
    <tr>
      <td>10</td>
      <td>2</td>
      <td>8000</td>
    </tr>
    <tr>
      <th>
        Número de ensayo
      </th>
      <th>
        Opción elegida
      </th>
      <th>
        Correcta / Incorrecta
      </th>
      <th>
        Tiempo empleado (ms)
      </th>
    </tr>
    <tr>
      <td>1</td>
      <td>2</td>
      <td>Correcta</td>
      <td>800</td>
    </tr>
    <tr>
      <td>2</td>
      <td>3</td>
      <td>Incorrecta</td>
      <td>800</td>
    </tr>
  </table>

  <h3>Test 15 - titulo</h3>
  <table class="prueba">
    <tr>
      <th>
        Imposibilidad para realizar la tarea
      </th>
      <th>
        Rechazo
      </th>
      <th>
        Perspectiva
      </th>
    </tr>
    <tr>
      <td>10</td>
      <td>2</td>
      <td>8000</td>
    </tr>
    <tr>
      <th>
        Número de elemento
      </th>
      <th>
        Puntuación
      </th>
    </tr>
    <tr>
      <td>1</td>
      <td>2</td>
    </tr>
    <tr>
      <td>2</td>
      <td>3</td>
    </tr>
  </table>

  <h3>Test 16 - titulo</h3>
  <table class="prueba">
    <tr>
      <th>
        Imposibilidad para realizar la tarea
      </th>
      <th>
        Rechazo
      </th>
      <th>
        Perspectiva
      </th>
    </tr>
    <tr>
      <td>10</td>
      <td>2</td>
      <td>8000</td>
    </tr>
    <tr>
      <th>
        Número de elemento
      </th>
      <th>
        Puntuación
      </th>
    </tr>
    <tr>
      <td>1</td>
      <td>2</td>
    </tr>
    <tr>
      <td>2</td>
      <td>3</td>
    </tr>
  </table>

  <h3>Test 17 - titulo</h3>
  <table class="prueba">
    <tr>
      <th colspan="4">
        FASE 1
      </th>
    </tr>
    <th>
      Nombres recordados
    </th>
    <th>
      Intrusiones
    </th>
    <th>
      Perseveraciones
    </th>
    <th>
      Rechazos
    </th>
    </tr>
    <tr>
      <td>5</td>
      <td>2</td>
      <td>2</td>
      <td>1</td>
    </tr>
    <tr>
      <th colspan="4">
        FASE 2
      </th>
    </tr>
    <th>
      Nombres recordados
    </th>
    <th>
      Intrusiones
    </th>
    <th>
      Perseveraciones
    </th>
    <th>
      Rechazos
    </th>
    </tr>
    <tr>
      <td>5</td>
      <td>2</td>
      <td>2</td>
      <td>1</td>
    </tr>
    <tr>
    <tr>
      <th colspan="3">
        FASE 3
      </th>
    </tr>
    <th>
      Nombres identificados
    </th>
    <th>
      Nombres incorrectamente identificados
    </th>
    <th>
      Rechazos
    </th>
    </tr>
    <tr>
      <td>5</td>
      <td>2</td>
      <td>1</td>
    </tr>
  </table>

  <h3>Test 18 - titulo</h3>

  <table class="prueba">
    <tr>
      <th>
        Caras reconocidas
      </th>
      <th>
        Caras incorrectamente reconocidas
      </th>
      <th>
        Nombres recordados
      </th>
    </tr>
    <tr>
      <td>10</td>
      <td>2</td>
      <td>8</td>
    </tr>
  </table>

  <h3>Test 19 - titulo</h3>

  <table class="prueba">
    <tr>
      <th></th>
      <th>15 s</th>
      <th>30 s</th>
      <th>45 s</th>
      <th>60 s</th>
    </tr>
    <tr>
      <th>
        Correctas
      </th>
    </tr>
    <tr>
      <th>
        Intrusiones
      </th>
    </tr>
    <tr>
      <th>
        Perseveraciones
      </th>
    </tr>
  </table>

  <h3>Test 20 - titulo</h3>
  <table class="prueba">
    <tr>
      <th></th>
      <th>15 s</th>
      <th>30 s</th>
      <th>45 s</th>
      <th>60 s</th>
    </tr>
    <tr>
      <th>
        Correctas
      </th>
    </tr>
    <tr>
      <th>
        Intrusiones
      </th>
    </tr>
    <tr>
      <th>
        Perseveraciones
      </th>
    </tr>
  </table>  

  <h3>Test 21 - titulo</h3>
  <table class="prueba">
    <tr>
      <th>
        Recordados
      </th>
      <th>
        Intrusiones
      </th>
      <th>
        Rechazos
      </th>
    </tr>
    <tr>
      <td>10</td>
      <td>2</td>
      <td>8</td>
    </tr>
    <tr>
      <th colspan="3">Secuencia recordada</th>
    </tr>
    <tr>
      <td colspan="3"> 3, 5, 17, 19</td>
    </tr>

  </table>

  <h3>Test 22 - titulo</h3>
  <table class="prueba">
    <tr>
      <th>
        Recordados
      </th>
      <th>
        Intrusiones
      </th>
      <th>
        Rechazos
      </th>
    </tr>
    <tr>
      <td>10</td>
      <td>2</td>
      <td>8</td>
    </tr>
    <tr>
      <th colspan="3">Secuencia recordada</th>
    </tr>
    <tr>
      <td colspan="3"> 3, 5, 17, 19</td>
    </tr>

  </table>

  <h3>Test 23 - titulo</h3>
  <table class="prueba">
    <tr>
      <th>
        Respuestas correctas
      </th>
      <th>
        Respuestas incorrectas
      </th>
      <th>
        Excesos de tiempo
      </th>
    </tr>
    <tr>
      <td>10</td>
      <td>2</td>
      <td>8</td>
    </tr>
    <tr>
      <th>
        Número de ensayo
      </th>
      <th>
        Respuesta escogida
      </th>
      <th>
        Tiempo empleado (ms)
      </th>
    </tr>
    <tr>
      <td>1</td>
      <td>2</td>
      <td>100</td>
    </tr>
    <tr>
      <td>2</td>
      <td>3</td>
      <td>100</td>
    </tr>
</body>

</html>
        `,
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