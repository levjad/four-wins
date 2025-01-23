// src/AI.ts

import { dropPiece, checkWin } from './GameLogic';

const evaluateBoard = (board: number[][], depth: number) => {
    if (checkWin(board, 1)) return -10 + depth;
    if (checkWin(board, 2)) return 10 - depth;
    return 0;
};

const minimax = (board: number[][], depth: number, isMaximizing: boolean) => {
    if (checkWin(board, 1) || checkWin(board, 2) || depth === 0) {
        return evaluateBoard(board, depth);
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let col = 0; col < board[0].length; col++) {
            const newBoard = board.map(row => [...row]);
            if (dropPiece(newBoard, col, 2)) {
                const score = minimax(newBoard, depth - 1, false);
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let col = 0; col < board[0].length; col++) {
            const newBoard = board.map(row => [...row]);
            if (dropPiece(newBoard, col, 1)) {
                const score = minimax(newBoard, depth - 1, true);
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
};

export const findBestMove = (board: number[][]) => {
    let bestScore = -Infinity;
    let bestMove = -1;

    for (let col = 0; col < board[0].length; col++) {
        const newBoard = board.map(row => [...row]);
        if (dropPiece(newBoard, col, 2)) {
            const score = minimax(newBoard, 5, false);
            if (score > bestScore) {
                bestScore = score;
                bestMove = col;
            }
        }
    }

    return bestMove;
};
