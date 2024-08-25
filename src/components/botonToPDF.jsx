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
      th, td {
        padding: 12px;
        text-align: left;
        border-bottom: 1px solid #ddd;
      }
      th {
        background-color: #f2f2f2;
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <h1>Resultados de la sesión</h1>
    <table>
      <tr>
        <th>Campo</th>
        <th>Valor</th>
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
        <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum aliquid minus veniam fugit voluptate reiciendis perferendis atque omnis? Explicabo cum dolor minima fugit hic. Ratione qui possimus sit temporibus odio?</td>
      </tr>
    </table>
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