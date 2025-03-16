import React, { useState } from 'react';
import Button from '../Btn/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setName } from '../../../features/activated/activatedSlice';

const StepName = ({ onNext }) => {

    const { name } = useSelector((state) => state.activate);
    const dispatch = useDispatch();
    const [fullName, setFullName] = useState(name);

    const handleNext = () => {
        if (!fullName) {
            return;
        };

        dispatch(setName(fullName));

        onNext();

    }

    return (
        <section>
            <div className='container mx-auto px-4'>
                <div className='flex justify-center items-center h-screen'>
                    <div className="bg-zinc-900 p-6 rounded-2xl shadow-lg w-96 text-center text-white">
                        <h2 className="text-xl font-semibold mb-4">What's your full name?</h2>
                        <input
                            type="text"
                            placeholder="Yourname"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                        />
                        <p className="text-sm text-gray-600 mb-6">People use real names at ordering here.</p>
                        <Button onNext={handleNext} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StepName;