import Option from "./Option";


function Question({ data, handleAnswerOptionClick, userAnswers, currentQuestion }) {
    const userAnswer = userAnswers[currentQuestion];

    const getOptionStyle = (index) => {
        if (index === userAnswer) {
            return index === data.correctAnswer ? 'btn-success' : 'btn-danger';
        }
        return 'btn-primary';
    };

    return (
        <div>
            <h2>{data.question}</h2>
            {data.options.map((option, index) => (
                <Option 
                    key={index} 
                    option={option}
                    styleClass={getOptionStyle(index)}
                    handleAnswerOptionClick={() => handleAnswerOptionClick(index)}
                />
            ))}
        </div>
    );
}

export default Question;
