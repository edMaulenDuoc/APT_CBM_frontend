import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"


const Link = ({href, icon, label}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activo, setActivo] = useState(false);
    
    useEffect(() => {
        const estaActivo = location.pathname === href;
        setActivo(estaActivo);
    }, [location]);


    const handleClick = (e) => {
        navigate(`${href}`);
    }

    return (
        <>
            <a className="mx-2" onClick={handleClick}>
                <div className={`flex items-center gap-2 p-1 px-4 py-2 rounded-md hover:scale-105 transition-transform text-white cursor-pointer ${activo ? "bg-red-600" : " hover:bg-red-800"}`}>
                    {icon && <span className="icon">{icon}</span>}
                    {label}
                </div>
            </a>
        </>
    )
}

export default Link