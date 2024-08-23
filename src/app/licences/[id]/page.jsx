"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/header/header";
import "./style.css";

function UpdateLicence({ params }) {
    const { id } = params;
    const router = useRouter();
    const [licence, setLicence] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [letter, setLetter] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    useEffect(() => {
        const loadLicence = async () => {
            try {
                const res = await fetch(`http://127.0.0.1:8000/api/licences/${id}/`);
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                const data = await res.json();
                setLicence(data);
                setName(data.name);
                setDescription(data.description);
                setLetter(data.letter);
            } catch (err) {
                console.error('Error fetching licence:', err);
                setError('Error al cargar los datos de la licencia.');
                setShowErrorModal(true);
            } finally {
                setLoading(false);
            }
        };

        loadLicence();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/licences/${id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, description, letter }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(`HTTP error! Status: ${res.status}, Details: ${JSON.stringify(errorData)}`);
            }

            router.push('/licences');
        } catch (err) {
            console.error('Error updating licence:', err);
            setError(`Error al actualizar la licencia: ${err.message}`);
            setShowErrorModal(true);
        }
    };

    const handleDelete = async () => {
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/licences/${id}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(`HTTP error! Status: ${res.status}, Details: ${JSON.stringify(errorData)}`);
            }

            router.push('/licences');
        } catch (err) {
            console.error('Error deleting licence:', err);
            setError(`Error al eliminar la licencia: ${err.message}`);
            setShowErrorModal(true);
        }
    };

    const handleDeleteConfirm = () => {
        setShowDeleteModal(false);
        handleDelete();
    };

    const handleDeleteCancel = () => {
        setShowDeleteModal(false);
    };

    if (loading) {
        return <div className="loading">Cargando...</div>;
    }

    return (
        <div>
            <Header />
            <div className="update-licence-container">
                <button onClick={() => router.push('/licences')} className="back-button">← Regresar</button>
                <div className="form-container">
                    <h3 className="form-title">Actualizar Licencia</h3>
                    <form onSubmit={handleSubmit} className="form">
                        <label>
                            Nombre:
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="input"
                                required
                            />
                        </label>
                        <label>
                            Descripción:
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="textarea"
                                required
                            />
                        </label>
                        <label>
                            Letra:
                            <input
                                type="text"
                                value={letter}
                                onChange={(e) => setLetter(e.target.value)}
                                className="input"
                                required
                            />
                        </label>
                        <div className="button-group">
                            <button type="submit" className="submit-button">Actualizar Licencia</button>
                            <button type="button" onClick={() => setShowDeleteModal(true)} className="delete-button">Eliminar Licencia</button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Modal para Confirmar Eliminación */}
            {showDeleteModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h4>Confirmar Eliminación</h4>
                        <p>¿Estás seguro de que quieres eliminar esta licencia?</p>
                        <div className="modal-buttons">
                            <button onClick={handleDeleteConfirm} className="confirm-button">Sí, eliminar</button>
                            <button onClick={handleDeleteCancel} className="cancel-button">Cancelar</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal para Errores */}
            {showErrorModal && (
                <div className="modal-overlay">
                    <div className="modal-content error-modal">
                        <h4>Error</h4>
                        <p>{error}</p>
                        <button onClick={() => setShowErrorModal(false)} className="close-button">Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UpdateLicence;
