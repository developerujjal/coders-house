import React, { useState } from 'react';
import Button from '../Btn/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setAvater } from '../../../features/activated/activatedSlice';
import { setAuth } from '../../../features/auth/authSlice';
import useAxiosCommon from '../../../hooks/useAxiosCommon';



// eslint-disable-next-line no-unused-vars
const StepAvatar = ({ onNext }) => {

    const { name, avater } = useSelector((state) => state.activate);
    const dispatch = useDispatch();
    const [image, setImage] = useState('https://static.vecteezy.com/system/resources/thumbnails/029/364/941/small_2x/3d-carton-of-boy-going-to-school-ai-photo.jpg');
    const [loading, setLoading] = useState(true)
    const axiosCommon = useAxiosCommon();


    const handleImage = (e) => {
        console.log(e)
        const imgFile = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(imgFile);
        reader.onloadend = function () {
            setImage(reader.result);
            dispatch(setAvater(reader.result))
        }

    }


    const handleSubmit = async () => {
        setLoading(true);
        if(!name || !avater){
            return;
        }

        try {
            const { data } = await axiosCommon.post('/api/activate', {
                name,
                avater
            });

            console.log(data)
            if (data?.auth) {
                dispatch(setAuth(data))
            }

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }


    //Activation Loader
    if (loading) {
        return <div>Activation is Progress</div>
    }



    return (

        <section>
            <div className='container mx-auto px-4'>
                <div className='flex justify-center items-center h-screen'>
                    <div className="bg-zinc-900 p-6 rounded-2xl shadow-lg w-96 text-center text-white">
                        <h2 className="text-xl font-semibold mb-4">Okay, {name}</h2>
                        <div className="mb-6">
                            <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                                {/* Placeholder for the photo */}
                                <img src={image} alt="" className='w-24 h-24 rounded-full overflow-hidden' />
                            </div>
                            <input
                                onChange={handleImage}
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
                        <Button onNext={handleSubmit} />
                    </div>
                </div>
            </div>
        </section>


    );
};

export default StepAvatar;