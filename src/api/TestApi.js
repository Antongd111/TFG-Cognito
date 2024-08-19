import { guardarResultadosTest_1 as BD_GuardarResultadosTest_1, guardarResultadosTest_3 as BD_GuardarResultadosTest_3, 
         guardarResultadosTest_4 as BD_GuardarResultadosTest_4, guardarResultadosTest_5 as BD_GuardarResultadosTest_5,
         obtenerResultadosSesion as BD_ObtenerResultadosSesion,
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


export const obtenerResultadosSesion = async (id_sesion) => {
    try {
        const result = await BD_ObtenerResultadosSesion(id_sesion);
        return result;
    } catch (error) {
        throw error;
    }
};
