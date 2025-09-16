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

export { validarLogin }