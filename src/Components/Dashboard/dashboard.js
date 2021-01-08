import React , { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch , useSelector } from 'react-redux';
import UsersDashboard from './usersDashboard';
import shortid from 'short-id';

function Dashboard() {
    const dispatch = useDispatch();
    const userName = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    useEffect(() => {
    } , [])
    return(
        <div>
            <UsersDashboard key={shortid.generate()} /> 
        </div>
    )
};



export default withRouter(Dashboard);