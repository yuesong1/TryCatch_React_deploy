import React from 'react'
import ErrImg from '../assets/404.png'
export default function () {
  return (
    <div>
        <h1>
            404
        </h1>
        <img src={ErrImg} alt="404" />
    </div>
  )
}
