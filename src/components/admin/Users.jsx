import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { postRequest } from '../Utils'
import AdminPopAddSeller from './AdminPopAddSeller'
import { backend,AdminGetAllCustomers } from '../Utils'
import { AuthProvider, AuthContext, useAuth } from '../../router/auth/AuthProvider';

export default function Users() {

    const sample=[
        {
            id:'1',
            name:'Ann',
            createAt:8.3,
            type: 'seller',
            ordersNum:32
        },
        {
            id:'2',
            name:'Glen',
            createAt:8.3,
            type: 'Buyer',
            ordersNum:23
        }
    ]
    const [inputText, setInputText]=useState("");


    const navigate=useNavigate()
    function toDetail( user ){

        if(user.type=='seller'){
            navigate(`detail?user=seller&id=${user.seller_id}`)
            return;
        }
        if(user.type=='buyer'){
            navigate(`detail?user=buyer&id=${user.userID}`)
        }
    }

    function selectUserType(type){
        if(type=='seller'){
            const result = fetch(backend.url+'/ServletGetAllSeller', {
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
                         item.type='seller'
                    
                    })
                    console.log(data)
                })
              })
              
        }
        if(type=='buyer'){
            const result = fetch(AdminGetAllCustomers(), {
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
                        return item.type='buyer'
                    })
                    console.log(data)
                })
              })
    }  
    }
    const { token, onLogin,onLogout } = useAuth()
    const [record,setRecord]=React.useState([]);
    React.useEffect(()=>{
        //setRecord(sample);
        const result = fetch(backend.url+'/ServletGetAllSeller', {
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
                    item.type='seller'
                    item.username=item.name
                })
                console.log(data)
            })
          })
    },[])
 
    const [visible,setVisible]=useState(false);
    function togglePop(){
        setVisible(!visible);
        if(!visible){
            setSname()
            setSlocation()
            setSdes()
        }
    }
    const[sname,setSname]=useState();
    const[slocation,setSlocation]=useState();
    const [sdes, setSdes]=useState();
    function inputHandler(e){
        switch(e.target.name){
            case "name":
                setSname(e.target.value)
                break;
            case "location":
                setSlocation(e.target.value)
                break;
            case "description":
                setSdes(e.target.value)
                break;
        }
    }
    function submitReq(){
        if(sname==""||sname==null||sname==undefined
        ||slocation==""||slocation==null||slocation==undefined
        ||sdes==""||sname==null||sdes==undefined){
            alert('missing input')
            return;
        }
        var req=JSON.stringify({
            name:sname,
            location: slocation,
            description: sdes
        })
        var addurl=backend.url+"ServletInsertSeller"
        postRequest(addurl, req)
        window.location.reload(false);
    }
  return (
    <div className="abody">
            <div className="asetting"> 
                <p>Hello! adminname    </p>
                <a href="/admin" onClick={onLogout}>logout</a>
            </div>
            <div className="aright-container">
                <div className="art-container">
                    <h1 className="atitle">Users</h1>
                </div>
                <div className="amid-container">
                    <div className="abuttonset">
                        <div className="atag1">
                            <button className="atag" onClick={()=>selectUserType('buyer')}>Buyer</button>
                        </div>
                        <div className="atag2">
                            <button className="atag" onClick={()=>selectUserType('seller')}>Seller</button>
                        </div>
                        <button className="atag" onClick={() => togglePop()}>add account</button>
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
                                    <th className="adata_name">Username</th>
                                    <th className="adata_name">Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    record.filter(post=>{
                                        if(inputText===""){
                                            return post;
                                        }else if(post.username.toLowerCase().includes(inputText.toLowerCase())){
                                            return post
                                        }
                                    }).map((item)=>{
                                    return(
                                    
                                        <tr onClick={()=>toDetail(item)}>
                                    
                                            {item.type=="seller"||item.authorisation=="seller"? <>
                                            <td>{item.name}</td>
                                            </>:<>
                                            <td>{item.username}</td>
                                            </>}
                                            
                                            <td>{item.type}</td>
                                        </tr>
                                )
                                })}
                            </tbody>
                    </table>
                    </div>
                </div>
            </div>

        {
            visible?
            <AdminPopAddSeller
            togglePop={togglePop}
            inputHandler={inputHandler}
            submitReq={submitReq}
            />
            :null
        }

            
    </div>
  )
}
