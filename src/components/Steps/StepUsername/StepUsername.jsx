import React from 'react';

const StepUsername = () => {
    return (
        <section>
            <div className='container mx-auto px-4'>
                <div className='flex justify-center items-center h-screen'>
                    <div className="bg-zinc-900 p-6 rounded-2xl shadow-lg w-96 text-center text-white">
                        <h1 className="text-2xl font-bold mb-4">Pick a username</h1>
                        <p className="text-sm text-gray-600 mb-6">Username can be used for the login.</p>
                        <input
                            type="text"
                            placeholder="Username"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
                        />
                        <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 cursor-pointer">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StepUsername;