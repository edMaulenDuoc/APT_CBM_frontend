const VehiculosCompania = ({compania, onChange, vehiculosEmergencia=[]}) => {
    const isChecked = (id) => vehiculosEmergencia.includes(id);
    
    return (
       <div className="bg-gray-800 p-4 rounded-lg h-full hover:scale-105 hover:shadow-lg transition-all" key={compania.id}>
            <div className="mt-4 ">
                <h3 className="font-semibold text-white mb-2">{compania.compania}</h3>
            </div>

            {compania.vehiculos.map((v) => (   
                <div key={v.id} className="flex items-center gap-2">
                    <input
                        value={v.id}
                        type="checkbox"
                        name="vehiculos"
                        onChange={onChange}
                        className="h-4 w-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 
                                   dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 
                                   dark:bg-gray-700 dark:border-gray-600"
                        checked={isChecked(v.id)}
                    />
                    <span className="text-white">{v.vehiculo}</span>
                </div>
            ))}
        </div>
    );
}

export default VehiculosCompania;