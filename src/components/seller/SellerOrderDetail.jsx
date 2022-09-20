import React from 'react'

export default function SellerOrderDetail(props) {

    return (
        <>
            <div className="sright ssub">

                <div className="slnav">
                    <button className="screate" style={{backgroundColor: "var(--color-blue)"}}>
                        Order Detail
                    </button>
                </div>
               
                <div className="sform"> 
                <p><h1>---- Order info ----</h1></p>
                    <div className="sformitem">
                        <p className="sitem">Item Name: {props.currentItem.item.name}</p>
                        <p className="sitem">Buyer id: {props.currentItem.customer_id}</p>
                        <p className="sitem">Create at: {props.currentItem.create_time}</p>
                        <p className="sitem">Order quantity: {props.currentItem.quantity}</p>
                    </div>
                    <p><h1>---- Item info ----</h1></p>
                    <div className="sformitem" style={{    
                            display: "flex",
                            alignItems: "center",
                            alignContent: "center",
                            flexWrap: "nowrap",
                            flexDirection: "row"}}>
                        
                        <p className="sitem">Type: </p>
                        <p className="stype">{props.currentItem.listing_type? <>Fixed-price</>:<>Auction</>} </p>
                    </div>

                    <div className="sformitem">
                        <p className="sitem">Stock: {props.currentItem.item.stock}</p>
                    </div>

                    <div className="sformitem">
                        <p className="sitem">Buy-now Price: {props.currentItem.item.buy_now_price}</p>
                        {!props.currentItem.item.listing_type?
                        <>
                         <p className="sitem">Start Price: {props.currentItem.item.start_price}</p>
                        <p className="sitem">End Price: {props.currentItem.item.end_price}</p>
                        <p className="sitem">Now Bidding at: {props.currentItem.item.temp_price}</p>
                        </>
                       
                        :null}
                    </div>

                    <div className="sformitem">
                        <p className="sitem">category: {props.currentItem.item.category} </p>
                        <p className="sitem">brand: {props.currentItem.item.brand} </p>
                        <p className="sitem">origin: {props.currentItem.item.origin} </p>
                        <p className="sitem">manufacture_date: {props.currentItem.item.manufacture} </p>
                    </div>

                </div>

                <div className="slutil">
                    <button className="sadd sutil"onClick={props.togglePop}>Edit</button>
                    <button className="scancel sutil"  onClick={props.deleteItem}>Cancel Order</button>
                </div>

            </div>
        </>
    )
}
