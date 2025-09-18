import { User } from "lucide-react";
import Header from "../components/Header";
import FormUsuario from "../components/FormUsuario";

const AgregarUsuarios =() =>{
    
    return (
        <div className="overflow-y-auto h-screen">
            <Header
                IconoHeader={User}
                titulo={"Gestión de usuarios"}
                subtitulo={"Administar los usarios del sistema"}
                
            />
            <FormUsuario
                
            />

        </div>

    )
}
export default AgregarUsuarios;