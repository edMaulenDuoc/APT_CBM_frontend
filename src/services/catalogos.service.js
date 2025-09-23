import api from "./api";
import notify from "./notify.service";

const catalogosService = {
    getCompanias: async () => {
        try {
            const response = await api.get("/catalogos/companias");
            return response.data.companias;
        } catch (error) {
            throw error;
        }
    },
    getTiposApoyo: async () => {
        try {
            const response = await api.get("/catalogos/tipos-apoyo");
            const tiposApoyo = response.data.tiposApoyo.map((tipo) => ({value: tipo.id, label: `${tipo.codigo} - ${tipo.descripcion}`}));
            return tiposApoyo;
            
        } catch (error) {
            throw error;
        }
    },
    getTiposEmergencia: async () => {
        try {
            const response = await api.get("/catalogos/tipos-emergencia");

            const tiposEmergencia = response.data.tiposEmergencia.map((tipo) => ({value: tipo.id, label: `${tipo.tipo} - ${tipo.descripcion}`}));
            return tiposEmergencia;
        } catch (error) {
            throw error;
        }   
    }
};

export default catalogosService;