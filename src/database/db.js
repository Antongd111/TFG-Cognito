import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("CognitoDB.db");

const initDB = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Paciente (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre VARCHAR(255) NOT NULL,
        apellidos VARCHAR(255) NOT NULL,
        fecha_nacimiento DATE NOT NULL,
        sexo VARCHAR(1) CHECK(sexo IN ('M', 'F')) NOT NULL,
        observaciones TEXT
      );`,
      [],
      () => console.log("Tabla Paciente creada o ya existente"),
      (_, error) => console.error("Error al crear la tabla:", error)
    );
  });
};

export const addPaciente = async (nombre, apellidos, fecha_nacimiento, sexo, observaciones, callback) => {
  console.log("Añadiendo paciente:", nombre, apellidos, fecha_nacimiento, sexo, observaciones);
  await db.transaction(async (tx) => {
    tx.executeSql(
      "INSERT INTO Paciente (nombre, apellidos, fecha_nacimiento, sexo, observaciones) VALUES (?, ?, ?, ?, ?);",
      [nombre, apellidos, fecha_nacimiento, sexo, observaciones],
      (_, { insertId }) => {
        console.log("Paciente añadido con ID:", insertId);
        if (callback) callback(true);
      },
      (_, error) => {
        console.error("Error al añadir paciente:", error);
        if (callback) callback(false);
      }
    );
  });
};

export const getPacientes = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      "SELECT * FROM Paciente;",
      [],
      (tx, resultado) => {
        const pacientes = resultado.rows._array;
        console.log("Pacientes obtenidos:", pacientes);
        if (callback) callback(pacientes);
      }
    );
  });
};

export default initDB;
