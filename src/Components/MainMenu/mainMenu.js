import React from 'react';
import { withRouter , NavLink } from 'react-router-dom';
import { signUp } from '../routePaths';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import './styles.css';

function MainMenu() {
    //styles 

const StyledButton = styled(Button)({
  background: 'linear-gradient(90deg, rgba(183,56,226,1) 0%, rgba(87,11,145,1) 100%, rgba(0,212,255,1) 100%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  fontSize: 20 ,
  height: 60,
  padding: '0 60px',
});



 
    return(
        <div class='mainMenu'>
        <div class='item1'>
        <h1 class='wellcome'>Wellcome</h1>
        </div>
        <div class='item2'>
        <NavLink class='login' exact to='/Login'>
        <StyledButton>Login</StyledButton>
        </NavLink>
        </div>
        <div class='item3'>
        <NavLink class='signUp' exact to={signUp}>
        <StyledButton>SignUp</StyledButton>
        </NavLink>
        </div>
                
        
        </div>
        
    )
};

export default withRouter(MainMenu);