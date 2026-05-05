import { useState } from "react";

function GameBoard({ data }) {
  if (!data || Object.keys(data).length === 0) {
    return <div>Board failed to load. Refresh.</div>;
  }

  const [revealed, setRevealed] = useState({});

  function toggleReveal(key) {
    setRevealed(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  }

  return (
    <section className="game-board">

      {/* Categories */}
      {Object.keys(data).map(category => (
        <div className="category-card" key={category}>
          {category}
        </div>
      ))}

      {/* Questions */}
      {[0, 1, 2, 3, 4].map(row =>
        Object.entries(data).map(([category, questions], colIndex) => {
          const q = questions[row];

          if (!q) return null;

          const key = `${category}-${row}`;
          const isRevealed = revealed[key];

          return (
            <button
              key={key}
              className={`question-card ${isRevealed ? "revealed" : ""}`}
              onClick={() => toggleReveal(key)}
            >
              {isRevealed ? q.question : q.value}
            </button>
          );
        })
      )}

    </section>
  );
}

export default GameBoard;