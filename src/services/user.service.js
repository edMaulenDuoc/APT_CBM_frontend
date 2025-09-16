import api from "./api";
import notify from "./notify.service";

const userService = {
    login: async ({ usuario, clave }) => {
        try {
            const promise = api.post("/auth/login", { usuario, clave });

            const response = await notify.promise(
                promise,
                {
                    pending: "Iniciando sesión...",
                }
            );

            return response.data;
        } catch (error) {
            notify.error( error.response?.data?.error || error.message || "Error al iniciar sesión");
            throw error;
        }
    },

    logout: async () => {
        try {
            const response = await api.post("/auth/logout");
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    register: async (userData) => {
        try {
            const response = await api.post("/auth/register", userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    perfil: async () => {
        try {
            const perfil = await api.get("/users/perfil");
            console.log("data " , perfil.data);
            return perfil.data;
        } catch (error) {
            throw error;
        }
    }
};

export default userService;