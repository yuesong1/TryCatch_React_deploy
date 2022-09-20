import React from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import backIcon from '../../assets/icons/back.svg'
import { useParams } from 'react-router-dom';
import { GetCustomerByItem, GetItemById, getRequest } from '../Utils';
import { useState } from 'react';
import { AuthProvider, AuthContext, useAuth } from '../../router/auth/AuthProvider';

const sample=
{ "item_id": 1, 
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
}


export default function ItemsDetail() {
    const [searchParams] = useSearchParams();
    const[users,setUsers]=useState([]);
    var itemId=searchParams.get("id")

    const navigate=useNavigate()
    function toDetail( id ){
        navigate(`/admin/orders/${id}`)
    }
    function back(){
        navigate(`/admin/items`)
    }
    function toUser(userID){
        navigate(`/admin/users/detail?user=buyer&id=${userID}`)
    }
    const [record,setRecord]=React.useState(sample);
    const [orders,setOrders]=React.useState();
    React.useEffect(()=>{
        //setRecord(sample);
        //setOrders(sample2);
        if(record==sample){
            getRequest(GetItemById(itemId),setRecord)
        }
        getRequest(GetCustomerByItem(itemId),setUsers)

        // const result = fetch('http://localhost:80/forms', {
        //     method: 'GET', // *GET, POST, PUT, DELETE, etc.
        //     headers: {
        //       accept: 'application/json',
        //       'Content-Type': 'application/json',
        //     }
        //   });
        //   result.then(ret => {
        //     ret.json().then(data => {
        //         setRecord(data.data)
      
        //     })
        //   })
    },[])
    const { token, onLogin,onLogout } = useAuth()
  return (
    <div className="abody">
        <div className="asetting"> 
            <p>Hello! adminname    </p>
            <Link to="/admin" onClick={onLogout}>logout</Link>
        </div>
        <div className="aright-container">
            <div className="art-container" style={{paddingTop: '5vh'}}>
                <div className="aback" onClick={()=>back()}>
                    <button className="aback"><img src={backIcon} alt=""/></button>
                </div>
                <div className="atitle">
                    <h1 className="atitle" style={{padding: '20px'}}>Listing</h1>
                </div>
            </div> 
        
            <div className="alt-container" style={{borderRadius: '30px'}}>
                <div className="ainfo">
                    <div className="atext" style={{paddingLeft: '30px'}}>

                                <>                         
                                <p className="aid" style={{color: 'gray', fontSize: 'smaller'}}>id: {record.item_id}</p>
                                <p className="ausername">Item name: {record.name}</p>
                                <p className="ausername">Seller id: {record.seller_id}</p>
                                <p className="ausername">Stock: {record.stock}</p>
                                <p className="ausername">Brand: {record.brand}</p>
                                <p className="ausername">Buy Now Price: {record.buy_now_price}</p>
                                {!record.listing_type? 
                                <>
                                     <p className="ausername">Bid Start Price: {record.start_price}$</p>
                                     <p className="ausername">Bid Temp Price: {record.temp_price}$</p>
                                     <p className="ausername">Bid Start Date: {record.date.start_date}</p>
                                     <p className="ausername">Bid End Date: {record.date.end_date}</p>
                                </>:
                                <>

                                </>}
                                <p className="ausername">Category: {record.category}</p>
                                <p className="ausername">Description: {record.description}</p>
                                <p className="ausername">Manufacture Date: {record.manufacture}</p>
                                <p className="aregisterTime">Origin: {record.origin}</p>
                                
                                </>
                    </div>
                    <div className="adelete">
                        <button className="adelete">delete</button>
                    </div>
                </div>
                { orders? 
                <>
                <p className="atabletitle">Orders</p>
                <div className="atable" style={{height: "35vh"}}>
                    <table className="atable_box">
                        <thead>
                            <tr className="areq_name">
                                <th className="adata_name">Buyer</th>
                                <th className="adata_name">Seller</th>
                                <th className="adata_name">Quantity</th>
                                <th className="adata_name">Price</th>
                                <th className="adata_name">Create at</th>
                                <th className="adata_name">Type</th>

                            </tr>
                        </thead>
                        <tbody>
                            {(orders||[]).map((item)=>{
                                return(
                                
                                    <tr onClick={()=>toDetail(item.id)}>
                                        <td>{item.buyer}</td>
                                        <td>{item.seller}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.price}</td>
                                        <td>{item.createAt}</td> 
                                        <td>{item.type}</td>
                                    </tr>
                            
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                </>: <></>}


                { users? 
                <>
                <p className="atabletitle">In User's Cart:</p>
                <div className="atable" style={{height: "35vh"}}>
                    <table className="atable_box">
                        <thead>
                            <tr className="areq_name">
                            <th className="adata_name">Buyer id</th>
                                <th className="adata_name">Buyer name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(users||[]).map((item)=>{
                                return(
                                
                                    <tr onClick={()=>toUser(item.userID)}>
                                         <td>{item.userID}</td>
                                         <td>{item.username}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                </>: <></>}

            </div>
        </div>

    </div>
  )
}
