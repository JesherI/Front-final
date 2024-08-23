"use client";
import Header from "../components/header/header";
import Navbar from "../components/navbar/navbar";
import React, { useState, useEffect } from 'react';
import './style.css'; 
import '../globals.css';

const CourseIntro = () => {
    const [introData, setIntroData] = useState(null);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/cource/course/')
            .then(response => response.json())
            .then(data => setIntroData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const getYouTubeId = (url) => {
        const regExp = /^.*(youtu\.be\/|v\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    return (
        <div>
            <Header />
            <Navbar />
            <div className="course-intro">
                {introData ? introData.map((intro, index) => (
                    <div key={index} className="intro-section">
                        <div className="intro-left">
                            <h3>{intro.title}</h3>
                            <div className="video-container">
                                {intro.video_link ? (
                                    <iframe
                                        width="560"
                                        height="315"
                                        src={`https://www.youtube.com/embed/${getYouTubeId(intro.video_link)}`}
                                        title={intro.title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                ) : intro.video ? (
                                    <video width="560" height="315" controls>
                                        <source src={intro.video} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                ) : null}
                            </div>
                        </div>
                        <div className="intro-right">
                            <h4>{intro.subtitle}</h4>
                            <p>{intro.text}</p>
                            {intro.extra_file && (
                                <div className="extra-file">
                                    {intro.extra_file_type === 'image' ? (
                                        <img src={intro.extra_file} alt="Imagen adicional" />
                                    ) : (
                                        <a href={intro.extra_file} download>
                                            Descargar {intro.extra_file_type === 'pdf' ? 'PDF' : 'Word'}
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )) : (
                    <p className="loading">Cargando datos...</p>
                )}
            </div>
        </div>
        
    );
};

export default CourseIntro;
