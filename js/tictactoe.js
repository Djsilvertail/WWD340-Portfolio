let gridContainer = document.getElementById('grid-container');
let targetCell = gridContainer.addEventListener('mouseup', (event) => updateCell(event.target));
//let targetCell = gridContainer.addEventListener('touchend', (event) => updateCell(event.target));

var player = "X";
var turns = 0;
var winner = null;

function resetGame() {
    for (let i = 0; i < 9; i++) {
        gridContainer.children[i].className = 'cell';
    }
    player = "X";
    turns = 0;
    winner = null;
    document.getElementById('output').innerText = "";
}

function updateCell(cell) {
    console.log('Firing function', {
        cell,
        player,
        classList: cell.classList
    });
    if (winner) {
        console.error('Please reset game there is already a winner.');
        return;
    }
    if (player === "X") {
        if (!cell.classList.contains('o') && !cell.classList.contains('x')) {
            cell.classList.add('x');
            player = "O";
            turns++;
        }
    } else if (player === "O") {
        if (!cell.classList.contains('o') && !cell.classList.contains('x')) {
            cell.classList.add('o');
            player = "X";
            turns++;
        }
    }
    winGame();
    if (turns >= 9) {
        document.getElementById('output').innerText = "Tie Game!";
    }
}

function winGame() {
    let cellsObj = {
        1: null,
        2: null,
        3: null,
        4: null,
        5: null,
        6: null,
        7: null,
        8: null,
        9: null,
    }
    const winConditions = {
        hTop: [1, 2, 3],
        hMid: [4, 5, 6],
        hBot: [7, 8, 9],
        vLeft: [1, 4, 7],
        vMid: [2, 5, 8],
        vRight: [3, 6, 9],
        diagRight: [1, 5, 9],
        diagLeft: [3, 5, 7],
    }
    for (let i = 0; i < 9; i++) {
        if (gridContainer.children[i].classList.contains('x')) {
            cellsObj[i + 1] = 'x';
        } else if (gridContainer.children[i].classList.contains('o')) {
            cellsObj[i + 1] = 'o';
        }
    }
    const wKeys = Object.keys(winConditions)
    // Iterate over win conditions
    wKeys.forEach((key) => {
        // Check each winCondition against each cell

        // Check if cells are 'x'
        const xWin = winConditions[key].every((cell) => {
            if (cellsObj[cell] !== 'x') {
                return false;
            }
            return true;
        });
        // Check if cells are 'o'
        const oWin = winConditions[key].every((cell) => {
            if (cellsObj[cell] !== 'o') {
                return false;
            }
            return true;
        });
        if (xWin) {
            winner = 'x';
        } else if (oWin) {
            winner = 'o';
        }
    });
    if (winner) {
        document.getElementById('output').innerText = `${winner} Wins the game!!!!`;
    }
}