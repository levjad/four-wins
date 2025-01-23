import React from 'react';
import Cell from './Cell';

interface BoardProps {
    board: number[][];
    onCellClick: (column: number) => void;
}

const Board: React.FC<BoardProps> = ({ board, onCellClick }) => {
    return (
        <div className="flex flex-col items-center space-y-2">
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className="flex space-x-2">
                    {row.map((cell, colIndex) => (
                        <div key={colIndex} onClick={() => onCellClick(colIndex)} className="flex justify-center items-center">
                            <Cell value={cell} />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Board;
