import { agregarPaciente as BD_AgregarPaciente, obtenerPacientes as BD_ObtenerPacientes } from '../database/db';

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