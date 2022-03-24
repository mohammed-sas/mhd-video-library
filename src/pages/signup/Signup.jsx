import './signup.css';
import '../login/login.css';
import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useAuth } from '../../context/auth-context';
import { useToggle } from '../../hooks/useToggle';
const Signup = () => {
    const navigate = useNavigate();
    const [showpass,setShowpass] = useToggle(false);
    const [showConfirmpass,setShowConfirmpass] = useToggle(false);
    const {signUp} = useAuth();
    const [passMatch,setPassMatch] = useState(false);
    const [user,setUser] = useState({
        email:"",
        firstName:"",
        lastName:"",
        password:"",
        confirmPassword:"",
    });
    const changeHandler=e=>{
        const {name,value}=e.target;
        setUser({
            ...user,
            [name]:value
        })
    }
    const submitHandler=async (e)=>{
        try{
            e.preventDefault();
            if(user.password !== user.confirmPassword){
                setPassMatch(false);
                return;
            }
            const status = await signUp(user);
            if(status===201)
                navigate("/");
        }catch(error){
            console.log(error);
        }
    }
    return (
        <main className="login-container">
                <div className="login-form-container bg-black ">
                    <h2 className="centered-text text-white">Signup</h2>
                    <form action="post" className="login-form" onSubmit={submitHandler}>
                        <label className="text-white" htmlFor="email">Email address 
                            <br/> <input id="email" name="email" onChange={changeHandler} type="email" placeholder="abc@neog.com"/>
                        </label>
                        <label className="text-white" htmlFor="firstName">First Name 
                            <br/> <input id="firstName" name="firstName" required onChange={changeHandler} type="text" placeholder="First Name"/>
                        </label>
                        <label className="text-white" htmlFor="lastName">Last Name 
                            <br/> <input id="lastName" name="lastName" required onChange={changeHandler} type="text" placeholder="Last Name"/>
                        </label>
                        
                        <label className="text-white" htmlFor="password">Password
                            <div id="password" className="password">
                                <input name="password" type={showpass ?"text":"password"} required onChange={changeHandler} />
                                <i onClick={setShowpass} className={"fas " + (showpass?"fa-eye":"fa-eye-slash")}></i>
                            </div>
                        </label>
                        <label className="text-white"  htmlFor="confirmPassword">Confirm Password
                            <div className="password">
                                <input name="confirmPassword" type={showConfirmpass ?"text":"password"} required  onChange={changeHandler} />
                                <i onClick={setShowConfirmpass} className={"fas " + (showConfirmpass?"fa-eye":"fa-eye-slash")}></i>
                            </div>
                        </label>
                        {passMatch?null: <span className="mismatch">Passwords Not Matching</span>}
                        
                        
                        <div>
                            <label htmlFor="accept-condition" className="text-white"><input id="accept-condition" type="checkbox"/> I accept all Terms & Conditions</label>
                            
                        </div>
                        <input type="submit" value="Create New Account"  className="btn btn-primary bg-primary text-grey"/>
                        <div>
                            <p className="centered-text"><Link to="/login" className="text-primary">Already have an account <i className="fas fa-chevron-right"></i></Link></p>
                        </div>
                    </form>
                </div>
            </main>
    )
}

export default Signup
