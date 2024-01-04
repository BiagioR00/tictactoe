const container = document.getElementById("container");
const paraContainer = document.getElementById("para");
const resetButton = document.getElementById("reset");
const para = document.createElement("p");
const ticGame = new Game();

para.textContent = "It is your turn: " + (ticGame.currentPlayer === ticGame.players[0] ? ticGame.players[0].mark : ticGame.players[1].mark);
paraContainer.append(para)

resetButton.addEventListener("click", () => resetGameboard(ticGame));

function Gameboard() {
    this.gameboard = ["", "", "",
                      "", "", "",
                      "", "", ""];
}

function resetGameboard(board) {
   board.gameboard.gameboard = ["", "", "",
                          "", "", "",
                          "", "", ""];
    renderGameboard();
}



function Player(name, mark) {
    this.name = name;
    this.mark = mark;
}

function createPlayer1() {
    const name = "Player1";
    const mark = "X";

    return new Player(name, mark);
}

function createPlayer2() {
    const name = "Player2";
    const mark = "O";

    return new Player(name, mark);
}

function Game() {
    this.players = [createPlayer1(), createPlayer2()];
    this.currentPlayer = this.players[0];
    this.gameboard = new Gameboard();
}

Game.prototype.makeAMove = function(index) {
    if (this.checkGameResult()) {
        return;
    }
    if (this.gameboard.gameboard[index] === "") {
        this.gameboard.gameboard[index] = this.currentPlayer.mark;
        const result = this.checkGameResult();
        if (result) {
            this.endMatch(result);
            return;
        }
        this.currentPlayer = (this.currentPlayer === this.players[0]) ? this.players[1] : this.players[0];
    }
};

Game.prototype.checkGameResult = function() {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]            
    ];

    for (const line of lines) {
        const [a, b, c] = line;
        if (this.gameboard.gameboard[a] !== "" &&
            this.gameboard.gameboard[a] === this.gameboard.gameboard[b] &&
            this.gameboard.gameboard[a] === this.gameboard.gameboard[c]) {
            return this.currentPlayer.mark;
        }
    }

    if (!this.gameboard.gameboard.includes("")) {
        return "It's a tie!";
    }

    return null; 
};

Game.prototype.endMatch = function(result) {
    console.log(result);
};


renderGameboard(); 
function renderGameboard() {
    container.textContent = ''; 

    for (let i = 0; i < 9; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.dataset.index = i;
        container.appendChild(square);

        if (ticGame.gameboard.gameboard[i] !== "") {
            square.textContent = ticGame.gameboard.gameboard[i];
        }

        square.addEventListener("click", () => {
            ticGame.makeAMove(i);
            renderGameboard();
            updateTurnIndicator();
            winner();
        });
    }
    updateTurnIndicator();
}

function updateTurnIndicator() {
    para.textContent = "It is your turn: " + (ticGame.currentPlayer === ticGame.players[0] ? ticGame.players[0].mark : ticGame.players[1].mark);
}

function winner() {
    const result = ticGame.checkGameResult();
    if (result) {
        para.textContent = "The winner is: " + result;
    }
}