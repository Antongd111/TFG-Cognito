import * as SQLite from 'expo-sqlite';

// Abre la base de datos de forma asincrónica
const dbPromise = SQLite.openDatabaseAsync("CognitoDB.db");

const initDB = async () => {
  const db = await dbPromise;
  await db.execAsync(`
    PRAGMA foreign_keys = ON;
    CREATE TABLE IF NOT EXISTS Paciente (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      identificacion VARCHAR(255) NOT NULL,
      nombre VARCHAR(255) NOT NULL,
      apellidos VARCHAR(255) NOT NULL,
      fecha_nacimiento DATE NOT NULL,
      sexo VARCHAR(1) CHECK(sexo IN ('M', 'F')) NOT NULL,
      observaciones TEXT
    );
  `);

  console.log("Tabla Paciente creada o ya existente");
};

export const agregarPaciente = async (identificacion, nombre, apellidos, fecha_nacimiento, sexo, observaciones, callback) => {
  console.log("Añadiendo paciente:", identificacion, nombre, apellidos, fecha_nacimiento, sexo, observaciones);
  const db = await dbPromise;
  const statement = await db.prepareAsync(
    'INSERT INTO Paciente (identificacion, nombre, apellidos, fecha_nacimiento, sexo, observaciones) VALUES ($identificacion $nombre, $apellidos, $fecha_nacimiento, $sexo, $observaciones)'
  );
  try {
    const result = await statement.executeAsync({$identificacion: identificacion, $nombre: nombre, $apellidos: apellidos, $fecha_nacimiento: fecha_nacimiento, $sexo: sexo, $observaciones: observaciones });
    console.log("Paciente añadido con ID:", result.lastInsertRowId);
    if (callback) callback(true, result.lastInsertRowId);
  } catch (error) {
    console.error("Error al añadir paciente:", error);
    if (callback) callback(false);
  } finally {
    await statement.finalizeAsync();
  }
};

export const obtenerPacientes = async () => {
  const db = await dbPromise;
  try {
    const allRows = await db.getAllAsync('SELECT * FROM Paciente');
    console.log("Pacientes obtenidos:", allRows);
    return allRows;  // Devuelve los resultados directamente.
  } catch (error) {
    console.error("Error al obtener pacientes:", error);
    throw error;  // Propaga el error para ser manejado por el llamador.
  }
};

export const obtenerPaciente = async (id) => {
  const db = await dbPromise;
  try {
    const row = await db.getFirstAsync('SELECT * FROM Paciente WHERE id = ?', [id]);
    console.log("Paciente obtenido:", row);
    return row;  // Devuelve el resultado directamente.
  } catch (error) {
    console.error("Error al obtener paciente:", error);
    throw error;  // Propaga el error para ser manejado por el llamador.
  }
};

export const actualizarPaciente = async (id, identificacion, nombre, apellidos, fecha_nacimiento, sexo, observaciones) => {
  const db = await dbPromise;
  console.log("Actualizando paciente:", id, identificacion, nombre, apellidos, fecha_nacimiento, sexo, observaciones);
  try {
    const statement = await db.prepareAsync(
      'UPDATE Paciente SET identificacion = $identificacion, nombre = $nombre, apellidos = $apellidos, fecha_nacimiento = $fecha_nacimiento, sexo = $sexo, observaciones = $observaciones WHERE id = $id'
    );
    const result = await statement.executeAsync({ $id: id, $identificacion: identificacion, $nombre: nombre, $apellidos: apellidos, $fecha_nacimiento: fecha_nacimiento, $sexo: sexo, $observaciones: observaciones });
    await statement.finalizeAsync();
    console.log("Paciente actualizado:", result.changes);
    return result.changes; // Devuelve el número de filas afectadas
  } catch (error) {
    console.error("Error al actualizar paciente:", error);
    throw error; // Propaga el error para ser manejado por el llamador
  }
};

export default initDB;