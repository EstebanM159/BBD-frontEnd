import { Link } from "react-router-dom";

export default function Header() {
    return (
        <>
        <nav className="flex items-center justify-between bg-zinc-900 p-4">
            <Link to='home'className="flex items-center">
                <img src="./scissors.svg" alt="Barber Shop Logo" className="h-10 mr-2"/>
                <h1 className="text-white text-lg font-bold">Barber Shop</h1>
            </Link>
            <ul className="flex items-center">
                <ButtonHeader dir={'/home'} text="Inicio"/>
                <ButtonHeader dir={'/servicios'} text="Servicios"/>
                <ButtonHeader dir={'/contacto'} text="Contacto"/>
                <ButtonHeader dir={'/auth/login'} text="Iniciar Sesión"/>
           </ul>
        </nav>
        </>
    )
}
