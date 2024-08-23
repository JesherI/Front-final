"use client";
import Header from "../components/header/header";
import Navbar from "../components/navbar/navbar";
import "./style.css";
import "../globals.css";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const UserQuestionsPage = () => {
    const [questions, setQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [totalScore, setTotalScore] = useState(0);
    const router = useRouter();

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/exam/question/')
            .then(response => {
                setQuestions(response.data);
            })
            .catch(error => console.error('Error fetching questions:', error));
    }, []);

    const handleAnswerSelect = (questionId, answer) => {
        setSelectedAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: answer
        }));
    };

    const handleSubmit = () => {
        let correct = 0;

        questions.forEach(question => {
            if (selectedAnswers[question.id] === question.correct_answer) {
                correct++;
            }
        });

        const score = correct * 10; 
        setTotalScore(score);
        setShowResults(true);
    };

    const handleRetry = () => {
        setShowResults(false);
        setSelectedAnswers({});
        setTotalScore(0);
    };

    const handleCertificateRedirect = () => {
        router.push('../certificado');
    };

    return (
        <div>
            <Header />
            <Navbar />
            <div className="container">
                {!showResults ? (
                    <>
                        <h1 className="title">Evaluación de Conocimientos</h1>
                        <div className="questions-list">
                            {questions.map((question, index) => (
                                <div key={index} className="question-card">
                                    <h3 className="question-text">{question.question}</h3>
                                    <div className="answers">
                                        <label className="answer">
                                            <input
                                                type="radio"
                                                name={`question-${question.id}`}
                                                value="A"
                                                onChange={() => handleAnswerSelect(question.id, 'A')}
                                                checked={selectedAnswers[question.id] === 'A'}
                                            />
                                            A: {question.answerA}
                                        </label>
                                        <label className="answer">
                                            <input
                                                type="radio"
                                                name={`question-${question.id}`}
                                                value="B"
                                                onChange={() => handleAnswerSelect(question.id, 'B')}
                                                checked={selectedAnswers[question.id] === 'B'}
                                            />
                                            B: {question.answerB}
                                        </label>
                                        {question.question_type === 'MC' && (
                                            <>
                                                <label className="answer">
                                                    <input
                                                        type="radio"
                                                        name={`question-${question.id}`}
                                                        value="C"
                                                        onChange={() => handleAnswerSelect(question.id, 'C')}
                                                        checked={selectedAnswers[question.id] === 'C'}
                                                    />
                                                    C: {question.answerC}
                                                </label>
                                                <label className="answer">
                                                    <input
                                                        type="radio"
                                                        name={`question-${question.id}`}
                                                        value="D"
                                                        onChange={() => handleAnswerSelect(question.id, 'D')}
                                                        checked={selectedAnswers[question.id] === 'D'}
                                                    />
                                                    D: {question.answerD}
                                                </label>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button onClick={handleSubmit} className="button submit-button">
                            Enviar
                        </button>
                    </>
                ) : (
                    <div className="results">
                        <h2>Resultados</h2>
                        <p>Puntuación total: {totalScore} / 100</p>
                        {totalScore >= 60 ? (
                            <>
                                <p>¡Felicidades! Lo has logrado.</p>
                                <button onClick={handleCertificateRedirect} className="button success-button">
                                    Obtener Certificado
                                </button>
                            </>
                        ) : (
                            <>
                                <p>No alcanzaste el puntaje necesario. Intenta nuevamente.</p>
                                <button onClick={handleRetry} className="button retry-button">
                                    Intentar Nuevamente
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserQuestionsPage;
