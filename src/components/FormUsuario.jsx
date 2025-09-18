import { BotOff, Save } from "lucide-react"
import Switch from "./buttons/Switch"
import DropDown from "./form/Dropdown"
import Input from "./form/Input"
import BotonRojo from "./buttons/BotonRojo"
import BotonSimple from "./buttons/BotonSimple"

const FormUsuario = ({   editando = false
                        
                        
                        }) =>{
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
                        label={"Nombre*"}/>
                    </div>

                    {/* Apellido Paterno */}
                    <div>
                    <Input
                        type={"text"}
                        name={"apellido paterno"}
                        label={"Apellido Paterno*"}/>
                    </div>

                    {/* Apellido Materno */}
                    <div>
                    <Input
                        type={"text"}
                        name={"apellido materno"}
                        label={"Apellido Materno*"}/>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    {/* Rut */}
                    <div>
                    <Input
                        type={"text"}
                        name={"rut"}
                        label={"Rut*"}/>
                    </div>

                    {/* Dirección */}
                    <div>
                    <Input
                        type={"text"}
                        name={"direccion"}
                        label={"Dirección"}/>
                    </div>

                    {/* Teléfono */}
                    <div>
                    <Input
                        type={"number"}
                        name={"telefono"}
                        label={"Telefono"}/>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    {/* Email */}
                    <div>
                        <Input
                            type={"email"}
                            name={"email"}
                            label={"Correo electronico"}/>
                    </div>
                </div>
                
            </div>
            {/* info bomberos */}
            <div className="foreground rounded-md p-6 m-6">
                <h3 className="text-xl mb-3">Información del bombero</h3>
                <div className="grid grid-cols-1 md:grid-cols-3  gap-4 mt-4" >
                    <DropDown
                        label={"Tipo de usuario"}/> 
                    <div></div>
                    <DropDown
                        label={"Asignación de compañia"}/> 
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
                                name={"Fecha"}
                                label={"Fecha de ingreso"}/>
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
                            />
                        </div>
                    </div>
                
            </div>
        </div>
    )
}
export default FormUsuario