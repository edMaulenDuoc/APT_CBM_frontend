import BotonSimple from './buttons/BotonSimple'
import { Eye, MapPin, Clock4, CircleUser, Truck } from 'lucide-react';
const CardEmergenciaa = ({ emergencia, onEditar, checkPermiso }) => {
    return (
        <div className="foreground w-full p-4 rounded-2xl hover:ml-3 hover:shadow-lg hover:cursor-pointer transition-all">
            {/* Cabecera */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex gap-4 items-center">
                    <div className=" px-4 bg-red-600 rounded-2xl " >
                        <p>{emergencia.id}</p>
                    </div>
                    <h1>{emergencia.tipo.descripcion}</h1>
                </div>

                { checkPermiso && 
                    <div>
                        <BotonSimple
                            textoBoton={"Editar"}
                            icono={<Eye />}
                            onClick={() => onEditar && onEditar(emergencia)}
                        />
                    </div>
                }
            </div>
            {/* Cuerpo */}
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-3'>
                <div className='flex gap-4 items-center'>
                    <MapPin />
                    <p>{emergencia.direccion}</p>
                </div>
                <div className='flex gap-4 items-center'>
                    <Clock4 />
                    <p>{new Date(emergencia.createdAt).toLocaleString()}</p>
                </div>
                <div className='flex gap-4 items-center'>
                    <CircleUser />
                    <p>{emergencia.obac ? `${emergencia.obac.nombre} ${emergencia.obac.apellido_pat}` : 'Obac no asignado'}</p>
                </div>
                <div className='flex gap-4 items-center'>
                    <Truck />
                    <div className='flex gap-2'>
                        {emergencia.vehiculos.length > 0 ? emergencia.vehiculos.map((ve) => (
                            <p key={ve.id}>{ve.vehiculo.vehiculo}</p>
                        )) : <p>No hay vehículos asignados</p>}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CardEmergenciaa;