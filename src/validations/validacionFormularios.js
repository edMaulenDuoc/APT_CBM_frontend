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

/**
* Valida el formulario de creación ó edición de usuario
 * @param {Object} formData - Valores del formulario
 * @param {string} formData.nombre
 * @param {string} formData.apellidoPaterno
 * @param {string} formData.apellidoMaterno
 * @param {string} formData.rut
 * @param {string} formData.direccion
 * @param {string} formData.telefono
 * @param {string} formData.email
 * @returns {Object {esValido: boolean, mensaje: string}} - Resultado de la validación
 */

const validarFormUsuarios = (formData) =>{
    const validaciones = [
        { valor: formData.nombre, metodo: validar.campoVacio, args: ['Nombre']},
        { valor: formData.nombre, metodo: validar.largoString, args: [3, 25, 'Nombre']},
        
        { valor: formData.apellido_pat, metodo: validar.campoVacio, args: ['Apellido Paterno']},
        { valor: formData.apellido_pat, metodo: validar.largoString, args: [3, 25, 'Apellido Paterno']},

        { valor: formData.apellido_mat, metodo: validar.campoVacio, args: ['Apellido Materno']},
        { valor: formData.aopellido_mat, metodo: validar.largoString, args: [3, 25, 'Apellido Materno']},
        
        { valor: formData.rut, metodo: validar.campoVacio, args: ['rut'] },
        { valor: formData.rut, metodo: validar.largoString, args: [8, 12, 'rut'] },

        { valor: formData.direccion, metodo: validar.largoString, args: [3, 100, 'Dirección']},

        { valor: formData.telefono, metodo: validar.largoString, args: [8, 15, 'Teléfono']},

        { valor: formData.email, metodo: validar.largoString, args: [5, 100, 'Correo electrónico']},
        
    ];
    return validar.ejecutarValidaciones(validaciones);

};
export {validarFormUsuarios}