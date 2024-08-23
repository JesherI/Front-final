import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import Navbar from "../components/navbar/navbar";
import "../globals.css"
import "./style.css"

export default function Home() {
  return (
    <div>
      <Header />
      <Navbar />
      <div className="title">
        <h1>Información</h1>
        <p>
          Nuestro compromiso es diseñar una política pública que no solo responda a las necesidades de movilidad de los ciudadanos, sino que también optimice y mejore el proceso de evaluación de candidatos a licencias de transporte. Trabajamos para que el sistema esté orientado a satisfacer las demandas y necesidades de los usuarios. A través de evaluaciones rigurosas y justas, garantizamos que quienes obtengan sus licencias estén verdaderamente preparados para contribuir a una movilidad segura y eficiente. Te invitamos a explorar nuestro sitio y descubrir cómo estamos mejorando la movilidad a través de evaluaciones más efectivas.
        </p>
      </div>
      <Footer />
    </div>
  );
}