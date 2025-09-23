import api from "./api"
import notify from "./notify.service"

const emergenciaService = {
    registrarEmergencia: async (formData) => {
        const promesa = api.post("/emergencias", formData);
        const response = await notify.promise(
            promesa,
            {
                pending: "Registrando emergencia...",
                success: "Emergencia registrada con éxito",
                error: "Error al registrar la emergencia"
            }
        );

        console.log(response.data);
        
        return response.data;
    },

    getEmergencias: async () => {
        const response = await api.get("/emergencias");
        

        console.log(response.data);

        return response.data;
    }
}

export default emergenciaService;