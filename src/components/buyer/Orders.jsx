import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SearchBar from './SearchBar'
import Setting from './Setting'
import { mockItems } from '../Mockdata'
import { backend, CustomerViewOrder } from '../Utils'
import { useBuyerAuth } from '../../router/auth/BuyerAuthProvider'
import { useCookies } from 'react-cookie';

export default function Orders() {
    const {token,onLogin}=useBuyerAuth()
    const [cookies, setCookie, removeCookie] = useCookies(['buyer']);

    const buyer_id=cookies.buyer_id

    const [items, setItems] = React.useState([])
    React.useEffect(() => {

   
        const result = fetch( CustomerViewOrder( buyer_id), {
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
                console.log(data)
  
          
            })
        })
    }, [])
    const navigate = useNavigate()
    function toDetail(item) {
        navigate(`/buyer/order/item/?order_id=${item.order_id}`)
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
            <h1 className="title">Your Orders </h1>
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
                                        <p class="sellername">brand : {item.item.brand}</p>
                                    </div>
                                    <div class="price">
                                        {item.item.listing_type? <p class="price">{item.item.buy_now_price}$</p>
                                        :<p class="price">{item.item.temp_price}$</p>}
               
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
                        <h1 class="warning">You don't have any order currently</h1>
                    </div>
                </>
            )}



        </div>
    </div>

</>
  )
}
