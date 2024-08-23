"use client";
import Header from "../components/header/header";
import Navbar from "../components/navbar/navbar";
import "./style.css";
import "../globals.css";
import { useState } from 'react';

export default function ExamForm() {
  const [questions, setQuestions] = useState([{ question: '', type: 'multiple-choice', answers: [''], correctAnswer: 0, image: null }]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '', type: 'multiple-choice', answers: [''], correctAnswer: 0, image: null }]);
  };

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].question = event.target.value;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (questionIndex, answerIndex, event) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers[answerIndex] = event.target.value;
    setQuestions(newQuestions);
  };

  const handleAddAnswer = (questionIndex) => {
    const newQuestions = [...questions];
    const currentAnswers = newQuestions[questionIndex].answers;
    if (currentAnswers.length < 4) {
      newQuestions[questionIndex].answers.push('');
      setQuestions(newQuestions);
    }
  };

  const handleTypeChange = (index, event) => {
    const newQuestions = [...questions];
    const newType = event.target.value;

    newQuestions[index].type = newType;

    if (newType === 'true-false') {
      newQuestions[index].answers = ['Verdadero', 'Falso'];
      newQuestions[index].correctAnswer = 0;
    } else {
      newQuestions[index].answers = ['', '', '', ''];
      newQuestions[index].correctAnswer = 0;
    }

    setQuestions(newQuestions);
  };

  const handleCorrectAnswerChange = (questionIndex, answerIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].correctAnswer = answerIndex;
    setQuestions(newQuestions);
  };

  const handleImageChange = (questionIndex, event) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].image = event.target.files[0];
    setQuestions(newQuestions);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formattedQuestions = questions.map((q) => ({
      question: q.question,
      type: q.type,
      answerA: q.answers[0] || '',
      answerB: q.answers[1] || '',
      answerC: q.answers[2] || '',
      answerD: q.answers[3] || '',
      correct_answer: ['A', 'B', 'C', 'D'][q.correctAnswer],
      image: q.image,
    }));
    console.log('Guardadito :v :', formattedQuestions);
    // Lógica de guardado backend
  };

  return (
    <div>
      <Header />
      <Navbar />
      <div className="container">
        <h2>Crear Preguntas</h2>
        <form onSubmit={handleSubmit} className="exam-form">
          {questions.map((question, questionIndex) => (
            <div key={questionIndex} className="question-block">
              <select
                name="questionType"
                value={question.type}
                onChange={(event) => handleTypeChange(questionIndex, event)}
                className="question-type-select"
              >
                <option value="multiple-choice">Opción Múltiple</option>
                <option value="true-false">Verdadero o Falso</option>
              </select>
              <input
                type="text"
                name="question"
                placeholder={`Escribe la pregunta`}
                value={question.question}
                onChange={(event) => handleQuestionChange(questionIndex, event)}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(event) => handleImageChange(questionIndex, event)}
                className="image-upload"
              />
              {question.type === 'multiple-choice' && (
                <>
                  {question.answers.slice(0, 4).map((answer, answerIndex) => (
                    <div key={answerIndex} className="answer-block">
                      <input
                        type="text"
                        name="answer"
                        placeholder={`Escribe la respuesta ${answerIndex + 1}`}
                        value={answer}
                        onChange={(event) => handleAnswerChange(questionIndex, answerIndex, event)}
                      />
                      <label className="checkbox-container">
                        <input
                          type="checkbox"
                          checked={question.correctAnswer === answerIndex}
                          onChange={() => handleCorrectAnswerChange(questionIndex, answerIndex)}
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  ))}
                  {question.answers.length < 4 && (
                    <button
                      type="button"
                      onClick={() => handleAddAnswer(questionIndex)}
                      className="add-answer-button"
                    >
                      + Respuesta
                    </button>
                  )}
                </>
              )}
              {question.type === 'true-false' && (
                <div className="answer-block">
                  <select
                    name="correctAnswer"
                    value={question.correctAnswer}
                    onChange={(event) => handleCorrectAnswerChange(questionIndex, parseInt(event.target.value, 10))}
                  >
                    <option value={0}>Verdadero</option>
                    <option value={1}>Falso</option>
                  </select>
                </div>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddQuestion()}
            className="add-question-button"
          >
            + Preguntas
          </button>
          <button type="submit" className="submit-button">Guardar</button>
        </form>
      </div>
    </div>
  );
}