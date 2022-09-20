import React from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import SearchBar from './SearchBar'
import Setting from './Setting'
import QuantityPopUp from './QuantityPopUp'
import { mockItem,mockAuction } from '../Mockdata'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { CustomerBidOnItem, CustomerAddFixedPricetoCart,GetItemById, getRequest, postRequest } from '../Utils'
import { useBuyerAuth } from '../../router/auth/BuyerAuthProvider'
import { useCookies } from 'react-cookie';

export default function ItemDetail() {
    const [cookies, setCookie, removeCookie] = useCookies(['buyer']);

    const {token,onLogin}=useBuyerAuth()
    const [payload, setPayload]= React.useState();


    const [visible,setVisible] = React.useState(false);
    const [input,setInput] = React.useState()
    const [bid,setBid]=React.useState()
    const [item,setItem]=React.useState([])
    const [quantity,setQuantity]=React.useState(1);
    const buyer_id=parseInt(cookies.buyer_id)
    function togglePop(){
        setVisible(!visible);
    }
    const [searchParams] = useSearchParams();
    React.useEffect(()=>{
        //setItem(mockItem)
        var itemId = searchParams.get('id');
        if(item==null||item.item_id==undefined){
            getRequest(GetItemById( itemId),setItem)
        }

        setPayload(JSON.stringify({
            item_id:item.item_id,
            customer_id:buyer_id,
            //seller_id:item.seller_id,
            quantity:parseInt(quantity),
            //listing_type:item.listing_type,
            price:parseFloat(bid)
        }))
    })

    var bidInfo={
        buy_now_price: item.buy_now_price,
        tmp_price:item.temp_price,
        start_price:item.start_price
    }

    function inputSetHandler(e){
        setQuantity(e.target.value)
    }

    function inputBidHandler(e){
        setBid(e.target.value)
    }
    function saveQuantityHandler(){
        if(quantity>item.stock||quantity<=0){
            alert('Order beyond stock limit')
            return false;
        }else{
            setQuantity(quantity)
            return true
        }
    }
    function saveBidHandler(){
        if(bid>bidInfo.buy_now_price ||
            bid<bidInfo.start_price||
            bid<=bidInfo.tmp_price){
            alert('invalid bid')
            return;
        }else{
            setBid(bid)
            if(saveQuantityHandler()){
                submitOrder()
            }
            
        }
       
        
    }
    
    function submitOrder(){
        postRequest(CustomerBidOnItem(),payload)
    }
    function submitFixedPrice(){
        postRequest(CustomerAddFixedPricetoCart(),payload)
    }
    const navigate=useNavigate()
    function back(){
        navigate(-1)
    }

    return (
        <>
            <Setting />
            <div className="page" >
                <div className="search" style={{alignItems: "flex-start"}}>
                    <h1 className="title" style={{marginBottom: "30px", marginTop: "0"}}>Item Details</h1>
                </div>

                <div className="bottom" style={{alignItems:"center"}}>
                    <div className="detail">
                        <div className="itemdetail" >
                            <div className="info">
                                <h1 className="name" style={{fontSize: "xx-large"}}>{item.name}</h1>
                                <p className="sellername" style={{fontSize: "normal"}}>Seller id: {item.seller_id}</p>
                                <p className="detail">Stock: {item.stock}</p>
                                <p className="caption" style={{fontSize:"large",fontStyle: "oblique"}}>Detail:</p>
                                <p className="detail">Category: {item.category}</p>
                                <p className="detail">Description: {item.description}</p>
                                <p className="detail">Manufacure date: {item.manufacture}</p>
                                <p className="detail">Origin from: {item.origin}</p>
                                
  
                            </div>
                            <div className="static">
                                <div className="price" style={{width:"150px",height:"70px",margin:"10px"}}>
                                    <p className="price" style={{fontSize: "larger"}}>{item.listing_type? item.buy_now_price:item.temp_price}$</p>
                                </div>

                            </div>

 
                        </div>
                    </div>

                    <div className="back">
                        <button className="back" ><img src="../icons/back.svg" alt=""/></button>
                    </div>
                    <div className="util" style={{width: '0'}}>
                        <div className="fbutton">
                            {!item.listing_type? 
                            <button className="order" onClick={()=>togglePop()}>Set Bid</button>
                            :null}
                            {item.listing_type? 
                            <button className="order" onClick={()=>togglePop()}>Set Quantity</button>
                            :null}
                            {item.listing_type? 
                            <button className="order" onClick={()=>submitFixedPrice()} >Add to Cart</button>
                            :null}
                            <button className="delete" onClick={()=>back()}>Back</button>
                        </div>

                    </div>
                </div>

            </div>
            
            {visible?<QuantityPopUp toggle={togglePop} currentQuantity={quantity} 
            saveQuantityHandler={saveQuantityHandler} 
            stock={item.stock}
            setInput={setInput} 
            inputSetHandler={inputSetHandler}
            input={input}
            canEditBit={true}
            isBid={!item.listing_type} 
            bid={bid}
            bidInfo={bidInfo}
            inputBidHandler={inputBidHandler}
            saveBidHandler={saveBidHandler}

            />:null}

        </>
    )
}
