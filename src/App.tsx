import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import { initialBoard, dropPiece, checkWin } from './GameLogic';
import { findBestMove } from './AI';
import LoadingOverlay from './components/LoadingOverlay';
import ThemeSwitcher from './components/ThemeSwitcher';

const App: React.FC = () => {
    const [board, setBoard] = useState(initialBoard());
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [winner, setWinner] = useState<number | null>(null);
    const [isAIThinking, setIsAIThinking] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Standardmäßig die Systemeinstellungen verwenden
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

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
            }, 1000); // 1000 Millisekunden Verzögerung (1 Sekunde)

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

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-dark-background text-dark-text' : 'bg-background text-text'} flex flex-col items-center justify-center p-4 relative`}>
            {isAIThinking && <LoadingOverlay />}
            <div className={`bg-white dark:bg-dark-background p-8 rounded-lg shadow-lg w-full max-w-md`}>
                <h1 className="text-4xl font-bold mb-4 text-center text-primary dark:text-dark-primary">Vier Gewinnt</h1>
                <h2 className="text-2xl mb-4 text-secondary dark:text-dark-secondary">Aktueller Spieler: {currentPlayer}</h2>
                <Board board={board} onCellClick={handleCellClick} />
                {winner && <h2 className="text-2xl mt-4 text-secondary dark:text-dark-secondary">Spieler {winner} hat gewonnen!</h2>}
                <button
                    className="mt-4 px-4 py-2 bg-primary dark:bg-dark-primary text-white rounded hover:bg-blue-700 transition duration-300 shadow-md"
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
