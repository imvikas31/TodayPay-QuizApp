import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleStart = () => {
    if (!name.trim()) return alert("Please enter your name!");
    navigate("/quiz", { state: { username: name } });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-b from-blue-50 to-white">
      <h1 className="text-4xl font-bold mb-4 text-blue-700">Quiz Master</h1>
      <p className="text-gray-600 mb-6">Enter your name to start the quiz</p>

      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="px-4 py-2 border rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        onClick={handleStart}
        className="px-6 py-3 bg-blue-600 text-white rounded-2xl shadow-lg hover:bg-blue-700 transition"
      >
        Start Quiz 🚀
      </button>
    </div>
  );
}

export default Home;
