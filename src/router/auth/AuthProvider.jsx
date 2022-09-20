import React from 'react'
import { fakeAuth, LoginAsAdmin } from './fakeAuth';
import { useNavigate,  Navigate,useLocation, } from 'react-router-dom';
 //import Cookies from 'react-cookie'
 import { useCookies } from 'react-cookie';
export const AuthContext = React.createContext('123');

export const AuthProvider = ({ children }) => {
  //const cookies=new Cookies();

  const navigate = useNavigate();
    const [token, setToken] = React.useState(null);
   const [req,setReq]=React.useState(null);
   const [cookies, setCookie, removeCookie] = useCookies(['admin']);
   const handleLogin =  (req) => {
       var t= setToken(LoginAsAdmin(setToken,req));
      console.log(token);
      setToken(token);
      // cookies.set('admin',t,{path:'/admin'})
      setCookie('admin_id',JSON.parse(token).userID,{path:'/'})
      setCookie('admin_username',JSON.parse(token).username,{path:'/'})
     
    };
  
    const handleLogout = () => {
      setToken(null);
      removeCookie('admin_id')
      removeCookie('admin_username')
      navigate(`/admin`)
      
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
  export const useAuth = () => {
    return React.useContext(AuthContext);
  };
  export const ProtectedRoute = ({ children }) => {
    const { token } = useAuth();
    const location = useLocation();
    const [cookies, setCookie] = useCookies(['admin']);
    if (!cookies.admin_id||cookies.admin_id==0) {
      //return <Navigate to="/admin" replace state={{ from: location }} />
      return <Navigate to="/admin" replace /> ;
    }
  
    return children;
  };

  