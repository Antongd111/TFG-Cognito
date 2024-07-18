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
      FOREIGN KEY (id_paciente) REFERENCES Paciente (id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS Test_1 (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_sesion INTEGER NOT NULL,
      numero_ensayos INTEGER NOT NULL,
      tiempos_reaccion TEXT NOT NULL,
      errores_anticipacion INTEGER NOT NULL,
      errores_retrasos INTEGER NOT NULL,
      errores_tiempo INTEGER NOT NULL,
      FOREIGN KEY (id_sesion) REFERENCES SesionTest (id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS Test_3 (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_sesion INTEGER NOT NULL,
      numero_aciertos INTEGER NOT NULL,
      lectura_correcta INTEGER NOT NULL,
      errores_tiempo INTEGER NOT NULL,
      FOREIGN KEY (id_sesion) REFERENCES SesionTest (id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS Test_4 (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_sesion INTEGER NOT NULL,
      numero_aciertos INTEGER NOT NULL,
      numero_sobreestimaciones INTEGER NOT NULL,
      numero_subestimaciones INTEGER NOT NULL,
      FOREIGN KEY (id_sesion) REFERENCES SesionTest (id) ON DELETE CASCADE
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

export const crearSesionTest = async (id_paciente, fecha_sesion) => {
  const db = await dbPromise;
  try {
    const statement = await db.prepareAsync(
      'INSERT INTO SesionTest (id_paciente, fecha_sesion) VALUES ($id_paciente, $fecha_sesion)'
    );
    const result = await statement.executeAsync({ $id_paciente: id_paciente, $fecha_sesion: fecha_sesion });
    await statement.finalizeAsync();
    console.log("Sesión de test creada con ID:", result.lastInsertRowId);
    return result.lastInsertRowId;  // Devuelve el ID de la sesión para usar en tests subsiguientes.
  } catch (error) {
    console.error("Error al crear sesión de test:", error);
    throw error;
  }
};

export const guardarResultadosTest_1 = async (id_sesion, numero_ensayos, reaccion, errores_anticipacion, errores_tiempo, errores_retrasos) => {
  const db = await dbPromise;
  console.log("Guardando resultados del Test 1:", id_sesion, numero_ensayos, reaccion, errores_anticipacion, errores_tiempo, errores_retrasos);
  try {
    const statement = await db.prepareAsync(
      'INSERT INTO Test_1 (id_sesion, numero_ensayos, tiempos_reaccion, errores_anticipacion, errores_retrasos, errores_tiempo) VALUES ($id_sesion, $numero_ensayos, $tiempos_reaccion, $errores_anticipacion, $errores_retrasos, $errores_tiempo)'
    );

    const tiempos_reaccion = JSON.stringify(reaccion);
    console.log("Tiempos de reacción:", tiempos_reaccion);

    const result = await statement.executeAsync({ 
      $id_sesion: id_sesion, 
      $numero_ensayos: numero_ensayos, 
      $tiempos_reaccion: tiempos_reaccion, 
      $errores_anticipacion: errores_anticipacion, 
      $errores_retrasos: errores_retrasos, 
      $errores_tiempo: errores_tiempo });
    await statement.finalizeAsync();
    console.log("Resultados del Test 1 guardados:", result.lastInsertRowId);
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error al guardar resultados del Test 1:", error);
    throw error;
  }
};

export const guardarResultadosTest_3 = async (id_sesion, numeroAciertos, lecturaCorrecta, erroresTiempo) => {
  const db = await dbPromise;
  console.log("Guardando resultados del Test 3:", id_sesion, numeroAciertos, lecturaCorrecta, erroresTiempo);
  try {
    const statement = await db.prepareAsync(
      'INSERT INTO Test_3 (id_sesion, numero_aciertos, lectura_correcta, errores_tiempo) VALUES ($id_sesion, $numero_aciertos, $lectura_correcta, $errores_tiempo)'
    );
    const result = await statement.executeAsync({ $id_sesion: id_sesion, $numero_aciertos: numeroAciertos, $lectura_correcta: lecturaCorrecta, $errores_tiempo: erroresTiempo });
    await statement.finalizeAsync();
    console.log("Resultados del Test 3 guardados:", result.lastInsertRowId);
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error al guardar resultados del Test 3:", error);
    throw error;
  }
};

export const guardarResultadosTest_4 = async (id_sesion, numeroAciertos, numeroSobreestimaciones, numeroSubestimaciones) => {
  const db = await dbPromise;
  console.log("Guardando resultados del Test 4:", id_sesion, numeroAciertos, numeroSobreestimaciones, numeroSubestimaciones);
  try {
    const statement = await db.prepareAsync(
      'INSERT INTO Test_4 (id_sesion, numero_aciertos, numero_sobreestimaciones, numero_subestimaciones) VALUES ($id_sesion, $numero_aciertos, $numero_sobreestimaciones, $numero_subestimaciones)'
    );
    const result = await statement.executeAsync({ $id_sesion: id_sesion, $numero_aciertos: numeroAciertos, $numero_sobreestimaciones: numeroSobreestimaciones, $numero_subestimaciones: numeroSubestimaciones });
    await statement.finalizeAsync();
    console.log("Resultados del Test 4 guardados:", result.lastInsertRowId);
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error al guardar resultados del Test 4:", error);
    throw error;
  }
};

export default initDB;