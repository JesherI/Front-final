"use client";
import Header from "../components/header/header";
import Navbar from "../components/navbar/navbar";
import "./style.css";
import "../globals.css";
import { useState, useEffect } from 'react';
import axios from 'axios';

const QuestionsPage = () => {
    const [questionData, setQuestionData] = useState({
        question: '',
        question_type: '',
        answerA: '',
        answerB: '',
        answerC: '',
        answerD: '',
        correct_answer: '',
        module: ''
    });

    const [modules, setModules] = useState([]);
    const [showAnswers, setShowAnswers] = useState(false);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/module/')
            .then(response => {
                setModules(response.data);
            })
            .catch(error => console.error('Error fetching modules:', error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setQuestionData(prevData => ({
            ...prevData,
            [name]: value
        }));
        if (name === 'question_type') {
            setShowAnswers(value === 'MC');
            if (value === 'TF') {
                setQuestionData(prevData => ({
                    ...prevData,
                    answerC: '',
                    answerD: ''
                }));
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/exam/question/', questionData)
            .then(response => {
                alert('Question saved successfully!');
                setQuestionData({
                    question: '',
                    question_type: '',
                    answerA: '',
                    answerB: '',
                    answerC: '',
                    answerD: '',
                    correct_answer: '',
                    module: ''
                });
                setShowAnswers(false);
            })
            .catch(error => console.error('Error saving question:', error));
    };

    return (
        <div>
            <Header />
            <div className="container">
                <h1 className="title">Crear Preguntas</h1>
                <form onSubmit={handleSubmit} className="form">
                    <label className="label">
                        Pregunta:
                        <input
                            type="text"
                            name="question"
                            value={questionData.question}
                            onChange={handleChange}
                            className="input"
                        />
                    </label>

                    <label className="label">
                        Tipo de Pregunta:
                        <select
                            name="question_type"
                            value={questionData.question_type}
                            onChange={handleChange}
                            className="input"
                        >
                            <option value="">Selecciona</option>
                            <option value="MC">Opción Multiple</option>
                            <option value="TF">Verdadero/Falso</option>
                        </select>
                    </label>

                    {showAnswers && (
                        <>
                            <label className="label">
                                A:
                                <input
                                    type="text"
                                    name="answerA"
                                    value={questionData.answerA}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </label>

                            <label className="label">
                                B:
                                <input
                                    type="text"
                                    name="answerB"
                                    value={questionData.answerB}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </label>

                            <label className="label">
                                C:
                                <input
                                    type="text"
                                    name="answerC"
                                    value={questionData.answerC}
                                    onChange={handleChange}
                                    className="input"
                                    disabled={questionData.question_type !== 'MC'}
                                />
                            </label>

                            <label className="label">
                                D:
                                <input
                                    type="text"
                                    name="answerD"
                                    value={questionData.answerD}
                                    onChange={handleChange}
                                    className="input"
                                    disabled={questionData.question_type !== 'MC'}
                                />
                            </label>
                        </>
                    )}

                    <label className="label">
                        Respuesta correcta:
                        <select
                            name="correct_answer"
                            value={questionData.correct_answer}
                            onChange={handleChange}
                            className="input"
                        >
                            <option value="">Selecciona</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            {showAnswers && questionData.question_type === 'MC' && (
                                <>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                </>
                            )}
                        </select>
                    </label>

                    <label className="label">
                        Modulo:
                        <select
                            name="module"
                            value={questionData.module}
                            onChange={handleChange}
                            className="input"
                        >
                            <option value="">Selecciona</option>
                            {modules.map(module => (
                                <option key={module.id} value={module.name}>
                                    {module.name}
                                </option>
                            ))}
                        </select>
                    </label>

                    <button type="submit" className="button">Guardar</button>
                </form>
            </div>
        </div>
    );
};

export default QuestionsPage;
