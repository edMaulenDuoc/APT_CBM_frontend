import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

/* export const usePermiso = ({ usuariosPermitidos = [], emergencia = null }) => {
    const { usuario } = useAuth();
    const [permisos, setPermisos] = useState({
        checkPermiso: false,
        checkEsChofer: false,
        checkEsAdmin: false,
        checkEsObac: false,
    });

    useEffect(() => {
        if (!usuario) return;

        const nuevosPermisos = {
            checkEsChofer: usuario?.tipo?.id === 26,   // Chofer
            checkEsAdmin: usuario?.tipo?.id === 1,     // Admin
            checkPermiso:
                usuariosPermitidos.length === 0
                    ? true
                    : usuariosPermitidos.includes(usuario?.tipo?.id),
            checkEsObac: !!emergencia && emergencia.obac_id === usuario.id,
        };

        setPermisos(nuevosPermisos);
        console.log("Usuario:", usuario);
        
    }, [usuario]);

    const check = (permisos = []) => {
        return permisos.includes(usuario?.tipo?.id);
    }

    return { permisos, check };
}; */


export const usePermiso = () => {
    const { usuario } = useAuth();
    

    const checkPrivilegios = (permisos = []) => {
        return permisos.includes(usuario?.tipo?.id);
    }

    return { checkPrivilegios };
};