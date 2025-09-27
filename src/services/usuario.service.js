import notify from "./notify.service";

const usuarioService = {
    registro: async ({}) => {
        console.log("llegue al servicio")
        try {
            const promise = api.post("auth/registro", {FormData})

        } catch(error){
            notify.error(error.response?.data?.error || error.message || "Error al registrar usuario")
            throw error;
        }
    } 
};

export default usuarioService;