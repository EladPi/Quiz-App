import React, { useState } from 'react';
import Question from './components/Question';
import Score from './components/Score';
import { shuffleArray } from './utils/utilities';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [questions, setQuestions] = useState(shuffleArray([...quizData]));
    const [userAnswers, setUserAnswers] = useState([]);

    const handleAnswerOptionClick = (index) => {
      // Record user's answer
      const newAnswers = [...userAnswers];
      newAnswers[currentQuestion] = index;
      setUserAnswers(newAnswers);

      // Check if the answer is correct
      if (index === questions[currentQuestion].correctAnswer) {
          setScore(score + 1);
      }

      // Move to the next question or show score
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
          setCurrentQuestion(nextQuestion);
      } else {
          setScore(true); // Later, consider changing this logic.
      }
  };
  

    const restartQuiz = () => {
      const shuffledQuestions = shuffleArray(quizData);
      setQuestions(shuffleArray([...shuffledQuestions]));
      setCurrentQuestion(0);
      setScore(0);
  };






 
  return (
    <div className="container mt-5 quiz-container">
        <div className="card shadow">
            <div className="card-body text-center">
                <p className="question-number mb-2">Question {currentQuestion + 1} of {questions.length}</p>
                
                <Question 
                  data={questions[currentQuestion]}
                  handleAnswerOptionClick={handleAnswerOptionClick}
                  userAnswers={userAnswers}
                  currentQuestion={currentQuestion}
                />


                <button 
                    className="btn btn-danger mt-4 d-block w-100 restart"
                    onClick={restartQuiz}
                >
                    Restart Quiz
                </button>

                <div className="mt-3">
                    <Score score={score} />
                </div>
            </div>
        </div>
    </div>
);
}



export default App;
