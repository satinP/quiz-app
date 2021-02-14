import React from "react";
import { Answer } from "../../App";
import { Wrapper, ButtonWrapper } from "./QuestionCardStyle";

type QuestionCardProps = {
  question: string;
  answers: Array<string>;
  callback: React.MouseEventHandler;
  userAnswer: Answer | undefined;
  questionNumber: number;
  totalQuestions: number;
};

function QuestionCard(props: QuestionCardProps) {
  return (
    <Wrapper>
      <p className="number">
        Question: {props.questionNumber} / {props.totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: props.question }} />

      <div>
        {props.answers ? (
          props.answers.map((answer, index) => (
            <ButtonWrapper
              correct={props.userAnswer?.correctAnswer === answer}
              userClicked={props.userAnswer?.answer === answer}
              key={index}
            >
              <button disabled={!!props.userAnswer} value={answer} onClick={props.callback}>
                <span dangerouslySetInnerHTML={{ __html: answer }}></span>
              </button>
            </ButtonWrapper>
          ))
        ) : (
          <>No questions available</>
        )}
      </div>
    </Wrapper>
  );
}

export default QuestionCard;
