import { useState } from 'react';


// Active Players decider object
const Players = {
    A: 0,
    B: 1,
};
// Players Icon
const PlayersIcon = {
    [Players.A]: 'X',
    [Players.B]: 'O',
};
// Identify the turns/moves of player
const DefaultTurns = {
    [Players.A]: [],
    [Players.B]: [],
};
// Winning patterns to determine which player has won
const WinningPatterns = ["012", "345", "678", "036", "147", "258", "048", "246"];



function useTicTacToe() {


 // It is used to identify which player is active
 const [activePlayer, setActivePlayer] = useState(Players.A);
 // It is used to identify the moves/turns of player
 const [playerTurns, setPlayerTurns] = useState(structuredClone(DefaultTurns));
 // To show the message
 const [message, setMessage] = useState("");

  // Handler for active player turns
  const handleTurn = (index) => {
    return () => {
        // For finding out which player is active
        const newPlayer = activePlayer === Players.A ? Players.B : Players.A;

        // Handle multiple clicks on the same button
        const playerATurns = playerTurns[Players.A];
        const playerBTurns = playerTurns[Players.B];

        if (playerATurns.includes(String(index)) || playerBTurns.includes(String(index))) {
            return;
        }

        // Identify the turns
        const oldPlayerTurns = structuredClone(playerTurns);
        oldPlayerTurns[activePlayer].push(String(index));

        // Function to determine the winning player
        const isWon = isPlayerWon(oldPlayerTurns[activePlayer]);
        if (isWon) {
            setMessage(`Player ${PlayersIcon[activePlayer]} has won the game!`);
        } else if (oldPlayerTurns[Players.A].length + oldPlayerTurns[Players.B].length === 9) {
            setMessage("It's a draw!");
        }
        setPlayerTurns(oldPlayerTurns);
        setActivePlayer(newPlayer);

    };
};

function isPlayerWon(turns) {
    const turnsInStr = turns.sort().join("");
    const isWon = WinningPatterns.some(pattern => pattern.split('').every(turn => turnsInStr.includes(turn)));
    return isWon;
}

// Handler for restarting the game
const handleRestart = () => {
    setPlayerTurns(structuredClone(DefaultTurns));
    setActivePlayer(Players.A);
    setMessage("");
};


return {handleRestart,handleTurn,message,playerTurns,activePlayer}


}

export default useTicTacToe