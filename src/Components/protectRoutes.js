import React , { useEffect } from "react";
import { Redirect , Route } from 'react-router-dom';
import { login , dashboard } from './routePaths';
import store from '../Redux/store';




export function ProtectedRoute({component: Component , path , ...rest}) {
    const state = store.getState();
    const user = state.user;
    const isLoggedIn = user.isLoggedIn;
    return(
        <Route 
        path={path}
        {...rest}
        render ={(props) => {
            return isLoggedIn ?
            <Component {...props} />
            : 
            <Redirect to={login} />;
        }}
        />
    )
};


export function UnProtectedRoute({component: Component , path , ...rest }) {
    const state = store.getState();
    const user = state.user;
    const isLoggedIn = user.isLoggedIn;
    return(
        <Route 
        path={path}
        {...rest}
        render={(props) => {
           return isLoggedIn ?
            <Redirect to={dashboard} /> :
            <Component {...props} />
        }}
        />
    )
};

