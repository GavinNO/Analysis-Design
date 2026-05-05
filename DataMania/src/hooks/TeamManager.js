import { useState } from "react";

// Logic to handle different teams and their scores at the same time
export default function useTeams() {
    // Default teams
    const [teams, setTeams] = useState([
        { name: "Team 1", score: 0 },
        { name: "Team 2", score: 0 },
    ]);

    function addTeam() {
        if (teams.length < 4) {
            setTeams([...teams, { name: `Team ${teams.length + 1}`, score: 0 }]);
        }
    }

    function removeTeam(index) {
        if (teams.length > 2) {
            setTeams(teams.filter((_, i) => i !== index));
        }
    }

    function updateScore(index, amount) {
        const updated = [...teams];
        updated[index].score += amount;
        setTeams(updated);
    }

    function updateName(index, name) {
        const updated = [...teams];
        updated[index].name = name;
        setTeams(updated);
    }

    return {
        teams,
        addTeam,
        removeTeam,
        updateScore,
        updateName,
    };
}