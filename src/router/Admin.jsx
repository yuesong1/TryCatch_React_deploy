import Admin from '../Admin'
import Error from '../components/Error'
import AdminNavBar from '../components/admin/NavBar'
import AdminOrders from '../components/admin/Orders'
import AdminUsers from '../components/admin/Users'
import AdminDashboard from '../components/admin/Dashboard'
import AdminItems from '../components/admin/Items.jsx'
import AdminLogin from '../components/admin/Login.jsx'

import AdminOrdersDetail from '../components/admin/OrdersDetail'
import AdminItemsDetail from '../components/admin/ItemsDetail'
import AdminUsersDetail from '../components/admin/UsersDetail'

import BuyerSearchPage from '../components/buyer/SearchPage'
import BuyerSearchResult from '../components/buyer/SearchPageItemList'
import BuyerItemDetail from '../components/buyer/ItemDetail'
import BuyerCart from '../components/buyer/Cart'
import BuyerOrderDetail from '../components/buyer/OrderDetail'
import BuyerCartItemDetail from '../components/buyer/CartItemDetail'
import BuyerOrders from '../components/buyer/Orders'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Orders from '../components/admin/Orders'
import SellerListings from '../components/seller/SellerListings'
import SellerOrders from '../components/seller/SellerOrder'
import SellerLogin from '../components/seller/SellerLogin'
import BuyerLogin from '../components/buyer/BuyerLogin'
import { fakeAuth } from './auth/fakeAuth'
import { useState } from 'react'
const AdminBaseRouter = () => {
    const fakeAuth = () =>
        new Promise((resolve) => {
      
            setTimeout(() => resolve('2342f2f1d131rf12'), 250);
        });

    const [token, setToken] = useState(null);
    const handleLogout = () => {
        setToken(null);
    };
    const handleLogin = async () => {
       
        const token = await fakeAuth();

        setToken(token);
      
    };
    return (
        <BrowserRouter>


            <Routes>

                <Route exact path="/admin" element={<><AdminLogin onLogin={handleLogin}/></>} />
                <Route exact path="/admin/dashboard" element={<><div className="aroot"><AdminNavBar onLogout={handleLogout} /><AdminDashboard onLogin={handleLogin} /></div></>} />
                <Route exact path="/admin/orders" element={<><div className="aroot"><AdminNavBar /><AdminOrders /></div></>} />
                <Route exact path="/admin/users" element={<><div className="aroot"><AdminNavBar /><AdminUsers /></div></>} />
                <Route exact path="/admin/items" element={<><div className="aroot"><AdminNavBar /><AdminItems /></div></>} />

                <Route exact path="/admin/orders/:id" element={<><div className="aroot"><AdminNavBar /><AdminOrdersDetail /></div></>} />
                <Route exact path="/admin/items/:id" element={<><div className="aroot"><AdminNavBar /><AdminItemsDetail /></div></>} />
                <Route exact path="/admin/users/detail" element={<><div className="aroot"><AdminNavBar /><AdminUsersDetail /></div></>} />

                <Route path="*" element={<Error />}></Route>
            </Routes>

        </BrowserRouter>
    )
}
export default AdminBaseRouter;