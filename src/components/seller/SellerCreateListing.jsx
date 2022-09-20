import React, { useState } from 'react'

export default function SellerCreateListing(props) {

    // const [checked, setChecked] = useState([])
    // React.useEffect(() => {
    //     setChecked(props.ltype)
    //     console.log(checked)
    // })

    return (
        <>
            <div className="sright ssub">

                <div className="slnav">
                    <button className="screate">
                        Create Listing
                    </button>
                </div>
                <div className="sform">
                    <div className="sformitem">
                        <p className="sitem">Name: <input className="sinput" type="name" name="name" onChange={props.newListingHandler} /></p>
                    </div>

                    <div className="sformitem" style={{
                        display: "flex",
                        alignItems: "center",
                        alignContent: "center",
                        flexWrap: "nowrap",
                        flexDirection: "row"
                    }}>
                        <p className="sitem">Type: </p>
                        <input type="radio" name="type" id="fixed-price" value="Fixed-price" style={{ width: "unset" }} onChange={props.newListingHandler} />
                        <label htmlFor="fixed-price">Fixed-Price</label>
                        <input type="radio" name="type" id="auction" value="Auction" style={{ width: "unset" }} onChange={props.newListingHandler} />
                        <label htmlFor="auction">Auction</label>
                    </div>

                    <div className="sformitem">
                        <p className="sitem">Stock quantity: <input className="sinput" type="name" name="quantity" onChange={props.newListingHandler} onKeyPress={(e) => {
                            if (!/[0-9]/.test(e.key)) {
                                e.preventDefault();
                            }
                        }}/></p>
                        <p className="sitem">Buy-now price: <input className="sinput" type="name" name="bnprice" onChange={props.newListingHandler} onKeyPress={(e) => {
                            if (!/([0-9]+([.][0-9]*)?|[.][0-9]+)$/.test(e.key)) {
                                e.preventDefault();
                            }
                        }} /></p>
                        {!props.ltype ? <>
                            <p className="sitem">Auction start price: <input className="sinput" type="name" name="sprice" onChange={props.newListingHandler} onKeyPress={(e) => {
                                if (!/([0-9]+([.][0-9]*)?|[.][0-9]+)$/.test(e.key)) {
                                    e.preventDefault();
                                }
                            }} /></p>
                            <p className="sitem">Auction start date: <input className="sinput" type="name" name="sdate" onChange={props.newListingHandler} /></p>
                            <p className="sitem">Auction end date: <input className="sinput" type="name" name="edate" onChange={props.newListingHandler} /></p>
                        </> : null}

                    </div>

                    <div className="sformitem">
                        <p className="sitem">Category: <input className="sinput" type="name" name="category" onChange={props.newListingHandler} /></p>
                        <p className="sitem">Brand: <input className="sinput" type="name" name="brand" onChange={props.newListingHandler} /></p>
                        <p className="sitem">Origin: <input className="sinput" type="name" name="origin" onChange={props.newListingHandler} /></p>
                        <p className="sitem">Manufacture date: <input className="sinput" type="name" name="manudate" onChange={props.newListingHandler} /></p>

                        <p className="sitem">Description:</p> <textarea name="desc" id="item_desc"
                            cols="4" rows="10" onChange={props.newListingHandler}></textarea>
                    </div>

                </div>

                <div className="slutil">
                    <button className="sadd sutil" onClick={props.createHandler}>Create</button>
                    <button className="scancel sutil" onClick={props.toggleCreateListing}>Cancel</button>
                </div>

            </div>
        </>
    )
}
