/**
 * Valida si el campo está vacío
 * @param {string} valor - Valor del campo
 * @param {string} nombre - Nombre del campo
 * @returns {Object {esValido: boolean, mensaje: string}} - Objeto con el resultado de la validación
 */
export const campoVacio = (valor, nombre) => {
    let esValido = true;
    let mensaje = '';

    if (!valor) {
        esValido = false;
        mensaje = `El campo ${nombre} es requerido`;
    }

    return { esValido, mensaje };
}

/**
 * Valida la longitud de un campo de texto
 * @param {string} valor - Valor del campo
 * @param {number} min - Longitud mínima
 * @param {number} max - Longitud máxima
 * @param {string} nombre - Nombre del campo
 * @returns {Object {esValido: boolean, mensaje: string}} - Objeto con el resultado de la validación
 */
export const largoString = (valor, min, max, nombre) => {
    let esValido = true;
    let mensaje = '';

    if (valor.length < min || valor.length > max) {
        esValido = false;
        mensaje = `El campo ${nombre} debe tener entre ${min} y ${max} caracteres`;
    }

    return { esValido, mensaje };
}

/**
 * Valida si un arreglo está vacío
 * @param {Array} valor - Arreglo a validar
 * @param {string} nombre - Nombre del campo
 * @returns {Object {esValido: boolean, mensaje: string}} - Objeto con el resultado de la validación
 * */
export const arrayVacio = (valor, nombre) => {
    let esValido = true;
    let mensaje = '';
 
    if (!Array.isArray(valor) || valor.length === 0) {
        esValido = false;
        mensaje = `Debe seleccionar al menos un elemento en ${nombre}`;
    }
 
    return { esValido, mensaje };
}

/**
 * Valida si se ha seleccionado una opción (diferente de 0 o vacío)
 * @param {number|string} valor - Valor a validar
 * @param {string} nombre - Nombre del campo
 * @returns {Object {esValido: boolean, mensaje: string}} - Objeto con el resultado de la validación
 */
export const selecionado = (valor, nombre) => {
    let esValido = true;
    let mensaje = '';
    if (valor === 0 || valor === "0" || valor === "" || valor === null || valor === undefined) {
        esValido = false;
        mensaje = `Debe seleccionar una opción en ${nombre}`;
    }

    return { esValido, mensaje };
}

/**
 * Ejecuta un arreglo de validaciones
 * @param {Array [{ valor: {string|number|date|etc}, methodo: funcion(), args: [] }]} validaciones - Arreglo de validaciones
 * @returns {Object {esValido: boolean, mensaje: string}} - Objeto con el resultado de la validación del formulario
 */
export const ejecutarValidaciones = (validaciones) => {
    for (const { valor, metodo, args, opcional } of validaciones) {
        if (opcional && (valor === undefined || valor === "")) continue;
        const result = metodo(valor, ...args);
        if (!result.esValido) return result;
    }

    return { esValido: true };
}