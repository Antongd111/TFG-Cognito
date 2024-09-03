import {
    guardarResultadosTest_1 as BD_GuardarResultadosTest_1, guardarResultadosTest_3 as BD_GuardarResultadosTest_3,
    guardarResultadosTest_4 as BD_GuardarResultadosTest_4, guardarResultadosTest_5 as BD_GuardarResultadosTest_5,
    guardarResultadosTest_6 as BD_GuardarResultadosTest_6, guardarResultadosTest_7 as BD_GuardarResultadosTest_7, 
    guardarResultadosTest_8 as BD_GuardarResultadosTest_8, guardarResultadosTest_10 as BD_GuardarResultadosTest_10,
    guardarResultadosTest_11 as BD_GuardarResultadosTest_11, guardarResultadosTest_12 as BD_GuardarResultadosTest_12,
    guardarResultadosTest_13 as BD_GuardarResultadosTest_13, guardarResultadosTest_14 as BD_GuardarResultadosTest_14,
    guardarResultadosTest_15 as BD_GuardarResultadosTest_15, guardarResultadosTest_16 as BD_GuardarResultadosTest_16,
    guardarResultadosTest_17 as BD_GuardarResultadosTest_17, guardarResultadosTest_18 as BD_GuardarResultadosTest_18,
    guardarResultadosTest_19 as BD_GuardarResultadosTest_19, guardarResultadosTest_20 as BD_GuardarResultadosTest_20,
    guardarResultadosTest_21 as BD_GuardarResultadosTest_21, guardarResultadosTest_22 as BD_GuardarResultadosTest_22,
    guardarResultadosTest_23 as BD_GuardarResultadosTest_23, guardarResultadosTest_24 as BD_GuardarResultadosTest_24,
    obtenerResultadosSesion as BD_ObtenerResultadosSesion,
    crearSesionTest as BD_CrearSesionTest
} from '../database/db';

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

export const guardarResultadosTest_6 = async (id_sesion, ensayosCorrectos, numeroErrores, erroresTiempo, sonidosCorrectos, sonidosIncorrectos) => {
    try {
        const result = await BD_GuardarResultadosTest_6(id_sesion, ensayosCorrectos, numeroErrores, erroresTiempo, sonidosCorrectos, sonidosIncorrectos);
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

export const guardarResultadosTest_10 = async (idSesion, secuenciasTocadas, correctas, tiemposEnsayos) => {
    try {
        const result = await BD_GuardarResultadosTest_10(idSesion, secuenciasTocadas, correctas, tiemposEnsayos);
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

export const guardarResultadosTest_12 = async (id_sesion, correctas, erroresMorfológicos, erroresFonéticos, erroresSemánticos, excedidoTiempo, respuestaIncorrecta) => {
    try {
        const result = await BD_GuardarResultadosTest_12(id_sesion, correctas, erroresMorfológicos, erroresFonéticos, erroresSemánticos, excedidoTiempo, respuestaIncorrecta);
        return result;
    } catch (error) {
        throw error;
    }
};

export const guardarResultadosTest_13 = async (id_sesion, correctas, errorAsociacion, generalizaciones, parciales, otrosErrores, excesoTiempoObj, excesoTiempoAsoc, respuestaSecuencia) => {
    try {
        const result = await BD_GuardarResultadosTest_13(id_sesion, correctas, errorAsociacion, generalizaciones, parciales, otrosErrores, excesoTiempoObj, excesoTiempoAsoc, respuestaSecuencia);
        return result;
    } catch (error) {
        throw error;
    }
};

export const guardarResultadosTest_14 = async (id_sesion, correctas, errores, tiempoTotal) => {
    try {
        const result = await BD_GuardarResultadosTest_14(id_sesion, correctas, errores, tiempoTotal);
        return result;
    } catch (error) {
        throw error;
    }
};

export const guardarResultadosTest_15 = async (idSesion, elementos, imposibilidad, rechazo, perspectiva) => {
    try {
        const result = await BD_GuardarResultadosTest_15(idSesion, elementos, imposibilidad, rechazo, perspectiva);
        return result;
    } catch (error) {
        throw error;
    }
};

export const guardarResultadosTest_16 = async (idSesion, elementos, imposibilidad, rechazo, perspectiva) => {
    try {
        const result = await BD_GuardarResultadosTest_16(idSesion, elementos, imposibilidad, rechazo, perspectiva);
        return result;
    } catch (error) {
        throw error;
    }
};

export const guardarResultadosTest_17 = async (idSesion,
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
    rechazosReconocimientoFase3) => {
    try {
        const result = await BD_GuardarResultadosTest_17(idSesion,
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
            rechazosReconocimientoFase3);
        return result;
    } catch (error) {
        throw error;
    }
};

export const guardarResultadosTest_18 = async (idSesion, carasReconocidasCorrectamente, carasIncorrectamenteReconocidas, nombresReconocidosCorrectamente) => {
    try {
        const result = await BD_GuardarResultadosTest_18(idSesion, carasReconocidasCorrectamente, carasIncorrectamenteReconocidas, nombresReconocidosCorrectamente);
        return result;
    } catch (error) {
        throw error;
    }
};

export const guardarResultadosTest_19 = async (idSesion, respuestasCorrectasTiempos, intrusionesTiempos, perseveracionesTiempos) => {
    try {
        const result = await BD_GuardarResultadosTest_19(idSesion, respuestasCorrectasTiempos, intrusionesTiempos, perseveracionesTiempos);
        return result;
    } catch (error) {
        throw error;
    }
};

export const guardarResultadosTest_20 = async (idSesion, respuestasCorrectasTiempos, intrusionesTiempos, perseveracionesTiempos) => {
    try {
        const result = await BD_GuardarResultadosTest_20(idSesion, respuestasCorrectasTiempos, intrusionesTiempos, perseveracionesTiempos);
        return result;
    } catch (error) {
        throw error;
    }
};

export const guardarResultadosTest_21 = async (idSesion, intrusiones, rechazos, indicesSeleccionados) => {
    try {
        const result = await BD_GuardarResultadosTest_21(idSesion, intrusiones, rechazos, indicesSeleccionados);
        return result;
    } catch (error) {
        throw error;
    }
};

export const guardarResultadosTest_22 = async (idSesion, intrusiones, rechazos, indicesSeleccionados) => {
    try {
        const result = await BD_GuardarResultadosTest_22(idSesion, intrusiones, rechazos, indicesSeleccionados);
        return result;
    } catch (error) {
        throw error;
    }
};

export const guardarResultadosTest_23 = async (idSesion, correctas, errores, excesosDeTiempo, respuestas, tiempos) => {
    try {
        const result = await BD_GuardarResultadosTest_23(idSesion, correctas, errores, excesosDeTiempo, respuestas, tiempos);
        return result;
    } catch (error) {
        throw error;
    }
};

export const guardarResultadosTest_24 = async (id_sesion, validezEnsayo, etapasEnsayo, mediaConocidos, mediaDesconocidos, diferencia) => {
    try {
        const result = await BD_GuardarResultadosTest_24(id_sesion, validezEnsayo, etapasEnsayo, mediaConocidos, mediaDesconocidos, diferencia);
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
