import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext"; 

export function usePermiso(usuariosPermitidos) {
  const { usuario } = useAuth();
  const [checkPermiso, setCheckPermiso] = useState(false);

  useEffect(() => {
    if (!usuariosPermitidos) {
      setCheckPermiso(true);
      return;
    }
    setCheckPermiso(usuariosPermitidos.includes(usuario?.id));
  }, [usuario, usuariosPermitidos]);

  return checkPermiso;
}
