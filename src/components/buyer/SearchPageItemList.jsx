import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CustomerSearchItem, getRequest } from '../Utils'
import SearchBar from './SearchBar'
import Setting from './Setting'
import { useCookies } from 'react-cookie';

export default function SearchPageItemList() {
    const mockItems = [
        {
            item_id: '1',
            item_name: 'Apple',
            price: '12',
            seller: "Ann"
        },
        {
            item_id: '2',
            item_name: 'Cup',
            price: '122',
            seller: 'Glen'
        }
    ]
    const [cookies, setCookie, removeCookie] = useCookies(['buyer']);

    const [items, setItems] = React.useState([])
    React.useEffect(() => {

        getRequest(CustomerSearchItem( localStorage.getItem('searchInput')),setItems)

        }, [])
    const navigate = useNavigate()
    function toDetail(item) {
        navigate(`/buyer/item?id=${item.item_id}`)
    }
    return (
        <>
            <Setting setItems={setItems} />
            <div class="page" style={{ alignItems: "flex-start" }}>

                <div className='searchBar'>
                    <SearchBar style={{ alignItems: 'flex-start' }} />
                </div>

                <div class="bottom">
                    {items.length != 0 && (
                        <>
                            <div class="result">
                                {(items || []).map((item) => {
                                    return (
                                        <div class="item" onClick={() => toDetail(item)}>

                                            <div class="info">
                                                <h1 class="name">{item.name}*{item.stock}</h1>
                                                {/* <p class="sellername">offered by: {item.seller_id}</p> */}
                                            </div>
                                            <div class="price">
                                                {item.listing_type? 
                                                <>
                                                <p class="price">{item.buy_now_price}$</p>
                                                </>
                                                :<>
                                                <p class="price">{item.temp_price}$</p>
                                                </>}
                                                
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            <div class="util">
                            </div>
                        </>
                    )
                    }
                    {items.length==0 && (
                        <>
                            <div class="result">
                                <h1 class="warning">Sorry, we cannot found any relevant items :(</h1>
                            </div>
                        </>
                    )}



                </div>
            </div>

        </>
    )
}
