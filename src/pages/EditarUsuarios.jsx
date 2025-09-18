import Header from "../components/Header";
import FormUsuario from "../components/FormUsuario";
import { Edit } from "lucide-react";
import Switch from "../components/buttons/Switch";

const EditarUsuarios = () =>{
    return(
        <div className="overflow-y-auto h-screen">
            
            <Header
                
                IconoHeader={Edit}
                titulo={"Editar usuario"}
                subtitulo={"Modifica la informacion del usuario"}
            />
            <FormUsuario
                editando = {true}
                
            />
            
            
        </div>
        
    );   
};
export default EditarUsuarios;
