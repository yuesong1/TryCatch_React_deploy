import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import backIcon from '../../assets/icons/back.svg'
import { useParams, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import AdminPop from './AdminPop';
import { backend, CustomerViewOrder,getRequest, GetSeller, postRequest,SellerViewAllOrder, SellerViewListing, GetBuyer, SellerViewOrder, SellerViewAllListing} from '../Utils';
import AdminPopDelete from './AdminPopDelete';
import { AuthProvider, AuthContext, useAuth } from '../../router/auth/AuthProvider';

export default function ItemsDetail() {

    const navigate = useNavigate()
    const location = useLocation();
    const [searchParams] = useSearchParams();

    var uid = searchParams.get('id');
    var utype = searchParams.get('user');
    const { token, onLogin,onLogout } = useAuth()
    function toDetail(isOrder, id) {
        if (isOrder) { navigate(`/admin/orders/${id}`) }
        else
            navigate(`/admin/items/detail?id=${id}`)

    }
    function back() {
        navigate(`/admin/users`)
    }

    function deleteUser() {
        var targetUrl = 'https://6d74ae4c-cf6f-4bd3-8236-9a31743d05ca.mock.pstmn.io' + '/admin/users/' + utype + '/' + uid;
        const result = fetch(targetUrl, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
            }
        });
        result.then(

        )
    }

    const [records, setRecords] = React.useState([]);
    const [orders, setOrders] = React.useState([]);
    const [items, setItems] = React.useState([]);
    const [emp, setEmp] = React.useState([]);
    const [fixedprices,setFixedPrices]=useState();
    const [auctions,setAuctions]=useState();
    React.useEffect(() => {

        localStorage.setItem("id",uid)
        //get current seller id
        localStorage.setItem("targetId", uid)
        //Get user info
        if(utype==="seller"){
            getRequest(GetSeller(uid),setRecords)
        }
        if(utype==="buyer"){
            getRequest(GetBuyer(uid),setRecords)
            //get orders
            getRequest(CustomerViewOrder(uid),setOrders)
        }




        if (utype == 'seller') {
            //get Listings
            getRequest(SellerViewAllListing(uid),setItems)
            //get orders
            getRequest(SellerViewAllOrder(uid),setOrders)
            //get employees
            var targetUrl = backend.url+'/ServletGetEmpBySeller?id='+localStorage.getItem("targetId");
            const result = fetch(targetUrl, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            });
            result.then(ret => {
                ret.json().then(data => {
                    setEmp(data)
                    console.log(data)
                })
            })
        }


    }, [])
    
    //Add account
 
    const [visible,setVisible]=useState();
    function togglePop(){
        setVisible(!visible);
        //setDelVisible(false)
        if(visible){
            setNewUsername()
            setNewPassword()
        }
    }
    const [newUsername,setNewUsername]=useState();
    const[newPassword,setNewPassword]=useState();
    function addHandler(e){
        if(e.target.name=="username")
        setNewUsername(e.target.value)
        if(e.target.name=="password")
        setNewPassword(e.target.value)
    }
    function submitReq(){
        if(newUsername==null||newUsername==undefined||newUsername==""
        ||newPassword==null||newPassword==undefined||newPassword=="")
        {
            alert("missing credentials")
            return;
        }
        var req=JSON.stringify({
            username: newUsername,
            password: newPassword,
            authorisation:"seller",
            seller_id: localStorage.getItem("targetId")
        })
        var url=backend.url+'/ServletInsertEmployee'+'?id='+localStorage.getItem("id")
        postRequest(url,req)
        window.location.reload(false);
    }

    //Delete account
    const [delVisible,setDelVisible]=useState();
    function togglePopDel(){
        setDelVisible(!delVisible);
        //setVisible(false)
        if(delVisible){
            setDelNewUsername()
        }
    }
    const [delUsername,setDelNewUsername]=useState();
    function delHandler(e){
        setDelNewUsername(e.target.value)
    }
    function submitReqDel(){
        if(delUsername==null||delUsername==undefined||delUsername=="")
        {
            alert("username can't be empty")
            return;
        }
        var req=JSON.stringify({
            username: delUsername,
            seller_id: localStorage.getItem("targetId")
        })
        var deleteurl=backend.url+"ServletDeleteEmployee"
        postRequest(deleteurl,req)
        window.location.reload(false);
    }
    return (
        <div className="abody">
            <div className="asetting">
                <p>Hello! adminname    </p>
                <a href="/admin" onClick={onLogout}>logout</a>
            </div>
            <div className="aright-container">
                <div className="art-container" style={{ paddingTop: '5vh' }}>
                    <div className="aback" onClick={() => back()}>
                        <button className="aback"><img src={backIcon} alt="" /></button>
                    </div>
                    <div className="atitle">
                        <h1 className="atitle" style={{ padding: '20px' }}>{utype}</h1>
                    </div>
                </div>

                <div className="alt-container" style={{ borderRadius: '30px' }}>
                    <div className="ainfo">
                        <div className="atext" style={{ paddingLeft: '30px' }}>
                            {/* {(records||[]).map((item)=>{ */}
                            {/* // return( */}

                            <p className="aid" style={{ color: 'gray', fontSize: 'smaller' }}>id {uid}</p>
                            { (utype==="seller")? <>
                            <p className="ausername">Name: {records.name}</p>
                            <p className="ausername">Location: {records.location}</p>
                            <p className="ausername">Description: {records.description}</p>
                            </>:<>
                            <p className="ausername">Username: {records.username}</p>
                            </>
                            }
                            {/* // )  */}
                            {/* })} */}

                        </div>
                        { utype=='seller' &&(
                        <div className="adelete">
                            <button className="adelete" onClick={() => togglePop()}>add account</button>
                            <button className="adelete" onClick={() => togglePopDel()}>delete account</button>
                        </div>)}
                    </div>
                    {
                        utype == 'seller' && (
                            <>
                                <p className="atabletitle">Employees</p>
                                <div className="atable" style={{ height: '35vh' }}>
                                    <table className="atable_box">
                                        <thead>
                                            <tr className="areq_name">
                                                <th className="adata_name">id</th>
                                                <th className="adata_name">Employee name</th>
     
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(emp || []).map((e) => {
                                                return (
                                                    <tr >
                                                        <td>{e.userID}</td>
                                                        <td>{e.username}</td>
        
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                <p className="atabletitle">Listings</p>
                                <div className="atable" style={{ height: '35vh' }}>
                                    <table className="atable_box">
                                        <thead>
                                            <tr className="areq_name">
                                                <th className="adata_name">Item</th>
                                                <th className="adata_name">Seller</th>
                                                <th className="adata_name">Stock</th>
                                                <th className="adata_name">Price</th>
                                                <th className="adata_name">Type</th>
                                 
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(items || []).map((order) => {
                                                return (
                                                    <tr onClick={() => toDetail(false, order.item_id)}>
                                                        <td>{order.name}</td>
                                                        <td>{order.seller_id}</td>
                                                        <td>{order.stock}</td>
                                                        <td>{order.buy_now_price}</td>
                                                       
                                                        <td> {order.listing_type?<>Fixed-price</>:<>Auction</>}</td>
                                                  
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )
                    }
                    <p className="atabletitle">Orders</p>
                    <div className="atable" style={{ height: '35vh' }}>
                        <table className="atable_box">
                            <thead>
                                <tr className="areq_name" >
                                    <th className="adata_name">Item</th>
                                    <th className="adata_name">Buyer</th>
                                    <th className="adata_name">Quantity</th>
                                    <th className="adata_name">Price</th>
                                    <th className="adata_name">Type</th>

                                </tr>
                            </thead>

                            <tbody>


                                {(orders || []).map((order) => {

                                    return (
                                        <tr onClick={() => toDetail(true, order.order_id)}>
                                            <td>{order.item.name}</td>
                                            <td>{order.customer_id}</td>
                                            <td>{order.quantity}</td>
                                            <td>{order.item.buy_now_price}</td>
                                            <td> {order.item.listing_type?<>Fixed-price</>:<>Auction</>}</td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
            {visible?
            <AdminPop
            togglePop={togglePop}
            addHandler={addHandler}
            submitReq={submitReq}
            />
            :null}
            
            {delVisible?
            <AdminPopDelete
            togglePopDel={togglePopDel}
            delHandler={delHandler}
            submitReqDel={submitReqDel}
            />
            :null}
            

        </div>
    )
}
