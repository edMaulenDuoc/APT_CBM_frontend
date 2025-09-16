import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Flame, CalendarDays, TriangleAlert, House, LogOut, Menu, X } from "lucide-react";
import Link from "./Link";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    useEffect(() => {
        setOpen(false);
    }, [location.pathname]);

    return (
        <>
            <nav className="foreground pr-2 pl-2 fixed w-full top-0 left-0 shadow-md z-10 h-19 flex items-center">
                <div className="flex items-center gap-9 flex-1">
                    <button
                        type="button"
                        className="logo flex items-center hover:opacity-90"
                        onClick={() => navigate("/test")}
                    >
                        <Flame className="h-11 w-11 text-primary-foreground mr-2 icon-color" />
                        <p className="text-lg font-semibold">Sistema Bomberos</p>
                    </button>

                    {/* Desktop links */}
                    <div className="links hidden md:flex items-center gap-5">
                        <div>
                            <Link href="/test" icon={<House />} label="Inicio" />
                        </div>
                        <div>
                            <Link href="/emergencias" icon={<TriangleAlert />} label="Emergencias" />
                        </div>
                        <div>
                            <Link href="/turnos" icon={<CalendarDays />} label="Turnos" />
                        </div>
                    </div>
                </div>

                <div className="hidden md:flex">
                    <button
                        onClick={handleLogout}
                        className="border-1 text-white px-4 py-2 rounded-md hover:cursor-pointer hover:scale-105 hover:bg-gray-800 transition-transform flex items-center gap-3.5"
                    >
                        <LogOut />
                        <span>Cerrar sesión</span>
                    </button>
                </div>

                <div className="md:hidden">
                    <button
                        type="button"
                        onClick={() => setOpen((v) => !v)}
                        aria-controls="mobile-menu"
                        aria-expanded={open}
                        className="p-2 rounded-md hover:bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white"
                        title={open ? "Cerrar menú" : "Abrir menú"}
                    >
                        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                <div
                    id="mobile-menu"
                    aria-hidden={!open}
                    className={`absolute top-full left-0 w-full md:hidden foreground border-t border-gray-800 shadow-md overflow-hidden transition-all duration-300 ${open ? "opacity-100 max-h-[400px]" : "opacity-0 max-h-0"}`}
                >
                    <div className="flex flex-col p-2">
                        <div onClick={() => setOpen(false)}>
                            <Link href="/test" icon={<House />} label="Inicio" />
                        </div>
                        <div onClick={() => setOpen(false)}>
                            <Link href="/saludos" icon={<CalendarDays />} label="Acerca de" />
                        </div>
                        <div onClick={() => setOpen(false)}>
                            <Link href="/emergencias" icon={<TriangleAlert />} label="Emergencias" />
                        </div>
                        <div className="pt-2">
                            <button
                                onClick={() => {
                                    setOpen(false);
                                    handleLogout();
                                }}
                                className="w-full text-left border-1 text-white px-4 py-2 rounded-md hover:cursor-pointer hover:scale-[1.01] hover:bg-gray-800 transition-transform flex items-center gap-3.5"
                            >
                                <LogOut />
                                <span>Cerrar sesión</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
