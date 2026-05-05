function GameBoard({
  categories,
  questions,
  revealedQuestions,
  showQuestion,
  hideQuestion,
}) {
  return (
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
  );
}

export default GameBoard;