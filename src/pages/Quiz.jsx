import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchQuestions } from "../services/quizService";
import QuestionCard from "../components/QuestionCard";
import ProgressBar from "../components/ProgressBar";
import Timer from "../components/Timer";
import { useQuiz } from "../hooks/useQuiz";

function Quiz() {
  const location = useLocation();
  const navigate = useNavigate();

  const username = location.state?.username;
  useEffect(() => {
    if (!username) navigate("/", { replace: true });
  }, [username, navigate]);

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const { current, answers, score, selectAnswer, next } = useQuiz(questions);

  useEffect(() => {
    fetchQuestions(5, "easy").then((qs) => {
      setQuestions(qs);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading...</p>;

  // Save score & navigate to Results once
  if (current >= questions.length) {
    const stored = JSON.parse(localStorage.getItem("highScores") || "[]");
    const newScore = {
      name: username || "Player",
      score,
      total: questions.length,
      date: new Date().toLocaleString(),
    };
    const updated = [...stored, newScore]
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
    localStorage.setItem("highScores", JSON.stringify(updated));

    navigate("/results", {
      state: { username, answers, score, total: questions.length },
    });
    return null;
  }

  const handleNext = () => {
    if (!selected) selectAnswer("Unanswered");
    else selectAnswer(selected);

    setSelected(null);
    next();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">
      <ProgressBar current={current} total={questions.length} />

      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-600">
          Question {current + 1} of {questions.length}
        </span>
        <Timer duration={30} current={current} onTimeout={handleNext} />
      </div>

      <QuestionCard
        question={questions[current].question}
        options={questions[current].options}
        selected={selected}
        onSelect={setSelected}
      />

      <div className="flex justify-end mt-6">
        <button
          onClick={handleNext}
          disabled={!selected}
          className="px-6 py-2 rounded-xl font-medium bg-blue-600 text-white disabled:bg-gray-300 shadow hover:bg-blue-700 transition"
        >
          {current === questions.length - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}

export default Quiz;
