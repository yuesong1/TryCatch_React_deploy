import React from 'react'
import { useState } from 'react'
import { postRequest } from '../Utils';
import { useSellerAuth } from '../../router/auth/SellerAuthProvider';
import { useNavigate } from 'react-router-dom';
export default function SellerLogin() {
    const navigate=useNavigate()
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const {onLogin}=useSellerAuth();
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
            authorisation: "seller"
        })
        onLogin(req)
        navigate(`/seller/listing`)
        
        //postRequest("sellerLogin", req)
    }
    return (
        <div class="page">
            <div class="title"><h1 class="title">Seller Login</h1></div>
            <div class="login">
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
