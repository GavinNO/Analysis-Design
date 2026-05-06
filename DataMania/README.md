# DataMania 2.0

A customizable, Jeopardy-style trivia game built with React.
Designed for classroom use, game nights, presentations, or club events, DataMania allows game masters to load their own question sets and manage multiple teams dynamically.

## Features

1. Dynamic Game Board
    - 5 categories × 5 questions (configurable via text file)
    - Questions reveal on selection and lock after use

2. Flexible Team System
    - Supports 2–4 teams
    - Editable team names
    - Live score tracking

3. Turn-Based Gameplay
    - Automatic turn rotation
    - Visual indicator for current team

4. Steal Mechanic
    - Teams can attempt unanswered questions in sequence
    - Incorrect teams are locked out per question
    - Question closes after all teams fail

5. Custom Question Import
    - Load questions from a .txt file
    - Easy for future game masters to create new games

6. Board Reset
    - Resets all gameplay state
    - Preserves team names and scores

---

## Project Structure

```bash
src/
│
├── components/
│   ├── GameBoard.jsx     # Main game logic and board rendering
│   ├── ScoreBoard.jsx    # Team management and scoring UI
│
├── hooks/
│   └── TeamManager.js    # Custom hook for team state
│
├── App.jsx               # Main app controller
├── main.jsx              # React entry point
└── App.css               # Styling
```

---

## Question File Format

### Place your question file in the public/ folder (e.g., Game1.txt).

Example format:

```txt
CATEGORY: Social Media
100 - Who created Facebook?
200 - What is the Windows shortcut to close an application?

CATEGORY: Gaming
100 - Which Nintendo character wears a red cap?
200 - What does the acronym VPN stand for?
```

Formatting rules:

- Use CATEGORY: to define a new category
- Use "value - question" format for each question
- Each category should have 5 questions for proper alignment

---

## How the Game Works

- Players select a question by point value
- The question appears in a modal
- The current team answers:
    - Correct → gains points, turn advances
    - Incorrect → next team gets a chance (steal)
- Once answered (or all teams fail), the question is locked

- Game continues until all questions are used

---

## Installation & Running

Run this command in your terminal to install dependencies:

```bash
npm install
```

Once npm is installed, run this command in the terminal:

```bash
npm run dev
```

Resolve any issues, then [open in browser](http://localhost:5173)

http://localhost:5173

Further troubleshooting is located toward the end of this document

---

## Controls

- Click a tile → open question

- "Correct" → award points

- "Wrong" → pass to next team

- "Reset Board" → clears board (keeps teams)

- Add/Remove teams via scoreboard

---

## Future Improvements

- End-of-game winner screen
- Timer per question
- Sound effects and animations
- Save/load multiple game files
- Daily Double / bonus rounds

---

## Authors

Gavin Olinger /n
Aaron Ford /n
Taona Makolija /n
Kylian James /n
Brandt Murphy

## Course

CIS/CSC 480 – Senior Seminar /n
Spring 2026

---

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
