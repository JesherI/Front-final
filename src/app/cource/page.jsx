"use client";
import React, { useState, useEffect } from 'react';
import Header from "../components/header/header";
import Link from 'next/link';
import "./style.css";

const ModulesAndLicences = () => {
    const [modules, setModules] = useState([]);
    const [licences, setLicences] = useState([]);
    const [selectedLicence, setSelectedLicence] = useState('');
    const [newModuleName, setNewModuleName] = useState('');
    const [editingModule, setEditingModule] = useState(null);
    const [updatedModuleName, setUpdatedModuleName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [moduleToDelete, setModuleToDelete] = useState(null);

    useEffect(() => {
        fetchLicences();
        fetchModules();
    }, []);

    const fetchLicences = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/licences/');
            if (!response.ok) {
                throw new Error('ERROR');
            }
            const data = await response.json();
            setLicences(data);
        } catch (error) {
            console.error('Error al recuperar licencias:', error);
        }
    };

    const fetchModules = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/module/');
            if (!response.ok) {
                throw new Error('ERROR');
            }
            const data = await response.json();
            setModules(data);
        } catch (error) {
            console.error('Error recuperando módulos:', error);
        }
    };

    const handleAddModule = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/module/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: newModuleName,
                    licence: selectedLicence,
                }),
            });
            if (!response.ok) {
                throw new Error('ERROR');
            }
            const data = await response.json();
            setModules([...modules, data]);
            setNewModuleName('');
            setSelectedLicence('');
        } catch (error) {
            console.error('Error al agregar módulo:', error);
        }
    };

    const handleUpdateModule = async (moduleId) => {
        try {
            const response = await fetch(`http://localhost:8000/api/module/${moduleId}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: updatedModuleName,
                }),
            });
            if (!response.ok) {
                throw new Error('ERROR');
            }
            const updatedModule = await response.json();
            setModules(modules.map((module) => (module.id === moduleId ? updatedModule : module)));
            setEditingModule(null);
            setUpdatedModuleName('');
        } catch (error) {
            console.error('Error al actualizar módulo:', error);
        }
    };

    const handleDeleteModule = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/module/${moduleToDelete}/`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('ERROR');
            }
            setModules(modules.filter((module) => module.id !== moduleToDelete));
            setIsModalOpen(false);
            setModuleToDelete(null);
        } catch (error) {
            console.error('Error al eliminar módulo:', error);
        }
    };

    const openDeleteModal = (moduleId) => {
        setModuleToDelete(moduleId);
        setIsModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsModalOpen(false);
        setModuleToDelete(null);
    };

    return (
        <div>
            <Header />
            <div className="navbar">
                <form onSubmit={(e) => e.preventDefault()}>
                    <Link href="/admin">
                        <button type="submit" className="buttonNAVBAR">Return</button>
                    </Link>
                    <Link href="/">
                        <button type="submit" className="buttonNAVBAR">Log out</button>
                    </Link>
                </form>
            </div>
            <div className="content">
                <h1>Agregar Licencias y Módulos</h1>
                <div className="form-container">
                    <input
                        type="text"
                        placeholder="Nombre del Módulo"
                        value={newModuleName}
                        onChange={(e) => setNewModuleName(e.target.value)}
                        className="input-text"
                    />
                    <select
                        value={selectedLicence}
                        onChange={(e) => setSelectedLicence(e.target.value)}
                        className="select-licence"
                    >
                        <option value="">Seleccionar Licencia</option>
                        {licences.map((licence) => (
                            <option key={licence.name} value={licence.name}>
                                {licence.name}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={handleAddModule}
                        className="btn-save"
                    >
                        Guardar
                    </button>
                </div>

                <h3>Creados Recientemente</h3>
                <ul className="module-list">
                    {modules.map((module) => (
                        <li key={module.id} className="module-item">
                            {editingModule === module.id ? (
                                <div className="edit-section">
                                    <input
                                        type="text"
                                        placeholder="Nuevo nombre de módulo"
                                        value={updatedModuleName}
                                        onChange={(e) => setUpdatedModuleName(e.target.value)}
                                        className="input-text"
                                    />
                                    <button
                                        onClick={() => handleUpdateModule(module.id)}
                                        className="btn-update"
                                    >
                                        Actualizar
                                    </button>
                                    <button
                                        onClick={() => setEditingModule(null)}
                                        className="btn-cancel"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            ) : (
                                <div className="module-item-content">
                                    {module.name} (Licencia: {module.licence})
                                    <button
                                        onClick={() => openDeleteModal(module.id)}
                                        className="btn-edit"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => openDeleteModal(module.id)}
                                        className="btn-delete"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>

                {/* Modal de Confirmación */}
                {isModalOpen && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <h2>Confirmación</h2>
                            <p>¿Estás seguro de que deseas eliminar este módulo?</p>
                            <div className="modal-buttons">
                                <button
                                    onClick={handleDeleteModule}
                                    className="btn-confirm"
                                >
                                    Confirmar
                                </button>
                                <button
                                    onClick={closeDeleteModal}
                                    className="btn-cancel"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ModulesAndLicences;
