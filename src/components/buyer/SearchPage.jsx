import React from 'react'
import SearchBar from './SearchBar'
import Setting from './Setting'
import style from '../../css/buyer.css'
export default function SearchPage() {
  return (
    <div>
        <Setting/>
        <div className="page" style={{ backgroundColor: "white" }}>
        <SearchBar/>
        </div>
    </div>
  )
}
