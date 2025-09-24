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

        return response.data;
    },
    
    editarEmergencia: async (formData) => {
        const promesa = api.put(`/emergencias/${formData.id}`, formData);
        const response = await notify.promise(
            promesa,
            {
                pending: "Actualizando emergencia...",
                success: "Emergencia actualizada con éxito",
                error: "Error al actualizar la emergencia"
            }
        );

        return response.data;
    },

    getEmergencias: async () => {
        const response = await api.get("/emergencias");
        
        return response.data;
    }
}

export default emergenciaService;