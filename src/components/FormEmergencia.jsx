import { useState, useEffect } from "react";
import { Truck, Plus } from "lucide-react";
import DropDown from "./form/Dropdown";
import Input from "./form/Input";
import Institucion from "./Institucion";
import VehiculosCompania from "./VehiculosCompania";
import catalogosService from "../services/catalogos.service";
import Cargando from "./Cargando";
import BotonRojo from "./buttons/BotonRojo";
import { validarFormEmergencia } from "../validations/validacionFormularios";
import notify from "../services/notify.service";
import emergenciaService from "../services/emergencia.service";

const FormEmergencia = ({ }) => {
    const [cargando, setCargando] = useState(true);
    const [catalogos, setCatalogos] = useState({
        companias: [],
        tiposApoyo: [],
        tiposEmergencia: []
    });

    const [formData, setFormData] = useState({
        tipo_id: 0,
        direccion: "",
        vehiculos: [],
        instituciones: []
    });

    
    useEffect(() => {
        const obtenerCatalogos = async () => {
            const companias = await catalogosService.getCompanias();
            const tiposApoyo = await catalogosService.getTiposApoyo();
            const tiposEmergencia = await catalogosService.getTiposEmergencia();
            setCatalogos({ companias, tiposApoyo, tiposEmergencia });
            setCargando(false);
        }
        
        obtenerCatalogos();
    }, []);

    /* useEffect(() => {
        console.log(catalogos.companias);
        console.log(catalogos.tiposEmergencia);
        console.log(catalogos.tiposApoyo);

    }, [catalogos]); */


    const agregarInstitucion = () => {
        setFormData(prev => ({
            ...prev,
            instituciones: [
                ...prev.instituciones,
                { id: Date.now(), tipo_apoyo: null, solicitado: null, en_lugar: null }
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
            const { value } = e.target;
            return prev.vehiculos.includes(value)
                ? { ...prev, vehiculos: prev.vehiculos.filter(v => v !== value) }
                : { ...prev, vehiculos: [...prev.vehiculos, value] };
        });
    };

    const handleSelectInstitucion = (id, value) => {
        setFormData(prev => ({
            ...prev,
            instituciones: prev.instituciones.map(inst =>
                inst.id === id ? { ...inst, tipo_apoyo_id: Number(value) } : inst
            )
        }));
    };

    const eliminarInstitucion = (id) => {
        setFormData(prev => ({
            ...prev,
            instituciones: prev.instituciones.filter(inst => inst.id !== id)
        }));
    };

    const handleSubmit = () => {
        const { esValido, mensaje } = validarFormEmergencia(formData);
        
        if (!esValido) {
            notify.error(mensaje);
            return;
        }

        emergenciaService.registrarEmergencia(formData)
    }
    
    /*  useEffect(() => {
        console.log(formData);
    }, [formData]); */

    return (
        <div className="w-full">
            {cargando ? <Cargando />
                : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
                            <div>
                                <DropDown name="tipo_id" label="Tipo de emergencia"/*  options={catalogos.tiposEmergencia} */ onChange={handleChange} valorInicial={formData.tipo_id} />
                            </div>
                            <div>
                                <Input label="Dirección" type="text" name="direccion" placeholder="Ingrese la ubicación de la emergencia" onChange={handleChange} />
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
                                    {catalogos.companias.length > 0 &&
                                        catalogos.companias.map((c) => (
                                            <div key={c.id}>
                                                <VehiculosCompania compania={c} onChange={handleSelectVehiculo} />
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
                                {catalogos.tiposApoyo.length > 0 && (
                                    <>
                                        {formData.instituciones.map((inst, index) => (
                                            <Institucion
                                                key={inst.id}
                                                id={inst.id}
                                                index={index}
                                                opciones={catalogos.tiposApoyo}
                                                valorInicial={inst.tipo_apoyo_id}
                                                onChange={handleSelectInstitucion}
                                                onRemove={eliminarInstitucion}
                                            />
                                        ))}
                                    </>
                                )}
                            </div>
                        </div>


                        <div className="mt-6 w-full flex justify-end p-5">
                            <BotonRojo textoBoton="Crear Emergencia" onClick={handleSubmit} />
                        </div>
                    </>
                )
            }
        </div>
    )
}


export default FormEmergencia;