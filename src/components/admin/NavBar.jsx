import React from 'react'

import homeIcon from '../../assets/icons/home.svg'
import userIcon from '../../assets/icons/user.svg'
import goodsIcon from '../../assets/icons/goods.svg'
import ordersIcon from '../../assets/icons/orders.svg'
import styles from '../../css/admin.css'
import { Link } from 'react-router-dom'
import { AuthProvider, useAuth } from '../../router/auth/AuthProvider'

export default function NavBar() {
  const {token,onLogout} = useAuth()
  return (
    <div className="anav">
      <Link to="/admin/dashboard">       
        <div className="aicon"><button className="aicon_button"><img src={homeIcon} alt=""/></button></div>
      </Link> 
      <Link to="/admin/users">
        <div className="aicon"><button className="aicon_button"><img src={userIcon} alt=""/></button></div>
      </Link>
      <Link to="/admin/items">
        <div className="aicon"><button className="aicon_button"><img src={goodsIcon} alt=""/></button></div>
      </Link>
      <Link to="/admin/orders">
        <div className="aicon"><button className="aicon_button"><img src={ordersIcon}alt=""/></button></div>
      </Link>
{/* 
      {   token &&(
        
        <button type="button" onClick={onLogout}>
          Sign Out
        </button>
      )} */}

    </div>
  )
}
