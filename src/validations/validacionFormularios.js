import * as validar from './validadores';

/** 
 * Valida el formulario de inicio de sesión
 * @param {Object} formData - Valores del formulario
 * @param {string} formData.usuario - nombre de usuario
 * @param {string} formData.clave - Contraseña
 * @returns {Object{ esValido: boolean, mensaje: string }} - Resultado de la validación
*/
const validarLogin = (formData) => {
    const validaciones = [
        { valor: formData.usuario, metodo: validar.campoVacio,  args: ['Usuario'] },
        { valor: formData.usuario, metodo: validar.largoString, args: [3, 25, 'Usuario'] },
        { valor: formData.clave,   metodo: validar.campoVacio,  args: ['Contraseña'] },
        { valor: formData.clave,   metodo: validar.largoString, args: [3, 15, 'Contraseña'] }
    ];
    
    return validar.ejecutarValidaciones(validaciones);
};

/**
 * Valida el formulario de emergencia
 * @param {Object} formData - Valores del formulario
 * @param {number} formData.tipo_id - ID del tipo de emergencia
 * @param {string} formData.direccion - Dirección de la emergencia
 * @param {Array} formData.vehiculos - Lista de vehículos seleccionados
 * @param {Array} formData.instituciones - Lista de instituciones
 * @returns {Object{ esValido: boolean, mensaje: string }} - Resultado de la validación
*/
const validarFormEmergencia = (formData) => {
    const validaciones = [
        { valor: formData.tipo_id, metodo: validar.selecionado, args: ['Tipo de emergencia'] },
        { valor: formData.direccion, metodo: validar.campoVacio, args: ['Dirección'] },
        { valor: formData.direccion, metodo: validar.largoString, args: [5, 100, 'Dirección'] },
        { valor: formData.vehiculos, metodo: validar.arrayVacio, args: ['Unidades a despachar'] },
    ];


    var resultado = validar.ejecutarValidaciones(validaciones);

    if (!resultado.esValido) return resultado;

    const validacionesInstituciones = formData.instituciones.map((inst) => ({
        valor: inst.tipo_apoyo_id, metodo: validar.selecionado, args: ['Tipo de apoyo']
    }));

    return validar.ejecutarValidaciones(validacionesInstituciones);

}

export { validarLogin, validarFormEmergencia }