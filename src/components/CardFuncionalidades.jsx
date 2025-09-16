

const CardFuncionalidades = ({ Icono, titulo, descripcion }) => {
    return (
        <div className="bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg  duration-300 transition-all
                        hover:scale-110 ">
            <div className="flex flex-col items-center justify-center mb-4 gap-2">
                <div className="bg-primary rounded-full p-4">
                    {<Icono className="h-12 w-12 icon-color" />}
                </div>
                <div>
                    <h3 className="text-xl mb-2 font-bold">{titulo}</h3>
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">{descripcion}</p>
                </div>
            </div>
        </div>
    )
}

export default CardFuncionalidades