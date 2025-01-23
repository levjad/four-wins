import React from 'react';

const LoadingOverlay: React.FC = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
                <p className="text-white text-lg">Spieler 2 denkt nach...</p>
            </div>
        </div>
    );
};

export default LoadingOverlay;