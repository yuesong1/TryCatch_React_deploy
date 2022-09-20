import React from 'react'
import BaseRouter from '../../router';
import { useState } from 'react'
//import { createContext,useContext } from 'react'
import { AuthProvider, AuthContext, useAuth } from '../../router/auth/AuthProvider';
export default function Dashboard() {
  //const AuthContext = React.createContext(null);
  const { token, onLogin,onLogout } = useAuth()
  var t = token

  return (
    <>

      <div className="abody"></div>
      <div className="asetting">
        <p>Hello! {JSON.parse(token).username}    </p>
        <a href="/admin" onClick={onLogout}>logout</a>
      </div>
      {/* <div>Authenticated as {token}</div> */}
      {/* <button type="button" onClick={onLogin}>
      Sign In
    </button> */}
    </>

  )
}
