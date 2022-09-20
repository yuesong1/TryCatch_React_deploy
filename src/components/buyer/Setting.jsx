import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../../css/buyer.css'
import cartIcon from '../../assets/icons/cart.svg'
import orderIcon from '../../assets/icons/orders.svg'
import homeIcon from '../../assets/icons/home.svg'
import { useBuyerAuth } from '../../router/auth/BuyerAuthProvider'
import { useCookies } from 'react-cookie';

export default function Setting() {
    const [cookies, setCookie, removeCookie] = useCookies(['buyer']);

const {token,onLogout}=useBuyerAuth();
    var buyer_id=cookies.buyer_id
    var buyer_username=cookies.buyer_username
    // Get settings userinfo
    const [record, setRecord] = React.useState([]);
    React.useEffect(() => {

        // var targetUrl1 = 'https://6d74ae4c-cf6f-4bd3-8236-9a31743d05ca.mock.pstmn.io' + '/admin/users/' + 'seller' + '/' + '1';
        // console.log(targetUrl1)
        // const result = fetch(targetUrl1, {
        //     method: 'GET', // *GET, POST, PUT, DELETE, etc.
        //     headers: {
        //         accept: 'application/json',
        //         'Content-Type': 'application/json',
        //     }
        // });
        // result.then(ret => {
        //     ret.json().then(data => {

        //         setRecord(data)
        //         console.log(data)

        //     })
        // })
    }, [])

    return (
        <div className="setting">
            <Link to="/buyer/search">
                <button className="cart"> <img src={homeIcon} style={{ height: "20px" }} alt="" /></button>
            </Link>
            <Link to="/buyer/cart">
                <button className="cart"> <img src={cartIcon} alt="" /></button>
            </Link>
            <Link to="/buyer/order">
                <button className="cart"> <img src={orderIcon} style={{ height: "20px" }} alt="" /></button>
            </Link>
            <p className="name">Hello! {buyer_username}</p>
            <Link to='/buyer/' onClick={onLogout}>Logout</Link>
        </div>
    )
}
