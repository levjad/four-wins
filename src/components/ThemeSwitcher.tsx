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
            className="p-2 bg-primary dark:bg-dark-primary text-white rounded hover:bg-blue-700 transition duration-300 shadow-md"
            onClick={toggleTheme}
        >
            {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
    );
};

export default ThemeSwitcher;
