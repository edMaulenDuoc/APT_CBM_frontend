import Header from "../components/Header"
// Iconos
import { Truck, User, Users, X } from "lucide-react";
// Hooks
import { useNavigate } from "react-router-dom";
//Componentes
import CardListaCompanias from "../components/CardListaCompanias";
import CardContadores from "../components/CardContadores";
import BotonSimple from "../components/buttons/BotonSimple";
import Input from "../components/form/Input";
import DropDown from "../components/form/Dropdown";
import TablaListaCompania from "../components/TablaListaCompania";
import { useState } from "react";

const Usuarios = () => {
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate("/agregarUsuario");
    }

    const [companiaSeleccionada, setCompaniaSeleccionada] = useState(null);

    const abrirModal = (id_compania) => {
        setCompaniaSeleccionada(id_compania);
        const modal = document.querySelector("#modal-lista-compania");
        modal.classList.remove('hidden');
    }

    const cerrarModal = () => {
        setCompaniaSeleccionada(null);
        const modal = document.querySelector("#modal-lista-compania");
        modal.classList.add('hidden');
    }

    return (
        <div className="overflow-y-auto h-screen">
            <Header
                IconoHeader={User}
                titulo="Gesti&oacute;n de usuarios"
                subtitulo="Adeministrar los usuarios del sistema"
                textoBoton="+ Nuevo usuario"
                // Muestra la notificación de prueba
                onClick={handleSubmit}
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
                    id_compania = {1}
                    titulo="Primera Compa&ntilde;&iacute;a"
                    lema="Abnegación y Disciplina"
                    logo="../assets/react.svg"
                    abrirModal={abrirModal}
                />
                <CardListaCompanias
                    id_compania = {2}
                    titulo="Segunda Compa&ntilde;&iacute;a"
                    lema="Abnegación y Disciplina"
                    logo="../assets/react.svg"
                    abrirModal={abrirModal}
                />
                <CardListaCompanias
                    id_compania = {3}
                    titulo="Tercera Compa&ntilde;&iacute;a"
                    lema="Abnegación y Disciplina"
                    logo="../assets/react.svg"
                    abrirModal={abrirModal}
                />
                <CardListaCompanias
                    id_compania = {4}
                    titulo="Cuarta Compa&ntilde;&iacute;a"
                    lema="Abnegación y Disciplina"
                    logo="../assets/react.svg"
                    abrirModal={abrirModal}
                />
                <CardListaCompanias
                    id_compania = {5}
                    titulo="Quinta Compa&ntilde;&iacute;a"
                    lema="Abnegación y Disciplina"
                    logo="../assets/react.svg"
                    abrirModal={abrirModal}
                />
                <CardListaCompanias
                    id_compania = {6}
                    titulo="Sexta Compa&ntilde;&iacute;a"
                    lema="Abnegación y Disciplina"
                    logo="../assets/react.svg"
                    abrirModal={abrirModal}
                />
                <CardListaCompanias
                    id_compania = {7}
                    titulo="Septima Compa&ntilde;&iacute;a"
                    lema="Abnegación y Disciplina"
                    logo="../assets/react.svg"
                    abrirModal={abrirModal}
                />
            </div>
            <div id="modal-lista-compania" className="hidden fixed inset-0 bg-black opacity-100 flex items-center justify-center">
                <div className="foreground w-4/5 h-9/12  p-6 rounded-2xl  mt-30 overflow-auto">
                    {/* Titulo */}
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="font-bold text-lg text-white">Lista {companiaSeleccionada} Compañía</h1>
                        </div>
                        <div>
                            <X onClick={() => cerrarModal("modal-lista-compania")} className="text-white cursor-pointer"/>
                        </div>
                    </div>
                    {/* Contenido */}
                    <div>
                        {companiaSeleccionada && (
                            <TablaListaCompania
                                id_compania={companiaSeleccionada}/>
                        )}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Usuarios;