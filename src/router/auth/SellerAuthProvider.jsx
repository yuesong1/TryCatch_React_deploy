import React from 'react'
import { fakeAuth, LoginAsAdmin } from './fakeAuth';
import { useNavigate,  Navigate,useLocation, } from 'react-router-dom';
import { useCookies } from 'react-cookie';
export const SellerAuthContext = React.createContext('123');

export const SellerAuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['employee']);
  const navigate = useNavigate();
    const [token, setToken] = React.useState(null);
   const [req,setReq]=React.useState(null);
    
   const handleLogin =  (req) => {
       var t= setToken(LoginAsAdmin(setToken,req));
      console.log(token);
      
      setToken(token);
      setCookie('seller_id',JSON.parse(token).seller_id,{path:'/'})
      setCookie('employee_username',JSON.parse(token).username,{path:'/'})
    };
  
    const handleLogout = () => {
      setToken(null);
      removeCookie('seller_id')
      removeCookie('employee_username')
      navigate(`/seller`)
      
    };
  
    const value = {
      token,
      onLogin: handleLogin,
      onLogout: handleLogout,

    };

    return (
      <SellerAuthContext.Provider value={value}>
        {children}
      </SellerAuthContext.Provider>
    );
  };
  export const useSellerAuth = () => {
    return React.useContext(SellerAuthContext);
  };
  export const ProtectedSellerRoute = ({ children }) => {
    const { token } = useSellerAuth();
    const location = useLocation();
    const [cookies, setCookie] = useCookies(['name']);
    if (!cookies.seller_id||cookies.seller_id==0) {
      //return <Navigate to="/admin" replace state={{ from: location }} />
      return <Navigate to="/seller" replace /> ;
    }
  
    return children;
  };

  