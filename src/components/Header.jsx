import { Plus, Info } from "lucide-react";

const Header = ({ IconoHeader = null, 
                  titulo, 
                  subtitulo, 
                  textoBoton = false, 
                  informacion = false, 
                  onClick = () => { console.log("Sin función definida")
                } }
) => {
    return (
        <div className="foreground mt-19 flex justify-between items-center px-6 py-7 shadow-md ">
            <div className="flex items-center gap-4">
                <div className="md:block hidden">
                    {IconoHeader && <div>{<IconoHeader className="h-10 w-10 text-primary-foreground mr-2 icon-color" />}</div>}
                </div>
                <div>
                    <div><h1 className="text-3xl font-bold">{titulo}</h1></div>
                    <div><h3 className="pl-5">{subtitulo}</h3></div>
                </div>
            </div>

            {textoBoton &&
                <div>
                    <button className="border-1 flex items-center gap-3.5 text-white px-4 py-2 rounded-md hover:cursor-pointer 
                                       hover:scale-105 hover:bg-gray-800 transition-transform "
                            onClick={onClick}
                    >
                        <div>{textoBoton}</div>
                    </button>
                </div>
            }

            {informacion &&
                <div className="flex items-center gap-3 bg-amber-100 text-black px-4 py-2 rounded-md ">
                    <Info className="h-7 w-7 text-red-500" />
                    <h3>{informacion}</h3>
                </div>
            }
        </div>
    )
}

export default Header