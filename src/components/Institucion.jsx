import DropDown from "./form/Dropdown";
import { X } from "lucide-react";

const Institucion = ({ id, opciones, onChange, onRemove, valorInicial = 0, index = 1 }) => {
    return (
        <div className="mt-4 bg-gray-800 p-4 rounded">
            <div className="flex justify-between">
                <h3 className="font-semibold text-white mb-2">Institución {index+1}</h3>
                <X
                    className="text-white cursor-pointer transition-all hover:scale-125 active:scale-90"
                    onClick={() => onRemove(id)}
                />
            </div>
            <div className="mt-3 grid-cols-1 md:grid md:grid-cols-3 gap-6">
                <DropDown
                    label="Tipo de apoyo"
                    name="tipo_apoyo_id"
                    options={opciones}
                    valorInicial={valorInicial} 
                    onChange={(e) => onChange(id, e.target.value)}
                />
                <div className="flex flex-col md:mt-0 mt-4">
                    <span>Solicitado</span>
                    <span>-- : --</span>
                </div>
                <div className="flex flex-col md:mt-0 mt-4">
                    <span>En el lugar</span>
                    <span>-- : --</span>
                </div>
            </div>
        </div>
    );
};

export default Institucion;
