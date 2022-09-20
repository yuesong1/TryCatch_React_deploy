import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import SearchBar from './SearchBar'
import Setting from './Setting'
import QuantityPopUp from './QuantityPopUp'
import { mockItem,mockAuction, mockBuyer,mockSeller, MockOrderWithFixedPrice } from '../Mockdata'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { CustomerChangeQuantityCart,CustomerDeleteItemFromCart,CustomerGetSpecificCartItem, CustomerPlaceItemOrder, GetItemById, getRequest, postRequest } from '../Utils'
import { useCookies } from 'react-cookie';


export default function CartItemDetail() {

    const [cookies, setCookie, removeCookie] = useCookies(['buyer']);


    const [payload, setPayload]= React.useState();


    const [visible,setVisible] = React.useState(false);
    const [input,setInput] = React.useState()
    const [bid,setBid]=React.useState()
    const [item,setItem]=React.useState(MockOrderWithFixedPrice)
    const [quantity,setQuantity]=React.useState(1);
    const [buyer,setBuyer]=React.useState(mockBuyer);
    //const [seller,setSeller]=React.useState(mockSeller);
    function togglePop(){
        setVisible(!visible);
    }
    const [searchParams] = useSearchParams();
    React.useEffect(()=>{
        var item_id = searchParams.get('item_id');
        var buyer_id = parseInt(cookies.buyer_id)
       // setItem(mockAuction)
      if(item==MockOrderWithFixedPrice){
         getRequest(CustomerGetSpecificCartItem(buyer_id,item_id), setItem)
      }
       
       
        setBuyer(mockBuyer)

        setPayload(JSON.stringify({
            item_id:item.item_id,
            customer_id:buyer.customer_id,
            seller_id:item.seller_id,
            quantity:parseInt(quantity),
            listing_type:item.listing_type,
            temp_price:parseFloat(bid)
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
            bid<bidInfo.tmp_price){
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
        postRequest(CustomerChangeQuantityCart(),payload)
    }

    function submitFixpricedOrder(){
        console.log(buyer.customer_id)
        var req=JSON.stringify(
            {
                item_id: searchParams.get('item_id'),
                customer_id: parseInt(cookies.buyer_id),
                seller_id:parseInt(item.seller_id),
                quantity:parseInt(quantity)
            }
        )
        postRequest(CustomerPlaceItemOrder(), req)
       // alert("Successfully Check out")
        navigate(`/buyer/cart`)
    }
    function deleteCartItem(){
        var item_id = searchParams.get('item_id');
        var buyer_id = searchParams.get('buyer_id');
        var target=JSON.stringify({
            item_id:item_id,
            customer_id:buyer_id
        })
        postRequest(CustomerDeleteItemFromCart(),target)
    }
    function cancelOrder(){
        postRequest("deleteUrl",payload)
        navigate(`/buyer/cart`)
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
                    <h1 className="title" style={{marginBottom: "30px", marginTop: "0"}}>CartItem Details</h1>
                </div>

                <div className="bottom" style={{alignItems:"center"}}>
                    <div className="detail">
                        <div className="itemdetail" >
                            <div className="info">
                                <h1 className="name" style={{fontSize: "xx-large"}}>{item.item.name}</h1>
                                <p className="sellername" style={{fontSize: "normal"}}>Seller id: {item.item.seller_id}</p>
                                <p className="detail">Stock: {item.item.stock}</p>
                                <p className="caption" style={{fontSize:"large",fontStyle: "oblique"}}>Detail:</p>
                                <p className="detail">Description: {item.item.description}</p>
                                <p className="detail">Category: {item.item.category}</p>
                                <p className="detail">{item.item.desciption}</p>
                                <p className="detail">Manufacure date: {item.item.manufacture_date}</p>
                                <p className="detail">Origin from: {item.item.origin}</p>
                                
  
                            </div>
                            <div className="static">
                                <div className="price" style={{width:"150px",height:"70px",margin:"10px"}}>
                                    {item.item.listing_type? 
                                    <p className="price" style={{fontSize: "larger"}}>
                                        {item.item.buy_now_price}$*{item.quantity}
                                     </p>
                                    :
                                    <p className="price" style={{fontSize: "larger"}}>
                                    {item.item.temp_price}$
                                 </p>
                                    }
                                </div>

                            </div>

 
                        </div>
                    </div>

                    <div className="back">
                        <button className="back" ><img src="../icons/back.svg" alt=""/></button>
                    </div>
                    <div className="util" style={{width: '0'}}>
                        <div className="fbutton">
                            {item.item.listing_type? 
                            <button className="order" onClick={()=>togglePop()}>Edit Quantity</button>
                            : <button className="order" onClick={()=>togglePop()}>Check Detail </button>
                            }
                            {item.item.listing_type? 
                            <button className="order" onClick={()=>submitFixpricedOrder()} >Check out</button>
                            :null}
                            <button className="delete" onClick={()=>deleteCartItem()}>Delete CartItem</button>
                          
                            <button className="delete" onClick={()=>back()}>Back</button>
                        </div>

                    </div>
                </div>

            </div>
            
            {visible?<QuantityPopUp toggle={togglePop} currentQuantity={quantity} 
            saveQuantityHandler={saveQuantityHandler} 
            stock={item.item.stock}
            setInput={setInput} 
            inputSetHandler={inputSetHandler}
            input={input}
            canEditBit={false}
            isBid={!item.item.listing_type} 
            bid={bid}
            bidInfo={item.item}
            inputBidHandler={inputBidHandler}
            saveBidHandler={saveBidHandler}

            />:null}

        </>
    )
}
