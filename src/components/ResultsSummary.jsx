function ResultsSummary({ answers }) {
  return (
    <div className="space-y-4">
      {answers.map((a, i) => (
        <div key={i} className="p-3 border rounded-lg">
          <p className="font-medium">Q{i + 1}:</p>
          <p className="text-sm">✅ Correct: {a.correct}</p>
          <p
            className={`text-sm ${
              a.selected === a.correct ? "text-green-600" : "text-red-600"
            }`}
          >
            Your Answer: {a.selected}
          </p>
        </div>
      ))}
    </div>
  );
}
export default ResultsSummary