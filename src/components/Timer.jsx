import { useEffect, useState } from "react";

function Timer({ duration, onTimeout, current }) {
  const [time, setTime] = useState(duration);

  useEffect(() => {
    setTime(duration); // reset timer on new question
    let called = false; // prevent double-calls

    const id = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          if (!called) {
            called = true;
            onTimeout();
          }
          clearInterval(id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [current, duration, onTimeout]);

  return <p className="text-sm text-gray-600">⏳ {time}s left</p>;
}

export default Timer;
