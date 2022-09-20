import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AdminViewAllItems } from '../Utils';
import { AuthProvider, AuthContext, useAuth } from '../../router/auth/AuthProvider';

// const sample=[
//     {
//         id:'1',
//         name:'apple',
 
//         seller:'b',
//         createAt:8.3,
//         quantity:20,
//         price:5,
//         type: 'auction'
//     },
//     {
//         id:'2',
//         name:'cup',
//         seller: 'Ann',
  
//         createAt:8.24,
//         quantity:24,
//         price:34,
//         type: 'auction'
//     }
// ]

export default function Goods() {
    const { token, onLogin,onLogout } = useAuth()
    const [inputText, setInputText]=useState("");
    let inputHandler=(e)=>{
        var lowercase=e.target.value.toLowerCase();
        setInputText(lowercase);
    }

    const navigate=useNavigate()
    function toDetail( item ){
            navigate(`detail?id=${item.item_id}`)
    }
    const [record,setRecord]=React.useState([]);
    const [auctionItem,setAuctionItem]=React.useState([]);
    const [fixedItem,setFixedItem]=React.useState([]);
    function selectItemType(type){
        if(type=='fixed-price'){
            const result = fetch(AdminViewAllItems(true), {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                headers: {
                  accept: 'application/json',
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*'
                }
              });
              result.then(ret => {
                ret.json().then(data => {
                    setRecord(data)
                    data.map((item)=>{
                        return item.type='fixed-price'
                    })
                    console.log(data)
                })
              })
              
        }
        if(type=='auction'){
            const result = fetch(AdminViewAllItems(false), {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                headers: {
                  accept: 'application/json',
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*'
                }
              });
              result.then(ret => {
                ret.json().then(data => {
                    setRecord(data)
                    data.map((item)=>{
                        return item.type='auction'
                    })
                    console.log(data)
                })
              })
    }  
    }

    React.useEffect(()=>{
        //setRecord(sample);
        const result = fetch(AdminViewAllItems(false) ,{
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
              accept: 'application/json',
              'Content-Type': 'application/json',
            }
          });
          result.then(ret => {
            ret.json().then(data => {
                setRecord(data)
      
            })
          })
    },[])

  return (
    <div className="abody">
            <div className="asetting"> 
                <p>Hello! adminnam    </p>
                <a href="/admin">logout</a>
            </div>
            <div className="aright-container">
                <div className="art-container">
                    <h1 className="atitle">Listings</h1>
                </div>
                <div className="amid-container">
                    <div className="abuttonset">
                        <div className="atag1">
                            <button className="atag" onClick={()=>selectItemType("fixed-price")}>Fixed-price</button>
                        </div>
                        <div className="atag2">
                            <button className="atag"  onClick={()=>selectItemType("auction")}>Auction</button>
                        </div>
                    </div>
                    <div className="asearchbar">
                        <input type="text" name="search" id="1" placeholder="Search" onChange={event=>setInputText(event.target.value)}/>
                    </div>
                </div>
                <div className="alt-container">
                    <div className="atable">
                        <table className="atable_box">
                            <thead>
                                <tr className="areq_name">
                                    <th className="adata_name">Item name</th>
                                    <th className="adata_name">Stock</th>
                                    <th className="adata_name">Seller id</th>
                                    <th className="adata_name">Price</th>
                                    <th className="adata_name">Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {record.filter(post=>{
                                        if(inputText===""){
                                            return post;
                                        }else if(post.name.toLowerCase().includes(inputText.toLowerCase())){
                                            return post
                                        }
                                    }).map((item)=>{
                                    return(
                                    
                                        <tr onClick={()=>toDetail(item)}>
                                            <td>{item.name}</td>
                                            <td>{item.stock}</td>
                                            <td>{item.seller_id}</td> 
                                            <td>{item.buy_now_price}</td>
                                            <td>{item.type}</td>
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
