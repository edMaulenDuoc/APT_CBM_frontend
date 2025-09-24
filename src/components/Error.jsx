import { use, useEffect } from "react"
import notify from "../services/notify.service"
import { ServerOff } from "lucide-react"
const Error = () => {
    useEffect(() => {
        notify.error("Error inesperado")
    }, [])

    return (
        <div className="flex flex-col justify-center items-center h-full gap-4  bg-yellow-400 text-black p-4 rounded ">
            <ServerOff className="w-20 h-20" />
            <div>
                <h1 className="font-bold text-2xl">Ha ocurrido un error inesperado</h1>
            </div>
            <div>
                <p>Por favor, intente nuevamente más tarde.</p>
            </div>
        </div>
    )
}

export default Error;