import {  useRef } from "react";
import "./login.scss"
import logo from "../../../public/pvrd-light.png"

const Login = () => {
  const userName = useRef<any>();
  const password = useRef<any>();

  const hendleSubmit = () => {
   
    localStorage.setItem("UserName", userName.current.value)
    localStorage.setItem("Password", password.current.value)

  //   if (localStorage.getItem( userName.current.value && password.current.value)) {
  //     alert("milgya data") //post call
  //   }
  //   else{
  //     alert("data not match")
  //   }
   }

  console.log(localStorage.getItem("UserName" + "" + "Password"));

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
          <input type="text" ref={userName} className="input" placeholder="Enter your username" />
        </div>

        <div className="flex-column">
          <label>Password </label>
        </div>

        <div className="inputForm">
          <input type="password" ref={password} className="input" placeholder="Enter your Password" />
        </div>

        <button onClick={hendleSubmit} className="button-submit">Sign In</button>
      </form>
    </div>
  )
}
export default Login
