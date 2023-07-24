let board = document.querySelector(".gameboard");

const Gameboard = (() => {
    let gameboard = ["x", "o", "x", "o", "x", "o", "x", "o", "x"];

    const render = () => {
        const squareList = document.querySelectorAll(".square");
        squareList.forEach((square, index) => {
            square.textContent = gameboard[index];
        });
    }
    return { render };
})();

const Game = (() => {
    let players = [];
    let currentPlayerIndex = 0;

    const start = () => {
        Gameboard.render();
    }
    
    return{start};
})();

const Player = (name, marker) => {

};

Game.start();
