import { useRef } from "react";
import "./login.scss"
import logo from "../../../public/pvrd-light.png"

const Login = () => {

  const data = useRef<any>();

  const hendleSubmit = () => {
    console.log(data.current.value,"login");
    localStorage.setItem("inputValue",data.current.value)
  }
console.log(localStorage.getItem("inputValue"));

  return (
    <div className='login'>
      <form className="form">
        <div className="logo-container">
          <img src={logo} alt="" />
        </div>
        <div className="flex-column">
          <label>Username </label>
        </div>
        <div className="inputForm">
          <input type="text" ref={data} className="input" placeholder="Enter your username" />
        </div>

        <div className="flex-column">
          <label>Password </label>
        </div>
        
        <div className="inputForm">
          <input type="password" ref={data} className="input" placeholder="Enter your Password" />
        </div>


        <button onClick={hendleSubmit} className="button-submit">Sign In</button>

      </form>
    </div>
  )
}

export default Login
