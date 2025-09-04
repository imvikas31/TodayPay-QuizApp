import { useState } from "react";

export function useQuiz(questions) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);

  const selectAnswer = (option) => {
    const question = questions[current];
    const isCorrect = option === question.correct;

    setAnswers((prev) => [
      ...prev,
      { questionId: question.id, selected: option, correct: question.correct }
    ]);

    if (isCorrect) setScore((s) => s + 1);
  };

  const next = () => setCurrent((c) => c + 1);
  const restart = () => {
    setCurrent(0);
    setAnswers([]);
    setScore(0);
  };

  return { current, answers, score, selectAnswer, next, restart };
}
