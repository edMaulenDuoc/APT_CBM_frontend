const BotonSimple = ({ onClick = () => { }, textoBoton, icono = false }) => {
    return (
        <button onClick={() => onClick()} className="rounded-md text-white border-1 flex items-center gap-3.5  px-4 py-2  
                                     hover:cursor-pointer  hover:scale-105 hover:bg-gray-800 transition-transform
                                     active:scale-95 active:bg-gray-900"
        >
            {icono &&
                <div>{icono}</div>
            }
            <div>{textoBoton}</div>
        </button>
    )
}

export default BotonSimple