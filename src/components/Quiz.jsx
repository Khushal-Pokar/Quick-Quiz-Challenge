import React, { useState } from 'react';
import '../styles/Quiz.css';
import { NavLink } from 'react-router-dom';

const Quiz = ({quiz}) => {

  const resultInitialState = {
    score: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
  };

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerIdx, setAnswerIdx] = useState(null);
  const [ans, setAns] = useState(null);
  const [result, setResult] = useState(resultInitialState);
  const [showResult, setShowResult] = useState(false);

  const { question, choices, correctAnswer } = quiz[currentQuestion];

  const onAnswerClick = (e, index) => {
    setAnswerIdx(index);
    if (index === correctAnswer -1) {
      setAns(true);
      // e.target.classList.add("correct-answer");
    } else {
      setAns(false);
      // e.target.classList.add("incorrect-answer");
    }
  };

  const onClickNext = () => {
    setAnswerIdx(null);
    setResult((prev) =>
      ans
        ? {
            ...prev,
            score: prev.score + 10,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            incorrectAnswers: prev.incorrectAnswers + 1,
          }
    );
    if (currentQuestion !== quiz.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setCurrentQuestion(0);
      setShowResult(true);
    }
  };

  const onStartAgain = () => {
    setResult(resultInitialState);
    setShowResult(false);
  }

  //Converts html code to regular characters
  function removeCharacters(question) {
    return question
      .replace(/(&quot\;)/g, '"')
      .replace(/(&rsquo\;)/g, '"')
      .replace(/(&#039\;)/g, "'")
      .replace(/(&amp\;)/g, '"')
      .replace(/(&eacute\;)/g, 'é');
  }

  return (
    <div className="quiz-container">
      { !showResult ? (
        <>
        <div className="header">
          <div>
            <span className="active-question-no">{currentQuestion + 1}</span>
            <span className="total-questions">/{quiz.length}</span>
          </div>
          <div>
            <span className="score">Score: {result.score}</span>
          </div>
        </div>
        <h2 className="question"><span>{currentQuestion + 1}.&nbsp;</span>{removeCharacters(question)}</h2>
        <ul>
          {choices.map((answer, index) => (
            <li
              onClick={(e) => onAnswerClick(e, index)}
              key={index}
              // className={ans ? "correct-answer" : "incorrect-answer"}
              className={answerIdx === index ? "selected-answer" : null}
              // className={answerIdx === (correctAnswer -1) ? "correct-answer" : "incorrect-answer"}
            >
              {removeCharacters(answer)}
            </li>
          ))}
        </ul>
        <div className="footer">
          <button onClick={onClickNext} disabled={answerIdx === null}>
            {currentQuestion === quiz.length - 1 ? "Finish" : "Next"}
          </button>
        </div>
      </>
      ) : <div className="results">
        <h1>Results</h1>
        <p>
          Total Questions: <span>{quiz.length}</span>
        </p>
        <p>
          Total Score: <span>{result.score}</span>
        </p>
        <p>
          Correct Answers: <span>{result.correctAnswers}</span>
        </p>
        <p>
          Incorrect Answers: <span>{result.incorrectAnswers}</span>
        </p>
        <NavLink to='/'><button className='start-again' onClick={onStartAgain}>Start Again</button></NavLink>
      </div> }
    </div>
  );
}

export default Quiz