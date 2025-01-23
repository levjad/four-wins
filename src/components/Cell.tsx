import React from 'react';

interface CellProps {
    value: number; // 0 für leer, 1 für Spieler 1, 2 für Spieler 2
    isHovered: boolean;
}

const Cell: React.FC<CellProps> = ({ value, isHovered }) => {
    const getColor = () => {
        switch (value) {
            case 1:
                return 'bg-primary';
            case 2:
                return 'bg-secondary';
            default:
                return '';
        }
    };

    return (
        <div
            className={`w-16 h-16 border border-gray-300 dark:border-gray-800 rounded-full ${getColor()} ${isHovered ? 'bg-gray-300 dark:bg-gray-700' : ''}`}
        ></div>
    );
};

export default Cell;
