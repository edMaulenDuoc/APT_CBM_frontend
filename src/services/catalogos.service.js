
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
    },
    getTiposUsuario: async () => {
        try {
            const response = await api.get("/catalogos/tipos-usuario");
            console.log("catalago tipo usuario", response.data.tiposUsuario )
            const tiposUsuario = response.data.tiposUsuario.map((tipo) =>({value: tipo.id, label: tipo.tipo}) )
            return tiposUsuario;
        } catch (error) {
            throw error;
        }
    },
    getCompaniasDropDown: async () => {
        
        try {
            const response = await api.get("/catalogos/compania-dropdown");
            const companiasDropDown = response.data.companiasDropDown.map((compania) => ({value: compania.id, label: compania.compania}))
            console.log("estamos en getCompaniasDropDown", companiasDropDown);
            return companiasDropDown;
        } catch (error) {
            throw error;
        }
    }
};

export default catalogosService;