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
                return true;
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

    const announcementScreen = document.querySelector(".announcement");
    const announcementText = document.querySelector(".announcement-text");
    const controls = document.querySelector(".controls");
    const scoreBoard1 = document.getElementById("player1-score");
    const scoreBoard2 = document.getElementById("player2-score");


    const start = () => {
        players = [
            createPlayer(document.querySelector("#player1-name").value, "x", 0),
            createPlayer(document.querySelector("#player2-name").value, "o", 0)
        ];
        currentPlayerIndex = 0;
        Gameboard.resetBoard();
        Gameboard.render();
        controls.classList.toggle("hide");
        scoreBoard1.classList.toggle("hide");
        scoreBoard2.classList.toggle("hide");
        scoreBoard1.innerHTML = `${players[0].name}: ${players[0].score}`
        scoreBoard2.innerHTML = `${players[1].name}: ${players[1].score}`
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

    const newRound = () => {
        //hide the announcement and reset the game
        announcementScreen.classList.toggle("hide");
        Gameboard.resetBoard();
        Gameboard.render();

    }

    const win = () => {
        announcementScreen.classList.toggle("hide");
        // currentPlayerIndex gets swapped even on a win so we need to switch it back to get the correct winners name
        currentPlayerIndex = (currentPlayerIndex == 0 ? 1 : 0);
        announcementText.innerHTML = `${players[currentPlayerIndex].name} wins!`;
        players[currentPlayerIndex].score++;
        scoreBoard1.innerHTML = `${players[0].name}: ${players[0].score}`
        scoreBoard2.innerHTML = `${players[1].name}: ${players[1].score}`
    }

    const draw = () => {
        announcementScreen.classList.toggle("hide");
        announcementText.innerHTML = `Draw`;
    }

    return { start, click, draw, newRound };
})();

const createPlayer = (name, marker, score) => {
    return { name, marker, score };
};

const startButton = document.querySelector("#start-btn");
startButton.addEventListener("click", Game.start);
const nextRoundButton = document.querySelector("#next-round-btn");
nextRoundButton.addEventListener("click", Game.newRound);