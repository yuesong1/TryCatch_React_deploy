import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginController, postRequest } from '../Utils';
import { useAuth } from '../../router/auth/AuthProvider';
//import Cookies from 'react-cookie'
export default function Login() {
  //const cookies=new Cookies();

  //console.log(cookies.get('admin'))
  const {onLogin}=useAuth();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate=useNavigate()
  function usernameInputHandler(e) {
    setUsername(e.target.value)
  }
  function passwordInputHandler(e) {
    setPassword(e.target.value)
  }

  function sendLoginReq(){
    if(!username||!password){
      alert("missing credentials")
      return;
    }
    var req=JSON.stringify({
      userName:username,
      passWord: password,
      authorisation: "admin"
    })
    //postRequest(LoginController(), req)
    onLogin(req)
    navigate(`/admin/dashboard`)
 
  }
  return (

    <div className="page">
      <div className="title"><h1 className="title">Admin Login</h1></div>
      <div className="login">
        <div className="top">
          
          <input required type="text" onChange={usernameInputHandler} className="cred" name="username" id="username" placeholder="Username" />
          <input required type="text" onChange={passwordInputHandler} className="cred" name="password" id="password" placeholder="Password" />
          <p className="recover_p">Recover Password</p>
          <button className="login" onClick={ sendLoginReq} >Login</button>
          <p className="sign_in">Sign in</p>
        </div>
      </div>
    </div>

  )
}
