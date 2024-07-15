import { guardarResultadosTest_1 as BD_GuardarResultadosTest_1, guardarResultadosTest_3 as BD_GuardarResultadosTest_3, crearSesionTest as BD_CrearSesionTest } from '../database/db';

export const guardarResultadosTest_1 = async (id_sesion, numero_ensayos, reaccion, errores_anticipacion, errores_tiempo, errores_retrasos) => {
    try {
        const result = await BD_GuardarResultadosTest_1(id_sesion, numero_ensayos, reaccion, errores_anticipacion, errores_tiempo, errores_retrasos);
        return result;
    } catch (error) {
        throw error;
    }
};

export const crearSesionTest = async (id_paciente, fecha_sesion) => {
    try {
        const result = await BD_CrearSesionTest(id_paciente, fecha_sesion);
        return result;
    } catch (error) {
        throw error;
    }
};

export const guardarResultadosTest_3 = async (id_sesion, numeroAciertos, lecturaCorrecta, erroresTiempo) => {
    try {
        const result = await BD_GuardarResultadosTest_3(id_sesion, numeroAciertos, lecturaCorrecta, erroresTiempo);
        return result;
    } catch (error) {
        throw error;
    }
};