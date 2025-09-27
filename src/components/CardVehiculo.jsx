import { Truck, MapPinned } from "lucide-react";
import BotonRojo from "./buttons/BotonRojo";
import BotonSimple from "./buttons/BotonSimple";
const CardVehiculo = ({ vehiculoEmergencia, emergencia }) => {
    const compania = vehiculoEmergencia?.vehiculo?.compania?.compania || "Compañía Desconocida";
    const vehiculo = vehiculoEmergencia?.vehiculo?.vehiculo || "Vehículo Desconocido";

    console.log("Vehículo en CardVehiculo:", vehiculo, emergencia);

    return (
        <div className="foreground p-4 rounded-2xl hover:shadow-lg min-w-64 ">
            <div className="flex flex-col gap-4 items-center">
                <div className="bg-red-900 p-2 rounded-full">
                    <p className="font-bold">{compania}</p>
                </div>
                <Truck />
                <p>{vehiculo}</p>
                {emergencia.hora_6_3 ?
                    <p>------</p>
                    :
                    <BotonSimple
                        textoBoton={"Marcar llegada"}
                        icono={<MapPinned />}
                        onClick={() => {
                            console.log("Marcar llegada de vehículo", vehiculoEmergencia.vehiculo_id);
                        }}
                    />
                }
            </div>
        </div>
    );
};

export default CardVehiculo;