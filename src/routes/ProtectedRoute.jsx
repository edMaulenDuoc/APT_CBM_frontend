import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import notify from "../services/notify.service";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const { usuario, cargando } = useAuth()
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    if (!cargando && !usuario) {
      notify.info("Acceso no autorizado.")
      setRedirect(true);
    }
  }, [cargando, usuario])

  if (redirect) return <Navigate to="/" replace />

  if (cargando) {
    return <p>Cargando...</p>
  }

  if (usuario) {
    return children
  }
};

export default ProtectedRoute;
