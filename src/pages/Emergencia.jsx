/* Iconos */
import { TriangleAlert, X } from "lucide-react";
/* Hooks */
import { useState, useEffect } from "react";
import { usePermiso } from "../hooks/usePermiso";
/* Componentes */
import Header from "../components/Header";
import FormEmergencia from "../components/FormEmergencia";
import Cargando from "../components/Cargando";
import CardEmergenciaa from "../components/CardEmergencia";
import Error from "../components/Error";

import Input from "../components/form/Input";
import DropDown from "../components/form/Dropdown";
import BotonSimple from "../components/buttons/BotonSimple";

/* Servicios */
import catalogosService from "../services/catalogos.service";
import emergenciaService from "../services/emergencia.service";

const Emergencia = () => {
    // Solo el usuario con ID 1 puede ver el botón de nueva emergencia y el de editar
    const checkPermiso = usePermiso([1]);

    /* Control de flujo */
    const [cargando, setCargando] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [error, setError] = useState(false);
    const [search, setSearch] = useState("");
    const [tipoEmergencia, setTipoEmergencia] = useState(0);

    /* Datos */
    const [emergencias, setEmergencias] = useState([]);
    const [emergenciasFiltradas, setEmergenciasFiltradas] = useState([]);
    const [emergenciaSeleccionada, setEmergenciaSeleccionada] = useState(null);
    const [catalogos, setCatalogos] = useState({
        companias: [],
        tiposApoyo: [],
        tiposEmergencia: []
    });

    /* Obtiene las emergencias para llenar el listado */
    const obtenerEmergencias = async () => {
        try {
            setCargando(true);
            const data = await emergenciaService.getEmergencias();
            setEmergencias(data);
            setEmergenciasFiltradas(data);
            setCargando(false);
        } catch (error) {
            setError(true);
            setCargando(false);
        }
    };

    /* Obtiene los catálogos necesarios para los filtros y formularios (dropdowns) */
    const obtenerCatalogos = async () => {
        try {
            setCargando(true);
            const companias = await catalogosService.getCompanias();
            const tiposApoyo = await catalogosService.getTiposApoyo();
            const tiposEmergencia = await catalogosService.getTiposEmergencia();
            setCatalogos({ companias, tiposApoyo, tiposEmergencia });
            setCargando(false);
        } catch (error) {
            setError(true);
            setCargando(false);
        }
    };

    /* Efecto para obtener las emergencias y los catálogos al cargar el componente */
    useEffect(() => {
        obtenerEmergencias();
        obtenerCatalogos();
    }, []);

    /* Aplica los filtros de búsqueda y tipo de emergencia */
    const aplicarFiltros = () => {
        let resultado = emergencias;

        /* Filtra por tipo de emergencia */
        if (tipoEmergencia != 0) {
            resultado = resultado.filter((e) => e.tipo_id == tipoEmergencia);
        }

        /* Filtra por búsqueda */
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

    /* Efecto para aplicar los filtros cada vez que cambian */
    useEffect(() => {
        aplicarFiltros();
    }, [search, tipoEmergencia, emergencias]);

    /* Maneja el comportamiento al hacer click en el botón editar de cada card de emergencia */
    const handleEditar = (emergencia) => {
        setEmergenciaSeleccionada(emergencia);
        setModalOpen(true);
    };

    // Esta funcion es usada tanto al crear como al editar
    /*  Maneja el guardado de la emergencia */
    const handleSaved = () => {
        obtenerEmergencias();
        setModalOpen(false);
        setEmergenciaSeleccionada(null);
        setCargando(false);
    };

    /* Maneja el cambio de tipo de emergencia */
    const handleTipoEmergencia = (e) => setTipoEmergencia(Number(e.target.value));

    /* Maneja el cambio en el input de búsqueda */
    const handleBuscar = (e) => setSearch(e.target.value);

    /* Limpia los filtros */
    const limpiarFiltros = () => { setSearch(""); setTipoEmergencia(0); };

    return (
        <div className="h-screen overflow-auto">
            <Header
                IconoHeader={TriangleAlert}
                titulo="Registro de emergencias"
                subtitulo="Historial completo de incidentes registrados"
                textoBoton="+ Nueva Emergencia"
                onClick={() => { setEmergenciaSeleccionada(null); setModalOpen(true); }}
                checkPermiso={checkPermiso}
            />

            {/* Container de la pagina */}
            <div className="p-6 px-8 md:px-20">
                {/* Filtro */}
                <div className="foreground px-6 pt-2 w-full pb-7 mb-10 rounded-2xl">
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
                )
                    : error ? (
                        <Error />
                    ) : emergenciasFiltradas.length === 0 ? (
                        <p>No hay emergencias registradas.</p>
                    )
                        : (
                            <div className="space-y-10 ">
                                {emergenciasFiltradas.map((emergencia) => (
                                    <div key={emergencia.id}>
                                        <CardEmergenciaa emergencia={emergencia} onEditar={handleEditar} checkPermiso={checkPermiso} />
                                    </div>
                                ))}
                            </div>
                        )}
            </div>

            {/* Modal formulario emergencia*/}
            {modalOpen && (
                <div id="modal-emergencia" className="-z-50">
                    <div className="fixed inset-0 flex items-center justify-center">

                        {/* Fondo semitransparente */}
                        <div className="absolute inset-0 bg-black opacity-80" onClick={() => { setModalOpen(false); setEmergenciaSeleccionada(null); }}></div>

                        {/* Contenido del modal */}
                        <div className="relative foreground w-4/5 h-10/12 p-6 rounded-2xl mt-30 overflow-auto">
                            {/* Título */}
                            <div className="flex justify-between items-center">
                                <h1 className="font-bold text-lg text-white">
                                    {emergenciaSeleccionada ?
                                        <div className="flex items-center gap-4">
                                            <h1 className="font-bold text-lg text-white">
                                                Editar emergencia
                                            </h1>
                                            <div className=" px-2 bg-red-600 rounded-2xl " >
                                                <p>{emergenciaSeleccionada.id}</p>
                                            </div>
                                        </div>
                                        : `Nueva emergencia`}
                                </h1>
                                <X
                                    onClick={() => { setModalOpen(false); setEmergenciaSeleccionada(null); }}
                                    className="text-white cursor-pointer"
                                />
                            </div>

                            {/* Contenido */}
                            <FormEmergencia
                                formInicial={emergenciaSeleccionada}
                                onClose={() => { setEmergenciaSeleccionada(null); setModalOpen(false); }}
                                onSaved={handleSaved}
                                catalogos={catalogos}
                                obtenerEmergencias={obtenerEmergencias}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Emergencia;
