import React , { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUp } from '../routePaths';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { withRouter , NavLink , useHistory } from 'react-router-dom';
import Copyright from '../copyRight';
import setActiveUser from '../../Redux/Actions/setActiveUserAction';
import Alert from '../Notifiaction';
import { dashboard } from '../routePaths';
import store from '../../Redux/store';
import {
    Grid,
    AppBar,
    Typography,
    Toolbar,
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Box,
    Container,
    Snackbar,
    makeStyles
    } from "@material-ui/core";


    //styles
const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3)
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    grid: {
        backgroundColor: '#fff' ,
        borderRadius: 5 ,
        padding: 10
    } ,
    button: {
        fontSize: 17
    } , 
    alerts: {
        fontSize: 20 ,
    }
  }));

function Login() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    //States
    const [formData , setFormData] = useState(
        {
            userName: '' ,
            userNameError: '' ,
            password: '' ,
            passwordError: '' ,
            loginError: '' 
        }
    );
    const [open , setOpen] = useState(
        {
            userNameOpen: false ,
            passwordOpen: false ,
            loginErrorOpen: false
        }
    );
    const activeUser = () => {
        const state = store.getState();
        const users = state.users;
        let userIndex = users.findIndex(users => users.userName === formData.userName);
        dispatch(setActiveUser(
            users[userIndex]
        ))
    }
    const Validation = () => {
        const state = store.getState();
        const users = state.users;
        let confirmUserName = users.findIndex( users => users.userName === formData.userName);
        let confirmPassword = users.findIndex( users => users.password === formData.password);
        console.log(formData)

         if (confirmUserName !== -1 && confirmPassword !== -1) {
            activeUser()
            history.push({
                pathname:{dashboard}
            })
        } else {
            setFormData({...formData , loginError : 'UserName or Password is incorrect!'})
            setOpen({loginErrorOpen: true});
        }
    };

    const handleChange = (e) => {
        setFormData({...formData , [e.target.name] : e.target.value ,
        userNameError: '' , passwordError: ''})
        setOpen({
            userNameOpen: false ,
            passwordOpen: false ,
            loginErrorOpen: false
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!formData.userName || formData.userName.length < 4) {
            setFormData({...formData , userNameError: "Please enter a valid username!"});
            setOpen({...open , userNameOpen : true})
        } 
        else if(!formData.password || formData.password.length < 12) {
            setFormData({...formData , passwordError : "Please enter a valid password!"});
            setOpen({...open , passwordOpen: true})
        } 
        else {
            Validation()
        }
    }
    console.log(formData);
    return(
        <div>
        <div>
<AppBar position="static" alignitems="center" color="primary">
<Toolbar>
<Grid container justify="center" wrap="wrap">
<Grid item>
<Typography variant="h6">Login</Typography>
</Grid>
</Grid>
</Toolbar>
</AppBar>
</div>

    <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
            <AccountBoxIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
                Login
            </Typography>
    <form className={classes.form} onSubmit={handleSubmit}>
<Grid container spacing={2} className={classes.grid}>
    <Snackbar open={open.loginErrorOpen}>
    <Alert severity='error'>{formData.loginError}</Alert>
    </Snackbar>
    <Grid item xs='12'>
        <TextField 
        label='UserName'
        variant='outlined'
        fullWidth
        name="userName"
        value={formData.userName}
        onChange={handleChange}
        helperText={formData.userNameError}
        error={open.userNameOpen}
        />
    </Grid>
    <Grid item xs='12'>
        <TextField
        label='Password'
        variant='outlined'
        fullWidth
        name="password"
        value={formData.password}
        onChange={handleChange}
        helperText={formData.passwordError}
        error={open.passwordOpen}
        />
    </Grid>
    <Grid item xs='12'>
        <Button
        fullWidth
        className={classes.button}
        variant='contained'
        color='primary'
        type='submit'
        >
            Login
        </Button>
    </Grid>
    <Grid container justify='flex-end'>
    <NavLink exact to={signUp}>
        Not a member yet? Sign up now!
    </NavLink>
    </Grid>
</Grid>
</form>
</div>
    <Box mt={5}>
        <Copyright />
    </Box>
</Container>
</div>
    )
};


export default withRouter(Login);



//when you click login, this will dispatch username and data ith an array to login action and reducer will check username and password with findindex and verify the user and if user was verified reducer will set an item to localStorage named isloggedIn? true and gone