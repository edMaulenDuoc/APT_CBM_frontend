const DropDown = ({ name, options = [], label }) => {
    return (
        <div className="flex flex-col">
            {label && <label htmlFor={name} className="mb-1 text-white">{label}</label>}
            <select name={name}
                className="border-1 px-3 py-2 rounded-md  text-primary-foreground foreground
                                hover:cursor-pointer  hover:bg-gray-800 transition-transform ">
                <option className="bg-transparent">Seleccione una opción</option>
                {options.map((option, index) => (
                    <option key={index} className="bg-transparent" value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    )
}

export default DropDown