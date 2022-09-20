import React from 'react'
import SearchBar from './SearchBar'
import Setting from './Setting'
import QuantityPopUp from './QuantityPopUp'
import { mockItem, mockAuction, mockOrderInfo } from '../Mockdata'
import { useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { connect } from 'react-redux'
import { GetItemById, CustomerViewOrder,CustomerChangeQuantity, getRequest, postRequest, GetOrderById, CustomerCancelOrder } from '../Utils'
import { useBuyerAuth } from '../../router/auth/BuyerAuthProvider'
import { useCookies } from 'react-cookie';

export default function OrderDetail() {
    const [cookies, setCookie, removeCookie] = useCookies(['buyer']);

    const {token,onLogin}=useBuyerAuth()
    const buyer_id=cookies.buyer_id


    const [payload, setPayload] = React.useState();


    const [visible, setVisible] = React.useState(false);
    const [input, setInput] = React.useState()
    const [bid, setBid] = React.useState(0)
    const [item, setItem] = React.useState(mockOrderInfo)
    const [quantity, setQuantity] = React.useState(1);

    function togglePop() {
        setVisible(!visible);
    }


    const [searchParams] = useSearchParams();
    React.useEffect(() => {
        //var buyer_id=localStorage.getItem("buyer_id")
        var order_id = searchParams.get('order_id');
        if (item == mockOrderInfo) {
            getRequest(GetOrderById(order_id), setItem)
        }

        setPayload(JSON.stringify({
            item_id: item.item_id,
            customer_id: buyer_id,
            order_id:parseInt(order_id),
            //seller_id:item.seller_id,
            quantity: parseInt(quantity),
            //listing_type:item.listing_type,
            //temp_price:parseFloat(bid)
        }))

        bidInfo.buy_now_price=item.item.buy_now_price
        bidInfo.tmp_price=item.item.temp_price
        bidInfo.start_price=item.item.start_price

    })

    var bidInfo={
        buy_now_price: 0,
        tmp_price:0,
        start_price:0
    }

    function inputSetHandler(e) {
        setQuantity(e.target.value)
    }

    function inputBidHandler(e) {
        setBid(e.target.value)
    }
    function saveQuantityHandler() {
        if (quantity > item.item.stock || quantity <= 0) {
            alert('Order beyond stock limit')
            return false;
        } else {
            setQuantity(quantity)
            return true
        }
    }
    function saveBidHandler() {
        if (bid > bidInfo.buy_now_price ||
            bid < bidInfo.start_price ||
            bid < bidInfo.tmp_price) {
            alert('invalid bid')
            return;
        } else {
            setBid(bid)
            if (saveQuantityHandler()) {
                submitOrder()
            }

        }


    }

    function submitOrder() {

        postRequest(CustomerChangeQuantity(), payload)
        
    }

    function changeOrderQuantity() {

        postRequest(CustomerChangeQuantity(), payload)
    }

    function cancelOrder() {
        var order_id=searchParams.get("order_id")
        var res
        postRequest(CustomerCancelOrder(order_id), res)
    }

    const navigate = useNavigate()
    function back() {
        navigate(-1)
    }

    return (
        <>
            <Setting />
            <div className="page" >
                <div className="search" style={{ alignItems: "flex-start" }}>
                    <h1 className="title" style={{ marginBottom: "30px", marginTop: "0" }}>Order Details</h1>
                </div>

                <div className="bottom" style={{ alignItems: "center" }}>
                    <div className="detail">
                        <div className="itemdetail" >
                            <div className="info">
                                <h1 className="name" style={{ fontSize: "xx-large" }}>{item.item.name}</h1>
                                <p className="sellername" style={{ fontSize: "normal" }}>Seller id: {item.seller_id}</p>
                                <p className="sellername" style={{ fontSize: "normal" }}>Customer id: {item.customer_id}</p>
                                <p className="detail">Stock: {item.item.stock}</p>
                                <p className="caption" style={{ fontSize: "large", fontStyle: "oblique" }}>Detail:</p>
                                <p className="detail">Category: {item.item.category}</p>
                                <p className="detail">Description: {item.item.description}</p>
                                <p className="detail">Manufacure date: {item.item.manufacture}</p>
                                <p className="detail">Origin from: {item.item.origin}</p>


                            </div>
                            <div className="static">
                                <div className="price" style={{ width: "150px", height: "70px", margin: "10px" }}>
                                    <p className="price" style={{ fontSize: "larger" }}>{item.item.listing_type ? item.item.buy_now_price : item.item.temp_price}$</p>
                                </div>

                            </div>


                        </div>
                    </div>

                    <div className="back">
                        <button className="back" ><img src="../icons/back.svg" alt="" /></button>
                    </div>
                    <div className="util" style={{ width: '0' }}>
                        <div className="fbutton">


                            {item.item.listing_type ?
                                <button className="order" onClick={() => togglePop()}>Edit Quantity</button>
                                : <button className="order" onClick={() => togglePop()}>Check Bid </button>
                            }

                            {/* {item.listing_type? 
                            <button className="order" onClick={()=>submitOrder()} >Check out</button>
                            :null} */}
                            <button className="delete" onClick={() => cancelOrder()}>Cancel Order</button>

                            <button className="delete" onClick={() => back()}>Back</button>
                        </div>

                    </div>
                </div>

            </div>

            {visible ? <QuantityPopUp toggle={togglePop} currentQuantity={quantity}
                saveQuantityHandler={saveQuantityHandler}
                stock={item.item.stock}
                setInput={setInput}
                inputSetHandler={inputSetHandler}
                input={input}
                canEditBit={false}
                isBid={!item.item.listing_type}
                bid={bid}
                bidInfo={bidInfo}
                orderInfo={item}
                inputBidHandler={inputBidHandler}
                saveBidHandler={saveBidHandler}
                changeOrderQuantity={changeOrderQuantity}
            /> : null}

        </>
    )
}
