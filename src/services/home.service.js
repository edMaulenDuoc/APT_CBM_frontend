import api from "./api";

export const homeService = {
  verificarEstadoAPI: async () => {
    try {
        const response = await api.get("/estado");
        console.log(response);
        
        return response.data;
    } catch (error) {
        throw error;
    }
}
};

