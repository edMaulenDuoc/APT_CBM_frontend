import { createContext, useContext, useState, useEffect } from "react";
import userService from "../services/user.service";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const [cargando, setCargando] = useState(true);

    // Verifica si ya hay sesión activa al cargar la app
    useEffect(() => {
        const verificarSesion = async () => {
            try {
                const  usuario  = await userService.perfil();
                setUsuario(usuario);
            } catch (error) {
                setUsuario(null);
            } finally {
                setCargando(false);
            }
        }

        verificarSesion();
    }, []);

    const login = async (credentials) => {
        const data = await userService.login(credentials);
        
        if (data?.perfil) {
            setUsuario(data.perfil);
        }
        return data;
    };

    const logout = async () => {
        await userService.logout();
        setUsuario(null);
    };

    const register = async (userData) => {
        const data = await userService.register(userData);
        if (data?.perfil) {
            setUsuario(data.perfil);
        }
        return data;
    };

    return (
        <AuthContext.Provider value={{ usuario, cargando, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
}
