import "./navbar.css"
import Link from 'next/link';

function Navbar() {
    return (
        <nav className='navbar'>
            <div className='izquierda'>
                <div className="left">
                    <Link href="/">SMyT</Link>
                </div>
                <div className="right">
                    <Link href="/Informacion">Información</Link>
                </div>
            </div>
            <div className='derecha'>
                <div className="left">
                    <Link href="/login">Iniciar Sesion</Link>
                </div>
                <div className="right">
                    <Link href="/sing-up">Registrarse</Link>
                </div>
                
                <div className="right">
                    <Link href="/admin">Temp</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
