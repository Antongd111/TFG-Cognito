import { agregarPaciente as BD_AgregarPaciente, obtenerPacientes as BD_ObtenerPacientes, 
  obtenerPaciente as BD_ObtenerPaciente, actualizarPaciente as BD_ActualizarPaciente,
  obtenerSesionesPaciente as BD_ObtenerSesionesPaciente} from '../database/db';

export const agregarPaciente = async (identificacion, nombre, apellidos, fecha_nacimiento, sexo, observaciones) => {
  try {
    const result = await BD_AgregarPaciente(identificacion, nombre, apellidos, fecha_nacimiento, sexo, observaciones);
    return result;
  } catch (error) {
    throw error;
  }
};

export const obtenerPacientes = async () => {
  try {
    const pacientes = await BD_ObtenerPacientes();
    return pacientes;
  } catch (error) {
    throw error;
  }
};

export const obtenerPaciente = async (id) => {
  try {
    const paciente = await BD_ObtenerPaciente(id);
    return paciente;
  } catch (error) {
    throw error;
  }
};

export const actualizarPaciente = async (id, identificacion, nombre, apellidos, fecha_nacimiento, sexo, observaciones) => {
  try {
    const result = await BD_ActualizarPaciente(id, identificacion, nombre, apellidos, fecha_nacimiento, sexo, observaciones);
    return result;
  } catch (error) {
    throw error;
  }
};

export const obtenerSesionesPaciente = async (id_paciente) => {
  try {
    const sesiones = await BD_ObtenerSesionesPaciente(id_paciente);
    return sesiones;
  } catch (error) {
    throw error;
  }
}