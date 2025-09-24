// Iconos
import { Flame, LogIn } from "lucide-react";
// Hooks
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
// Validaciones y servicios
import { validarLogin } from "../validations/validacionFormularios";
import notify from "../services/notify.service";
// Componentes
import Input from "./form/Input";
import BotonRojo from "./buttons/BotonRojo";

const LoginHeader = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        usuario: "admin",
        clave: "123456"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = (formData) => {
        const { esValido, mensaje } = validarLogin(formData);

        if (!esValido) {
            notify.info(mensaje);
            return;
        }

        login(formData)
            .then(() => {
                notify.success("Bienvenido " + formData.usuario);
                navigate("/emergencias");
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div className="foreground p-4 flex justify-between fixed w-full top-0 left-0 shadow-md h-19 items-center z-10">
            <div>
                <Flame className="h-14 w-14 text-primary-foreground mr-2 icon-color" />
            </div>
            <div className="flex items-center gap-5">
                <div className="">
                    <Input
                        type="text"
                        name="usuario"
                        placeholder="Usuario"
                        value={formData.usuario}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <Input
                        type="password"
                        name="clave"
                        placeholder="Contraseña"
                        value={formData.clave}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <BotonRojo textoBoton={"Acceder"} onClick={() => handleSubmit(formData)} />
                </div>
            </div>
        </div>
    );
}

export default LoginHeader;
