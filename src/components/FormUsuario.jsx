import {Save } from "lucide-react"
import Switch from "./buttons/Switch"
import DropDown from "./form/Dropdown"
import Input from "./form/Input"
import BotonRojo from "./buttons/BotonRojo"
import BotonSimple from "./buttons/BotonSimple"
import notify from "../services/notify.service"
// Validaciones y servicios
import { validarFormUsuarios } from "../validations/validacionFormularios"
import { useEffect, useState } from "react"
import catalogosService from "../services/catalogos.service"


const FormUsuario = ({   editando = false                    
                        }) =>{
    
    const [catalogos, setCatalogos ] = useState({
        tiposUsuario: [],
        companiasDropDown: []
    });

    useEffect(() => {
        const obtenerCatalogos = async () => {
            const tiposUsuario = await catalogosService.getTiposUsuario();
            const companiasDropDown = await catalogosService.getCompaniasDropDown();
            setCatalogos({ companiasDropDown, tiposUsuario });
        };

        obtenerCatalogos();
    }, []);

    const [formData, setFormData ] = useState({
        nombre: "Patricio",
        apellido_pat: "Hurtado",
        apellido_mat: "Cerda",
        rut: "18869522-1",
        direccion: "Valdes 971",
        telefono: "75997628",
        email: "pat.hurtado@duocuc.cl",
        tipoUsuario: 0,
        compania: 0
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    
    const handleSubmit = (formData) => {
        const {esValido, mensaje} = validarFormUsuarios(formData);

        if (!esValido) {
            notify.success(mensaje);
            return;
        }

        console.log("Formulario válido:", formData);
    };
    
    return(
        <div>
            {/*info personal */}
            <div className="foreground rounded-md p-6 m-6">
                <h3 className="text-xl mb-3">Información personal</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    {/* Nombre */} 
                    <div>
                    <Input
                        type={"text"}
                        name={"nombre"}
                        label={"Nombre*"}
                        value={formData.nombre}
                        onChange={handleChange}/>
                    </div>

                    {/* Apellido Paterno */}
                    <div>
                    <Input
                        type={"text"}
                        name={"apellido_pat"}
                        label={"Apellido Paterno*"}
                        value={formData.apellido_pat}
                        onChange={handleChange}/>
                    </div>

                    {/* Apellido Materno */}
                    <div>
                    <Input
                        type={"text"}
                        name={"apellido_mat"}
                        label={"Apellido_Materno*"}
                        value={formData.apellido_mat}
                        onChange={handleChange}/>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    {/* Rut */}
                    <div>
                    <Input
                        type={"text"}
                        name={"rut"}
                        label={"Rut*"}
                        value={formData.rut}
                        onChange={handleChange}/>
                    </div>

                    {/* Dirección */}
                    <div>
                    <Input
                        type={"text"}
                        name={"direccion"}
                        label={"Dirección"}
                        value={formData.direccion}
                        onChange={handleChange}/>
                    </div>

                    {/* Teléfono */}
                    <div>
                    <Input
                        type={"number"}
                        name={"telefono"}
                        label={"Telefono"}
                        value={formData.telefono}
                        onChange={handleChange}/>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    {/* Email */}
                    <div>
                        <Input
                            type={"email"}
                            name={"email"}
                            label={"Correo electronico"}
                            value={formData.email}
                            onChange={handleChange}/>
                    </div>
                </div>
                
            </div>
            {/* info bomberos */}
            <div className="foreground rounded-md p-6 m-6">
                <h3 className="text-xl mb-3">Información del bombero</h3>
                <div className="grid grid-cols-1 md:grid-cols-3  gap-4 mt-4" >
                    <DropDown
                        name={"tipoUsuario"}
                        label={"Tipo de usuario"}
                        valorInicial={ formData.tipoUsuario }
                        options={catalogos.tiposUsuario}
                        onChange={handleChange}
                        /> 
                    <DropDown
                        name={""}
                        label={"Cargo"}
                        />
                    <DropDown
                        name={"compania"}
                        label={"Asignacion de compañia"}
                        valorInicial={ formData.compania }
                        options={ catalogos.companiasDropDown }
                        onChange={ handleChange } 
                        /> 
                </div>
                {/* Usuario activo */}
                {editando &&

                    <div className="mt-4">
                        <Switch/>
                    </div>
                }
                
                {/* Fecha ingreso */}
                {!editando &&
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div>
                            <Input
                                type={"date"}
                                name={"fecha"}
                                label={"Fecha de ingreso"}
                                value={formData.fecha}
                                onChange={handleChange}/>
                        </div>
                    </div>
                }
                

                {/* Observaciones */}
                <div className="mt-4">
                    <div className="mb-1">
                        <label className="text-white">Observaciones</label>
                    </div>
                    <textarea 
                        className="w-full border rounded-md px-3 py-2 text-sm  focus:ring-2 focus:ring-blue-500">
                    </textarea>
                </div>
                {/* Botones guardar o cancelar */}
                
                    <div className="flex justify-end gap-6 mt-4">
                        <div >
                            <BotonSimple
                            textoBoton="Cancelar"/>
                        </div>
                        <div>
                            <BotonRojo
                            icono={<Save/>}
                            textoBoton="Guardar"
                            onClick={() => handleSubmit(formData)}
                            />
                        </div>
                    </div>
                
            </div>
        </div>
    )
}
export default FormUsuario