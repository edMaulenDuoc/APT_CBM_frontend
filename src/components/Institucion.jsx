import Input from "./form/Input";
import DropDown from "./form/Dropdown";
import { X } from "lucide-react";

const Institucion = ({ id, key, data }) => {
    const eliminarInstitucion = (key) => {

    }
    return (
        <div key={key} className="mt-4  bg-gray-800 p-4 rounded">
            <div className="flex justify-between">
                <h3 className="font-semibold text-white mb-2">Institución {id}</h3>
                <X className="text-white cursor-pointer transition-all hover:scale-125 active:scale-90" onClick={() => eliminarInstitucion(key)} />
            </div>
            <div className="mt-3 grid-cols-1 md:grid md:grid-cols-3 gap-6">
                <DropDown label="Tipo de apoyo" name={"apoyo"} />
                <div className="flex flex-col">
                    <span>Solicitado </span>
                    <span>hora</span>
                </div>

                <div className="flex flex-col">
                    <span>En el lugar</span>
                    <span>hora</span>
                </div>
            </div>
        </div>
    )
}
export default Institucion;