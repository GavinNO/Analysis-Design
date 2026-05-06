import { useState } from "react";

// The display information of the user's game board
function GameBoard({ data, teams, updateScore }) {
  // Logic to catch an error in code
  if (!data || Object.keys(data).length === 0) {
    return <div>Board failed to load. Refresh.</div>;
  }

  // State for revealed questions and current team
  const [currentTeam, setCurrentTeam] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [wrongTeams, setWrongTeams] = useState([]);
  const [usedQuestions, setUsedQuestions] = useState({});

  // Logic for game masters to assign correct points
  function handleAnswer(isCorrect) {
    if (!activeQuestion) return;

    const points = activeQuestion.q.value;

    if (isCorrect) {
      updateScore(currentTeam, points);

      setActiveQuestion(null);
      setWrongTeams([]);

      setCurrentTeam((currentTeam + 1) % teams.length);
      return;
    }

    // Mark current team as wrong
    const updatedWrong = [...wrongTeams, currentTeam];
    setWrongTeams(updatedWrong);

    // If all teams are wrong → close question
    if (updatedWrong.length === teams.length) {
      setActiveQuestion(null);
      setWrongTeams([]);
      setCurrentTeam((currentTeam + 1) % teams.length);
      return;
    }

    // Find next available team (steal rotation)
    let next = (currentTeam + 1) % teams.length;

    while (updatedWrong.includes(next)) {
      next = (next + 1) % teams.length;
    }

    setCurrentTeam(next);
  }

  // Logic for resetting the board
  function resetBoard() {
    setActiveQuestion(null);
    setWrongTeams([]);
    setUsedQuestions({});
    setCurrentTeam(0);
  }

  /*********************
  * The user interface
  **********************/
  return (
    <>
      {/* Turn Indicator */}
      <div className="turn-indicator">
        Current Team: {teams[currentTeam].name}

        <button onClick={() => setCurrentTeam((currentTeam + 1) % teams.length)}>
          Next Turn (test)
        </button>
      </div>

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
            const isUsed = usedQuestions[key];

            return (
              <button
                key={key}
                className={`question-card ${isUsed ? "used" : ""}`}
                onClick={() => {
                  if (isUsed) return;

                  setActiveQuestion({
                    category,
                    row,
                    key,
                    q
                  });

                  setWrongTeams([]);

                  setUsedQuestions(prev => ({
                    ...prev,
                    [key]: true
                  }));
                }}
              >
                {isUsed ? "USED" : q.value}
              </button>
            );
          })
        )}

      </section>

      <div className="board-controls">
        <button onClick={resetBoard}>
          Reset Board
        </button>
      </div>

      {/* Button that shows the active question */}
      {activeQuestion && (
        <div className="active-question">
          <h2>{activeQuestion.q.question}</h2>

          <p>Current Team: {teams[currentTeam].name}</p>

          <button onClick={() => handleAnswer(true)}>
            Correct
          </button>

          <button onClick={() => handleAnswer(false)}>
            Wrong
          </button>

          <button onClick={() => setActiveQuestion(null)}>
            Close
          </button>
        </div>
      )}
    </>
  );
}

export default GameBoard;