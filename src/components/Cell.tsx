import React from 'react';

interface CellProps {
    value: number; // 0 für leer, 1 für Spieler 1, 2 für Spieler 2
}

const Cell: React.FC<CellProps> = ({ value }) => {
    const getColor = () => {
        switch (value) {
            case 1:
                return 'bg-primary';
            case 2:
                return 'bg-secondary';
            default:
                return 'bg-white';
        }
    };

    return <div className={`w-16 h-16 border border-gray-300 rounded-full ${getColor()}`}></div>;
};

export default Cell;
