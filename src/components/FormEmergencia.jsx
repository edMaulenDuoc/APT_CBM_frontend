import { useState, useEffect } from "react";
import { Truck, Plus } from "lucide-react";
import DropDown from "./form/Dropdown";
import Input from "./form/Input";
import Institucion from "./Institucion";
import VehiculosCompania from "./VehiculosCompania";
import BotonRojo from "./buttons/BotonRojo";
import { validarFormEmergencia } from "../validations/validacionFormularios";
import notify from "../services/notify.service";
import emergenciaService from "../services/emergencia.service";
import BotonSimple from "./buttons/BotonSimple";

const FormEmergencia = ({ formInicial = null, onClose, onSaved, catalogos }) => {
    const formVacio = { id: null, key: Date.now(), tipo_id: 0, direccion: "", vehiculos: [], instituciones: [] };
    const [formData, setFormData] = useState(formVacio);


    useEffect(() => {
        if (formInicial) {
            const clon = JSON.parse(JSON.stringify(formInicial));

            setFormData({
                id: clon.id,
                tipo_id: clon.tipo_id ?? clon.tipo?.id ?? 0,
                direccion: clon.direccion ?? "",
                vehiculos: (clon.vehiculos || []).map(v => v.vehiculo_id),
                instituciones: clon.apoyos ?? []
            });

        } else {
            setFormData(formVacio);
        }
    }, [formInicial]);

    const agregarInstitucion = () => {
        setFormData(prev => ({
            ...prev,
            instituciones: [
                ...prev.instituciones,
                { id: null, key: Date.now(), tipo_apoyo_id: null, solicitado: null, en_lugar: null }
            ]
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSelectVehiculo = (e) => {
        setFormData(prev => {
            const value = Number(e.target.value);
            return prev.vehiculos.includes(value)
                ? { ...prev, vehiculos: prev.vehiculos.filter(v => v !== value) }
                : { ...prev, vehiculos: [...prev.vehiculos, value] };
        });
    };

    const handleSelectInstitucion = (key, value) => {
        setFormData(prev => ({
            ...prev,
            instituciones: prev.instituciones.map(inst =>
                inst.key === key ? { ...inst, tipo_apoyo_id: Number(value) } : inst
            )
        }));
    };

    const eliminarInstitucion = (key) => {
        setFormData(prev => ({
            ...prev,
            instituciones: prev.instituciones.filter(inst => inst.key !== key)
        }));
    };

    const handleSubmit = async () => {
        const { esValido, mensaje } = validarFormEmergencia(formData);
        let guardado = false;

        if (!esValido) {
            notify.error(mensaje);
            return;
        }

        if (formData.id !== null && formData.id !== undefined) {
            guardado = await emergenciaService.editarEmergencia(formData);
        } else {
            guardado = await emergenciaService.registrarEmergencia(formData);
        }

        if (!guardado) {
            notify.error("No se pudo realizar la operación");
            return;
        }

        onSaved && onSaved();
    }

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
                <div>
                    <DropDown name="tipo_id" label="Tipo de emergencia" options={catalogos.tiposEmergencia} onChange={handleChange} valorInicial={formData.tipo_id} />
                </div>
                <div>
                    <Input label="Dirección" type="text" name="direccion" placeholder="Ingrese la ubicación de la emergencia" onChange={handleChange} value={formData.direccion} />
                </div>
            </div>

            <div className="mt-6">
                <div className="flex items-center">
                    <h1 className="font-bold text-lg text-white">Unidades a despachar</h1>
                    <Truck className="text-white ml-2" />
                </div>
                {/* Vehiculos a despachar */}
                <div>
                    <div className="grid md:grid-cols-4 grid-cols-1 gap-4  px-6 mt-4">
                        {catalogos.companias.length > 0 &&
                            catalogos.companias.map((c) => (
                                <div key={c.id}>
                                    <VehiculosCompania compania={c} onChange={handleSelectVehiculo} vehiculosEmergencia={formData.vehiculos} />
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

                <div id="contenedor-instituciones" className="flex flex-col items-center">
                    {catalogos.tiposApoyo.length > 0 && (
                        <>
                            {formData.instituciones.map((inst, index) => {
                                console.log("Render institucion:", inst);

                                return (
                                    <div key={index}>
                                        <Institucion
                                            key_inst={inst.key}
                                            id={inst.id}
                                            index={index}
                                            tiposApoyo={catalogos.tiposApoyo}
                                            valorInicial={inst.tipo_apoyo_id}
                                            onChange={handleSelectInstitucion}
                                            onRemove={eliminarInstitucion}
                                            horaSolicitud={inst.hora_solicitud}
                                            horaEnLugar={inst.hora_llegada}
                                        />
                                    </div>
                                );
                            })}
                        </>
                    )}
                </div>
            </div>

            <div className="mt-6 w-full flex justify-end p-5 gap-10">
                <BotonSimple onClick={() => onClose && onClose()} textoBoton="Cancelar" />
                <BotonRojo textoBoton={formData.id ? "Actualizar" : "Crear Emergencia"} onClick={handleSubmit} />
            </div>
        </div>
    )
}


export default FormEmergencia;