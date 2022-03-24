import { useState } from "react";
import './login.css'
import {Link, useNavigate} from 'react-router-dom';
import { useAuth } from "../../context/auth-context";
const Login = () => {
    const {login} = useAuth();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "mohammed@gmail.com",
        password: "test123",
      });
      const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
          ...user,
          [name]: value,
        });
      };
      const submitHandler=async (e)=>{
        try{
          e.preventDefault();
          let status =await login(user);
          if(status === 200)
            navigate('/');
        }catch(error){

        }
      }
    return (
        <main className="login-container ">
        <div className="login-form-container bg-black ">
          <h2 className="centered-text text-white">Login</h2>
          <form action="post" className="login-form" onSubmit={submitHandler}>
            <label htmlFor="email" className="text-white">
              Email address
              <br />{" "}
              <input
                id="email"
                onChange={handleChange}
                name="email"
                type="email"
                placeholder="abc@neog.com"
                defaultValue="mohammed@gmail.com"
              />
            </label>

            <label htmlFor="password" className="text-white">
              Password
              <br />{" "}
              <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="*******"
                defaultValue="password"
              />
            </label>

            <div className="remember-me-container">
              <label htmlFor="remember-me" className="text-white">
                <input id="remember-me" type="checkbox" /> Remember me
              </label>
              <span>
                <a href="" className="text-primary">Forgot Your Password?</a>
              </span>
            </div>
            <input type="submit" value="Login" className="btn btn-primary bg-primary text-grey" />
            <div>
              <p className="centered-text ">
                <Link to="/signup" className="text-primary">
                  Create New Account <i className="fas fa-chevron-right"></i>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </main>
    )
}

export default Login
