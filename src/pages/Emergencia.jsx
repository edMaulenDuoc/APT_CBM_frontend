import { TriangleAlert, Flame, X } from "lucide-react";
import Header from "../components/Header";
import notify from "../services/notify.service";
import Input from "../components/form/Input";
import Dropdown from "../components/form/Dropdown";
import FormEmergencia from "../components/FormEmergencia";

const Emergencia = () => {
    const abrirModal = (modalId) => {
        const modal = document.querySelector(`#${modalId}`);
        modal.classList.remove('hidden');
    }

    const cerrarModal = (modalId) => {
        const modal = document.querySelector(`#${modalId}`);
        modal.classList.add('hidden');
    }

    return (
        <div className="h-screen overflow-auto">
            <Header
                IconoHeader={TriangleAlert}
                titulo="Registro de emergencias"
                subtitulo="Historial completo de incidentes registrados"
                textoBoton="+ Nueva Emergencia"
                // informacion={"Hola esta es la info"}
                onClick={() => abrirModal("modal-emergencia")}
            />

            {/* Container de la pagina */}
            <div className="p-6">

            </div>


            {/* Modal */}
            <div id="modal-emergencia" className="fixed inset-0 bg-black opacity-70 flex items-center justify-center">
                <div className="foreground w-4/5 h-9/12  p-6 rounded-2xl  mt-30 overflow-auto">
                    {/* Titulo */}
                    <div className="flex justify-between items-center ">
                        <div>
                            <h1 className="font-bold text-lg text-white">Nueva emergencia</h1>
                        </div>
                        <div>
                            <X onClick={() => cerrarModal("modal-emergencia")} className="text-white cursor-pointer" />
                        </div>
                    </div>

                    {/* Contenido */}
                    <div>
                        <FormEmergencia />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Emergencia;