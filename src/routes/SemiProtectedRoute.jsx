import React from 'react';
import { Navigate } from 'react-router';

const SemiProtectedRoute = ({ children }) => {
    const isUser = true;  // Replace with actual authentication state
    const isActive = false; // Replace with actual isUser status

    // useEffect(() => {
    //     if (!isUser) {
    //         navigate('/authenticate');
    //     } else if (isUser && isActive) {
    //         navigate('/rooms');
    //     }
    // }, [isUser, isActive, navigate]);


    if (!isUser) {
        return <Navigate to={'/authenticate'} />
    }

    if (isUser && !isActive) {
        return children;
    }

    return <Navigate to={'/rooms'} />
};

export default SemiProtectedRoute;


// import React from 'react';
// import { useNavigate } from 'react-router';

// const SemiProtectedRoute = ({ children }) => {
//     const user = true;
//     const isActive = true;
//     const navigate = useNavigate();

//     if (!user) {
//         return navigate('/authenticate');
//     }

//     if (user && !isActive) {
//         return children;
//     }

//     return navigate('/rooms')
// };

// export default SemiProtectedRoute;