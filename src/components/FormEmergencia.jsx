/* Iconos */
import { Truck, Plus } from "lucide-react";
/* Componentes */
import DropDown from "./form/Dropdown";
import Input from "./form/Input";
import Institucion from "./Institucion";
import VehiculosCompania from "./VehiculosCompania";
import BotonRojo from "./buttons/BotonRojo";
import BotonSimple from "./buttons/BotonSimple";
/* Servicios     */
import notify from "../services/notify.service";
import { validarFormEmergencia } from "../validations/validacionFormularios";
import emergenciaService from "../services/emergencia.service";
/* Hooks */
import { useState, useEffect } from "react";
import useCatalogo from "../hooks/useCatalogo";

const FormEmergencia = ({ formInicial = null, onClose, onSaved, catalogos, obtenerEmergencias }) => {
    // formVacio se usa cuando es nueva emergencia
    const formVacio = { id: null, key: Date.now(), tipo_id: 0, direccion: "", vehiculos: [], instituciones: [], compania_obac: 0, obac_id: 0 };
    const [formData, setFormData] = useState(formVacio);
    const catalogoCompania = useCatalogo(catalogos.companias, "id", "compania");
    const [catalogoUsuarios, setCatalogoUsuarios] = useState([]);

    /* Si el componente recibe un formulario inicial, lo establece en el estado de formData */
    useEffect(() => {
        if (formInicial) {
            const clon = JSON.parse(JSON.stringify(formInicial));

            setFormData({
                id: clon.id,
                tipo_id: clon.tipo_id ?? clon.tipo?.id ?? 0,
                direccion: clon.direccion ?? "",
                vehiculos: (clon.vehiculos || []).map(v => v.vehiculo_id),
                instituciones: clon.apoyos ?? [],
                compania_obac: clon.obac?.compania.id ?? 0,
                obac_id: clon.obac_id ?? 0
            });

        } else {
            setFormData(formVacio);
        }
    }, [formInicial]);

    /* Agrega una institucion al formulario */
    const agregarInstitucion = () => {
        setFormData(prev => ({
            ...prev,
            instituciones: [
                ...prev.instituciones,
                { id: null, key: Date.now(), tipo_apoyo_id: null, solicitado: null, en_lugar: null }
            ]
        }));
    };

    /* Maneja los cambios en los inputs del formulario */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    /* Maneja la selección de vehículos */
    const handleSelectVehiculo = (e) => {
        setFormData(prev => {
            const value = Number(e.target.value);
            return prev.vehiculos.includes(value)
                ? { ...prev, vehiculos: prev.vehiculos.filter(v => v !== value) }
                : { ...prev, vehiculos: [...prev.vehiculos, value] };
        });
    };

    /* Maneja la selección de instituciones */
    const handleSelectInstitucion = (key, value) => {
        setFormData(prev => ({
            ...prev,
            instituciones: prev.instituciones.map(inst =>
                inst.key === key ? { ...inst, tipo_apoyo_id: Number(value) } : inst
            )
        }));
    };

    /* Elimina una institucion del formulario */
    const eliminarInstitucion = (key) => {
        setFormData(prev => ({
            ...prev,
            instituciones: prev.instituciones.filter(inst => inst.key !== key)
        }));
    };

    /* Envía el formulario tanto para crear como para editar usa formData.id para determinar la acción */
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

    /* Efecto para actualizar el catálogo de usuarios que se usa en el select de asignacion de obac */
    useEffect(() => {
        const compania = catalogos.companias.find(c => c.id == formData.compania_obac)

        setCatalogoUsuarios(
            compania
                ? compania.usuarios.map(u => ({ value: u.id, label: `${u.nombre} ${u.apellido_pat}` }))
                : []
        );
    }, [formData.compania_obac]);

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
                                            obtenerEmergencias={obtenerEmergencias}
                                        />
                                    </div>
                                );
                            })}
                        </>
                    )}
                </div>
            </div>

            {/* Asignar Obac */}
            <div className="mt-8">
                <div className="pt-6">
                    <h1 className="font-bold text-lg text-white">Asignar Obac</h1>
                </div>

                <div className="grid grid-cols-3 gap-6 pt-6">
                    <div>
                        <DropDown name="compania_obac" label="Compañia" options={catalogoCompania} onChange={handleChange} valorInicial={formData.compania_obac} />
                    </div>
                    <div>
                        <DropDown name="obac_id" label="Usuario (primero seleccione una compañia)" options={catalogoUsuarios} onChange={handleChange} valorInicial={formData.obac_id} />
                    </div>
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