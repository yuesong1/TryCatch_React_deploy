import React from 'react'
import { Link } from 'react-router-dom'
import { useSellerAuth } from '../../router/auth/SellerAuthProvider'
import { useCookies } from 'react-cookie';
export default function SellerNav() {
  const{token,onLogout}=useSellerAuth()
  const [cookies, setCookie, removeCookie] = useCookies(['buyer']);
  return (
    <div className="snav">
    <div className="stag">
        <p className="sinfo">Hi,{cookies.employee_username} !</p>
        <Link to="/seller/listing">
        <button className="snav"> My Listing</button>
        </Link>

        <Link to="/seller/order">
        <button className="snav"> My Order</button>
        </Link>

    </div>
    <div className="ssetting">
        {/* <button className="ssetting">Settings </button> */}
        <button className="ssetting" onClick={onLogout}>Logout </button>
    </div>
    </div>
  )
}
