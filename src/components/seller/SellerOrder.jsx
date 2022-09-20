import React, { useState } from 'react'
import SellerNav from './SellerNav'
import styles from '../../css/seller.css'
import SellerCreateListing from './SellerCreateListing'
import SellerItemDetail from './SellerItemDetail'
import WarningPop from './OrderPop'
import { mockItems, mockAuctions,mockOrderInfo } from '../Mockdata'
import deleteIcon from '../../assets/icons/trashcan.svg'
import { getRequest, postRequest, SellerDeleteOrder,SellerChangeOrderQuantity, SellerViewOrder } from '../Utils'
import SellerOrderDetail from './SellerOrderDetail'
import OrderPop from './OrderPop'
import { useCookies } from 'react-cookie';
export default function SellerOrders() {

    const [payload, setPayload] = useState({
        ltype: null,
        lname: null

    });
    const [data, setData] = useState([])
    const [items, setItems] = useState([]);
    const [currentItem, setCurrentItem] = useState(mockItems);
    const [createVisible, setcreateVisible] = useState(false);
    const [itemVisible, setItemVisible] = useState(false);

    // useState for creating new listing
    const [ltype, setLtype] = useState(false);
    const [lname, setLname] = useState();
    const [lstock, setLstock] = useState();
    const [lbuyNowPrice, setLbuyNowPrice] = useState();
    const [lstartPrice, setLstartPrice] = useState();
    const [lstartDate, setLstartDate] = useState();
    const [lendDate, setLendDate] = useState();
    const [lcatogory, setLcatogory] = useState();
    const [lbrand, setLbrand] = useState();
    const [lorigin, setLorigin] = useState();
    const [lmanuDate, setLmanuDate] = useState();
    const [ldes, setLdes] = useState();
    const [cookies, setCookie, removeCookie] = useCookies(['employee']);
    //Pop
    const [visible,setVisible]=useState(false);
    const [orderInfo, setOrderInfo]=useState([]);
    var seller_id=cookies.seller_id;
    React.useEffect(() => {
       
    
        //setOrderInfo(mockOrderInfo)
    
    })
    function toFixedPrice() {
        getRequest(SellerViewOrder(seller_id,'fixedprice'),setItems)
        console.log(items)
    }
    function toAuction() {
        getRequest(SellerViewOrder(seller_id,'auction'),setItems)
        console.log(items)
    }
    function toggleCreateListing() {
        setcreateVisible(!createVisible)
    }
    function toggleItem() {
        
        setItemVisible(true)
    }
    function togglePop(){
        setVisible(!visible);
    }
    
    function editItem() {

    }
    function handleTypeChange(e) {
        if (e.target.value == "Fixed-price")
            setLtype(true)
        if (e.target.value == "Auction")
            setLtype(false)

    }
    //get Item by item_id
    function showCurrentItem(item) {
        toggleItem()
    //getRequest(SellerViewOrder(localStorage.getItem("seller_id"),'fixedprice'),setOrderInfo)
        setCurrentItem(item)
    }
    function deleteItem() {
        if (window.confirm("Delete Item?")) {
           var req=(JSON.stringify({
                //item_id: "1",
                //seller_id: "2"
                order_id:currentItem.order_id
            }))
            postRequest(SellerDeleteOrder(currentItem.order_id), req)
        }
    }
    function createHandler(){
        postRequest("addListingtarget",payload)
        alert("Successfully Create a new Listing")
    }
    const [quantity,setQuantity]=useState();
    function quantityHandler(e){
      
            setQuantity(e.target.value)
          
        

    } 
    function editQuantity(){
        // validation check 
        if(quantity>currentItem.quantity){
            alert("set quantity cannot be greater than order quantity")
            return;
        }else{
            var req=JSON.stringify({
                order_id: currentItem.order_id,
                quantity:quantity
            })
        postRequest(SellerChangeOrderQuantity(),req) 

        
    }
    }
     
    return (
        <>

            <SellerNav />
            <div className="scontainer">
                <div className="sleft ssub">
                    <div className="ssubnav">
                        <div className="stype">
                            <button className="sfixedprice ssub" onClick={toFixedPrice}>
                                Fixed-Price
                            </button>
                            <button className="sauction ssub" onClick={toAuction}>
                                Auction
                            </button>
                        </div>
                    </div>

                    <div className="slist">
                        {(items || []).map((item) => {
                            return (
                                <>
                                    <div className="sitem" onClick={() => { showCurrentItem(item) }}>
                                        <div className="sinfo">
                                            <h1 className="sname">{item.item.name}</h1>
                                            <p className="squantity">status: {item.status}</p>
                                            <p className="squantity">quantity: {item.quantity}</p>
                                        </div>
                                        {/* <button className="sdelete" onClick={deleteItem}>
                                            <img src={deleteIcon} alt="" />
                                        </button> */}
                                    </div>
                                </>
                            )
                        })}
                    </div>


                </div>
                {itemVisible ? <SellerOrderDetail currentItem={currentItem} 
                orderInfo={orderInfo}
                deleteItem={deleteItem} 
                togglePop={togglePop}/> 
                : null}

            {visible?
                <OrderPop togglePop={togglePop}
                quantityHandler={quantityHandler}
                stock={currentItem.stock}
                editQuantity={editQuantity}
                orderInfo={currentItem}
                />
            : null}
            </div>

        </>
    )
}
