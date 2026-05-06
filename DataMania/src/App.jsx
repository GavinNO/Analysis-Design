import { useState, useEffect } from "react";
import "./App.css";
import GameBoard from "./components/GameBoard";
import ScoreBoard from "./components/ScoreBoard";
import useTeams from "./hooks/TeamManager";

/***************************************************
 * Function used to parse text from the text file
 * *************************************************/
function parseQuestions(text) {
  const lines = text.split("\n");
  const data = {};

  let currentCategory = "";

  // Each line of the game questions are parsed to determine category, question, and value
  lines.forEach(line => {
    const trimmed = line.trim();

    if (!trimmed) return;

    // Detect game question category
    if (trimmed.startsWith("CATEGORY:")) {
      currentCategory = trimmed.replace("CATEGORY:", "").trim();
      data[currentCategory] = [];
      return;
    }

    // Detect question line and value: "value - text"
    // Ex: "100 - Who is Darth Vader?"
    const match = trimmed.match(/^(\d+)\s*-\s*(.+)$/);

    if (match && currentCategory) {
      const value = Number(match[1]);
      const question = match[2];

      data[currentCategory].push({
        value,
        question,
      });
    }
  });

  return data;
}

/******************
 * Main app logic
 *****************/
function App() {
  // Keep track of teams
  const {
    teams,
    addTeam,
    removeTeam,
    updateScore,
    updateName,
  } = useTeams();

  const [gameData, setGameData] = useState({});

  // Find "Game1.txt", parse the information
  useEffect(() => {
    fetch("/Game1.txt")
      .then(res => res.text())
      .then(text => {
        const parsed = parseQuestions(text);
        setGameData(parsed);
      });
  }, []);

  // Logic to reset the board when pressed
  function resetBoard() {
    setRevealedQuestions(Array(questions.length).fill(false));
  }

  // Display the web app
  return (
    <div className="app">
      <header className="top-section">
        <h1>DataMania 2.0</h1>
        <p>
          Choose a point value to reveal the question. Use the score buttons to
          update each team during the game.
        </p>
      </header>

      <GameBoard 
        data={gameData}
        teams={teams}  
        updateScore={updateScore}
      />

      <div className="board-controls">
        <button onClick={resetBoard}>Reset Board</button>
      </div>

      <ScoreBoard
        teams={teams}
        addTeam={addTeam}
        removeTeam={removeTeam}
        updateScore={updateScore}
        updateName={updateName}
      />
    </div>
  );
}

export default App;