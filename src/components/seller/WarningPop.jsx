import React from 'react'

export default function WarningPop(props) {
  return (

            <div className='floatWindow'>
                <div className='floatContent'>


                <p>Current stock: {props.stock}</p>
              
                <p>Set stock:</p>
                <input className='floatInput' type="text" style={{ width: "200px" }}
                    onKeyPress={(e) => {
                        if (!/[0-9]/.test(e.key)) {
                            e.preventDefault();
                        }
                    }} onChange={props.stockHandler} />


            </div>
            <div className='floatButtons'>
                <div className='floatLeft'></div>
                <div className='floatRight'>
                    <button className='floatButton' onClick={props.editStock}>Edit stock</button>
                   
                    <button className='floatButton' onClick={props.togglePop}>Close</button>
                </div>
            </div>
        </div>

  )
}
