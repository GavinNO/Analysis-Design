// Handler for the scoreboard at the bottom of the screen
function ScoreBoard({
  teams,
  addTeam,
  removeTeam,
  updateScore,
  updateName,
}) {
  /*****************************************
   * The user interface for tracking score 
   *****************************************/
  return (
    <section className="scoreboard">
      {teams.map((team, index) => (
        <div className="team-card" key={index}>
          <h2>{team.name || `Team ${index + 1}`}</h2>

          {/* Text box for customizable team names */}
          <input
            type="text"
            value={team.name}
            onChange={(e) => updateName(index, e.target.value)}
            placeholder={`Team ${index + 1}`}
          />

          <p>{team.score}</p>

          {/* Buttons to add and subtract scores */}
          <div className="score-buttons">
            <button onClick={() => updateScore(index, 100)}>+100</button>
            <button onClick={() => updateScore(index, -100)}>-100</button>
            <button onClick={() => updateScore(index, -team.score)}>
              Reset
            </button>
          </div>

          {/* Remove team button */}
          {teams.length > 2 && (
            <button onClick={() => removeTeam(index)}>Remove</button>
          )}
        </div>
      ))}

      {/* Add team button */}
      {teams.length < 4 && (
        <button onClick={addTeam}>Add Team</button>
      )}
    </section>
  );
}

export default ScoreBoard;