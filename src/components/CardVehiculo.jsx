import { Truck, MapPinned } from "lucide-react";
import BotonRojo from "./buttons/BotonRojo";
import BotonSimple from "./buttons/BotonSimple";
const CardVehiculo = ({ vehiculo }) => {
    console.log("Vehículo en CardVehiculo:", vehiculo);

    return (
        <div className="foreground p-4 rounded-2xl hover:shadow-lg min-w-64 ">
            <div className="flex flex-col gap-4 items-center">
                <div className="bg-red-900 p-2 rounded-full">
                    <p className="font-bold">{vehiculo.compania.compania}</p>
                </div>
                <Truck />
                <p>{vehiculo.vehiculo}</p>
                <BotonSimple
                    textoBoton={"Marcar llegada"}
                    icono={<MapPinned />}
                    onClick={() => {
                        console.log("Marcar llegada de vehículo", vehiculo.id);
                    }}
                />
            </div>
        </div>
    );
};

export default CardVehiculo;