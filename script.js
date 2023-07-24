const Gameboard = (() => {
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
        }
    }

    return { render, placeMarker };
})();

const createPlayer = (name, marker) => {
    return { name, marker };
};

const Game = (() => {
    let players = [];
    let currentPlayerIndex;
    let gameOver;

    const start = () => {
        players = [
            createPlayer("tom", "x"),
            createPlayer("ari", "o")
        ];
        currentPlayerIndex = 0;
        gameOver = false;
        Gameboard.render();
    }

    const click = (e) => {
        let index = e.target.id.split("-")[1];
        Gameboard.placeMarker(index, players[currentPlayerIndex]);
        currentPlayerIndex = (currentPlayerIndex == 0 ? 1 : 0);

    }

    return { start, click };
})();

Game.start();