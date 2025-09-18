import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Turnos from "../pages/Turnos.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Emergencia from "../pages/Emergencia.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import Navbar from "../components/Navbar.jsx";
import LoginHeader from "../components/LoginHeader.jsx";
import EditarUsuarios from "../pages/EditarUsuarios.jsx";
import AgregarUsuarios from "../pages/AgregarUsuarios.jsx";
// import Users from "../pages/Users.jsx";

const AppRoutes = () => {
    const { usuario } = useAuth();
    
    const usuarioActivo = usuario ? true : false;

    return (
        <>
        {usuarioActivo ? 
            <Navbar /> 
        : 
            <LoginHeader />}
        
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/emergencias" element={
                <ProtectedRoute>
                    <Emergencia/>
                </ProtectedRoute>} />
            <Route path="/turnos" element={
                <ProtectedRoute>
                    <Turnos/>
                </ProtectedRoute>
            } />
            <Route path="/editarUsuario" element={<EditarUsuarios/>} />
            <Route path="/agregarUsuario" element={<AgregarUsuarios/>} />
            <Route path="*" element={<h2>404 — No encontrado</h2>} />
        </Routes>
        </>
    );
};
export default AppRoutes;