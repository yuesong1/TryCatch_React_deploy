import React from 'react'
import { useState } from 'react'
import { postRequest } from '../Utils';
import { useNavigate } from 'react-router-dom';
import { useBuyerAuth } from '../../router/auth/BuyerAuthProvider';
import backgroundImg from '../../assets/icons/background.jpg'
export default function BuyerLogin() {
  const navigate=useNavigate()
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const {token,onLogin}=useBuyerAuth()
  function usernameInputHandler(e) {
    setUsername(e.target.value)
  }
  function passwordInputHandler(e) {
    setPassword(e.target.value)
  }

  function sendLoginReq() {
    if (!username || !password) {
      alert("missing credentials")
      return;
    }
    var req = JSON.stringify({
      userName: username,
      passWord: password,
      authorisation: "buyer"
    })
    onLogin(req)
    navigate(`/buyer/search`)
    //postRequest("buyerLogin", req)
  }
  return (
    <div class="page" style={{ backgroundImage: `url(${backgroundImg})` }}>

      <div class="login">
        <div class="title"><h1 class="title">Buy-E </h1></div>
        <div class="top">

          <input required type="text" onChange={usernameInputHandler} class="cred" name="username" id="username" placeholder="Username" />
          <input required type="text" onChange={passwordInputHandler} class="cred" name="password" id="password" placeholder="Password" />
          <p class="recover_p">Recover Password</p>
          <button class="login" onClick={sendLoginReq} >Login</button>
          <p class="sign_in">Sign in</p>
        </div>
      </div>
    </div>
  )
}
