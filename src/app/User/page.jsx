"use client";

import Header from "../components/header/header"
import Image from "next/image"
import './style.css'
import Link from 'next/link';

const AdminPage = () => {

  return (
    <div>
      <Header></Header>
      <button><Link href="/admin">Admin</Link></button>

      <br />
      <br />
      <br />
      <div className="center">
        <main className="body">
          <div className="title">
            <h1>Secretaría de Movilidad y Transporte</h1>
          </div>
          <div className="container">
            <div className="container">
              <div className='Tipos'>
                <h1>Mi perfil</h1>
              </div>
              <div className="box-container">
                <div className="text-boxes">
                  <div className="text-box">
                    <p>User</p>
                  </div>
                  <div className="text-box">
                    <p>Nombre</p>
                    <div className='Lapiz'>
                      <Image src="/lapiz.png" alt="lapiz" width={20} height={20} />
                    </div>
                  </div>
                  <div className="text-box">
                    <p>Correo Electronico</p>
                    <div className='Lapiz'>
                      <Image src="/lapiz.png" alt="lapiz" width={20} height={20} />
                    </div>
                  </div>
                  <div className="text-box">
                    <p>Numero Telefonico</p>
                    <div className='Lapiz'>
                      <Image src="/lapiz.png" alt="lapiz" width={20} height={20} />
                    </div>
                  </div>
                </div>
                <div>
                  <div className='linea'>
                  </div>
                </div>
                <div className="divider"></div>
                <div className="image-boxes">
                  <Link href="/courceuser">
                    <div className="box">
                      <Image src="/admin3.png" alt="Image 2" width={150} height={200} />
                      <center>
                        <p>Cursos</p><br />
                        <h1>Entra a los cursos <br /> y contenidos disponibles </h1>
                      </center>
                    </div>
                  </Link>
                  <Link href="/evaluacion">
                    <div className="box">
                      <Image src="/admin1.jpeg" alt="Image 1" width={150} height={200} />
                      <center>
                        <p>Evaluacion</p><br />
                        <h1>Ve la evaluacion disponible<br /> de la </h1>
                      </center>
                    </div>
                  </Link>
                  <Link href="/certificado">
                    <div className="box">
                      <Image src="/certificadoe.png" alt="Image 1" width={150} height={200} />
                      <center>
                        <p>Certificado</p><br />
                        <h1>Crea una visualización<br /> de un certificado </h1>
                      </center>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
