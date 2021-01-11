import React ,{ useState } from 'react';
import { withRouter , useHistory , NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import addUser from '../../Redux/Actions/addUserAction';
import shortid from 'short-id';
import { dashboard } from '../routePaths'; 
import store from '../../Redux/store';
import setActiveUser from '../../Redux/Actions/setActiveUserAction';
import styles from './styles.less';
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
    Snackbar
    } from "@material-ui/core";
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from '../copyRight';
import { login } from '../routePaths';
import Alert from '../Notifiaction';








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
      backgroundColor: '#3f51b5',
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
        fontSize: 17 ,
    } , 
    alerts: {
        fontSize: 20 ,
    } ,
    header: {
        backgroundColor: '#3f51b5' ,
        color: '#fff'
    }
  }));

   




function SignUp() {
 

    //Manage Styles: 
    const classes = useStyles();
    const [open, setOpen] = useState(
        {
            nameOpen: false ,
            lastNameOpen: false ,
            userNameOpen: false ,
            emailOpen: false ,
            passwordOpen: false ,
            repeatPasswordOpen: false ,
            emailValidOpen: false ,
            userNameValidOpen: false
        }
    );


    //States...:
    const [formData , setFormData] = useState(
        {
            name: "" ,
            errorName: "" ,
            lastName: "" ,
            errorLastName: "" ,
            userName: "" ,
            errorUserName: "" ,
            email: "" ,
            errorEmail: "" ,
            password: "" ,
            errorPassword: "" ,
            repeatPassword: "" ,
            errorRepeatPassword: "" ,
            emailValidError: "" ,
            userNameValidError: ""
        }
    );

    const dispatch = useDispatch();
    const history = useHistory();
  
    const onSubmit = (e) => {
        function LastValidation() {
            const state = store.getState();
        const users = state.users;
        const userNameIndex = users.findIndex(users => users.userName === formData.userName);
        const emailIndex = users.findIndex(users => users.email === formData.email);
        if(emailIndex !== -1) {
            setOpen({...open , emailValidOpen: true})
            setFormData({...formData , emailValidError : "your Email is already in use."})
        } 
        else if(userNameIndex !== -1) {
            setOpen({...open , userNameValidOpen : true})
            setFormData({...formData , userNameValidError: "your UserName is already is use."})
        } 
        else {
            dispatch(addUser(
                {
                    name: formData.name ,
                    lastName: formData.lastName ,
                    userName: formData.userName ,
                    email: formData.email ,
                    password : formData.password ,
                    id: shortid.generate() , 
                    isLoggedIn: true
                }
            ))
            const state = store.getState();
            const users = state.users;
            const userIndex = users.findIndex(users => users.userName === formData.userName );
            dispatch(setActiveUser(
                users[userIndex]
            ))
            history.push({
                pathname:{dashboard}
            })
        }; 
        }
        const UPPERCASE = "[A B C D E F G H I J K L M N O P Q R S T U V W X Y Z]";
        e.preventDefault();
        if(!formData.name || formData.name.length < 4) {
            setOpen({...open , nameOpen: true })
            setFormData({...formData , errorName: "Name should be atleast 4 carachters"})
        }
        else if(!formData.lastName || formData.lastName.length < 4) {
            setOpen({...open , lastNameOpen: true})
            setFormData({...formData , errorLastName: "LastName should be atleast 4 carachters"})
        }
        else if(!formData.userName || formData.userName.length < 4 || formData.userName.match("[!@#$%^&*(),.:|<>?]")) {
            setOpen({...open , userNameOpen : true})
            setFormData({...formData , errorUserName: "UserName should be atleast 4 carachters and it doesnt allow (@/?) carachters"})
        }
        else if(!formData.email || formData.email.length < 4 || !formData.email.match("[@.]")) {
            setOpen({...open , emailOpen: true})
            setFormData({...formData , errorEmail: "Invalid Email!"})
        }
        else if(!formData.password || formData.password.length < 12 || !formData.password.match(UPPERCASE)) {
            setOpen({...open , passwordOpen: true})
            setFormData({...formData , errorPassword: "Password should be at least 12 carachters and should have 1 UPPERCASE letter"})
        }
        else if(!formData.repeatPassword || formData.repeatPassword !== formData.password) {
            setOpen({...open , repeatPasswordOpen: true})
            setFormData({...formData , errorRepeatPassword: "Repeat Password must be equal to Password"})
        } else {
            LastValidation()
        }
    };
    const handleChange = (e) => {
        setFormData({...formData ,
             [e.target.name]:e.target.value,
             errorName : '' ,
             errorUserName: '' ,
             errorEmail: '' ,
             errorPassword: '' ,
             errorRepeatPassword: '' ,
             emailValidError: '' ,
             userNameValidError: '',
            })
        setOpen({
            nameOpen: false ,
            lastNameOpen: false ,
            userNameOpen: false ,
            emailOpen: false ,
            passwordOpen: false ,
            repeatPasswordOpen: false ,
            emailValidOpen: false ,
            userNameValidOpen: false 
    })

    }
    return(
        <div>
        <AppBar position="static" alignitems="center" className={classes.header}>
        <Toolbar>
        <Grid container justify="center" wrap="wrap">
        <Grid item>
        <Typography variant="h6">Sign up</Typography>
        </Grid>
        </Grid>
        </Toolbar>
        </AppBar>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LaptopMacIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2} className={classes.grid}>

                <Snackbar open={open.emailValidOpen}>
    <Alert severity='error'>{formData.emailValidError}</Alert>
                </Snackbar>
                <Snackbar open={open.userNameValidOpen}>
    <Alert severity='error'>{formData.userNameValidError}</Alert>
                </Snackbar>
                    
              <Grid item xs={6}>
              <TextField
                     label="Name" 
                     variant="outlined" 
                     id="deterministic-outlined-input" 
                     value={formData.name}
                     onChange={handleChange}
                     name='name'
                     required
                     fullWidth
                     helperText={formData.errorName}
                     error={open.nameOpen}
                      />
              </Grid>
              <Grid item xs={6}>
              <TextField
                    label="LastName"
                    variant="outlined"
                    id="deterministic-outlined-input"
                    value={formData.lastName}
                    onChange={handleChange}
                    name='lastName'
                    required
                    fullWidth
                    helperText={formData.errorLastName}
                    error={open.lastNameOpen}
                        />
              </Grid>
              <Grid item xs={12}>
              <TextField
                        label="UserName"
                        variant="outlined"
                        id="deterministic-outlined-input" 
                        value={formData.userName}
                        onChange={handleChange}
                        name='userName'
                        required
                        fullWidth
                        helperText={formData.errorUserName}
                        error={open.userNameOpen}
                            />
              </Grid>
              <Grid item xs={12}>
              <TextField
                        label="Email"
                        variant="outlined"
                        id="deterministic-outlined-input" 
                        value={formData.email}
                        onChange={handleChange}
                        name="email"
                        required
                        fullWidth
                        helperText={formData.errorEmail}
                        error={open.emailOpen}
                            />
              </Grid>
              <Grid item xs={12}>
              <TextField
                        label="Password"
                        variant="outlined"
                        id="deterministic-outlined-input"
                        value={formData.password}
                        onChange={handleChange}
                        name="password"
                        required
                        fullWidth
                        helperText={formData.errorPassword}
                        error={open.passwordOpen}
                           />
              </Grid>
              <Grid item xs={12}>
              <TextField
                        label="Repeat-Password"
                        variant="outlined"
                        id="deterministic-outlined-input"
                        value={formData.repeatPassword}
                        onChange={handleChange}
                        name='repeatPassword'
                        required
                        fullWidth
                        helperText={formData.errorRepeatPassword}
                        error={open.repeatPasswordOpen}
                           />
              </Grid>
              <Grid item xs={12}>
                  <Button
                  variant='contained'
                  onClick={onSubmit}
                  fullWidth
                  className={classes.button}چ
                  color='primary'
                  >
                      Sign Up
                  </Button>
              </Grid>
              </Grid>
              </form>
            </div>
            <Grid container justify='flex-end'>
                <NavLink exact to={login}>
                Already have an account? Login
                </NavLink>
            </Grid>
            <Box mt={5}>
        <Copyright />
      </Box>
            </Container>
            </div>
    )
};


export default withRouter(SignUp);