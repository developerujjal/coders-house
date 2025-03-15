import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';


const SemiProtectedRoute = ({ children }) => {
    const { user, isAuth } = useSelector((state) => state.auth)



    // useEffect(() => {
    //     if (!isUser) {
    //         navigate('/authenticate');
    //     } else if (isUser && isActive) {
    //         navigate('/rooms');
    //     }
    // }, [isUser, isActive, navigate]);


    if (!isAuth) {
        return <Navigate to={'/authenticate'} />
    }

    if (isAuth && !user?.isActivated) {
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