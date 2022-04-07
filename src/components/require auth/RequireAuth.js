import {useLocation,Navigate} from 'react-router-dom';
import {useAuth} from '../../context'

const RequireAuth=({children})=>{
    const location =useLocation();
    const {currentUser} = useAuth();
    return currentUser.user ?(children) : (
        <Navigate to="/login" state={{from:location}} replace/>
    )
}

export default RequireAuth
