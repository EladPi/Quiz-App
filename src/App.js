import React, { useState } from 'react';
import Question from './components/Question';
import Score from './components/Score';
import { Result } from './components/Result';
import { shuffleArray } from './utils/utilities';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import quizData from './data/quizData';


function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState(shuffleArray([...quizData]));
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false); // the results at the end of the quiz
  const [viewResults, setViewResults] = useState(false); // the results shown when the user click the button at the end of the quiz.



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
      setShowResults(true);
    }
  };


  const restartQuiz = () => {
    // Shuffle questions and reset them
    const shuffledQuestions = shuffleArray([...quizData]);
    setQuestions(shuffledQuestions);

    // Reset other states
    setCurrentQuestion(0);
    setScore(0);
    setUserAnswers([]);
    setShowResults(false);
  };





  /*
    A logic created for the "Show Results" button.
    When a user is clicking the button, he can see the quiz's results.
  */
  const renderContent = () => {
    if (showResults) {
      if (viewResults) {
        return (
          <div className="results-container">
            
            {questions.map((q, index) => (
              <Result
                key={index}
                question={q.question}
                userAnswer={q.options[userAnswers[index]]}
                correctAnswer={q.options[q.correctAnswer]}
              />
            ))}
            
            <button className="btn btn-secondary mt-4 d-block w-100" onClick={() => setViewResults(false)}>Hide Results</button>
          </div>
        );
      } else {
        return (
          <div>
            <h2 className="card-title">Quiz Results</h2>
            <p>You answered {userAnswers.length} questions.</p>
            <p>You got {score} of them right.</p>
            <button className="btn btn-primary mt-4 d-block w-100" onClick={restartQuiz}>Restart Quiz</button>
            <button className="btn btn-info mt-4 d-block w-100" onClick={() => setViewResults(true)}>Show Results</button>
          </div>
        );
      }
    } else {
      return (
        <>
          {showResults ?
            (
              <div>
                <h2 className="card-title">Quiz Results</h2>
                <p>You answered {userAnswers.length} questions.</p>
                <p>You got {score} of them right.</p>
                <button
                  className="btn btn-primary mt-4 d-block w-100"
                  onClick={restartQuiz}
                >
                  Restart Quiz
                </button>
              </div>
            )
            :
            (
              <>
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

              </>
            )
          }
        </>
      );
    }
  }








  return (
    <div className="container mt-5 quiz-container">
      <div className="card shadow">
        <div className="card-body text-center">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}


export default App;
