import React from 'react'

export default function AdminPopAddSeller(props) {
  return (

            <div className='floatWindow'>
                <div className='floatContent'>


                <p>Add new Seller</p>
              
                <p>name:</p>
                <input className='floatInput' minLength={4}  type="text" style={{ width: "200px" }} name="name" onChange={props.inputHandler} />
                <p>location:</p>
                <input className='floatInput' minLength={4} type="text" style={{ width: "200px" }} name="location" onChange={props.inputHandler} />
                <p>description:</p>
                <input className='floatInput' minLength={4}  type="text" style={{ width: "200px" }} name="description" onChange={props.inputHandler} />

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
