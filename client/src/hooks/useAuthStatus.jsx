import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useAuthStatus = () => {

    const { user } = useSelector(state => state.auth);

    const [checkUser, setCheckUser] = useState(true);

    const [loggedIn, setLoggedIn] = useState(false);

    

    useEffect(() => {

        if (user) {

            setLoggedIn(true);

        } else {
            setLoggedIn(false);
        }

        setCheckUser(false);

    }, [user]);

    return {
        checkUser,
        loggedIn,
        
    };
};

export default useAuthStatus;