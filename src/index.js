import React from 'react';
import ReactDOM from 'react-dom/client';

import Router from './router/index';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import store from './store'
import AdminBaseRouter from './router/Admin';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Provider store={store}>
        {/* <AdminBaseRouter></AdminBaseRouter> */}
        <Router />
    </Provider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
