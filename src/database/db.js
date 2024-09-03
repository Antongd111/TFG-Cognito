import { ar } from 'date-fns/locale';
import * as SQLite from 'expo-sqlite';

const dbPromise = SQLite.openDatabaseAsync("CognitoDB.db");

const initDB = async () => {
  const db = await dbPromise;

  // DROP TABLE IF EXISTS Paciente;
  // DROP TABLE IF EXISTS SesionTest;
  // DROP TABLE IF EXISTS Test_1;
  // DROP TABLE IF EXISTS Test_3;
  // DROP TABLE IF EXISTS Test_4;
  // DROP TABLE IF EXISTS Test_5;
  // DROP TABLE IF EXISTS Test_6;
  // DROP TABLE IF EXISTS Test_7;
  // DROP TABLE IF EXISTS Test_8;
  // DROP TABLE IF EXISTS Test_10;
  // DROP TABLE IF EXISTS Test_11;
  // DROP TABLE IF EXISTS Test_12;
  // DROP TABLE IF EXISTS Test_13;
  // DROP TABLE IF EXISTS Test_14;
  // DROP TABLE IF EXISTS Test_15;
  // DROP TABLE IF EXISTS Test_16;
  // DROP TABLE IF EXISTS Test_17;
  // DROP TABLE IF EXISTS Test_18;
  // DROP TABLE IF EXISTS Test_19;
  // DROP TABLE IF EXISTS Test_20;
  // DROP TABLE IF EXISTS Test_21;
  // DROP TABLE IF EXISTS Test_22;
  // DROP TABLE IF EXISTS Test_23;
  // DROP TABLE IF EXISTS Test_24;

  await db.execAsync(`

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
      id_sesion INTEGER NOT NULL UNIQUE,
      numero_ensayos INTEGER NOT NULL,
      tiempos_reaccion TEXT NOT NULL,
      errores_anticipacion INTEGER NOT NULL,
      errores_retrasos INTEGER NOT NULL,
      errores_tiempo INTEGER NOT NULL,
      FOREIGN KEY (id_sesion) REFERENCES SesionTest (id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS Test_3 (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_sesion INTEGER NOT NULL UNIQUE,
      numero_aciertos INTEGER NOT NULL,
      lectura_correcta INTEGER NOT NULL,
      errores_tiempo INTEGER NOT NULL,
      FOREIGN KEY (id_sesion) REFERENCES SesionTest (id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS Test_4 (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_sesion INTEGER NOT NULL UNIQUE,
      numero_aciertos INTEGER NOT NULL,
      numero_sobreestimaciones INTEGER NOT NULL,
      numero_subestimaciones INTEGER NOT NULL,
      FOREIGN KEY (id_sesion) REFERENCES SesionTest (id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS Test_5 (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_sesion INTEGER NOT NULL UNIQUE,
      ensayos_correctos INTEGER NOT NULL,
      numero_errores INTEGER NOT NULL,
      errores_tiempo INTEGER NOT NULL,
      FOREIGN KEY (id_sesion) REFERENCES SesionTest (id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS Test_6 (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_sesion INTEGER NOT NULL UNIQUE,
      ensayos_correctos INTEGER NOT NULL,
      numero_errores INTEGER NOT NULL,
      errores_tiempo INTEGER NOT NULL,
      sonidos_correctos INTEGER NOT NULL,
      sonidos_incorrectos INTEGER NOT NULL,
      FOREIGN KEY (id_sesion) REFERENCES SesionTest (id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS Test_7 (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_sesion INTEGER NOT NULL UNIQUE,
      numero_aciertos INTEGER NOT NULL,
      numero_errores INTEGER NOT NULL,
      tiempo_medio INTEGER NOT NULL,
      FOREIGN KEY (id_sesion) REFERENCES SesionTest (id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS Test_8 (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_sesion INTEGER NOT NULL UNIQUE,
      pronunciaciones_correctas INTEGER NOT NULL,
      pronunciaciones_incorrectas INTEGER NOT NULL,
      recordados INTEGER NOT NULL,
      intrusiones INTEGER NOT NULL,
      perseveraciones INTEGER NOT NULL,
      rechazos INTEGER NOT NULL,
      FOREIGN KEY (id_sesion) REFERENCES SesionTest (id) ON DELETE CASCADE
      );

    CREATE TABLE IF NOT EXISTS Test_10 (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_sesion INTEGER NOT NULL UNIQUE,
      secuencias_tocadas TEXT NOT NULL,
      correctas TEXT NOT NULL,
      tiempos_ensayos TEXT NOT NULL,
      FOREIGN KEY (id_sesion) REFERENCES SesionTest (id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS Test_11 (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_sesion INTEGER NOT NULL UNIQUE,
      correctas INTEGER NOT NULL,
      inversiones INTEGER NOT NULL,
      rectificaciones INTEGER NOT NULL,
      tiempos_respuestas TEXT NOT NULL,
      figuras_seleccionadas TEXT NOT NULL,
      FOREIGN KEY (id_sesion) REFERENCES SesionTest (id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS Test_12 (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_sesion INTEGER NOT NULL UNIQUE,
      correctas INTEGER NOT NULL,
      errores_morfologicos INTEGER NOT NULL,
      errores_foneticos INTEGER NOT NULL,
      errores_semanticos INTEGER NOT NULL,
      excedido_tiempo INTEGER NOT NULL,
      respuesta_incorrecta INTEGER NOT NULL,
      FOREIGN KEY (id_sesion) REFERENCES SesionTest (id) ON DELETE CASCADE
    );
    
    CREATE TABLE IF NOT EXISTS Test_13 (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_sesion INTEGER NOT NULL UNIQUE,
      correctas INTEGER NOT NULL,
      error_asociacion INTEGER NOT NULL,
      generalizaciones INTEGER NOT NULL,
      parciales INTEGER NOT NULL,
      otros_errores INTEGER NOT NULL,
      exceso_tiempo_obj INTEGER NOT NULL,
      exceso_tiempo_asoc INTEGER NOT NULL,
      respuesta_secuencia TEXT NOT NULL,
      FOREIGN KEY (id_sesion) REFERENCES SesionTest (id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS Test_14 (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_sesion INTEGER NOT NULL UNIQUE,
      correctas INTEGER NOT NULL,
      errores INTEGER NOT NULL,
      tiempo_total INTEGER NOT NULL,
      FOREIGN KEY (id_sesion) REFERENCES SesionTest (id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS Test_15 (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_sesion INTEGER NOT NULL UNIQUE,
        imposibilidad INTEGER NOT NULL,  
        rechazo INTEGER NOT NULL,        
        perspectiva INTEGER NOT NULL,    
        elementos TEXT NOT NULL,
        FOREIGN KEY (id_sesion) REFERENCES SesionTest (id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS Test_16 (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_sesion INTEGER NOT NULL UNIQUE,
        imposibilidad INTEGER NOT NULL,  
        rechazo INTEGER NOT NULL,        
        perspectiva INTEGER NOT NULL,    
        elementos TEXT NOT NULL,
        FOREIGN KEY (id_sesion) REFERENCES SesionTest (id) ON DELETE CASCADE
    ); 

    CREATE TABLE IF NOT EXISTS Test_17 (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_sesion INTEGER NOT NULL UNIQUE,
    nombres_recordados_fase1 TEXT NOT NULL,
    intrusiones_fase1 INTEGER NOT NULL,
    perseveraciones_fase1 INTEGER NOT NULL,
    rechazos_fase1 INTEGER NOT NULL,
    nombres_recordados_fase2 TEXT NOT NULL,
    intrusiones_fase2 INTEGER NOT NULL,
    perseveraciones_fase2 INTEGER NOT NULL,
    rechazos_fase2 INTEGER NOT NULL,
    nombres_identificados_fase3 TEXT NOT NULL,
    errores_identificados_fase3 TEXT NOT NULL,
    rechazos_reconocimiento_fase3 INTEGER NOT NULL,
    FOREIGN KEY (id_sesion) REFERENCES SesionTest (id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS Test_18 (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_sesion INTEGER NOT NULL UNIQUE,
      caras_reconocidas INTEGER NOT NULL,
      caras_reconocidas_incorrectamente INTEGER NOT NULL,
      nombres_reconocidos INTEGER NOT NULL,
      FOREIGN KEY (id_sesion) REFERENCES SesionTest (id) ON DELETE CASCADE
  );
  
  CREATE TABLE IF NOT EXISTS Test_19 (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_sesion INTEGER NOT NULL UNIQUE,
      respuestas_correctas_tiempo TEXT NOT NULL,
      intrusiones_tiempo TEXT NOT NULL,
      perseveraciones_tiempo TEXT NOT NULL,
      FOREIGN KEY (id_sesion) REFERENCES SesionTest (id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS Test_20 (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_sesion INTEGER NOT NULL UNIQUE,
      respuestas_correctas_tiempo TEXT NOT NULL,
      intrusiones_tiempo TEXT NOT NULL,
      perseveraciones_tiempo TEXT NOT NULL,
      FOREIGN KEY (id_sesion) REFERENCES SesionTest (id) ON DELETE CASCADE
  );  

  CREATE TABLE IF NOT EXISTS Test_21 (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_sesion INTEGER NOT NULL UNIQUE,
      intrusiones INTEGER NOT NULL,
      rechazos INTEGER NOT NULL,
      indices_seleccionados TEXT NOT NULL,
      FOREIGN KEY (id_sesion) REFERENCES SesionTest (id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS Test_22 (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_sesion INTEGER NOT NULL UNIQUE,
      intrusiones INTEGER NOT NULL,
      rechazos INTEGER NOT NULL,
      indices_seleccionados TEXT NOT NULL,
      FOREIGN KEY (id_sesion) REFERENCES SesionTest (id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS Test_23 (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_sesion INTEGER NOT NULL UNIQUE,
      correctas INTEGER NOT NULL,
      errores INTEGER NOT NULL,
      excesos_tiempo INTEGER NOT NULL,
      respuestas TEXT NOT NULL,
      tiempos TEXT NOT NULL,
      FOREIGN KEY (id_sesion) REFERENCES SesionTest (id) ON DELETE CASCADE
  );  
  
  CREATE TABLE IF NOT EXISTS Test_24 (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_sesion INTEGER NOT NULL UNIQUE,
      validez_ensayo TEXT NOT NULL,
      etapas_ensayo TEXT NOT NULL,
      media_conocidos REAL NOT NULL,
      media_desconocidos REAL NOT NULL,
      diferencia REAL NOT NULL,
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
    const result = await statement.executeAsync({ $identificacion: identificacion, $nombre: nombre, $apellidos: apellidos, $fecha_nacimiento: fecha_nacimiento, $sexo: sexo, $observaciones: observaciones });
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
    return allRows;  // Devuelve los resultados directamente.
  } catch (error) {
    console.error("Error al obtener pacientes:", error);
    throw error;  // Propaga el error para ser manejado por el llamador.
  }
};

export const obtenerSesionesPaciente = async (id_paciente) => {
  const db = await dbPromise;
  try {
    const allRows = await db.getAllAsync('SELECT * FROM SesionTest WHERE id_paciente = ?', [id_paciente]);
    console.log("Sesiones de paciente obtenidas:", allRows);
    return allRows;  // Devuelve los resultados directamente.
  } catch (error) {
    console.error("Error al obtener sesiones de paciente:", error);
    throw error;  // Propaga el error para ser manejado por el llamador.
  }
}

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
    return result.lastInsertRowId;
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
      'INSERT OR REPLACE INTO Test_1 (id_sesion, numero_ensayos, tiempos_reaccion, errores_anticipacion, errores_retrasos, errores_tiempo) VALUES ($id_sesion, $numero_ensayos, $tiempos_reaccion, $errores_anticipacion, $errores_retrasos, $errores_tiempo)'
    );

    const tiempos_reaccion = JSON.stringify(reaccion);

    const result = await statement.executeAsync({
      $id_sesion: id_sesion,
      $numero_ensayos: numero_ensayos,
      $tiempos_reaccion: tiempos_reaccion,
      $errores_anticipacion: errores_anticipacion,
      $errores_retrasos: errores_retrasos,
      $errores_tiempo: errores_tiempo
    });
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
      'INSERT OR REPLACE INTO Test_3 (id_sesion, numero_aciertos, lectura_correcta, errores_tiempo) VALUES ($id_sesion, $numero_aciertos, $lectura_correcta, $errores_tiempo)'
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
      'INSERT OR REPLACE INTO Test_4 (id_sesion, numero_aciertos, numero_sobreestimaciones, numero_subestimaciones) VALUES ($id_sesion, $numero_aciertos, $numero_sobreestimaciones, $numero_subestimaciones)'
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

export const guardarResultadosTest_5 = async (id_sesion, ensayosCorrectos, numeroErrores, erroresTiempo) => {
  const db = await dbPromise;
  console.log("Guardando resultados del Test 5:", id_sesion, ensayosCorrectos, numeroErrores, erroresTiempo);
  try {
    const statement = await db.prepareAsync(
      'INSERT OR REPLACE INTO Test_5 (id_sesion, ensayos_correctos, numero_errores, errores_tiempo) VALUES ($id_sesion, $ensayos_correctos, $numero_errores, $errores_tiempo)'
    );
    const result = await statement.executeAsync({ $id_sesion: id_sesion, $ensayos_correctos: ensayosCorrectos, $numero_errores: numeroErrores, $errores_tiempo: erroresTiempo });
    await statement.finalizeAsync();
    console.log("Resultados del Test 5 guardados:", result.lastInsertRowId);
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error al guardar resultados del Test 5:", error);
    throw error;
  }
};

export const guardarResultadosTest_6 = async (id_sesion, ensayosCorrectos, numeroErrores, erroresTiempo, sonidosCorrectos, sonidosIncorrectos) => {
  const db = await dbPromise;
  console.log("Guardando resultados del Test 6:", id_sesion, ensayosCorrectos, numeroErrores, erroresTiempo, sonidosCorrectos, sonidosIncorrectos);
  try {
    const statement = await db.prepareAsync(
      'INSERT OR REPLACE INTO Test_6 (id_sesion, ensayos_correctos, numero_errores, errores_tiempo, sonidos_correctos, sonidos_incorrectos) VALUES ($id_sesion, $ensayos_correctos, $numero_errores, $errores_tiempo, $sonidos_correctos, $sonidos_incorrectos)'
    );
    const result = await statement.executeAsync({ $id_sesion: id_sesion, $ensayos_correctos: ensayosCorrectos, $numero_errores: numeroErrores, $errores_tiempo: erroresTiempo, $sonidos_correctos: sonidosCorrectos, $sonidos_incorrectos: sonidosIncorrectos });
    await statement.finalizeAsync();
    console.log("Resultados del Test 6 guardados:", result.lastInsertRowId);
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error al guardar resultados del Test 6:", error);
    throw error;
  }
};

export const guardarResultadosTest_7 = async (id_sesion, numeroAciertos, numeroErrores, tiempoMedio) => {
  const db = await dbPromise;
  console.log("Guardando resultados del Test 7:", id_sesion, numeroAciertos, numeroErrores, tiempoMedio);
  try {
    const statement = await db.prepareAsync(
      'INSERT OR REPLACE INTO Test_7 (id_sesion, numero_aciertos, numero_errores, tiempo_medio) VALUES ($id_sesion, $numero_aciertos, $numero_errores, $tiempo_medio)'
    );
    const result = await statement.executeAsync({ $id_sesion: id_sesion, $numero_aciertos: numeroAciertos, $numero_errores: numeroErrores, $tiempo_medio: tiempoMedio });
    await statement.finalizeAsync();
    console.log("Resultados del Test 7 guardados:", result.lastInsertRowId);
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error al guardar resultados del Test 7:", error);
    throw error;
  }
};

export const guardarResultadosTest_8 = async (id_sesion, pronunciacionesCorrectas, pronunciacionesIncorrectas, recordados, intrusiones, perseveraciones, rechazos) => {
  const db = await dbPromise;
  console.log("Guardando resultados del Test 8:", id_sesion, pronunciacionesCorrectas, pronunciacionesIncorrectas, recordados, intrusiones, perseveraciones, rechazos);
  try {
    const statement = await db.prepareAsync(
      'INSERT OR REPLACE INTO Test_8 (id_sesion, pronunciaciones_correctas, pronunciaciones_incorrectas, recordados, intrusiones, perseveraciones, rechazos) VALUES ($id_sesion, $pronunciaciones_correctas, $pronunciaciones_incorrectas, $recordados, $intrusiones, $perseveraciones, $rechazos)'
    );
    const result = await statement.executeAsync({ $id_sesion: id_sesion, $pronunciaciones_correctas: pronunciacionesCorrectas, $pronunciaciones_incorrectas: pronunciacionesIncorrectas, $recordados: recordados, $intrusiones: intrusiones, $perseveraciones: perseveraciones, $rechazos: rechazos });
    await statement.finalizeAsync();
    console.log("Resultados del Test 8 guardados:", result.lastInsertRowId);
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error al guardar resultados del Test 8:", error);
    throw error;
  }
};

export const guardarResultadosTest_10 = async (idSesion, secuenciasTocadas, correctas, tiemposEnsayos) => {
  const db = await dbPromise;
  console.log("Guardando resultados del Test 10:", idSesion, secuenciasTocadas, correctas, tiemposEnsayos);
  try {
    const statement = await db.prepareAsync(
      'INSERT OR REPLACE INTO Test_10 (id_sesion, secuencias_tocadas, correctas, tiempos_ensayos) VALUES ($id_sesion, $secuencias_tocadas, $correctas, $tiempos_ensayos)'
    );
    const result = await statement.executeAsync({ $id_sesion: idSesion, $secuencias_tocadas: JSON.stringify(secuenciasTocadas), $correctas: JSON.stringify(correctas), $tiempos_ensayos: JSON.stringify(tiemposEnsayos) });
    await statement.finalizeAsync();
    console.log("Resultados del Test 10 guardados:", result.lastInsertRowId);
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error al guardar resultados del Test 10:", error);
    throw error;
  }
};

export const guardarResultadosTest_11 = async (idSesion, correctas, inversiones, rectificaciones, tiemposRespuestas, figurasSeleccionadas) => {
  const db = await dbPromise;
  console.log("Guardando resultados del Test 11:", idSesion, correctas, inversiones, rectificaciones, tiemposRespuestas, figurasSeleccionadas);
  try {
    const statement = await db.prepareAsync(
      'INSERT OR REPLACE INTO Test_11 (id_sesion, correctas, inversiones, rectificaciones, tiempos_respuestas, figuras_seleccionadas) VALUES ($id_sesion, $correctas, $inversiones, $rectificaciones, $tiempos_respuestas, $figuras_seleccionadas)'
    );
    const result = await statement.executeAsync({ $id_sesion: idSesion, $correctas: correctas, $inversiones: inversiones, $rectificaciones: rectificaciones, $tiempos_respuestas: JSON.stringify(tiemposRespuestas), $figuras_seleccionadas: JSON.stringify(figurasSeleccionadas) });
    await statement.finalizeAsync();
    console.log("Resultados del Test 11 guardados:", result.lastInsertRowId);
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error al guardar resultados del Test 11:", error);
    throw error;
  }
};

export const guardarResultadosTest_12 = async (idSesion, correctas, erroresMorfologicos, erroresFoneticos, erroresSemanticos, excedidoTiempo, respuestaIncorrecta) => {
  const db = await dbPromise;
  console.log("Guardando resultados del Test 12:", idSesion, correctas, erroresMorfologicos, erroresFoneticos, erroresSemanticos, excedidoTiempo, respuestaIncorrecta);
  try {
    const statement = await db.prepareAsync(
      'INSERT OR REPLACE INTO Test_12 (id_sesion, correctas, errores_morfologicos, errores_foneticos, errores_semanticos, excedido_tiempo, respuesta_incorrecta) VALUES ($id_sesion, $correctas, $errores_morfologicos, $errores_foneticos, $errores_semanticos, $excedido_tiempo, $respuesta_incorrecta)'
    );
    const result = await statement.executeAsync({ $id_sesion: idSesion, $correctas: correctas, $errores_morfologicos: erroresMorfologicos, $errores_foneticos: erroresFoneticos, $errores_semanticos: erroresSemanticos, $excedido_tiempo: excedidoTiempo, $respuesta_incorrecta: respuestaIncorrecta });
    await statement.finalizeAsync();
    console.log("Resultados del Test 12 guardados:", result.lastInsertRowId);
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error al guardar resultados del Test 12:", error);
    throw error;
  }
};

export const guardarResultadosTest_13 = async (idSesion, correctas, errorAsociacion, generalizaciones, parciales, otrosErrores, excesoTiempoObj, excesoTiempoAsoc, respuestaSecuencia) => {
  const db = await dbPromise;
  console.log("Guardando resultados del Test 13:", idSesion, correctas, errorAsociacion, generalizaciones, parciales, otrosErrores, excesoTiempoObj, excesoTiempoAsoc, respuestaSecuencia);
  try {
    const statement = await db.prepareAsync(
      'INSERT OR REPLACE INTO Test_13 (id_sesion, correctas, error_asociacion, generalizaciones, parciales, otros_errores, exceso_tiempo_obj, exceso_tiempo_asoc, respuesta_secuencia) VALUES ($id_sesion, $correctas, $error_asociacion, $generalizaciones, $parciales, $otros_errores, $exceso_tiempo_obj, $exceso_tiempo_asoc, $respuesta_secuencia)'
    );
    const result = await statement.executeAsync({ $id_sesion: idSesion, $correctas: correctas, $error_asociacion: errorAsociacion, $generalizaciones: generalizaciones, $parciales: parciales, $otros_errores: otrosErrores, $exceso_tiempo_obj: excesoTiempoObj, $exceso_tiempo_asoc: excesoTiempoAsoc, $respuesta_secuencia: JSON.stringify(respuestaSecuencia) });
    await statement.finalizeAsync();
    console.log("Resultados del Test 13 guardados:", result.lastInsertRowId);
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error al guardar resultados del Test 13:", error);
    throw error;
  }
};

export const guardarResultadosTest_14 = async (idSesion, correctas, errores, tiempoTotal) => {
  const db = await dbPromise;
  console.log("Guardando resultados del Test 14:", idSesion, correctas, errores, tiempoTotal);
  try {
    const statement = await db.prepareAsync(
      'INSERT OR REPLACE INTO Test_14 (id_sesion, correctas, errores, tiempo_total) VALUES ($id_sesion, $correctas, $errores, $tiempo_total)'
    );
    const result = await statement.executeAsync({ $id_sesion: idSesion, $correctas: correctas, $errores: errores, $tiempo_total: tiempoTotal });
    await statement.finalizeAsync();
    console.log("Resultados del Test 14 guardados:", result.lastInsertRowId);
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error al guardar resultados del Test 14:", error);
    throw error;
  }
};

export const guardarResultadosTest_15 = async (idSesion, elementos, imposibilidad, rechazo, perspectiva) => {
  const db = await dbPromise;
  const elementosJson = JSON.stringify(elementos); // Convertir elementos a JSON
  console.log("Guardando resultados del Test 15:", idSesion, elementosJson, imposibilidad, rechazo, perspectiva);
  try {
    const statement = await db.prepareAsync(
      'INSERT OR REPLACE INTO Test_15 (id_sesion, elementos, imposibilidad, rechazo, perspectiva) VALUES ($id_sesion, $elementos, $imposibilidad, $rechazo, $perspectiva)'
    );
    const result = await statement.executeAsync({ $id_sesion: idSesion, $elementos: elementosJson, $imposibilidad: imposibilidad, $rechazo: rechazo, $perspectiva: perspectiva });
    await statement.finalizeAsync();
    console.log("Resultados del Test 15 guardados:", result.lastInsertRowId);
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error al guardar resultados del Test 15:", error);
    throw error;
  }
};

export const guardarResultadosTest_16 = async (idSesion, elementos, imposibilidad, rechazo, perspectiva) => {
  const db = await dbPromise;
  const elementosJson = JSON.stringify(elementos); // Convertir elementos a JSON
  console.log("Guardando resultados del Test 16:", idSesion, elementosJson, imposibilidad, rechazo, perspectiva);
  try {
    const statement = await db.prepareAsync(
      'INSERT OR REPLACE INTO Test_16 (id_sesion, elementos, imposibilidad, rechazo, perspectiva) VALUES ($id_sesion, $elementos, $imposibilidad, $rechazo, $perspectiva)'
    );
    const result = await statement.executeAsync({ $id_sesion: idSesion, $elementos: elementosJson, $imposibilidad: imposibilidad, $rechazo: rechazo, $perspectiva: perspectiva });
    await statement.finalizeAsync();
    console.log("Resultados del Test 16 guardados:", result.lastInsertRowId);
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error al guardar resultados del Test 16:", error);
    throw error;
  }
};

export const guardarResultadosTest_17 = async (
  idSesion,
  nombresRecordadosFase1,
  intrusionesFase1,
  perseveracionesFase1,
  rechazosFase1,
  nombresRecordadosFase2,
  intrusionesFase2,
  perseveracionesFase2,
  rechazosFase2,
  nombresIdentificadosFase3,
  erroresIdentificadosFase3,
  rechazosReconocimientoFase3
) => {
  const db = await dbPromise;
  console.log(
    "Guardando resultados del Test 17:",
    idSesion,
    nombresRecordadosFase1,
    intrusionesFase1,
    perseveracionesFase1,
    rechazosFase1,
    nombresRecordadosFase2,
    intrusionesFase2,
    perseveracionesFase2,
    rechazosFase2,
    nombresIdentificadosFase3,
    erroresIdentificadosFase3,
    rechazosReconocimientoFase3
  );

  try {
    const statement = await db.prepareAsync(
      `INSERT OR REPLACE INTO Test_17 (
        id_sesion,
        nombres_recordados_fase1,
        intrusiones_fase1,
        perseveraciones_fase1,
        rechazos_fase1,
        nombres_recordados_fase2,
        intrusiones_fase2,
        perseveraciones_fase2,
        rechazos_fase2,
        nombres_identificados_fase3,
        errores_identificados_fase3,
        rechazos_reconocimiento_fase3
      ) VALUES (
        $id_sesion,
        $nombres_recordados_fase1,
        $intrusiones_fase1,
        $perseveraciones_fase1,
        $rechazos_fase1,
        $nombres_recordados_fase2,
        $intrusiones_fase2,
        $perseveraciones_fase2,
        $rechazos_fase2,
        $nombres_identificados_fase3,
        $errores_identificados_fase3,
        $rechazos_reconocimiento_fase3
      )`
    );

    const result = await statement.executeAsync({
      $id_sesion: idSesion,
      $nombres_recordados_fase1: JSON.stringify(nombresRecordadosFase1),
      $intrusiones_fase1: intrusionesFase1,
      $perseveraciones_fase1: perseveracionesFase1,
      $rechazos_fase1: rechazosFase1,
      $nombres_recordados_fase2: JSON.stringify(nombresRecordadosFase2),
      $intrusiones_fase2: intrusionesFase2,
      $perseveraciones_fase2: perseveracionesFase2,
      $rechazos_fase2: rechazosFase2,
      $nombres_identificados_fase3: JSON.stringify(nombresIdentificadosFase3),
      $errores_identificados_fase3: JSON.stringify(erroresIdentificadosFase3),
      $rechazos_reconocimiento_fase3: rechazosReconocimientoFase3,
    });

    await statement.finalizeAsync();
    console.log("Resultados del Test 17 guardados:", result.lastInsertRowId);
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error al guardar resultados del Test 17:", error);
    throw error;
  }
};

export const guardarResultadosTest_18 = async (idSesion, carasReconocidas, carasReconocidasIncorrectamente, nombresReconocidos) => {
  const db = await dbPromise;
  console.log("Guardando resultados del Test 18:", idSesion, carasReconocidas, carasReconocidasIncorrectamente, nombresReconocidos);
  try {
    const statement = await db.prepareAsync(
      'INSERT OR REPLACE INTO Test_18 (id_sesion, caras_reconocidas, caras_reconocidas_incorrectamente, nombres_reconocidos) VALUES ($id_sesion, $caras_reconocidas, $caras_reconocidas_incorrectamente, $nombres_reconocidos)'
    );
    const result = await statement.executeAsync({
      $id_sesion: idSesion,
      $caras_reconocidas: carasReconocidas,
      $caras_reconocidas_incorrectamente: carasReconocidasIncorrectamente,
      $nombres_reconocidos: nombresReconocidos
    });
    await statement.finalizeAsync();
    console.log("Resultados del Test 18 guardados:", result.lastInsertRowId);
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error al guardar resultados del Test 18:", error);
    throw error;
  }
};

export const guardarResultadosTest_19 = async (idSesion, respuestasCorrectasTiempo, intrusionesTiempo, perseveracionesTiempo) => {
  const db = await dbPromise;
  console.log("Guardando resultados del Test 19:", idSesion, respuestasCorrectasTiempo, intrusionesTiempo, perseveracionesTiempo);
  try {
    const statement = await db.prepareAsync(
      'INSERT OR REPLACE INTO Test_19 (id_sesion, respuestas_correctas_tiempo, intrusiones_tiempo, perseveraciones_tiempo) VALUES ($id_sesion, $respuestas_correctas_tiempo, $intrusiones_tiempo, $perseveraciones_tiempo)'
    );
    const result = await statement.executeAsync({ $id_sesion: idSesion, $respuestas_correctas_tiempo: JSON.stringify(respuestasCorrectasTiempo), $intrusiones_tiempo: JSON.stringify(intrusionesTiempo), $perseveraciones_tiempo: JSON.stringify(perseveracionesTiempo) });
    await statement.finalizeAsync();
    console.log("Resultados del Test 19 guardados:", result.lastInsertRowId);
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error al guardar resultados del Test 19:", error);
    throw error;
  }
};

export const guardarResultadosTest_20 = async (idSesion, respuestasCorrectasTiempo, intrusionesTiempo, perseveracionesTiempo) => {
  const db = await dbPromise;
  console.log("Guardando resultados del Test 20:", idSesion, respuestasCorrectasTiempo, intrusionesTiempo, perseveracionesTiempo);
  try {
    const statement = await db.prepareAsync(
      'INSERT OR REPLACE INTO Test_20 (id_sesion, respuestas_correctas_tiempo, intrusiones_tiempo, perseveraciones_tiempo) VALUES ($id_sesion, $respuestas_correctas_tiempo, $intrusiones_tiempo, $perseveraciones_tiempo)'
    );
    const result = await statement.executeAsync({ $id_sesion: idSesion, $respuestas_correctas_tiempo: JSON.stringify(respuestasCorrectasTiempo), $intrusiones_tiempo: JSON.stringify(intrusionesTiempo), $perseveraciones_tiempo: JSON.stringify(perseveracionesTiempo) });
    await statement.finalizeAsync();
    console.log("Resultados del Test 20 guardados:", result.lastInsertRowId);
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error al guardar resultados del Test 20:", error);
    throw error;
  }
};

export const guardarResultadosTest_21 = async (idSesion, intrusiones, rechazos, indicesSeleccionados) => {
  const db = await dbPromise;
  console.log("Guardando resultados del Test 21:", idSesion, intrusiones, rechazos, indicesSeleccionados);
  try {
    const statement = await db.prepareAsync(
      'INSERT OR REPLACE INTO Test_21 (id_sesion, intrusiones, rechazos, indices_seleccionados) VALUES ($id_sesion, $intrusiones, $rechazos, $indices_seleccionados)'
    );
    const result = await statement.executeAsync({ $id_sesion: idSesion, $intrusiones: intrusiones, $rechazos: rechazos, $indices_seleccionados: JSON.stringify(indicesSeleccionados) });
    await statement.finalizeAsync();
    console.log("Resultados del Test 21 guardados:", result.lastInsertRowId);
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error al guardar resultados del Test 21:", error);
    throw error;
  }
};

export const guardarResultadosTest_22 = async (idSesion, intrusiones, rechazos, indicesSeleccionados) => {
  const db = await dbPromise;
  console.log("Guardando resultados del Test 22:", idSesion, intrusiones, rechazos, indicesSeleccionados);
  try {
    const statement = await db.prepareAsync(
      'INSERT OR REPLACE INTO Test_22 (id_sesion, intrusiones, rechazos, indices_seleccionados) VALUES ($id_sesion, $intrusiones, $rechazos, $indices_seleccionados)'
    );
    const result = await statement.executeAsync({ $id_sesion: idSesion, $intrusiones: intrusiones, $rechazos: rechazos, $indices_seleccionados: JSON.stringify(indicesSeleccionados) });
    await statement.finalizeAsync();
    console.log("Resultados del Test 22 guardados:", result.lastInsertRowId);
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error al guardar resultados del Test 22:", error);
    throw error;
  }
};

export const guardarResultadosTest_23 = async (idSesion, correctas, errores, excesosDeTiempo, respuestas, tiempos) => {
  const db = await dbPromise;
  console.log("Guardando resultados del Test 23:", idSesion, correctas, errores, excesosDeTiempo, respuestas, tiempos);
  try {
    const statement = await db.prepareAsync(
      'INSERT OR REPLACE INTO Test_23 (id_sesion, correctas, errores, excesos_tiempo, respuestas, tiempos) VALUES ($id_sesion, $correctas, $errores, $excesos_tiempo, $respuestas, $tiempos)'
    );
    const result = await statement.executeAsync({ $id_sesion: idSesion, $correctas: correctas, $errores: errores, $excesos_tiempo: excesosDeTiempo, $respuestas: JSON.stringify(respuestas), $tiempos: JSON.stringify(tiempos) });
    await statement.finalizeAsync();
    console.log("Resultados del Test 23 guardados:", result.lastInsertRowId);
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error al guardar resultados del Test 23:", error);
    throw error;
  }
};

export const guardarResultadosTest_24 = async (idSesion, validezEnsayo, etapasEnsayo, mediaConocidos, mediaDesconocidos, diferencia) => {
  const db = await dbPromise;
  console.log("Guardando resultados del Test 24:", idSesion, validezEnsayo, etapasEnsayo, mediaConocidos, mediaDesconocidos, diferencia);
  try {
    const statement = await db.prepareAsync(
      'INSERT OR REPLACE INTO Test_24 (id_sesion, validez_ensayo, etapas_ensayo, media_conocidos, media_desconocidos, diferencia) VALUES ($id_sesion, $validez_ensayo, $etapas_ensayo, $media_conocidos, $media_desconocidos, $diferencia)'
    );
    const result = await statement.executeAsync({ $id_sesion: idSesion, $validez_ensayo: validezEnsayo, $etapas_ensayo: etapasEnsayo, $media_conocidos: mediaConocidos, $media_desconocidos: mediaDesconocidos, $diferencia: diferencia });
    await statement.finalizeAsync();
    console.log("Resultados del Test 24 guardados:", result.lastInsertRowId);
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error al guardar resultados del Test 24:", error);
    throw error;
  }
};


export const obtenerResultadosSesion = async (idSesion) => {
  const db = await dbPromise;

  try {
    // Obtener los resultados de todos los tests
    const fechaSesion = await db.getAllAsync('SELECT fecha_sesion FROM SesionTest WHERE id = ?', [idSesion]);
    const resultadosTest1 = await db.getAllAsync('SELECT * FROM Test_1 WHERE id_sesion = ?', [idSesion]);
    const resultadosTest3 = await db.getAllAsync('SELECT * FROM Test_3 WHERE id_sesion = ?', [idSesion]);
    const resultadosTest4 = await db.getAllAsync('SELECT * FROM Test_4 WHERE id_sesion = ?', [idSesion]);
    const resultadosTest5 = await db.getAllAsync('SELECT * FROM Test_5 WHERE id_sesion = ?', [idSesion]);
    const resultadosTest6 = await db.getAllAsync('SELECT * FROM Test_6 WHERE id_sesion = ?', [idSesion]);
    const resultadosTest7 = await db.getAllAsync('SELECT * FROM Test_7 WHERE id_sesion = ?', [idSesion]);
    const resultadosTest8 = await db.getAllAsync('SELECT * FROM Test_8 WHERE id_sesion = ?', [idSesion]);
    const resultadosTest10 = await db.getAllAsync('SELECT * FROM Test_10 WHERE id_sesion = ?', [idSesion]);
    const resultadosTest11 = await db.getAllAsync('SELECT * FROM Test_11 WHERE id_sesion = ?', [idSesion]);
    const resultadosTest12 = await db.getAllAsync('SELECT * FROM Test_12 WHERE id_sesion = ?', [idSesion]);
    const resultadosTest13 = await db.getAllAsync('SELECT * FROM Test_13 WHERE id_sesion = ?', [idSesion]);
    const resultadosTest14 = await db.getAllAsync('SELECT * FROM Test_14 WHERE id_sesion = ?', [idSesion]);
    const resultadosTest15 = await db.getAllAsync('SELECT * FROM Test_15 WHERE id_sesion = ?', [idSesion]);
    const resultadosTest16 = await db.getAllAsync('SELECT * FROM Test_16 WHERE id_sesion = ?', [idSesion]);
    const resultadosTest17 = await db.getAllAsync('SELECT * FROM Test_17 WHERE id_sesion = ?', [idSesion]);
    const resultadosTest18 = await db.getAllAsync('SELECT * FROM Test_18 WHERE id_sesion = ?', [idSesion]);
    const resultadosTest19 = await db.getAllAsync('SELECT * FROM Test_19 WHERE id_sesion = ?', [idSesion]);
    const resultadosTest20 = await db.getAllAsync('SELECT * FROM Test_20 WHERE id_sesion = ?', [idSesion]);
    const resultadosTest21 = await db.getAllAsync('SELECT * FROM Test_21 WHERE id_sesion = ?', [idSesion]);
    const resultadosTest22 = await db.getAllAsync('SELECT * FROM Test_22 WHERE id_sesion = ?', [idSesion]);
    const resultadosTest23 = await db.getAllAsync('SELECT * FROM Test_23 WHERE id_sesion = ?', [idSesion]);
    const resultadosTest24 = await db.getAllAsync('SELECT * FROM Test_24 WHERE id_sesion = ?', [idSesion]);

    // Organizar todos los resultados en un objeto para retornarlo
    const resultados = {
      fecha: fechaSesion[0].fecha_sesion,
      test_1: resultadosTest1,
      test_3: resultadosTest3,
      test_4: resultadosTest4,
      test_5: resultadosTest5,
      test_6: resultadosTest6,
      test_7: resultadosTest7,
      test_8: resultadosTest8,
      test_10: resultadosTest10,
      test_11: resultadosTest11,
      test_12: resultadosTest12,
      test_13: resultadosTest13,
      test_14: resultadosTest14,
      test_15: resultadosTest15,
      test_16: resultadosTest16,
      test_17: resultadosTest17,
      test_18: resultadosTest18,
      test_19: resultadosTest19,
      test_20: resultadosTest20,
      test_21: resultadosTest21,
      test_22: resultadosTest22,
      test_23: resultadosTest23,
      test_24: resultadosTest24,
    };

    console.log("Resultados de la sesión obtenidos:", resultados);
    return resultados;
  } catch (error) {
    console.error("Error al obtener resultados de la sesión:", error);
    throw error;
  }
};

export default initDB;