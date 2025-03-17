import { signInWithPopup } from 'firebase/auth';
import React from 'react';
import {auth, googleProvider} from '../../firebase/firebase.config'

const GoogleLogIn = () => {

    const handleGoogleSignIn = async () => {
        try {
            await signInWithPopup(auth, googleProvider);

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center mt-8 gap-2 border py-2 rounded-full cursor-pointer">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG5FqrS9OkN5XrA5_GXcN7OV-SoLIl0KPwoQ&s" alt="Google" className="h-5" />
            Continue with Google
        </button>
    );
};

export default GoogleLogIn;