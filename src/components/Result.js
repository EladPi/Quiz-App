export function Result({ question, userAnswer, correctAnswer }) {
    return (
      <div className="mb-4 result-question">
        <h5>{question}</h5>
        <div className="mb-2">
          <strong>Your Answer:</strong> {userAnswer}
        </div>
        <div>
          <strong>Correct Answer:</strong> {correctAnswer}
        </div>
      </div>
    );
  }
  