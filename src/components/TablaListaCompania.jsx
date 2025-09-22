import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TablaListaCompania =({id_compania}) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate("/editarUsuario");
    }

    const handleDelete = () => {
        navigate("#");
    }

    // Datos de ejemplo (los de tu imagen)
    const datos = [
        { nro: 1, nombre: "Fernando Rodríguez García", estado: "Voluntario Fundador", rut: "11.222.333-4" },
        { nro: 2, nombre: "Jorge Tapia Tapia", estado: "Director Honorario", rut: "11.222.333-4" },
        { nro: 3, nombre: "Moisés Jofré González", estado: "Voluntario Insigne", rut: "11.222.333-4" },
        { nro: 4, nombre: "Ramón Rivera Beltrán", estado: "Voluntario Insigne", rut: "11.222.333-4" },
        { nro: 5, nombre: "Andrés Farías Zamorano", estado: "Voluntario Insigne", rut: "11.222.333-4" },
        { nro: 6, nombre: "Eugenio Valenzuela Silva", estado: "Voluntario Insigne", rut: "11.222.333-4" },
        { nro: 7, nombre: "Rubén Ronda Tapia", estado: "Voluntario Honorario", rut: "11.222.333-4" },
        { nro: 8, nombre: "Patricio Fuentes Catalán", estado: "Director Honorario", rut: "11.222.333-4" },
        { nro: 9, nombre: "Jaime Alvarado Cornejo", estado: "Vicesuperintendente", rut: "11.222.333-4" },
        { nro: 10, nombre: "Pablo Lizama Riquelme", estado: "Director Honorario", rut: "11.222.333-4" },
        { nro: 11, nombre: "Aquiles Robledo Quintanilla", estado: "Voluntario Honorario", rut: "11.222.333-4" },
        { nro: 12, nombre: "Luis Carreño Santis", estado: "Voluntario Honorario", rut: "11.222.333-4" },
        { nro: 13, nombre: "Luis Guzmán Rojas", estado: "Voluntario Honorario", rut: "11.222.333-4" },
        { nro: 14, nombre: "Freddy Pizarro Muñoz", estado: "Director Honorario", rut: "11.222.333-4" },
        { nro: 15, nombre: "René Velásquez Martínez", estado: "Voluntario Honorario", rut: "11.222.333-4" },
    ];
    
    return (
        <div className="table-auto md:table-fixed">
            <table className="table-auto w-full border border-gray-400 text-sm text-left mt-5">
                <thead className="bg-gray-800">
                    <tr>
                        <th className="border px-2 py-1">Nro</th>
                        <th className="border px-2 py-1">Nombre</th>
                        <th className="border px-2 py-1">Estado</th>
                        <th className="border px-2 py-1">Rut</th>
                        <th className="border px-2 py-1">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {datos.map((item) => (
                        <tr key={item.nro} className="hover:bg-gray-600">
                        <td className="border px-2 py-1">{item.nro}</td>
                        <td className="border px-2 py-1">{item.nombre}</td>
                        <td className="border px-2 py-1">{item.estado}</td>
                        <td className="border px-2 py-1">{item.rut}</td>
                        <td className="border px-2 py-1 flex gap-2 justify-center">
                            <Pencil className="w-4 h-4 cursor-pointer text-green-600" onClick={handleEdit}/>
                            <Trash2 className="w-4 h-4 cursor-pointer text-red-600" onClick={handleDelete}/>
                        </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TablaListaCompania