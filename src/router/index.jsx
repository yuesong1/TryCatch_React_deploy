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
import { useState } from 'react'
import { AuthProvider, ProtectedRoute } from './auth/AuthProvider'
import React from 'react'
import { SellerAuthProvider ,ProtectedSellerRoute} from './auth/SellerAuthProvider'
import { BuyerAuthProvider, BuyerProtectedRoute } from './auth/BuyerAuthProvider'
const AuthContext = React.createContext(null);

const BaseRouter = () => {

    const [token, setToken] = useState('123');
    const fakeAuth = () =>
        new Promise((resolve) => {

            setTimeout(() => resolve('2342f2f1d131rf12'), 250);
        });

    const handleLogout = () => {
        setToken(null);
    };
    const handleLogin = async () => {

        const token = await fakeAuth();

        setToken(token);

    };
    return (
        <>
            <BrowserRouter>

                <AuthProvider>
                    <Routes>

                        <Route exact path="/admin" element={<AdminLogin />} />
                        <Route exact path="/admin/dashboard" element={<ProtectedRoute><><div className="aroot"><AdminNavBar /><AdminDashboard /></div></></ProtectedRoute>} />
                        <Route exact path="/admin/orders" element={<ProtectedRoute><><div className="aroot"><AdminNavBar /><AdminOrders /></div></></ProtectedRoute>} />
                        <Route exact path="/admin/users" element={<ProtectedRoute><><div className="aroot"><AdminNavBar /><AdminUsers /></div></></ProtectedRoute>} />
                        <Route exact path="/admin/items" element={<ProtectedRoute><><div className="aroot"><AdminNavBar /><AdminItems /></div></></ProtectedRoute>} />

                        <Route exact path="/admin/orders/:id" element={<ProtectedRoute><><div className="aroot"><AdminNavBar /><AdminOrdersDetail /></div></></ProtectedRoute>} />
                        <Route exact path="/admin/items/:id" element={<ProtectedRoute><><div className="aroot"><AdminNavBar /><AdminItemsDetail /></div></></ProtectedRoute>} />
                        <Route exact path="/admin/users/detail" element={<ProtectedRoute><><div className="aroot"><AdminNavBar /><AdminUsersDetail /></div></></ProtectedRoute>} />
                      
                    </Routes>
                </AuthProvider>
                        
                <BuyerAuthProvider>
                <Routes>
                    <Route exact path="/buyer" element={<><BuyerLogin /></>} />
                    <Route exact path="/buyer/search" element={<BuyerProtectedRoute><><BuyerSearchPage /></></BuyerProtectedRoute>} />
                    <Route exact path="/buyer/search/result" element={<BuyerProtectedRoute><><BuyerSearchResult /></></BuyerProtectedRoute>} />
                    <Route exact path="/buyer/item" element={<BuyerProtectedRoute><><BuyerItemDetail /></></BuyerProtectedRoute>} />
                    <Route exact path="/buyer/cart" element={<BuyerProtectedRoute><><BuyerCart /></></BuyerProtectedRoute>} />
                    <Route exact path="/buyer/cart/item/" element={<BuyerProtectedRoute><><BuyerCartItemDetail /></></BuyerProtectedRoute>} />
                    <Route  path="/buyer/order/item/" element={<BuyerProtectedRoute><><BuyerOrderDetail /></></BuyerProtectedRoute>} />
                    <Route exact path="/buyer/order" element={<BuyerProtectedRoute><><BuyerOrders /></></BuyerProtectedRoute>} />
                
                </Routes>         
                </BuyerAuthProvider>

                <SellerAuthProvider>
                    <Routes>

                        <Route exact path="/seller/listing" element={<ProtectedSellerRoute><><SellerListings /></></ProtectedSellerRoute>} />
                        <Route exact path="/seller/order" element={<ProtectedSellerRoute><><SellerOrders /></></ProtectedSellerRoute>} />
                        <Route exact path="/seller" element={<><SellerLogin /></>} />
                       
                    </Routes>
                </SellerAuthProvider>

                <Routes>
                <Route path="*" element={<Error />}></Route>
                </Routes>

            </BrowserRouter>
        </>
    )
}
export default BaseRouter;