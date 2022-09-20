import {React,useState} from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import styles from '../../css/buyer.css'
import { CustomerSearchItem } from '../Utils';
import { useCookies } from 'react-cookie';
export default function SearchBar(props) {
    const navigate = useNavigate();
    const [inputText,setInputText]=useState([]);
    const [cookies, setCookie, removeCookie] = useCookies(['buyer']);

    let inputHandler=(e)=>{
         var lowercase=e.target.value
         //.toLowerCase();
         setInputText(lowercase)
    }
    function searchItem(){
        localStorage.setItem('searchInput', inputText)
        const payload=JSON.stringify({
            input:inputText
        });
        console.log(payload)
        var targetUrl=CustomerSearchItem(inputText);
        const result = fetch(targetUrl, {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
          },
          //body: payload,
        });
        result.then(data => {
          if (data.status === 200) {
            data.json().then(res => {
              //props.setItems(res)
              //history('./')
            })
          } else if (data.status === 400) {
            alert('Invalid Input')
          }
        })
        navigate(`/buyer/search/result?result=${inputText}`)
        window.location.reload(false);
      }

    return (
       
            <div className="search">
                <h1 className="title">Buy-E  </h1>
                <div className="search_bar">
                    <input className="search" type="text" onKeyDown={(e)=>{
                        if(e.key=='Enter'){
                            searchItem()
                        }}}
                        onChange={inputHandler}/>
                    <button className="search" onClick={()=>searchItem()}>Go</button>
                </div>
            </div>
        
    )
}
