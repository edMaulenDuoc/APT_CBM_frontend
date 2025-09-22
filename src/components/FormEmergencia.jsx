import { useState } from "react";
import { Truck, Plus } from "lucide-react";
import DropDown from "./form/Dropdown";
import Input from "./form/Input";
import Institucion from "./Institucion";

const FormEmergencia = () => {
    const [instituciones, setInstituciones] = useState([1]);

    const options = [
        { value: 1, label: "Incendio" },
        { value: 2, label: "Inundación" },
        { value: 3, label: "Terremoto" }
    ]

    const trucks = [
        { id: 1, compania: "Compañía 1", vehiculos: [{ id: 1, vehiculo: "ABCD12" }, { id: 2, vehiculo: "EFGH34" }] },
        { id: 2, compania: "Compañía 2", vehiculos: [{ id: 3, vehiculo: "IJKL56" }, { id: 4, vehiculo: "MNOP78" }] },
        { id: 3, compania: "Compañía 3", vehiculos: [{ id: 5, vehiculo: "QRST90" }, { id: 6, vehiculo: "UVWX12" }] },
        { id: 4, compania: "Compañía 4", vehiculos: [{ id: 7, vehiculo: "YZAB34" }, { id: 8, vehiculo: "CDEF56" }] },
        { id: 5, compania: "Compañía 5", vehiculos: [{ id: 9, vehiculo: "GHIJ78" }, { id: 10, vehiculo: "KLMN90" }] },
        { id: 6, compania: "Compañía 6", vehiculos: [{ id: 11, vehiculo: "OPQR12" }, { id: 12, vehiculo: "STUV34" }] },

    ]

    const agregarInstitucion = async () => {
        setInstituciones([...instituciones, instituciones.length + 1]);
    }

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
                <div>
                    <DropDown label="Tipo de emergencia" options={options} />
                </div>
                <div>
                    <Input label="Dirección" type="text" name="direccion" placeholder="Ingrese la ubicación de la emergencia" />
                </div>
            </div>

            <div className="mt-6">
                <div className="flex items-center">
                    <h1 className="font-bold text-lg text-white">Unidades a despachar</h1>
                    <Truck className="text-white ml-2" />
                </div>
                {/* Vehiculos a despachar */}
                <div>
                    <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
                        {trucks.map((compania) => (
                            <div key={compania.id} className="mt-4  bg-gray-800 p-2 rounded">
                                <h3 className="font-semibold text-white mb-2">Compañía {compania.id}</h3>
                                <div className="flex flex-col gap-2">
                                    {compania.vehiculos.map((vehiculo) => (
                                        <div key={vehiculo.id} className="flex items-center gap-2">
                                            <input
                                                value={vehiculo.vehiculo}
                                                type="checkbox"
                                            />
                                            <span className="text-white">{vehiculo.vehiculo}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Apoyos otras instituciones */}
            <div className="mt-6">
                <div className="flex items-center">
                    <h1 className="font-bold text-lg text-white">Apoyo de otras instituciones</h1>
                    <Plus className="text-white ml-2 rounded-full bg-gray-400 transition-all
                                     hover:scale-125 hover:cursor-pointer active:scale-75"
                        onClick={agregarInstitucion} />
                </div>

                <div id="contenedor-instituciones">
                    {instituciones.map((inst, index) => (
                        <Institucion key={index} id={inst} />
                    ))}
                </div>
            </div>
        </div>
    )
}


export default FormEmergencia;