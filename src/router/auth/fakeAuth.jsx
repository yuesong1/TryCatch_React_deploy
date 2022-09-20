import { LoginController, postRequest } from "../../components/Utils";
import { useNavigate,  Navigate, } from 'react-router-dom';
export const fakeAuth = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve('2342f2f1d131rf12'), 250);
  });
  export const Login = (setToken,req) =>
  new Promise((resolve) => {
    setTimeout(() => resolve('2342f2f1d131rf12'), 250);
  });

  
export function LoginAsAdmin(setToken,req){

    const result = fetch(LoginController(), {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: req
      });
      result.then(data => {
        if (data.status === 200) {
          
          data.json().then(res => {
            var user=JSON.stringify(res)
            setToken(user)
            alert('Login Success')
            //console.log(user)
            return user

          
          })
        } else if (data.status !== 400) {
          alert('Login failed')
        }
      })

}