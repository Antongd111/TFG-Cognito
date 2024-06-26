import { agregarPaciente as BD_AgregarPaciente, obtenerPacientes as BD_ObtenerPacientes, obtenerPaciente as BD_ObtenerPaciente } from '../database/db';

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