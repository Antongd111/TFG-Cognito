import {    guardarResultadosTest_1 as BD_GuardarResultadosTest_1, guardarResultadosTest_3 as BD_GuardarResultadosTest_3, 
            guardarResultadosTest_4 as BD_GuardarResultadosTest_4, guardarResultadosTest_5 as BD_GuardarResultadosTest_5,
            obtenerResultadosSesion as BD_ObtenerResultadosSesion, guardarResultadosTest_7 as BD_GuardarResultadosTest_7,
            guardarResultadosTest_8 as BD_GuardarResultadosTest_8, guardarResultadosTest_10 as BD_GuardarResultadosTest_10,
            guardarResultadosTest_11 as BD_GuardarResultadosTest_11,
            crearSesionTest as BD_CrearSesionTest } from '../database/db';

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

export const guardarResultadosTest_4 = async (id_sesion, numeroAciertos, numeroSobreestimaciones, numeroSubestimaciones) => {
    try {
        const result = await BD_GuardarResultadosTest_4(id_sesion, numeroAciertos, numeroSobreestimaciones, numeroSubestimaciones);
        return result;
    } catch (error) {
        throw error;
    }
};

export const guardarResultadosTest_5 = async (id_sesion, ensayosCorrectos, numeroErrores, erroresTiempo) => {
    try {
        const result = await BD_GuardarResultadosTest_5(id_sesion, ensayosCorrectos, numeroErrores, erroresTiempo);
        return result;
    } catch (error) {
        throw error;
    }
};

export const guardarResultadosTest_7 = async (id_sesion, numeroAciertos, numeroErrores, tiempoMedio) => {
    try {
        const result = await BD_GuardarResultadosTest_7(id_sesion, numeroAciertos, numeroErrores, tiempoMedio);
        return result;
    } catch (error) {
        throw error;
    }
};

export const guardarResultadosTest_8 = async (id_sesion, pronunciacionesCorrectas, pronunciacionesIncorrectas, recordados, intrusiones, perseveraciones, rechazos) => {
    try {
        const result = await BD_GuardarResultadosTest_8(id_sesion, pronunciacionesCorrectas, pronunciacionesIncorrectas, recordados, intrusiones, perseveraciones, rechazos);
        return result;
    } catch (error) {
        throw error;
    }
};

export const guardarResultadosTest_10 = async (id_sesion) => {
    try {
        const result = await BD_GuardarResultadosTest_10(id_sesion);
        return result;
    } catch (error) {
        throw error;
    }
};

export const guardarResultadosTest_11 = async (id_sesion, correctas, inversiones, rectificaciones, tiemposRespuestas, figurasSeleccionadas) => {
    try {
        const result = await BD_GuardarResultadosTest_11(id_sesion, correctas, inversiones, rectificaciones, tiemposRespuestas, figurasSeleccionadas);
        return result;
    } catch (error) {
        throw error;
    }
};

export const obtenerResultadosSesion = async (id_sesion) => {
    try {
        const result = await BD_ObtenerResultadosSesion(id_sesion);
        return result;
    } catch (error) {
        throw error;
    }
};
