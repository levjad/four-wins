import React from 'react';
import Cell from './Cell';

interface BoardProps {
    board: number[][];
    onCellClick: (column: number) => void;
    onMouseEnter: (column: number) => void;
    onMouseLeave: () => void;
    hoveredColumn: number | null;
    hoveredRow: number | null;
}

const Board: React.FC<BoardProps> = ({ board, onCellClick, onMouseEnter, onMouseLeave, hoveredColumn, hoveredRow }) => {
    return (
        <div className="flex flex-col items-center space-y-2">
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className="flex space-x-2">
                    {row.map((cell, colIndex) => (
                        <div
                            key={colIndex}
                            onClick={() => onCellClick(colIndex)}
                            onMouseEnter={() => onMouseEnter(colIndex)}
                            onMouseLeave={onMouseLeave}
                            className="flex justify-center items-center"
                        >
                            <Cell
                                value={cell}
                                isHovered={hoveredColumn === colIndex && hoveredRow === rowIndex}
                            />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Board;
