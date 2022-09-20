import React from 'react'

export default function AdminPop(props) {
  return (

            <div className='floatWindow'>
                <div className='floatContent'>


                <p>Add new account</p>
              
                <p>username:</p>
                <input className='floatInput' type="text" minLength={4} style={{ width: "200px" }} name="username" onChange={props.addHandler} />
                <p>password:</p>
                <input className='floatInput' type="text" minLength={4} style={{ width: "200px" }} name="password" onChange={props.addHandler} />


            </div>
            <div className='floatButtons'>
                <div className='floatLeft'></div>
                <div className='floatRight'>
                    <button className='floatButton' onClick={props.submitReq}>Add</button>
                   
                    <button className='floatButton' onClick={props.togglePop}>Close</button>
                </div>
            </div>
        </div>

  )
}
