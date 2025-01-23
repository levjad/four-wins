// src/components/ThemeSwitcher.tsx

import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

interface ThemeSwitcherProps {
    isDarkMode: boolean;
    toggleTheme: () => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ isDarkMode, toggleTheme }) => {
    return (
        <button
            className="p-2 bg-transparent text-white rounded hover:bg-blue-700 transition duration-300"
            onClick={toggleTheme}
        >
            {isDarkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-700" />}
        </button>
    );
};

export default ThemeSwitcher;
