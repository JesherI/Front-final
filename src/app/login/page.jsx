import Link from 'next/link';
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import Navbar from "../components/navbar/navbar";
import "./style.css";
import "../globals.css";


export default function Page() {
  return (
    <div>
      <Header />
      <Navbar />
      <div className="contenedor__todo">
        <div className="caja__trasera">
          <div className="caja__trasera-login">
            <h3>¿Ya tienes una cuenta?</h3>
            <p>Inicia sesión para entrar en la página</p>
            <Link href="/admin">
              <button id="btn__iniciar-sesion">Iniciar Sesión</button>
            </Link>
          </div>
          <div className="caja__trasera-register">
            <h3>¿Aún no tienes una cuenta?</h3>
            <p>Regístrate para que puedas iniciar sesión</p>
            {/* Usa Link para la navegación */}
            <Link href="/register">
              <button id="btn__registrarse">Regístrarse</button>
            </Link>
          </div>
        </div>
        <div className="contenedor__login-register">
          <form action="" className="formulario__login">
            <h2>Iniciar Sesión</h2>
            <input type="text" placeholder="CURP" />
            <input type="password" placeholder="Contraseña" />
            {/* Usa Link para la navegación */}
            <Link href="/menu">
              <button type="button">Entrar</button>
            </Link>
          </form>

          <form action="" className="formulario__register">
            <h2>Regístrarse</h2>
            <div className="formulario">
              <input type="text" placeholder="Nombre(s)" />
              <input type="text" placeholder="Apellido Paterno" />
              <input type="text" placeholder="Apellido Materno" />
              <input type="text" placeholder="Correo Electrónico" />
              <input type="text" placeholder="CURP" />
              <input type="password" placeholder="Contraseña" />
            </div>
            <button type="submit">Regístrarse</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}