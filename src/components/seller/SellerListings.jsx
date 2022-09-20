import React, { useState } from 'react'
import SellerNav from './SellerNav'
import styles from '../../css/seller.css'
import SellerCreateListing from './SellerCreateListing'
import SellerItemDetail from './SellerItemDetail'
import WarningPop from './WarningPop'
import { mockItems, mockAuctions } from '../Mockdata'
import deleteIcon from '../../assets/icons/trashcan.svg'
import { getRequest,SellerCreateNewListing, postRequest, SellerViewListing, SellerCancelListing, SellerChangeStock } from '../Utils'
import { useCookies } from 'react-cookie';
export default function SellerListings() {
    const [cookies] = useCookies(['buyer']);
    const [payload, setPayload] = useState({
        ltype: null,
        lname: null

    });
    const [data, setData] = useState([])
    const [items, setItems] = useState([]);
    const [currentItem, setCurrentItem] = useState([]);
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
    //
    //Pop
    const [visible,setVisible]=useState(false);

    function newListingHandler(e) {
        switch (e.target.name) {
            case "name":
                setLname(e.target.value)
                break;
            case "type":
                setLtype(e.target.value=="Fixed-price")
                break;
            case "quantity":
                setLstock(parseInt(e.target.value))
                break;
            case "bnprice":
                setLbuyNowPrice(parseFloat(e.target.value))
                break;
            case "sprice":
                setLstartPrice(parseFloat(e.target.value))
                break;
            case "sdate":
                setLstartDate(e.target.value)
                break;
            case "edate":
                setLendDate(e.target.value)
                break;
            case "category":
                setLcatogory(e.target.value)
                break;
            case "brand":
                setLbrand(e.target.value)
                break;
            case "origin":
                setLorigin(e.target.value)
                break;
            case "manudate":
                setLmanuDate(e.target.value)
                break;
            case "desc":
                setLdes(e.target.value)
                break;
        }
    }
    //set seller id
    var seller_id=cookies.seller_id;
    React.useEffect(() => {
        //set seller id
        
        setPayload(JSON.stringify({
            //!!missing seller id
            ltype: ltype,
            name: lname,
            stock: lstock, 
            buy_now_price: lbuyNowPrice, 
            start_price: lstartPrice, 
            start_date: lstartDate, 
            end_date: lendDate, 
            category: lcatogory, 
            brand: lbrand, 
            origin: lorigin, 
            manufacture_date: lmanuDate, 
            description: ldes
        }))
        // setItems(mockAuctions)

    })
    function toFixedPrice() {
        getRequest(SellerViewListing(seller_id,true),setItems)
        //setItems(mockItems)
    }
    function toAuction() {
        getRequest(SellerViewListing(seller_id,false),setItems)
        //setItems(mockAuctions)
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
       // var target = "http://localhost:3005/item/" + item_id.toString()
       // getRequest(target, setData)
        setCurrentItem(item)
    }
    const[itemId,setItemId]=useState();
    function ItemIdHandler(){

    }
    function deleteItem() {
        if (window.confirm("Delete Item?")) {
           var req=(JSON.stringify({
                item_id: currentItem.item_id,
                seller_id: seller_id
            }))
            postRequest(SellerCancelListing(currentItem.item_id), req)
        }
    }
    function deleteItembySideNav(itemId) {
        if (window.confirm("Delete Item?")) {
           var req=(JSON.stringify({
                item_id: itemId,
                seller_id: seller_id
            }))
            postRequest("deletetarget", req)
        }
    }
    
    function createHandler(){
        postRequest(SellerCreateNewListing(seller_id),payload)
       // alert("Successfully Create a new Listing")
    }
    const [stock,setStock]=useState(currentItem.stock);
    function stockHandler(e){
        var stockReq=(JSON.stringify({
            item_id: currentItem.item_id,
            stock: parseInt(e.target.value)
        }))
        setStock(stockReq)
      
    } 
    function editStock(){
        var req=JSON.stringify({
            item_id:currentItem.item_id,
            quantity: JSON.parse(stock).stock
        })
        postRequest(SellerChangeStock(), req)
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


                        <button className="snewlisting" onClick={toggleCreateListing}>
                            +New Listing
                        </button>
                    </div>

                    <div className="slist">
                        {(items || []).map((item) => {
                            return (
                                <>
                                    <div className="sitem" onClick={() => { showCurrentItem(item) }}>
                                        <div className="sinfo">
                                            <h1 className="sname">{item.name}</h1>
                                            <p className="squantity">quantity: {item.stock}</p>
                                        </div>
                                        {/* <button className="sdelete" onClick={deleteItembySideNav(item.item_id)}>
                                            <img src={deleteIcon} alt="" />
                                        </button> */}
                                    </div>
                                </>
                            )
                        })}
                    </div>


                </div>
                {itemVisible ? <SellerItemDetail currentItem={currentItem} 
                deleteItem={deleteItem} 
                togglePop={togglePop}/> 
                : null}
                {createVisible ? <SellerCreateListing
                    ltype={ltype}
                    setLtype={setLtype}
                    handleTypeChange={handleTypeChange}
                    newListingHandler={newListingHandler}
                    createHandler={createHandler}
                    toggleCreateListing={toggleCreateListing}
                /> : null}
            {visible?
                <WarningPop togglePop={togglePop}
                stockHandler={stockHandler}
                stock={currentItem.stock}
                editStock={editStock}
                />
            : null}
            </div>

        </>
    )
}
