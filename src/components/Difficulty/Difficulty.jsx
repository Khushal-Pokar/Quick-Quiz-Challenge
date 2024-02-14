import React, { createContext, useEffect, useState } from "react";
import "./Difficulty.css";
import { NavLink, useParams } from "react-router-dom";
import Quiz from "../Quiz/Quiz";
import { GridLoader } from "react-spinners";


const Difficulty = () => {

  let { category_id } = useParams();

  const [difficulty, setDifficulty] = useState("");
  const [questions, setQuestions] = useState([]);
  const [difficultySelected, setDifficultySelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (difficulty !== "") {
      setIsLoading(true);
      fetch(
        `https://opentdb.com/api.php?amount=5&category=${category_id}&difficulty=${difficulty}&type=multiple`
      )
        .then((response) => response.json())
        .then((loadedQuestions) => {
          setQuestions(
            loadedQuestions.results.map((loadedQuestion) => {
              const formattedQuestion = {
                question: loadedQuestion.question,
              };
              const answerChoices = [...loadedQuestion.incorrect_answers];
              formattedQuestion.correctAnswer =
                Math.floor(Math.random() * 4) + 1;
              answerChoices.splice(
                formattedQuestion.correctAnswer - 1,
                0,
                loadedQuestion.correct_answer
              );
              // answerChoices.forEach((choice, index) => {
              //   formattedQuestion['choice' + (index + 1)] = choice;
              // });
              formattedQuestion.choices = [...answerChoices];
              return formattedQuestion;
            })
          );
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [difficulty]);

  // console.log(questions);

  const getDifficulty = (diff) => {
    setDifficulty(diff);
    setDifficultySelected(true);
  };
  // console.log(difficulty);

  return (
    <>
      {isLoading ? (
        <div className="loader-container">
          <GridLoader color="#D8C7FF" size={30} />
          <h1>Loading Questions</h1>
        </div>
      ) : !difficultySelected ? (
        <div className="difficulty-container">
          {/* Selected Category: {category}; */}
          <h1>Select Difficulty</h1>
          <hr />
          <div className="difficulty">
            <button onClick={() => getDifficulty("easy")}>Easy</button>
            <button onClick={() => getDifficulty("medium")}>Medium</button>
            <button onClick={() => getDifficulty("hard")}>Hard</button>
          </div>
        </div>
      ) : (
        <div>
          {/* <QuizContext.Provider value={{questions}}> */}
          {questions.length !== 0 ? <Quiz quiz={questions} /> : null}
          {/* </QuizContext.Provider> */}
        </div>
      )}
    </>
  );
};

export default Difficulty;
