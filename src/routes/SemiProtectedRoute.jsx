import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';


const SemiProtectedRoute = ({ children }) => {
    const { user, loading } = useSelector((state) => state.user)

    if (loading) {
        return <p>Loading......</p>
    }

    if (!user) {
        return <Navigate to={'/authenticate'} />
    }


    return children;
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