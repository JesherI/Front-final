"use client";

import { useEffect, useState } from "react";
import Link from 'next/link';
import Header from "../components/header/header";
import "./style.css";

function generateColor(licenceLetter) {
    return licenceLetter ? `#${(Math.random().toString(16) + "000000").substring(2, 8).toUpperCase()}` : "#f0f0f0";
}

function Listlicences() {
    const [licences, setLicences] = useState([]);
    const [error, setError] = useState(null); // Add state for error
    const [loading, setLoading] = useState(true); // Add state for loading

    useEffect(() => {
        const loadLicences = async () => {
            try {
                console.log('Fetching licences...');
                const res = await fetch(`http://127.0.0.1:8000/api/licences/`);
                
                console.log('Response status:', res.status);
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                
                const data = await res.json();
                console.log('Fetched data:', data);
                setLicences(data);
            } catch (err) {
                console.error('Error fetching licences:', err);
                setError('Error al cargar las licencias.');
            } finally {
                setLoading(false); // Set loading to false after data is loaded or error occurred
            }
        };

        loadLicences();
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <Header />
            <div className="navbar">
                <form onSubmit={(e) => e.preventDefault()}>
                    <Link href="/admin">
                        <button type="submit" className="logout-button">Return</button>
                    </Link>
                    <Link href="/">
                        <button type="submit" className="logout-button">Log out</button>
                    </Link>
                </form>
            </div>
            <div className="title1">
                <h3>Licencias Disponibles</h3>
            </div>
            <div className="licences-container">
                {licences.map((licence) => (
                    <div key={licence.id} className="licences-list">
                        <Link href={`licences/${licence.id}`} className="licence-card">
                            <div
                                className="licence-letter"
                                style={{ backgroundColor: licence.letter ? generateColor(licence.letter) : "#f0f0f0" }}
                            >
                                {licence.letter}
                            </div>
                            <div className="licence-content">
                                <div className="licence-details">
                                    <strong>{licence.name}</strong><br />
                                    <p>{licence.description}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
                <Link href="/licences/create" className='licences-list'>
                    <div className="licence-card">
                        <div className="licence-letter">+</div>
                        <div className="licence-details">
                            <strong>Agregar Licencias</strong><br /><br />
                            <p>Aquí puedes agregar más licencias</p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Listlicences;
