function Gameboard() {
    const gameboard = ["", "", "",
                       "", "", "",
                       "", "", ""];
}

function Player(name, mark) {
    this.name = name;
    this.mark = mark
}

function createPlayer1() {
    const name = "Player1";
    const mark = "X";

    return new Player(name, mark)
}

function createPlayer2() {
    const name = "Player2";
    const mark = "O";

    return new Player(name, mark)
}

function Game() {
    this.players = [createPlayer1(), createPlayer2()];
    this.currentPlayer = this.players[0];
    this.gameboard = new Gameboard();
}

const ticGame = new Game();
console.log(ticGame);