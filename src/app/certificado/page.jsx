"use client";
import Header from "../components/header/header";
import Navbar from "../components/navbar/navbar";
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';
import "../globals.css";
import './style.css';

const Certificate = () => {
    const ref = useRef(null);
    const [name, setName] = useState('');
    const [license, setLicense] = useState('');
    const [date, setDate] = useState('');
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const onButtonClick = useCallback(() => {
        if (ref.current === null) {
            return;
        }
        toPng(ref.current, { cacheBust: true })
            .then((dataUrl) => {
                const link = document.createElement('a');
                link.download = 'certificado.png';
                link.href = dataUrl;
                link.click();
            })
            .catch((err) => {
                console.log(err);
            });
    }, [ref]);

    if (!isClient) {
        return null; // Evita el renderizado en el servidor
    }

    return (
        <div>
            <Header />
            <Navbar />
            <input type='text' placeholder='Nombre' value={name}
                onChange={(e) => setName(e.target.value)} />

            <input type='text' placeholder='Licencia' value={license}
                onChange={(e) => setLicense(e.target.value)} />

            <input type='text' placeholder='Fecha' value={date}
                onChange={(e) => setDate(e.target.value)} />

            <div className="main-container">
                <div className="container" ref={ref}>
                    <img src="/certificado.png" height={900} />
                    <div className="content">
                        <h1>{name}</h1>
                        <h3>{license}</h3>
                        <p>{date}</p>
                    </div>
                </div>
            </div>
            <button onClick={onButtonClick}>Descargar</button>
        </div>
    );
}

export default Certificate;