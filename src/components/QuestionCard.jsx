function QuestionCard({ question, options, onSelect, selected }) {
  return (
    <div className="p-4 bg-white rounded-2xl shadow-md">
      <h2 className="text-lg font-semibold mb-4" dangerouslySetInnerHTML={{ __html: question }} />
      <div className="grid gap-2">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => onSelect(opt)}
            className={`p-2 rounded-xl border transition ${
              selected === opt
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            dangerouslySetInnerHTML={{ __html: opt }}
          />
        ))}
      </div>
    </div>
  );
}
export default  QuestionCard
