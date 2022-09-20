import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SearchBar from './SearchBar'
import Setting from './Setting'
import { mockItems } from '../Mockdata'
import { CustomerGetCartItem, CustomerViewOrder, getRequest } from '../Utils'
import { useBuyerAuth } from '../../router/auth/BuyerAuthProvider'
import { useCookies } from 'react-cookie';

export default function Cart() {

    const {token,onLogin}=useBuyerAuth()
    const [items, setItems] = React.useState([])
    const [cookies, setCookie, removeCookie] = useCookies(['buyer']);
    const buyer_id=parseInt(cookies.buyer_id)

    React.useEffect(() => {
        //get user id
       
       getRequest(CustomerViewOrder)
        const result = fetch(CustomerGetCartItem(buyer_id), {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        result.then(ret => {
            ret.json().then(data => {
                setItems(data)
            })
        })
    }, [])
    const navigate = useNavigate()
    function toDetail(item) {
       
        navigate(`/buyer/cart/item/?item_id=${item.item_id}&buyer_id=${buyer_id}`)
    }
    function submitAllOrders(){

    }
    function deleteAllOrders(){

    }
 
    function back(){
        navigate(-1)
    }
    return (
    <>
    <Setting />
    <div class="page" style={{ alignItems: "flex-start" }}>

        <div className='searchBar'><div className="search">
            <h1 className="title">Your Cart  </h1>
        </div>
        </div>

        <div class="bottom">
            {items.length != 0 && (
                <>
                    <div class="result">
                        {(items || []).map((item) => {
                            return (
                                <div class="item" onClick={() => toDetail(item)}>

                                    <div class="info">
                                        <h1 class="name">{item.item.name}*{item.quantity}</h1>
                                      
                                    </div>
                                    <div class="price">
                                        {item.item.listing_type? <> 
                                        <p class="price">{item.item.buy_now_price}$</p>
                                        </>:
                                        <>
                                        <p class="price">{item.item.temp_price}$</p>
                                        </>}
                                        
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <div class="util">
                        <div className="fbutton">
                            {/* <button className="order" onClick={()=>submitAllOrders()} >Order All</button>
                            <button className="delete" onClick={()=>deleteAllOrders()}>Cancel All</button> */}
                            <button className="delete" onClick={()=>back()}>Back</button>
                        </div>
                            
                    </div>

                </>
            )
            }
            {items.length==0 && (
                <>
                    <div class="result">
                        <h1 class="warning">You don't have anything in cart currently</h1>
                    </div>
                </>
            )}



        </div>
    </div>

</>
  )
}
