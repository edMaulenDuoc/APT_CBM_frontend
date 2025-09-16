import { Flame, TriangleAlert, CalendarDays, ChartLine } from "lucide-react"
import CardFuncionalidades from "../components/CardFuncionalidades";

const Home = () => {
    return (
        <div className="overflow-y-auto h-screen flex flex-col justify-between">
            {/* Hero Section  */}
            <section className="relative py-13 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="flex justify-center mb-8">
                        <div className="bg-primary rounded-full p-6">
                            <Flame className="h-32 w-32 text-primary-foreground icon-color" />
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
                        Sistema de Administración de Emergencias
                    </h1>

                    <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
                        Plataforma integral para la gestión eficiente de emergencias del Cuerpo de Bomberos de Melipilla
                    </p>
                </div>
            </section>

            {/* Features Section  */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-foreground mb-4">Funcionalidades Principales</h2>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <CardFuncionalidades
                            Icono={TriangleAlert} 
                            titulo="Gestión de emergencias" 
                            descripcion="Registra y administra emergencias con detalles precisos." />
                        <CardFuncionalidades
                            Icono={CalendarDays} 
                            titulo="Administración de turnos" 
                            descripcion="Organiza y gestiona los turnos del personal de manera eficiente y transparente." />
                        <CardFuncionalidades
                            Icono={ChartLine} 
                            titulo="Reportes y estadísticas" 
                            descripcion="Genera informes detallados y análisis estadísticos para mejorar la toma de decisiones." />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <section className="py-6 px-4 sm:px-6 lg:px-8 bg-gray-950">
                <div className="max-w-6xl mx-auto text-center">
                    <p className="text-sm text-muted-foreground">
                        &copy; {new Date().getFullYear()} Proyecto APT Ingeniería Informática - Duoc UC.
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Desarrollado por Bastián Cerda, Eduardo Maulén, Patricio Hurtado
                    </p>
                </div>
            </section>
        </div>
    )
}

export default Home;