import "./login.css";
function Login() {
  return (
    <div class="contenedor__todo">
      <div class="caja__trasera">
        <div class="caja__trasera-login">
          <h3>¿Ya tienes una cuenta?</h3>
          <p>Inicia sesión para entrar en la página</p>
          <button id="btn__iniciar-sesion">Iniciar Sesión</button>
        </div>
        <div class="caja__trasera-register">
          <h3>¿Aún no tienes una cuenta?</h3>
          <p>Regístrate para que puedas iniciar sesión</p>
          <button id="btn__registrarse">Regístrarse</button>
        </div>
      </div>
      <div class="contenedor__login-register">
        <form action="" className="formulario__login">
          <h2>Iniciar Sesión</h2>
          <input type="text" placeholder="CURP" />
          <input type="password" placeholder="Contraseña" />
          <button>Entrar</button>
        </form>

        <form action="" className="formulario__register">
          <h2>Regístrarse</h2>
          <div class="formulario" >
            <input type="text" placeholder="Nombre(s)" />
            <input type="text" placeholder="Apellido Paterno" />
            <input type="text" placeholder="Apellido Materno" />
            <input type="text" placeholder="Correo Electronico" />
            <input type="text" placeholder="CURP" />
            <input type="password" placeholder="Contraseña" />
          </div>
          <button>Regístrarse</button>
        </form>
      </div>
    </div>
  )
}

export default Login;