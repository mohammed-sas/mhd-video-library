import axios from "axios";
import {
    useContext,
    createContext,
    useState
} from "react";
import {
    useNavigate
} from 'react-router-dom';

let initialState = {
    user: null,
    token: null
}

const AuthContext = createContext(initialState);


const AuthProvider = ({
    children
}) => {
    const auth = useProvideAuth();
    return ( <
        AuthContext.Provider value = {
            auth
        } > {
            children
        } <
        /AuthContext.Provider>
    )
}

const useProvideAuth = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();
    const signUp = async (user) => {
        try {
            const response = await axios.post('/api/auth/signup', user);
            localStorage.setItem("token", response.data.encodedToken);
            console.log(response)
            setCurrentUser(response.data.createdUser);
            return response.status;
        } catch (error) {
            console.log(error)
        }
    }
    const login = async (user) => {
        try {
            const response = await axios.post('/api/auth/login', user);
            localStorage.setItem("token", response.data.encodedToken);
            setCurrentUser(response.data.foundUser);
            return response.status;
        } catch (error) {
            console.log(error);
        }
    }

    const logout = () => {
        localStorage.setItem("token", null);
        setCurrentUser(null);
        navigate("/");
    }

    return {
        currentUser,
        signUp,
        login,
        logout
    };

}

const useAuth = () => useContext(AuthContext);

export {
    useAuth,
    AuthProvider
};