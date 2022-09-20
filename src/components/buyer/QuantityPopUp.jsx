import React from 'react'
import { Component } from 'react'
import { useState } from 'react';
export default function QuantityPopUp(props) {

    React.useEffect(() => {
        //props.currentQuantity
    })

    return (
        <>
            <div className='floatWindow'>
                <div className='floatContent'>
                    {props.isBid ? <>
                        <p>Current bid per item: {props.bidInfo.tmp_price}</p>
                        <p>Start Price:{props.bidInfo.start_price}</p>
                        <p>Buy-now Price:{props.bidInfo.buy_now_price}</p>
                        {/* <p>your Bid:{props.bid}</p> */}

                        {props.canEditBit ?
                            <>
                                <p>Set Bid:</p>
                                <input className='floatInput' type="text" style={{ width: "200px" }}
                                    onKeyPress={(e) => {
                                        if (!/([0-9]+([.][0-9]*)?|[.][0-9]+)$/.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }} onChange={props.inputBidHandler} />
                            </> : null}

                    </>
                        : null}

                    <p>In stock: {props.stock}</p>
                    {props.orderInfo ? <p>Order Quantity: {props.orderInfo.quantity}</p> : <></>}

                    <p>Set Quantity: {props.currentQuantity}</p>
                    {props.isBid ?
                        <>
                        </> :
                        <>
                            <p>Set Order Quantity:</p>
                            <input className='floatInput' type="text" style={{ width: "200px" }}
                                onKeyPress={(e) => {
                                    if (!/[0-9]/.test(e.key)) {
                                        e.preventDefault();
                                    }
                                }} onChange={props.inputSetHandler} />
                        </>}




                </div>
                <div className='floatButtons'>
                    <div className='floatLeft'></div>
                    <div className='floatRight'>
                        {/* {!props.isBid? 
                    <button className='floatButton' onClick={props.saveQuantityHandler}>Add to Cart</button>
                    :null} */}
                        {!props.isBid ?
                           // <button className='floatButton' onClick={props.saveBidHandler}>Edit quantity</button>
                           <button className='floatButton 'onClick={props.changeOrderQuantity}>Edit quantity</button>
                            : null}
                        {props.isBid && props.canEditBit ?
                            <button className='floatButton' onClick={props.saveBidHandler}>Bid Now</button>
                            : null}
                        <button className='floatButton' onClick={props.toggle}>Close</button>
                    </div>
                </div>
            </div>
        </>
    )

}
