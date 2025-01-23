export const initialBoard = () => Array.from({ length: 6 }, () => Array(7).fill(0));

export const dropPiece = (board: number[][], column: number, player: number) => {
    for (let row = board.length - 1; row >= 0; row--) {
        if (board[row][column] === 0) {
            board[row][column] = player;
            return true;
        }
    }
    return false;
};

export const checkWin = (board: number[][], player: number) => {
    // Überprüfe horizontale Gewinne
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col <= board[row].length - 4; col++) {
            if (board[row][col] === player &&
                board[row][col + 1] === player &&
                board[row][col + 2] === player &&
                board[row][col + 3] === player) {
                return true;
            }
        }
    }

    // Überprüfe vertikale Gewinne
    for (let col = 0; col < board[0].length; col++) {
        for (let row = 0; row <= board.length - 4; row++) {
            if (board[row][col] === player &&
                board[row + 1][col] === player &&
                board[row + 2][col] === player &&
                board[row + 3][col] === player) {
                return true;
            }
        }
    }

    // Überprüfe diagonale Gewinne (von links oben nach rechts unten)
    for (let row = 0; row <= board.length - 4; row++) {
        for (let col = 0; col <= board[row].length - 4; col++) {
            if (board[row][col] === player &&
                board[row + 1][col + 1] === player &&
                board[row + 2][col + 2] === player &&
                board[row + 3][col + 3] === player) {
                return true;
            }
        }
    }

    // Überprüfe diagonale Gewinne (von rechts oben nach links unten)
    for (let row = 3; row < board.length; row++) {
        for (let col = 0; col <= board[row].length - 4; col++) {
            if (board[row][col] === player &&
                board[row - 1][col + 1] === player &&
                board[row - 2][col + 2] === player &&
                board[row - 3][col + 3] === player) {
                return true;
            }
        }
    }

    return false;
};

export const getNextFreeCell = (board: number[][], column: number): number | null => {
    for (let row = board.length - 1; row >= 0; row--) {
        if (board[row][column] === 0) {
            return row;
        }
    }
    return null;
};
