import React from 'react'

export default function SellerItemDetail(props) {

    return (
        <>
            <div className="sright ssub">

                <div className="slnav">
                    <button className="screate" style={{backgroundColor: "var(--color-blue)"}}>
                        Listing Detail
                    </button>
                </div>
                <div className="sform">
                    <div className="sformitem">
                        <p className="sitem">Name: {props.currentItem.name}</p>
                    </div>

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
                        <p className="sitem">Stock: {props.currentItem.stock}</p>
                    </div>

                    <div className="sformitem">
                        <p className="sitem">Buy-now Price: {props.currentItem.buy_now_price}</p>
                        {!props.currentItem.listing_type?
                        <>
                         <p className="sitem">Start Price: {props.currentItem.start_price}</p>
                         
                        <p className="sitem">Temp Price: {props.currentItem.temp_price}</p>
                        <p className="sitem">Start Date: {props.currentItem.date.start_date}</p>
                        <p className="sitem">End Date: {props.currentItem.date.end_date}</p>
                        </>
                       
                        :null}
                    </div>

                    <div className="sformitem">
                        <p className="sitem">category: {props.currentItem.category} </p>
                        <p className="sitem">brand: {props.currentItem.brand} </p>
                        <p className="sitem">origin: {props.currentItem.origin} </p>
                        <p className="sitem">manufacture_date: {props.currentItem.manufacture} </p>
                    </div>

                </div>

                <div className="slutil">
                    <button className="sadd sutil"onClick={props.togglePop}>Edit</button>
                    <button className="scancel sutil"  onClick={props.deleteItem}>Delete</button>
                </div>

            </div>
        </>
    )
}
