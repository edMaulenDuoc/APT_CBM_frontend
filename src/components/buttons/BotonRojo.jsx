const BotonRojo  = ({ onClick = () => {}, textoBoton, icono = false }) => {
    return (
        <button onClick={() => onClick()} className="rounded-md text-white bg-red-600 flex items-center gap-3.5 px-4 py-2  
                                     hover:cursor-pointer  hover:scale-105 hover:bg-red-800 transition-transform
                                     active:scale-95 active:bg-red-900"
        >
            {icono && 
                <div>{icono}</div>
            }
            <div>{textoBoton}</div>
        </button>
    )
}

export default BotonRojo