import { useLocation, useNavigate, Link } from "react-router-dom";
import ResultsSummary from "../components/ResultsSummary";

function Results() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    navigate("/", { replace: true });
    return null;
  }

  const { score, total, answers, username } = state;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">
        🎉 {username}, you scored {score}/{total}
      </h2>

      <ResultsSummary answers={answers} />

      <div className="flex justify-center gap-4 mt-6">
        <Link
          to="/quiz"
          className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        >
          Restart Quiz 🔄
        </Link>
        <Link
          to="/highscores"
          className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
        >
          View High Scores 🏆
        </Link>
      </div>
    </div>
  );
}

export default Results;
