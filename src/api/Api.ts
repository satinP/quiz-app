import { shuffleArray } from "../Utils/Utils";

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

export type QuestionState = Question & { answers: string[] }; 

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export const getQuizQuestions = async (amount: number, difficulty: Difficulty) => {
  const uri = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  
  const data = await fetch(uri);

  const jsonData = await data.json();

  return jsonData.results.map((question: Question) => {
    return {...question, answers: shuffleArray<string>([...question.incorrect_answers, question.correct_answer])}
  })
}