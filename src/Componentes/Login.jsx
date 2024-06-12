import React, { useState } from 'react';

import Google from "../img/google.png";
import Facebook from "../img/facebook.png";
import Github from "../img/github.png";

const Login = () => {

  const [isRegister, setIsRegister] = useState(false);

  const google = ()=>{
    window.open("http://localhost:5000/auth/google", "_self");
  }

  const github = ()=>{
    window.open("http://localhost:5000/auth/github", "_self");
  }

  const facebook = ()=>{
    window.open("http://localhost:5000/auth/facebook", "_self");
  }


  return (
    <div className="login">
    <div className="wrapper">
      <h1 className="loginTitle">{isRegister ? "Create an Account" : "Choose a Login Method"}</h1>
      <div className="left">
        <div className="loginButton google" onClick={google}>
          <img src={Google} alt="Google" className="icon" />
          Google
        </div>
        <div className="loginButton facebook" onClick={facebook}>
          <img src={Facebook} alt="Facebook" className="icon" />
          Facebook
        </div>
        <div className="loginButton github" onClick={github}>
          <img src={Github} alt="Github" className="icon" />
          GitHub
        </div>
      </div>
      <div className="center">
        <div className="line"/>
        <div className="or">OR</div>
      </div>
      <div className="right">
      {isRegister ? (
            <>
        <input type="text" className="input" placeholder="Username" />
        <input type="email" className="input" placeholder="Email" />
        <input type="password" className="input" placeholder="Password" />
        <button className="submit">Register</button>
        <div className="toggleText"> Already have an account? 
        <span className="toggleLink" onClick={() => setIsRegister(false)}> Log In</span>
        </div>
        </>
          ) : (
            <>
              <input type="text" className="input" placeholder="Username" />
              <input type="password" className="input" placeholder="Password" />
              <button className="submit">Login</button>
              <div className="toggleText">
                Don't have an account? 
                <span className="toggleLink" onClick={() => setIsRegister(true)}> Register</span>
              </div>
            </>
          )}
      </div>
    </div>
  </div>
  );
};



export default Login;