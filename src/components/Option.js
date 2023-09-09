import React from 'react';

function Option({ option, styleClass, handleAnswerOptionClick }) {
    return (
        <button 
            className={`btn ${styleClass} mb-2 d-block w-100`}
            onClick={handleAnswerOptionClick}
        >
            {option}
        </button>
    );
}

export default Option;
