import { useState } from "react";
import './login.css'
import {Link} from 'react-router-dom';
const Login = () => {
    const [user, setUser] = useState({
        email: "mohammed@gmail.com",
        password: "password",
      });
      const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
          ...user,
          [name]: value,
        });
      };
    return (
        <main className="login-container ">
        <div className="login-form-container bg-black ">
          <h2 className="centered-text grey">Login</h2>
          <form action="post" className="login-form" >
            <label htmlFor="email">
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

            <label htmlFor="password">
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
              <label htmlFor="remember-me">
                <input id="remember-me" type="checkbox" /> Remember me
              </label>
              <span>
                <a href="">Forgot Your Password?</a>
              </span>
            </div>
            <input type="submit" value="Login" className="btn btn-primary" />
            <div>
              <p className="centered-text">
                <Link to="/signup">
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
