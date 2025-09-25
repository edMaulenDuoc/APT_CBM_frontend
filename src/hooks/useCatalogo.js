import { useState, useEffect } from 'react';

const useCatalogo = (catalogo, nombreValue, nombreLabel) => {
    const [opciones, setOpciones] = useState([]);

    useEffect(() => {
        if (Array.isArray(catalogo)) {
            const nuevasOpciones = catalogo.map(item => ({
                value: item[nombreValue],
                label: item[nombreLabel]
            }));
            setOpciones(nuevasOpciones);
        }
    }, [catalogo, nombreValue, nombreLabel]);

    return opciones;
};
export default useCatalogo;