/* Iconos */
import { X, MapPinned } from "lucide-react";
/* Servicios     */
import emergenciaService from "../services/emergencia.service";
/* Componentes */
import BotonRojo from "./buttons/BotonRojo";
import DropDown from "./form/Dropdown";
/* Hooks */
import { useState } from "react";


const Institucion = ({
    key_inst,
    id,
    tiposApoyo,
    onChange,
    onRemove,
    valorInicial = 0,
    index = 1,
    horaSolicitud,
    horaEnLugar,
    obtenerEmergencias }) => {

    const [hora_llegada, setHoraLlegada] = useState(horaEnLugar ? new Date(horaEnLugar).toLocaleString() : null);

    const handleLlegadaClick = async () => {
        try {
            const response = await emergenciaService.marcarLlegadaInstitucion(id);

            if (response.status === 200) {
                console.log(new Date().toLocaleString());

                setHoraLlegada(new Date().toLocaleString());
                await obtenerEmergencias();
            }
        } catch (error) {
            console.error("Error al marcar la llegada de la institución:", error);
        }
    }

    return (
        <div className={`mt-4 bg-gray-800 p-4 rounded border-l-4 w-full
                        ${horaSolicitud ? "border-red-600" : "border-green-500"} 
                        `}>
            <div className="flex justify-between">
                <h3 className="font-semibold text-white mb-2">Institución {index + 1} id: {id}</h3>
                <X
                    className="text-white cursor-pointer transition-all hover:scale-125 active:scale-90"
                    onClick={() => onRemove(key_inst)}
                />
            </div>
            <div className="mt-3 grid-cols-1 md:grid md:grid-cols-3 gap-6 items-center">
                <DropDown
                    label="Tipo de apoyo"
                    name="tipo_apoyo_id"
                    options={tiposApoyo}
                    valorInicial={valorInicial}
                    onChange={(e) => onChange(key_inst, e.target.value)}
                />
                <div className="flex flex-col md:mt-0 mt-4">
                    <span>Solicitado</span>

                    {horaSolicitud ? <span>{new Date(horaSolicitud).toLocaleString()}</span> :
                        <span>-- : --</span>}
                </div>
                <div className="flex flex-col md:mt-0 mt-4">
                    <span>En el lugar </span>

                    {id && !hora_llegada ?
                        <div className="pt-2">
                            <BotonRojo
                                textoBoton={"Marcar llegada"}
                                onClick={handleLlegadaClick}
                                icono={<MapPinned />}
                            />
                        </div>
                        :
                        <span>{hora_llegada ? hora_llegada : "-- : --"}</span>
                    }
                </div>
            </div>
        </div>
    );
};

export default Institucion;
