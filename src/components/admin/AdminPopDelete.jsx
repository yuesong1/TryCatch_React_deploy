import React from 'react'

export default function AdminPopDelete(props) {
  return (

            <div className='floatWindow'>
                <div className='floatContent'>


                <p>Delete account</p>
              
                <p>username:</p>
                <input className='floatInput' type="text" style={{ width: "200px" }}
        onChange={props.delHandler} />


            </div>
            <div className='floatButtons'>
                <div className='floatLeft'></div>
                <div className='floatRight'>
                    <button className='floatButton' onClick={props.submitReqDel}>Delete</button>
                   
                    <button className='floatButton' onClick={props.togglePopDel}>Close</button>
                </div>
            </div>
        </div>

  )
}
