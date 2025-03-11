import React from 'react';
import Button from '../Btn/Button';

const StepAvatar = ({ onNext }) => {
    return (

        <section>
            <div className='container mx-auto px-4'>
                <div className='flex justify-center items-center h-screen'>
                    <div className="bg-zinc-900 p-6 rounded-2xl shadow-lg w-96 text-center text-white">
                        <h2 className="text-xl font-semibold mb-4">Okay, Barry Allen</h2>
                        <div className="mb-6">
                            <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                                {/* Placeholder for the photo */}
                                <span className="text-gray-500">Photo</span>
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                id="photo-upload"
                            />
                            <label
                                htmlFor="photo-upload"
                                className="text-blue-500 hover:text-blue-600 transition duration-200 cursor-pointer"
                            >
                                Choose a different photo
                            </label>
                        </div>
                        <Button onNext={onNext} />
                    </div>
                </div>
            </div>
        </section>


    );
};

export default StepAvatar;