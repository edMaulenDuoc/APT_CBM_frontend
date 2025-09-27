import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Turnos from "../pages/Turnos.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Emergencia from "../pages/Emergencia.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import Navbar from "../components/Navbar.jsx";
import LoginHeader from "../components/LoginHeader.jsx";
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
            <Route path="*" element={
                <div className="flex flex-col justify-center items-center mt-40">
                    <div className="bg-yellow-600 p-4 rounded-2xl mb-4 flex flex-col justify-center items-center">
                        <h2 className="text-2xl">404 — No encontrado</h2>
                        <p className="text-black">La página que estás buscando no existe.</p>
                    </div>
                </div>
            } />
        </Routes>
        </>
    );
};
export default AppRoutes;