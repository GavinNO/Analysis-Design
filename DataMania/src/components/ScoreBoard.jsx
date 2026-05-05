function ScoreBoard({
  teamOneName,
  setTeamOneName,
  teamTwoName,
  setTeamTwoName,
  teamOneScore,
  teamTwoScore,
  addPoints,
  subtractPoints,
  setTeamOneScore,
  setTeamTwoScore,
}) {
  return (
    <section className="scoreboard">
      <div className="team-card">
        <h2>{teamOneName || "Team 1"}</h2>

        <input
          type="text"
          value={teamOneName}
          onChange={(e) => setTeamOneName(e.target.value)}
        />

        <p>{teamOneScore}</p>

        <button onClick={() => addPoints(1, 100)}>+100</button>
        <button onClick={() => subtractPoints(1, 100)}>-100</button>
        <button onClick={() => setTeamOneScore(0)}>Reset</button>
      </div>

      <div className="team-card">
        <h2>{teamTwoName || "Team 2"}</h2>

        <input
          type="text"
          value={teamTwoName}
          onChange={(e) => setTeamTwoName(e.target.value)}
        />

        <p>{teamTwoScore}</p>

        <button onClick={() => addPoints(2, 100)}>+100</button>
        <button onClick={() => subtractPoints(2, 100)}>-100</button>
        <button onClick={() => setTeamTwoScore(0)}>Reset</button>
      </div>
    </section>
  );
}

export default ScoreBoard;