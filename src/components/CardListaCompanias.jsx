import BotonSimple from "../components/buttons/BotonSimple";
import { Eye } from "lucide-react";
const CardListaCompanias = ({titulo , lema ,logo ,id_compania}) => {
    return (
        <div className="flex flex-col foreground rounded-lg p-4 hover:shadow-lg hover:scale-110">
            <div className="flex ">
                <div className="flex flex-col justify-center w-1/2 gap-3">
                    <h3 className="font-bold">{titulo}</h3>
                    <p className="">{lema}</p>
                </div>
                <div className="flex justify-center w-1/2">
                    <img src={logo} alt="" className="min-h-20 max-h-28 min-w-20 max-w-28  rounded-xl overflow-hidden" />
                </div>
            </div>
            <div className="">
                {<BotonSimple icono={<Eye/>} textoBoton="Ver Lista"/>}
            </div>
        </div>
    )
}

export default CardListaCompanias