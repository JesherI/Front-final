import Header from "./components/header/header"
import Footer from "./components/footer/footer"
import Navbar from "./components/navbar/navbar"
import "./style.css"
import "./globals.css"
export default function Home() {
  return (
    <div>
    <Header></Header>
    <Navbar></Navbar>
    <main className="body">
      <div className="title">
        <h1>Secretaría de Movilidad y Transporte</h1>
      </div>
      <div className="container">
        <div className="texto">
          <p>
            Bienvenidos a nuestro portal oficial. El diseño de una <br />
            politica pública en materia de movilidad es enfrentar y <br />
            superar un paradigma que establece que los ciudadanos <br />
            debes adaptarte al desarrollo y condiciones del tranporte <br />
            público, a la infraestructura y comunicaciones que los <br />
            gobiernos ofresen; nuestro reto es revertir este concepto <br />
            para que apartir de la estructura de la ley, reglamentos <br />
            decretos, acuerdos, sistemas y procedimientos, la <br />
            infraestructora y servicios se orienten a satisfacer las <br />
            demandas y necesidades de los usuarios. Te invitamos a <br />
            explorar nuestro sitio
          </p>
        </div>
        <div className="imagen">
          <h1></h1>
        </div>
      </div>
    </main>
    <Footer></Footer>
  </div>
  )
}
