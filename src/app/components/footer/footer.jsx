import "leaflet/dist/leaflet.css";
import Image from 'next/image';
import "./footer.css"

const Footer = () => {
  return (

    <footer className="footer">
      <div className="content-img">
        <img src="./logo-estado-de-tlaxcala.png" alt="Logo" />
      </div>
      <div className="content-map">
        <iframe
          className="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1882.4241193087885!2d-98.195526699389!3d19.332390619836676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cfdee158a53ebb%3A0x241b6d5e37330a82!2sSECRETARIA%20DE%20MOVILIDAD%20Y%20TRANSPORTE!5e0!3m2!1ses-419!2smx!4v1720561487592!5m2!1ses-419!2smx"
          width="100%"
          height="300"
          style={{ border: 0 }}
          loading="lazy" >
        </iframe>
      </div>
    </footer>
  )
}

export default Footer