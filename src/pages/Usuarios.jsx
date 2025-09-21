import Header from "../components/Header"
import CardListaCompanias from "../components/CardListaCompanias";
import CardContadores from "../components/CardContadores";
import { Truck, User, Users } from "lucide-react";
import notify from "../services/notify.service";
import BotonSimple from "../components/buttons/BotonSimple";
import Input from "../components/form/Input";
import DropDown from "../components/form/Dropdown";

const Usuarios = () => {
    const click = () => {
        notify.success("Notiicación de prueba");
    }

    return (
        <div className="overflow-y-auto h-screen">
            <Header
                IconoHeader={User}
                titulo="Gesti&oacute;n de usuarios"
                subtitulo="Adeministrar los usuarios del sistema"
                textoBoton="+ Nuevo usuario"
                // Muestra la notificación de prueba
                onClick={click}
            />

            <div className="foreground rounded-lg p-4 mt-12 m-8">
                <div className="flex justify-between">
                    <h3>Filtros B&uacute;squedas</h3>
                    <BotonSimple textoBoton="Limpiar Filtros"/>
                </div>
                <div className="flex justify-around">
                    < Input
                        name="searchGestionUsuario"
                        label="Busqueda de Voluntario"
                        type="search"
                        placeholder="Busqueda por nombre,rut,etc"
                    />
                    < DropDown
                        name="tipoUsuario"
                        options={[{value:1,label:"Voluntario Honorario"},{value:2,label:"Voluntario Insigne"},{value:3,label:"Voluntario Activo"}]}
                        label="Tipo Usuario"
                    />
                    < DropDown
                        name="compania"
                        options={[{value:1,label:"Primera Compañia"},{value:2,label:"Segunda Compañia"},{value:3,label:"Tercera Compañia"}]}
                        label="Compania"
                    />
                    < DropDown
                        name="estado"
                        options={[{value:1,label:"Activo"},{value:2,label:"No Activo"}]}
                        label="Estado"
                    />
                </div>
            </div>
            <div className="grid gap-8 m-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-20 mt-20">
                <CardContadores 
                    icono={<Users/>}
                    titulo="Total de Voluntarios"
                    conteo="20"
                />
                <CardContadores 
                    icono={<Users/>}
                    titulo="Voluntarios Activos"
                    conteo="102"
                />
                <CardContadores 
                    icono={<Users/>}
                    titulo="Voluntarios"
                    conteo="351"
                />
                <CardContadores 
                    icono={<Truck/>}
                    titulo="Conductores"
                    conteo="42"
                />
            </div>
            <div className="grid gap-8 m-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <CardListaCompanias
                    id_compania = "Id compania"
                    titulo="Primera Compa&ntilde;&iacute;a"
                    lema="Abnegación y Disciplina"
                    logo="../assets/react.svg"
                />
                <CardListaCompanias
                    id_compania = "Id compania"
                    titulo="Segunda Compa&ntilde;&iacute;a"
                    lema="Abnegación y Disciplina"
                    logo="../assets/react.svg"
                />
                <CardListaCompanias
                    id_compania = "Id compania"
                    titulo="Tercera Compa&ntilde;&iacute;a"
                    lema="Abnegación y Disciplina"
                    logo="../assets/react.svg"
                />
                <CardListaCompanias
                    id_compania = "Id compania"
                    titulo="Cuarta Compa&ntilde;&iacute;a"
                    lema="Abnegación y Disciplina"
                    logo="../assets/react.svg"
                />
                <CardListaCompanias
                    id_compania = "Id compania"
                    titulo="Quinta Compa&ntilde;&iacute;a"
                    lema="Abnegación y Disciplina"
                    logo="../assets/react.svg"
                />
                <CardListaCompanias
                    id_compania = "Id compania"
                    titulo="Sexta Compa&ntilde;&iacute;a"
                    lema="Abnegación y Disciplina"
                    logo="../assets/react.svg"
                />
                <CardListaCompanias
                    id_compania = "Id compania"
                    titulo="Septima Compa&ntilde;&iacute;a"
                    lema="Abnegación y Disciplina"
                    logo="../assets/react.svg"
                />
            </div>
        
        </div>
    )
}

export default Usuarios;