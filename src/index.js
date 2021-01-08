import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './allRoutes';
import reportWebVitals from './reportWebVitals';
import store from './Redux/store';
import { Provider } from 'react-redux';




ReactDOM.render(
      <Provider store={store}>
    <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>
  ,
  document.getElementById('root')
);

reportWebVitals();
