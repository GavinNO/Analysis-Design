import { useState } from "react";
import "./App.css";

const categories = [
  "Social Media",
  "Internet Memes",
  "Incorporated",
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

function App() {
  const [revealedQuestions, setRevealedQuestions] = useState(
    Array(questions.length).fill(false)
  );

  const [teamOneName, setTeamOneName] = useState("");
  const [teamTwoName, setTeamTwoName] = useState("");
  const [teamOneScore, setTeamOneScore] = useState(0);
  const [teamTwoScore, setTeamTwoScore] = useState(0);

  function showQuestion(index) {
    const updatedQuestions = [...revealedQuestions];
    updatedQuestions[index] = true;
    setRevealedQuestions(updatedQuestions);
  }

  function hideQuestion(index) {
    const updatedQuestions = [...revealedQuestions];
    updatedQuestions[index] = false;
    setRevealedQuestions(updatedQuestions);
  }

  function resetBoard() {
    setRevealedQuestions(Array(questions.length).fill(false));
  }

  function addPoints(teamNumber, amount) {
    if (teamNumber === 1) {
      setTeamOneScore(teamOneScore + amount);
    } else {
      setTeamTwoScore(teamTwoScore + amount);
    }
  }

  function subtractPoints(teamNumber, amount) {
    if (teamNumber === 1) {
      setTeamOneScore(teamOneScore - amount);
    } else {
      setTeamTwoScore(teamTwoScore - amount);
    }
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

      <section className="game-board">
        {categories.map((category, index) => (
          <div className="category-card" key={index}>
            {category}
          </div>
        ))}

        {questions.map((question, index) => {
          const rowNumber = Math.floor(index / 5);
          const pointValue = (rowNumber + 1) * 100;

          return (
            <button
              className={
                revealedQuestions[index]
                  ? "question-card revealed"
                  : "question-card"
              }
              key={index}
              onClick={() => showQuestion(index)}
              onDoubleClick={() => hideQuestion(index)}
            >
              {revealedQuestions[index] ? question : pointValue}
            </button>
          );
        })}
      </section>

      <div className="board-controls">
        <button onClick={resetBoard}>Reset Board</button>
      </div>

      <section className="scoreboard">
        <div className="team-card">
          <h2>{teamOneName || "Team 1"}</h2>

          <label>Team 1 Name</label>
          <input
            type="text"
            value={teamOneName}
            onChange={(event) => setTeamOneName(event.target.value)}
            placeholder="Enter team name"
          />

          <p className="score">{teamOneScore}</p>

          <div className="score-buttons">
            <button onClick={() => addPoints(1, 100)}>+100</button>
            <button onClick={() => subtractPoints(1, 100)}>-100</button>
            <button onClick={() => setTeamOneScore(0)}>Reset</button>
          </div>
        </div>

        <div className="team-card">
          <h2>{teamTwoName || "Team 2"}</h2>

          <label>Team 2 Name</label>
          <input
            type="text"
            value={teamTwoName}
            onChange={(event) => setTeamTwoName(event.target.value)}
            placeholder="Enter team name"
          />

          <p className="score">{teamTwoScore}</p>

          <div className="score-buttons">
            <button onClick={() => addPoints(2, 100)}>+100</button>
            <button onClick={() => subtractPoints(2, 100)}>-100</button>
            <button onClick={() => setTeamTwoScore(0)}>Reset</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;