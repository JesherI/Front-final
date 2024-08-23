"use client";
import Header from "../components/header/header";
import Navbar from "../components/navbar/navbar";
import React, { useState, useEffect } from 'react';
import './style.css'; 
import "../globals.css";

const UploadSection = () => {
    const [title, setTitle] = useState(''); 
    const [subtitle, setSubtitle] = useState('');
    const [uploadOption, setUploadOption] = useState(''); 
    const [video, setVideo] = useState(null); 
    const [videoLink, setVideoLink] = useState(''); 
    const [text, setText] = useState(''); 
    const [extraFileType, setExtraFileType] = useState('');
    const [extraFile, setExtraFile] = useState(null);
    const [errors, setErrors] = useState({});
    const [items, setItems] = useState([]);
    const [editItem, setEditItem] = useState(null); 

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/cource/course/');
            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    };

    const validateFields = () => {
        const newErrors = {};
        if (!title) newErrors.title = 'Es necesario un título';
        if (!subtitle) newErrors.subtitle = 'Es necesario un subtítulo';
        if (!uploadOption) newErrors.uploadOption = 'Se requiere una selección';
        if (uploadOption === 'local' && !video) newErrors.video = 'Se requiere el archivo';
        if (uploadOption === 'web' && !videoLink) newErrors.videoLink = 'Es necesario el link';
        if (!text) newErrors.text = 'Texto requerido';
        return newErrors;
    };

    const handleSave = async () => {
        const fieldErrors = validateFields();
        if (Object.keys(fieldErrors).length === 0) {
            const formData = new FormData();

            formData.append('title', title);
            formData.append('subtitle', subtitle);
            formData.append('upload_option', uploadOption);
            if (uploadOption === 'local' && video) {
                formData.append('video', video);
            } else if (uploadOption === 'web' && videoLink) {
                formData.append('video_link', videoLink);
            }
            formData.append('text', text);
            formData.append('extra_file_type', extraFileType);
            if (extraFile) {
                formData.append('extra_file', extraFile);
            }

            try {
                const response = await fetch('http://127.0.0.1:8000/cource/course/', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    console.log('Datos guardados exitosamente');
                    fetchItems(); 
                    resetForm();
                } else {
                    console.log('Error al guardar los datos');
                }
            } catch (error) {
                console.log('Error en la petición:', error);
            }
        } else {
            setErrors(fieldErrors);
        }
    };

    const handleEdit = async (item) => {
        setEditItem(item);
        setTitle(item.title);
        setSubtitle(item.subtitle);
        setUploadOption(item.upload_option);
        setVideo(null);
        setVideoLink(item.video_link || '');
        setText(item.text);
        setExtraFileType(item.extra_file_type || '');
        setExtraFile(null); 
    };

    const handleUpdate = async () => {
        const fieldErrors = validateFields();
        if (Object.keys(fieldErrors).length === 0 && editItem) {
            const formData = new FormData();

            formData.append('title', title);
            formData.append('subtitle', subtitle);
            formData.append('upload_option', uploadOption);
            if (uploadOption === 'local' && video) {
                formData.append('video', video);
            } else if (uploadOption === 'web' && videoLink) {
                formData.append('video_link', videoLink);
            }
            formData.append('text', text);
            formData.append('extra_file_type', extraFileType);
            if (extraFile) {
                formData.append('extra_file', extraFile);
            }

            try {
                const response = await fetch(`http://127.0.0.1:8000/course/course/${editItem.id}/`, {
                    method: 'PUT',
                    body: formData,
                });

                if (response.ok) {
                    console.log('Datos actualizados exitosamente');
                    fetchItems();
                    resetForm();
                    setEditItem(null); 
                } else {
                    console.log('Error al actualizar los datos');
                }
            } catch (error) {
                console.log('Error en la petición:', error);
            }
        } else {
            setErrors(fieldErrors);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/course/course/${id}/`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log('Elemento eliminado exitosamente');
                fetchItems(); 
            } else {
                console.log('Error al eliminar el elemento');
            }
        } catch (error) {
            console.log('Error en la petición:', error);
        }
    };

    const resetForm = () => {
        setTitle('');
        setSubtitle('');
        setUploadOption('');
        setVideo(null);
        setVideoLink('');
        setText('');
        setExtraFileType('');
        setExtraFile(null);
        setErrors({});
    };

    return (
        <div>
            <Header />
            <Navbar />
            <div className="container">
                <h2>Agregar Cursos</h2>
            </div>
            <div className="upload-section">
                <div className="upload-container">
                    <input 
                        type="text" 
                        placeholder="Título" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                    />
                    {errors.title && <p className="error-message">{errors.title}</p>}
                    
                    <input 
                        type="text" 
                        placeholder="Subtítulo" 
                        value={subtitle} 
                        onChange={(e) => setSubtitle(e.target.value)} 
                    />
                    {errors.subtitle && <p className="error-message">{errors.subtitle}</p>}
                    
                    <div className="upload-options">
                        <label>
                            <input 
                                type="radio" 
                                value="local" 
                                checked={uploadOption === 'local'} 
                                onChange={(e) => setUploadOption(e.target.value)} 
                            />
                            Video local
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                value="web" 
                                checked={uploadOption === 'web'} 
                                onChange={(e) => setUploadOption(e.target.value)} 
                            />
                            Link Video
                        </label>
                    </div>
                    {errors.uploadOption && <p className="error-message">{errors.uploadOption}</p>}

                    {uploadOption === 'local' && (
                        <>
                            <input 
                                type="file" 
                                accept="video/*"
                                onChange={(e) => setVideo(e.target.files[0])} 
                            />
                            {errors.video && <p className="error-message">{errors.video}</p>}
                        </>
                    )}

                    {uploadOption === 'web' && (
                        <>
                            <input 
                                type="text" 
                                placeholder="Link del video" 
                                value={videoLink} 
                                onChange={(e) => setVideoLink(e.target.value)} 
                            />
                            {errors.videoLink && <p className="error-message">{errors.videoLink}</p>}
                        </>
                    )}

                    <textarea
                        placeholder="Texto..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    {errors.text && <p className="error-message">{errors.text}</p>}

                    <select value={extraFileType} onChange={(e) => setExtraFileType(e.target.value)}>
                        <option value="">Archivo (opcional)</option>
                        <option value="image">Imagen</option>
                        <option value="pdf-word">PDF/Word</option>
                    </select>
                    
                    {extraFileType && (
                        <input 
                            type="file" 
                            onChange={(e) => setExtraFile(e.target.files[0])} 
                        />
                    )}

                    <div className="button-container">
                        {editItem ? (
                            <>
                                <button className="btn-update" onClick={handleUpdate}>Actualizar</button>
                                <button className="btn-cancel" onClick={() => { resetForm(); setEditItem(null); }}>Cancelar</button>
                            </>
                        ) : (
                            <button className="btn-save" onClick={handleSave}>Guardar</button>
                        )}
                    </div>
                </div>

                <div className="items-list">
                    <h3>Lista de Cursos</h3>
                    {items.map((item) => (
                        <div key={item.id} className="item">
                            <div>{item.title}</div>
                            <div>
                                <button 
                                    className="edit-button" 
                                    onClick={() => handleEdit(item)}
                                >
                                    Editar
                                </button>
                                <button 
                                    className="delete-button" 
                                    onClick={() => handleDelete(item.id)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UploadSection;
