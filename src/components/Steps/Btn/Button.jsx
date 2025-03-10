import React from 'react';

const Button = ({ onNext }) => {
    return (
        <button
            onClick={onNext}
            className="mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-white font-medium w-full cursor-pointer">
            Next →
        </button>
    );
};

export default Button;