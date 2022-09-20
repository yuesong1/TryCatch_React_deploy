import React from 'react'

export default function OrderPop(props) {
  return (

            <div className='floatWindow'>
                <div className='floatContent'>


                <p>Current quantity: {props.orderInfo.quantity}</p>
              
                <p>Reduce quantity to:</p>
                <input className='floatInput' type="text" style={{ width: "200px" }}
                    onKeyPress={(e) => {
                        if (!/[0-9]/.test(e.key)) {
                            e.preventDefault();
                        }
                    }} onChange={props.quantityHandler} />


            </div>
            <div className='floatButtons'>
                <div className='floatLeft'></div>
                <div className='floatRight'>
                    <button className='floatButton' onClick={props.editQuantity}>Edit quantity</button>
                   
                    <button className='floatButton' onClick={props.togglePop}>Close</button>
                </div>
            </div>
        </div>

  )
}
