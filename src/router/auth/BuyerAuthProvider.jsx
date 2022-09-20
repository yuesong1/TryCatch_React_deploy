import React from 'react'
import { fakeAuth, LoginAsAdmin } from './fakeAuth';
import { useNavigate,  Navigate,useLocation, } from 'react-router-dom';
 //import Cookies from 'react-cookie'
 import { useCookies } from 'react-cookie';
export const AuthContext = React.createContext('123');


export const BuyerAuthProvider = ({ children }) => {
  //const cookies=new Cookies();
  const [cookies, setCookie, removeCookie] = useCookies(['buyer']);

  const navigate = useNavigate();
    const [token, setToken] = React.useState(null);
   const [req,setReq]=React.useState(null);
    
   const handleLogin =  (req) => {
       var t= setToken(LoginAsAdmin(setToken,req));
      console.log(token);
      setToken(token);
      // cookies.set('admin',t,{path:'/admin'})
      setCookie('buyer_id',JSON.parse(token).userID,{path:'/'})
      setCookie('buyer_username',JSON.parse(token).username,{path:'/'})
     
    };
  
    const handleLogout = () => {
      removeCookie('buyer_id')
      removeCookie('buyer_username')
      setToken(null);
      navigate(`/buyer`)
      
    };
  
    const value = {
      token,
      onLogin: handleLogin,
      onLogout: handleLogout,

    };

    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    );
  };
  export const useBuyerAuth = () => {
    return React.useContext(AuthContext);
  };
  export const BuyerProtectedRoute = ({ children }) => {
    const [cookies, setCookie, removeCookie] = useCookies(['admin']);
    const { token } = useBuyerAuth();
    const location = useLocation();
    if (cookies.buyer_id==0||!cookies.buyer_id) {
      //return <Navigate to="/admin" replace state={{ from: location }} />
      return <Navigate to="/buyer" replace /> ;
    }
  
    return children;
  };

  