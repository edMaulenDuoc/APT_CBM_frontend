const DropDown = ({ name, options = [], label, onChange, valorInicial = 0 }) => {
    return (
        <div className="flex flex-col">
            {label && (
                <label htmlFor={name} className="mb-1 text-white">
                    {label}
                </label>
            )}
            <select
                name={name}
                value={valorInicial ?? 0}   
                onChange={onChange}         
                className="border-1 px-3 py-2 rounded-md text-primary-foreground 
                           hover:cursor-pointer hover:bg-gray-800 transition-transform"
            >
                <option value={0} className="bg-transparent">
                    Seleccione una opción
                </option>
                {options.map((option, index) => (
                    <option 
                        key={index} 
                        value={option.value} 
                        className="bg-transparent"
                    >
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default DropDown