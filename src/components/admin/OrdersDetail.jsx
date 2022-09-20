import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import backIcon from '../../assets/icons/back.svg'
import { useParams } from 'react-router-dom';
import { GetOrderById, getRequest } from '../Utils';
import { AuthProvider, AuthContext, useAuth } from '../../router/auth/AuthProvider';

const sample = [
    {
        id: '1',
        seller: 'b',
        buyer: 'Ann',
        createAt: 8.3,
        itemName: 'apple',
        quantity: 20,
        price: 5,
        type: 'auction',

    }

]
const recordSamp = { "order_id": 1,
 "customer_id": 1, 
 "seller_id": 1, 
 "item_id": 1,
  "quantity": 10, 
  "create_time": "2021",
  "status": "completed", 
  "item": { "item_id": 1, 
    "seller_id": 1, 
    "name": "Apple Juice", 
    "category": "Fruit", 
    "brand": "none", 
    "origin": "Melbourne",
     "manufacture": "2022-09-22",
      "stock": 101, 
      "buy_now_price": 50.0,
       "listing_type": true, 
       "description": "Fresh and tasty" 
    } }

export default function OrdersDetail() {

    var id = useParams().id
    const navigate = useNavigate()
    function toDetail(id) {
        navigate(`/admin/orders/${id}`)
    }
    function back() {
        navigate(`/admin/orders`)
    }

    const [record, setRecord] = React.useState(recordSamp);

    const [orders, setOrders] = React.useState();
    React.useEffect(() => {
        // setRecords(sample);
        // setOrders(sample2);

        if (record == recordSamp) {
            getRequest(GetOrderById(id), setRecord)
           
        }
    })
    const { token, onLogin,onLogout } = useAuth()
    return (
        <div className="abody">
            <div className="asetting">
                <p>Hello! adminname    </p>
                <Link to="/admin"  onClick={onLogout}>logout</Link>
            </div>
            <div className="aright-container">
                <div className="art-container" style={{ paddingTop: '5vh' }}>
                    <div className="aback" onClick={() => back()}>
                        <button className="aback"><img src={backIcon} alt="" /></button>
                    </div>
                    <div className="atitle">
                        <h1 className="atitle" style={{ padding: '20px' }}>Order</h1>
                    </div>
                </div>

                <div className="alt-container" style={{ borderRadius: '30px' }}>
                    <div className="ainfo">
                        <div className="atext" style={{ paddingLeft: '30px' }}>

                            <>
                                <p className="aid" style={{ color: 'gray', fontSize: 'smaller' }}>id: {record.order_id}</p>
                                <p className="ausername">Item: {record.item.name}</p>
                                <p className="ausername">Item id: {record.item.item_id}</p>
                                <p className="ausername">Seller id: {record.seller_id}</p>
                                <p className="ausername">Buyer id: {record.customer_id}</p>
                                <p className="ausername">Buy Now Price: {record.item.buy_now_price}$</p>
                              
                                <p className="ausername">Type: {record.item.listing_type? <>Fixed-price</>:<>Auction</>}</p>
                                {!record.item.listing_type? 
                                <>
                                     <p className="ausername">Start Price: {record.item.start_price}$</p>
                                     <p className="ausername">Temp Price: {record.item.temp_price}$</p>
                                     <p className="ausername">Start Date: {record.item.date.start_date}</p>
                                     <p className="ausername">End Date: {record.item.date.end_date}</p>
                                </>:
                                <>

                                </>}

                            </>

                        </div>
                        <div className="adelete">
                            <button className="adelete">delete</button>
                        </div>
                    </div>


                </div>
            </div>

        </div>
    )
}
