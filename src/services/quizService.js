export async function fetchQuestions(amount = 5, difficulty = "easy") {
  const url = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.response_code !== 0) throw new Error("API returned no questions");

    // Normalize API format → UI model
    return data.results.map((q, index) => {
      const answers = [...q.incorrect_answers, q.correct_answer];
      const shuffled = answers.sort(() => Math.random() - 0.5);
      return {
        id: index + 1,
        question: q.question,
        options: shuffled,
        correct: q.correct_answer,
      };
    });
  } catch (err) {
    console.error("Falling back to local questions", err);
    const local = await import("../data/questions.json");
    return local.default;
  }
}
