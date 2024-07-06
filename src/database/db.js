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

    CREATE TABLE IF NOT EXISTS SesionTest (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_paciente INTEGER NOT NULL,
      fecha_sesion DATE NOT NULL,
      FOREIGN KEY (id_paciente) REFERENCES Pacientes (id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS Test_1 (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_sesion INTEGER NOT NULL,
      numero_ensayos INTEGER NOT NULL,
      tiempo_medio_reaccion REAL NOT NULL,
      errores_anticipacion INTEGER NOT NULL,
      errores_retrasos INTEGER NOT NULL,
      errores_tiempo INTEGER NOT NULL,
      FOREIGN KEY (id_sesion) REFERENCES Sesiones (id) ON DELETE CASCADE
    );
  `);



  console.log("Tabla Paciente creada o ya existente");
};

export const agregarPaciente = async (identificacion, nombre, apellidos, fecha_nacimiento, sexo, observaciones, callback) => {
  console.log("Añadiendo paciente:", identificacion, nombre, apellidos, fecha_nacimiento, sexo, observaciones);
  const db = await dbPromise;
  const statement = await db.prepareAsync(
    'INSERT INTO Paciente (identificacion, nombre, apellidos, fecha_nacimiento, sexo, observaciones) VALUES ($identificacion, $nombre, $apellidos, $fecha_nacimiento, $sexo, $observaciones)'
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
    return result.changes;
  } catch (error) {
    console.error("Error al actualizar paciente:", error);
    throw error;
  }
};

export const guardarResultadosTest_1 = async (id_paciente, reaccion, errores_anticipacion, errores_tiempo, errores_retrasos) => {
  const db = await dbPromise;
  console.log("Guardando resultados del Test 1:", id_paciente, reaccion, errores_anticipacion, errores_tiempo, errores_retrasos);
  try {
    const statement = await db.prepareAsync(
      'INSERT INTO Test_1 (id_sesion, numero_ensayos, tiempo_medio_reaccion, errores_anticipacion, errores_retrasos, errores_tiempo) VALUES ($id_sesion, $numero_ensayos, $tiempo_medio_reaccion, $errores_anticipacion, $errores_retrasos, $errores_tiempo)'
    );
    const result = await statement.executeAsync({ $id_sesion: id_paciente, $numero_ensayos: reaccion.length, $tiempo_medio_reaccion: reaccion.reduce((a, b) => a + b, 0) / reaccion.length, $errores_anticipacion: errores_anticipacion, $errores_retrasos: errores_retrasos, $errores_tiempo: errores_tiempo });
    await statement.finalizeAsync();
    console.log("Resultados del Test 1 guardados:", result.lastInsertRowId);
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error al guardar resultados del Test 1:", error);
    throw error;
  }
};

export default initDB;