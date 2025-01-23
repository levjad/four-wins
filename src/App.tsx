import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import { initialBoard, dropPiece, checkWin, getNextFreeCell } from './GameLogic';
import { findBestMove } from './AI';
import LoadingOverlay from './components/LoadingOverlay';
import ThemeSwitcher from './components/ThemeSwitcher';

const App: React.FC = () => {
    const [board, setBoard] = useState(initialBoard());
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [winner, setWinner] = useState<number | null>(null);
    const [isAIThinking, setIsAIThinking] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    });
    const [hoveredColumn, setHoveredColumn] = useState<number | null>(null);
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);

    const handleCellClick = (column: number) => {
        if (winner || currentPlayer === 2) return;

        const newBoard = board.map(row => [...row]);
        if (dropPiece(newBoard, column, currentPlayer)) {
            if (checkWin(newBoard, currentPlayer)) {
                setWinner(currentPlayer);
            } else {
                setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
            }
            setBoard(newBoard);
        }
    };

    useEffect(() => {
        if (currentPlayer === 2 && !winner) {
            setIsAIThinking(true);
            const timeout = setTimeout(() => {
                const bestMove = findBestMove(board);
                if (bestMove !== -1) {
                    const newBoard = board.map(row => [...row]);
                    dropPiece(newBoard, bestMove, 2);
                    if (checkWin(newBoard, 2)) {
                        setWinner(2);
                    } else {
                        setCurrentPlayer(1);
                    }
                    setBoard(newBoard);
                    setIsAIThinking(false);
                }
            }, 500); // 500 Millisekunden Verzögerung

            return () => clearTimeout(timeout);
        }
    }, [board, currentPlayer, winner]);

    const resetGame = () => {
        setBoard(initialBoard());
        setCurrentPlayer(1);
        setWinner(null);
        setIsAIThinking(false);
    };

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => setIsDarkMode(mediaQuery.matches);
        mediaQuery.addListener(handleChange);
        return () => mediaQuery.removeListener(handleChange);
    }, []);

    const handleMouseEnter = (column: number) => {
        const nextFreeRow = getNextFreeCell(board, column);
        if (nextFreeRow !== null) {
            setHoveredColumn(column);
            setHoveredRow(nextFreeRow);
        }
    };

    const handleMouseLeave = () => {
        setHoveredColumn(null);
        setHoveredRow(null);
    };

    return (
        <div className={`min-h-screen ${isDarkMode ? 'dark bg-dark-background text-dark-text' : 'bg-background text-text'} flex flex-col items-center justify-center p-4 relative`}>
            {isAIThinking && <LoadingOverlay />}
            <div className="text-center mb-4">
                <h1 className="text-4xl font-bold text-primary dark:text-dark-primary">Vier Gewinnt</h1>
                {winner ? (
                    <h2 className="text-2xl text-secondary dark:text-dark-secondary">Spieler {winner} hat gewonnen!</h2>
                ) : (
                    <h2 className="text-2xl text-secondary dark:text-dark-secondary">Aktueller Spieler: {currentPlayer}</h2>
                )}
            </div>
            <div className={`bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg`}>
                <Board
                    board={board}
                    onCellClick={handleCellClick}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    hoveredColumn={hoveredColumn}
                    hoveredRow={hoveredRow}
                />
            </div>
            <div className="mt-4 flex space-x-4">
                <button
                    className="px-4 py-2 bg-primary dark:bg-dark-primary text-white rounded hover:bg-blue-700 transition duration-300 shadow-md"
                    onClick={resetGame}
                >
                    Spiel zurücksetzen
                </button>
                <ThemeSwitcher isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            </div>
        </div>
    );
};

export default App;
