import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const BotonVolver = ({ ruta }) => {
    const navigate = useNavigate();
    
    const onClick = () => {
        navigate(`/${ruta}`);
    }

    return (
        <button onClick={onClick} className="rounded-md text-white border-1 flex items-center gap-1 px-2 py-1  
                                     hover:cursor-pointer  hover:scale-105 hover:bg-gray-800 transition-transform
                                     active:scale-95 active:bg-gray-900"
        >
            <div><ArrowLeft className="w-4 h-4" /></div>
            <div>Volver</div>
        </button>
    )
}

export default BotonVolver