const Gameboard = (() => {
    // let gameboard = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
    let gameboard = ["", "", "", "", "", "", "", "", ""];

    const render = () => {
        const squares = document.querySelectorAll(".square");
        squares.forEach((square, index) => {
            square.innerHTML = gameboard[index];
            square.addEventListener("click", Game.click);
        });
    }

    const placeMarker = (index, player) => {
        if (!gameboard[index]) {
            gameboard[index] = player.marker;
            Gameboard.render();
            return true;
        }
        return false;
    }

    const checkGameOver = () => {
        if (gameboard.toString().length >= 13) {
            //horizontal wins
            if (gameboard[0] && gameboard[0] === gameboard[1] && gameboard[1] === gameboard[2]) {
                return true;
            } else if (gameboard[3] && gameboard[3] === gameboard[4] && gameboard[4] === gameboard[5]) {
                console.log("win")
            } else if (gameboard[6] && gameboard[6] === gameboard[7] && gameboard[7] === gameboard[8]) {
                return true;
            }
            // diagonal wins
            else if (gameboard[0] && gameboard[0] === gameboard[4] && gameboard[4] === gameboard[8]) {
                return true;
            } else if (gameboard[2] && gameboard[2] === gameboard[4] && gameboard[4] === gameboard[6]) {
                return true;
            }
            // verticl wins
            else if (gameboard[0] && gameboard[0] === gameboard[3] && gameboard[3] === gameboard[6]) {
                return true;
            } else if (gameboard[1] && gameboard[1] === gameboard[4] && gameboard[4] === gameboard[7]) {
                return true;
            } else if (gameboard[2] && gameboard[2] === gameboard[5] && gameboard[5] === gameboard[8]) {
                return true;
            }
        }
        if (gameboard.toString().length == 17) {
            Game.draw();
        }

    }

    const resetBoard = () => {
        gameboard = ["", "", "", "", "", "", "", "", ""];
    }

    return { render, placeMarker, checkGameOver, resetBoard };
})();

const Game = (() => {
    let players = [];
    let currentPlayerIndex;

    const start = () => {
        players = [
            createPlayer(document.querySelector("#player1-name").value, "x"),
            createPlayer(document.querySelector("#player2-name").value, "o")
        ];
        currentPlayerIndex = 0;
        Gameboard.resetBoard();
        Gameboard.render();
    }

    const click = (e) => {
        let index = e.target.id.split("-")[1];
        // if placement is legal...
        if (Gameboard.placeMarker(index, players[currentPlayerIndex])) {
            currentPlayerIndex = (currentPlayerIndex == 0 ? 1 : 0);
            // if the game is over...
            if (Gameboard.checkGameOver()) {
                win();
            }
        }

    }

    const win = () => {
        console.log("win");
    }

    const draw = () => {
        console.log("draw");
    }

    const restart = () => {
        Gameboard.resetBoard();
        Gameboard.render();
        currentPlayerIndex = 0;
    }

    return { start, click, restart, draw };
})();

const createPlayer = (name, marker) => {
    console.log(name);
    return { name, marker };
};

startButton = document.querySelector("#start-btn");
restartButton = document.querySelector("#restart-btn");
startButton.addEventListener("click", Game.start);
restartButton.addEventListener("click", Game.restart);