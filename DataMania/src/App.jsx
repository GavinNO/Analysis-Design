import { useState, useEffect } from "react";
import "./App.css";
import GameBoard from "./components/GameBoard";
import ScoreBoard from "./components/ScoreBoard";
import useTeams from "./hooks/TeamManager";

const categories = [
  "Social Media",
  "Internet Memes",
  "CEOs",
  "Gaming",
  "Devices",
];

const questions = [
  "Who created Facebook?",
  "Which NFL football player created and popularized the 'Dab' pose?",
  "Who is the CEO of Starlink?",
  "Which character is Nintendo most known for creating?",
  "What is the show with robots fighting called?",

  "What is the command hotkey to shut down an active application on a machine running Windows?",
  "Which site is Pepe the Frog from?",
  "Who was the creator of the coding language named after an Indonesian drink?",
  "What does the acronym VPN stand for?",
  "Dolly the Ewe's birth in 1996 helped prove the viability of what scientific and technological process?",

  "As of October 2025, which 2010 startup was the 4th most downloaded social media platform?",
  "What nine-word phrase is associated with a photoshopped and reproduced picture of Twitter user LuckyLuciano17 standing on a Tampa, Florida, sidewalk?",
  "What is the name of the mascot of Linux?",
  "Chuck E. Cheese was originally founded by Nolan Bushnell, who also co-founded what video game company known for its 2600?",
  "What company first introduced their flagship laptop model in 2011?",

  "What is the character limit for a tweet on X, formerly Twitter?",
  "What is the name given to the image of an old man grinning nervously?",
  "Who is the CEO of YouTube?",
  "What was the name of the princess Mario rescues in Nintendo Gameboy's Super Mario Land?",
  "What is the name of the prehistoric calculating tool that uses beans or stones that move in grooves of sand to perform calculations?",

  "What was Snapchat originally called when it first launched?",
  "A simple and endlessly reproduced line drawing of a bald man with a wistful expression was uploaded to a German imageboard in 2010 by what user?",
  "While building magnetrons at MIT in the 1940s, Percy Spencer noticed a melting chocolate bar in his pocket. This led to the invention of what household device?",
  "What is the name of the Star Wars video game series that began on the Nintendo 64 console in 1998?",
  "What is the name of the Californian company that makes dangerous art shows using robotics?",
];

function parseQuestions(text) {
  const lines = text.split("\n");

  const data = {};
  let currentCategory = "";

  lines.forEach(line => {
    const trimmed = line.trim();

    if (!trimmed) return;

    // Detect category
    if (trimmed.startsWith("CATEGORY:")) {
      currentCategory = trimmed.replace("CATEGORY:", "").trim();
      data[currentCategory] = [];
      return;
    }

    // Detect question line: "100 - Question text"
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

function App() {
  const {
    teams,
    addTeam,
    removeTeam,
    updateScore,
    updateName,
  } = useTeams();

  const [gameData, setGameData] = useState({});

  useEffect(() => {
    fetch("/Game1.txt")
      .then(res => res.text())
      .then(text => {
        const parsed = parseQuestions(text);
        setGameData(parsed);
      });
  }, []);

  function resetBoard() {
    setRevealedQuestions(Array(questions.length).fill(false));
  }

  return (
    <div className="app">
      <header className="top-section">
        <h1>DataMania 2.0</h1>
        <p>
          Choose a point value to reveal the question. Use the score buttons to
          update each team during the game.
        </p>
      </header>

      <GameBoard data={gameData}/>

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