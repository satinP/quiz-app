import React, { useState, useEffect } from "react";
import { GlobalStyle, Wrapper } from "./AppStyles";

import { getQuizQuestions, Difficulty, QuestionState } from "./api/Api";

import QuestionCard from "./components/QuestionCard/QuestionCard";
import Select from "./components/Select/Select";

export type Answer = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Answer[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [difficulty, setDifficulty] = useState(Difficulty.EASY);
  const [showStart, setShowStart] = useState(true);

  const canShowStart = () => {
    return gameOver || userAnswers.length === TOTAL_QUESTIONS || showStart;
  };

  const fetchApi = async (total: number, difficulty: Difficulty) => {
    const newQuestions = await getQuizQuestions(total, difficulty);
    setQuestions(newQuestions);
  };

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);

    await fetchApi(TOTAL_QUESTIONS, difficulty);

    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
    setShowStart(false);
  };

  const changeDifficulty = (event: any) => {
    const selectedDifficulty = event.target.value;

    if (selectedDifficulty !== difficulty) {
      setDifficulty(event.target.value);
      setShowStart(true);
    }
  };

  const checkAnswer = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = event.currentTarget.value;

      const isCorrect = questions[number].correct_answer === answer;

      if (isCorrect) {
        setScore(score + 1);
      }

      const newAnswer = {
        question: questions[number].question,
        answer,
        correct: isCorrect,
        correctAnswer: questions[number].correct_answer,
      };

      setUserAnswers((currentAnswer) => [...currentAnswer, newAnswer]);
    }
  };

  const nextQuestion = () => {
    const nextQuestion = number + 1;

    if (nextQuestion === TOTAL_QUESTIONS) {
      return setGameOver(true);
    }

    setNumber(nextQuestion);
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1> Quiz app </h1>

        <Select
          callback={changeDifficulty}
          name="difficulty"
          label="Difficulty: "
          options={[
            { value: Difficulty.EASY, label: "EASY" },
            { value: Difficulty.MEDIUM, label: "MEDIUM" },
            { value: Difficulty.HARD, label: "HARD" },
          ]}
        />

        {canShowStart() ? (
          <button className="start" onClick={startQuiz}>
            Start
          </button>
        ) : (
          ""
        )}

        {!gameOver ? <p className="score">Score: {score}</p> : ""}

        {loading ? <p>Loading Questions!</p> : ""}

        {!loading && !gameOver ? (
          <QuestionCard
            questionNumber={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers[number]}
            callback={checkAnswer}
          />
        ) : (
          ""
        )}

        {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
          <button className="next" onClick={nextQuestion}>
            Next Question
          </button>
        ) : (
          ""
        )}
      </Wrapper>
    </>
  );
}

export default App;
