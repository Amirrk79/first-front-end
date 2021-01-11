import React from 'react';
import { withRouter , NavLink } from 'react-router-dom';
import { signUp } from '../routePaths';
import Button from '@material-ui/core/Button';
import styles from  './styles.less';
import Header from '../Dashboard/Header';

function MainMenu() {
    return(
        <div>
            <Header title='Wellcome' />
        <div className={styles.mainDiv}>
       
        
        
        <NavLink class='login' exact to='/Login'>
        <Button variant="contained" color='primary'>Login</Button>
        </NavLink>
        
        
        <NavLink class='signUp' exact to={signUp}>
        <Button variant="contained" color='primary'>SignUp</Button>
        </NavLink>
        </div>
        </div>
    )
};

export default withRouter(MainMenu);