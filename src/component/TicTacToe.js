import './style.css';
import useTicTacToe from './useTicTacToe';

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


const TicTacToe = () => {
    

   const  {handleRestart,handleTurn,message,playerTurns,activePlayer} = useTicTacToe()

    // Making a buttons array
    const buttons = Array.from({ length: 9 });

    return (
        <center>
            <div className='tic-tac-toe'>
                {buttons.map((_, index) => {
                    // Determine the active player and their turns/moves
                    const currentPlayerTurns = playerTurns[activePlayer];
                    const otherPlayer = activePlayer === Players.A ? Players.B : Players.A;
                    const otherPlayerTurns = playerTurns[otherPlayer];

                    // This condition is used to identify which player's turn it is and what their icon is
                    let icon = '';
                    if (currentPlayerTurns.includes(String(index))) {
                        icon = PlayersIcon[activePlayer];
                    } else if (otherPlayerTurns.includes(String(index))) {
                        icon = PlayersIcon[otherPlayer];
                    }

                    return (
                        <button key={index} onClick={handleTurn(index)}>
                            {icon}
                        </button>
                    );
                })}
            </div>
            {message && (
                <div>
                    <h3>{message}</h3>
                    <button type="button" class="btn btn-primary" style={{fontSize:"50px"}} onClick={handleRestart}>Restart</button>
                </div>
            )}
        </center>
    );
};

export default TicTacToe;
