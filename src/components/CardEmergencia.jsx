import { Eye, MapPin, Clock4, CircleUser, Truck, NotebookPen, MapPinIcon } from 'lucide-react';
import BotonSimple from './buttons/BotonSimple';
import BotonRojo from './buttons/BotonRojo';
import { usePermiso } from '../hooks/usePermiso';
import CardVehiculo from './CardVehiculo';

const CardEmergenciaa = ({ emergencia, onEditar, checkPermiso }) => {
    const { checkEsObac, checkEsChofer } = usePermiso({ emergencia });
    /* const checkEsObac = true; // Hardcodeado para pruebas
    const checkEsChofer = false; // Hardcodeado para pruebas */

    /*  const { checkEsObac, checkEsChofer } = usePermiso();
    const esObac = checkEsObac(emergencia);
    const esChofer = checkEsChofer(); */
    return (
        <div className="foreground  p-4 rounded-2xl hover:ml-3 hover:shadow-lg hover:cursor-pointer transition-all h-full">
            {/* Cabecera */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex gap-4 items-center">
                    <div className={`px-4  rounded-2xl ${emergencia.id % 2 === 0 ? " bg-red-900" : " bg-red-600"}`} >
                        <p>{emergencia.id}</p>
                    </div>
                    <h1>{emergencia.tipo.descripcion}</h1>
                </div>

                {checkPermiso && checkEsObac &&
                    <div className='flex gap-4'>
                        <BotonSimple
                            textoBoton={"Editar"}
                            icono={<Eye />}
                            onClick={() => onEditar && onEditar(emergencia)}
                        />
                        <div>
                            <BotonRojo
                                textoBoton={"Completar Parte"}
                                icono={<NotebookPen />}
                                onClick={() => {
                                    console.log("Completar parte de emergencia");
                                }}
                            />
                        </div>
                    </div>
                }
                {!checkPermiso && checkEsObac &&
                    <div>
                        <BotonRojo
                            textoBoton={"Completar Parte"}
                            icono={<NotebookPen />}
                            onClick={() => {
                                console.log("Completar parte de emergencia");
                            }}
                        />
                    </div>
                }

                {checkPermiso && !checkEsObac &&
                    <div className='flex gap-4'>
                        <BotonSimple
                            textoBoton={"Editar"}
                            icono={<Eye />}
                            onClick={() => onEditar && onEditar(emergencia)}
                        />
                    </div>
                }


            </div>
            {/* Cuerpo */}
            <div className={`grid grid-cols-1 
                                ${!checkEsChofer ? "md:grid-cols-4" : "md:grid-cols-3"} 
                                gap-4 mb-3`}>
                <div className='flex gap-4 items-center flex-wrap'>
                    <MapPin />
                    <p>{emergencia.direccion}</p>
                </div>
                <div className='flex gap-4 items-center flex-wrap'>
                    <Clock4 />
                    <p>{new Date(emergencia.createdAt).toLocaleString()}</p>
                </div>
                <div className='flex gap-4 items-center flex-wrap'>
                    <CircleUser />
                    <p>{emergencia.obac ? `${emergencia.obac.nombre} ${emergencia.obac.apellido_pat} ${emergencia.obac.apellido_mat}` : 'Obac no asignado'}</p>
                </div>
                {!checkEsChofer &&
                    <div className='flex gap-4 items-center flex-wrap'>
                        <Truck />
                        <div className='flex gap-2 flex-wrap'>
                            {emergencia.vehiculos.length > 0 ? emergencia.vehiculos.map((ve) => (
                                <p key={ve.id}>{ve.vehiculo.vehiculo}</p>
                            )) : <p>No hay vehículos asignados</p>}
                        </div>
                    </div>
                }
            </div>

            {/* Footer marcar llegada camiones (solo choferes) */}
            {checkEsChofer && (
                <div className='flex flex-wrap gap-4 items-center justify-evenly bg-gray-800 p-4 rounded-2xl'>
                    {emergencia.vehiculos.length > 0
                        ? emergencia.vehiculos.map((ve) => (
                            <div key={ve.id}>
                                <CardVehiculo vehiculo={ve.vehiculo} />
                            </div>
                        ))
                        : <p>No hay vehículos asignados</p>}
                </div>
            )}
        </div>
    )
}

export default CardEmergenciaa;