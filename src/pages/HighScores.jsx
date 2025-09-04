import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function HighScores() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("highScores") || "[]");
    const sorted = stored.sort((a, b) => b.score - a.score);
    setScores(sorted);
  }, []);

  const handleReset = () => {
    if (window.confirm("Delete all high scores?")) {
      localStorage.removeItem("highScores");
      setScores([]);
    }
  };

  const getBgColor = (index) => {
    switch (index) {
      case 0:
        return "bg-yellow-200";
      case 1:
        return "bg-gray-300";
      case 2:
        return "bg-orange-200";
      default:
        return "bg-gray-50";
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">🏆 High Scores</h2>

      {scores.length === 0 ? (
        <p className="text-center text-gray-600">
          No scores yet. Play a quiz to set a record!
        </p>
      ) : (
        <ul className="space-y-3">
          {scores.map((s, i) => (
            <li
              key={i}
              className={`flex justify-between p-3 rounded-xl shadow-sm ${getBgColor(
                i
              )}`}
            >
              <span className="font-medium">
                {i + 1}. {s.name} - {s.date}
              </span>
              <span className="text-blue-600 font-bold">
                {s.score}/{s.total}
              </span>
            </li>
          ))}
        </ul>
      )}

      <div className="flex justify-center gap-4 mt-6">
        <Link
          to="/"
          className="px-6 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
        >
          ⬅ Back to Home
        </Link>
        <button
          onClick={handleReset}
          className="px-6 py-2 bg-red-600 text-white rounded-xl shadow hover:bg-red-700 transition"
        >
          🗑 Reset Scores
        </button>
      </div>
    </div>
  );
}

export default HighScores;
