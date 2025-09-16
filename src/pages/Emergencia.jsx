import { TriangleAlert, Flame } from "lucide-react";
import Header from "../components/Header";
import notify from "../services/notify.service";

const Emergencia = () => {
    const click = () => {
        notify.success("Notificación de prueba");
    }
    
    return (
        <>
            <Header
                IconoHeader={TriangleAlert}
                titulo="Registro de emergencias"
                subtitulo="Historial completo de incidentes registrados"
                textoBoton="+ Nueva Emergencia"
                // informacion={"Hola esta es la info"}
                onClick={click}
            />

            {/* Container de la pagina */}
            <div className="p-6">
            
            </div>


            {/* Modal */}
            <div>
                
            </div>
        </>
    )
}

export default Emergencia;