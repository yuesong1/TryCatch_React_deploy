import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AdminViewAllOrder } from '../Utils';
import { AuthProvider, AuthContext, useAuth } from '../../router/auth/AuthProvider';

export default function Orders() {
    const [inputText, setInputText] = useState("");

    const { token, onLogin,onLogout } = useAuth()
    const navigate = useNavigate()
    function toDetail(id) {
        navigate(`${id}`)
    }

    const [record, setRecord] = React.useState([]);
    React.useEffect(() => {
        
        const result = fetch(AdminViewAllOrder(), {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
              accept: 'application/json',
              'Content-Type': 'application/json',
            }
          });
          result.then(ret => {
            ret.json().then(data => {
                setRecord(data)
                console.log(data)
            })
          })
    }, [])
    return (
        <div className="abody">
            <div className="asetting">
                <p>Hello! adminname    </p>
                <a href="/admin" onClick={onLogout}>logout</a>
            </div>
            <div className="aright-container">
                <div className="art-container">
                    <h1 className="atitle">Order</h1>
                </div>
                <div className="amid-container">
                    <div className="asearchbar">
                        <input type="text" name="search" id="1" placeholder="Search" onChange={event => setInputText(event.target.value)} />
                    </div>
                </div>
                <div className="alt-container">
                    <div className="atable">
                        <table className="atable_box">
                            <thead>
                                <tr className="areq_name">
                                    <th className="adata_name">Item name</th>
                                    <th className="adata_name">Buyer</th>
                                    <th className="adata_name">Seller</th>
                                    <th className="adata_name">Quantity</th>
                                    <th className="adata_name">Price</th>
                               
                                    <th className="adata_name">Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {record.filter(post => {
                                    if (inputText === "") {
                                        return post;
                                    } else if (post.name.toLowerCase().includes(inputText.toLowerCase())) {
                                        return post
                                    }
                                }).map((item) => {

                                    return (

                                        (item==undefined)? <></>:
                                            <tr onClick={() => toDetail(item.order_id)}>
                                            <td>{item.item.name}</td>
                                            <td>{item.customer_id}</td>
                                            <td>{item.item.seller_id}</td>
                                            <td>{item.quantity}</td>
                                            <td>{item.item.buy_now_price}</td>
                                            <td>{item.item.listing_type? <>Fixed-price</>:<>Auction</>}</td>
                                        </tr>
                                    

                                    )
                                })}


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>

    )
}
