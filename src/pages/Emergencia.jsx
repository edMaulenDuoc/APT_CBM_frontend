import { TriangleAlert, X } from "lucide-react";
import Header from "../components/Header";
import FormEmergencia from "../components/FormEmergencia";
import { useState, useEffect } from "react";
import emergenciaService from "../services/emergencia.service";
import Cargando from "../components/Cargando";
import CardEmergenciaa from "../components/CardEmergencia";
import Input from "../components/form/Input";
import DropDown from "../components/form/Dropdown";
import BotonSimple from "../components/buttons/BotonSimple";
import catalogosService from "../services/catalogos.service";

const Emergencia = () => {
    const [emergencias, setEmergencias] = useState([]);
    const [emergenciasFiltradas, setEmergenciasFiltradas] = useState([]);
    const [cargando, setCargando] = useState(true);

    const [search, setSearch] = useState("");              // valor del input
    const [tipoEmergencia, setTipoEmergencia] = useState(0); // id seleccionado en dropdown
    const [catalogos, setCatalogos] = useState({
        tiposEmergencia: []
    });

    const abrirModal = (modalId) => {
        document.querySelector(`#${modalId}`).classList.remove("hidden");
    };

    const cerrarModal = (modalId) => {
        document.querySelector(`#${modalId}`).classList.add("hidden");
    };

    useEffect(() => {
        const obtenerEmergencias = async () => {
            const data = await emergenciaService.getEmergencias();
            setEmergencias(data);
            setEmergenciasFiltradas(data); // inicial
            setCargando(false);
        };

        const obtenerCatalogos = async () => {
            const tiposEmergencia = await catalogosService.getTiposEmergencia();
            setCatalogos({ tiposEmergencia });
        };

        obtenerEmergencias();
        obtenerCatalogos();
    }, []);

    const aplicarFiltros = () => {
        let resultado = emergencias;

        if (tipoEmergencia != 0) {
            resultado = resultado.filter((e) => e.tipo_id == tipoEmergencia);
        }

        if (search.trim() !== "") {
            resultado = resultado.filter(
                (emergencia) =>
                    emergencia.id.toString().includes(search) ||
                    emergencia.direccion.toLowerCase().includes(search.toLowerCase()) ||
                    emergencia.tipo.descripcion
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                    (emergencia.obac &&
                        `${emergencia.obac.nombre} ${emergencia.obac.apellido_pat} ${emergencia.obac.apellido_mat}`
                            .toLowerCase()
                            .includes(search.toLowerCase())) ||
                    emergencia.vehiculos.some((ve) =>
                        ve.vehiculo.vehiculo.toLowerCase().includes(search.toLowerCase())
                    )
            );
        }

        setEmergenciasFiltradas(resultado);
    };

    useEffect(() => {
        aplicarFiltros();
    }, [search, tipoEmergencia, emergencias]);

    const handleTipoEmergencia = (e) => {
        setTipoEmergencia(Number(e.target.value));
    };

    const handleBuscar = (e) => {
        setSearch(e.target.value);
    };

    const limpiarFiltros = () => {
        setSearch("");
        setTipoEmergencia(0);
    };

    return (
        <div className="h-screen overflow-auto">
            <Header
                IconoHeader={TriangleAlert}
                titulo="Registro de emergencias"
                subtitulo="Historial completo de incidentes registrados"
                textoBoton="+ Nueva Emergencia"
                onClick={() => abrirModal("modal-emergencia")}
            />

            {/* Container de la pagina */}
            <div className="p-6 px-8 md:px-20">
                {/* Filtro */}
                <div className="foreground px-6 py-2 w-full mb-10 rounded-2xl">
                    <h1>Filtros y búsqueda</h1>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                        <div>
                            <Input
                                type="text"
                                name="buscar"
                                placeholder="Buscar por ID, dirección, obac, vehículo..."
                                label="Buscar"
                                value={search}
                                onChange={handleBuscar}
                            />
                        </div>
                        <div>
                            <DropDown
                                label="Tipo de emergencia"
                                name="tipoEmergencia"
                                onChange={handleTipoEmergencia}
                                options={catalogos.tiposEmergencia}
                                valorInicial={tipoEmergencia}
                            />
                        </div>
                        <div></div>
                        <div className="flex justify-end items-end">
                            <BotonSimple
                                textoBoton={"Limpiar filtros"}
                                icono={<X />}
                                onClick={limpiarFiltros}
                            />
                        </div>
                    </div>
                </div>

                {cargando ? (
                    <Cargando />
                ) : emergenciasFiltradas.length === 0 ? (
                    <p>No hay emergencias registradas.</p>
                ) : (
                    <div className="space-y-10 ">
                        {emergenciasFiltradas.map((emergencia) => (
                            <div key={emergencia.id}>
                                <CardEmergenciaa emergencia={emergencia} />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal */}
            <div id="modal-emergencia" className="hidden -z-50">
                <div className="fixed inset-0 flex items-center justify-center">

                    {/* Fondo semitransparente */}
                    <div className="absolute inset-0 bg-black opacity-80"></div>

                    {/* Contenido del modal */}
                    <div className="relative foreground w-4/5 h-9/12 p-6 rounded-2xl mt-30 overflow-auto">
                        {/* Título */}
                        <div className="flex justify-between items-center">
                            <h1 className="font-bold text-lg text-white">Nueva emergencia</h1>
                            <X
                                onClick={() => cerrarModal("modal-emergencia")}
                                className="text-white cursor-pointer"
                            />
                        </div>

                        {/* Contenido */}
                        <FormEmergencia />
                    </div>

                </div>
            </div>

        </div>
    );
};

export default Emergencia;
