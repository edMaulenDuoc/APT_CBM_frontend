const CardContadores = ({icono , titulo , conteo , observacion}) => {
    return (
        <div className="foreground rounded-lg p-4 hover:shadow-lg hover:scale-110 ">
            <div className="flex flex-col">
                <div className="flex justify-between">
                    <h3 className="font-bold">{titulo}</h3>
                    <div className="md:block hidden">
                        {icono}
                    </div>
                </div>
                <div className="justify-start">
                    <h2 className="font-bold">{conteo}</h2>
                </div>
            </div>
        </div>
    )
}

export default CardContadores