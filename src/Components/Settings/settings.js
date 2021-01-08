import React , { useEffect , useState } from 'react';
import { withRouter , useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import EditUser from '../../Redux/Actions/editUser';
import setActiveUser from '../../Redux/Actions/setActiveUserAction';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import SettingsIcon from '@material-ui/icons/Settings';
import ResponsiveDrawer from '../Dashboard/ResponsiveDrawer& Header';
import store from '../../Redux/store';
import Alert from '../Notifiaction';
import {
    Grid,
    Typography,
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Box,
    Container,
    Snackbar,
    makeStyles,
    AppBar,
    Toolbar
    } from "@material-ui/core";
import Empty from '../Dashboard/emptyDashboard';


    //styles : 
    const useStyles = makeStyles((theme) => ({
        paper: {
          marginTop: theme.spacing(5),
          display: 'flex',
          flexDirection: 'culumn',
          alignItems: 'flex-start',
          width: '100%' ,
        },
        submit: {
          margin: theme.spacing(3, 0, 2),
        },
        grid: {
            backgroundColor: '#fff' ,
            borderRadius: 5 ,
            padding: 5
        } ,
        resize: {
            fontSize: '20px'
        } , 
        button: {
            fontSize: 17
        } , 
        alerts: {
            fontSize: 20 ,
        } ,
        editBtn: {
            width: '10px' ,
            height: '30px'
        } ,
      }));

function Settings() {
    const dispatch = useDispatch();
    //STATES: 
    const [user , setUser] = useState({

    });
    useEffect(() => {
      const state = store.getState();
      const user = state.user;
      setUser( user );
      setSettingData({...settingData , 
    userName: user.userName,
    password: user.password
    })

    } , [])
    const [settingData , setSettingData] = useState(
        {
            userName: '' , 
            userNameError: '',
            password: '',
            passwordError: '',
            applyError: '' ,
            successAlert: ''
        }
    );
    const [editable , setEditable] = useState(
        {
            edited: false
        }
    );
    const [errorOpen , setErrorOpen] = useState(
        {
            applyErrorOpen : false , 
            successOpen : false ,
            userNameOpen: false ,
            passwordOpen: false
        }
    );
    const classes = useStyles();
    const history = useHistory();
    function updateComponent() {
        const state = store.getState();
        const user = state.user;
        setUser( user );
        setSettingData({...settingData , 
      userName: user.userName,
      password: user.password,
      userNameError: '' ,
      passwordError: ''
      })
    }
     
    function userNameValidation() {
        const state = store.getState();
        const users = state.users;
        let userNameIndex = users.findIndex(users => users.userName === settingData.userName);
        if(userNameIndex !== -1) {
            setSettingData({...settingData , applyError: 'UserName is already taken!'})
            setErrorOpen({applyErrorOpen: true})
        } else {
            dispatch(EditUser(
                {
                    name: user.name ,
                    lastName: user.lastName ,
                    userName: settingData.userName ,
                    email: user.email ,
                    password: settingData.password ,
                    id: user.id ,
                    isLoggedIn: true
                }
            ))
            dispatch(setActiveUser({
                name: user.name ,
                    lastName: user.lastName ,
                    userName: settingData.userName ,
                    email: user.email ,
                    password: settingData.password ,
                    id: user.id ,
                    isLoggedIn: true
            }))
            updateComponent()
            setSettingData({...settingData, successAlert: 'New Settings Applied!' })
            setErrorOpen({successOpen : true})
        }
    }
    //Handles : 
    const handleCloseError = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setErrorOpen({applyErrorOpen: false})
      };
    const handleCloseSuccess = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setErrorOpen({successOpen: false})
      };
    const handleChange = (e) => {
        setSettingData({...settingData , [e.target.name] : e.target.value , 
        userNameError: '' , passwordError: ''})
        setEditable({edited : true})
        setErrorOpen({applyErrorOpen: false , userNameOpen: false , passwordOpen: false})
    }
    const handleDiscardChanges = () => {
        setEditable({...editable , edited: false})
        setErrorOpen({userNameOpen: false , passwordOpen: false})
        setSettingData({...settingData, userNameError: '' , passwordError: ''})
        updateComponent()
    }
    const handleSaveChanges = (e) => {
        const UPPERCASE = "[A B C D E F G H I J K L M N O P Q R S T U V W X Y Z]";
        e.preventDefault()
        if(!settingData.userName || settingData.userName.length < 4 || settingData.userName.match("[!@#$%^&*(),.:|<>?]")) {
            setSettingData({...settingData , userNameError: 'New userName should be atleast 4 carachters and it doesnt allow (@/?) carachters'})
            setErrorOpen({...errorOpen , userNameOpen: true})
        } else if(!settingData.password || settingData.password.length < 12 || !settingData.password.match(UPPERCASE)) {
            setSettingData({...settingData, passwordError: 'New password should be at least 12 carachters and should have 1 UPPERCASE letter'})
            setErrorOpen({...errorOpen , passwordOpen: true })
        } else {
            userNameValidation()
            setEditable({edited: false})
        }
    };
    return(
        <div>
        <ResponsiveDrawer title='Settings' selectedSettings='true' userName={user.userName}>
            <Empty>
                <Grid container spacing={1}>
                <Snackbar open={errorOpen.applyErrorOpen} onClose={handleCloseError} autoHideDuration={3000}>
    <Alert severity='error'>{settingData.applyError}</Alert>
                </Snackbar>
                <Snackbar open={errorOpen.successOpen} onClose={handleCloseSuccess} autoHideDuration={3000}>
    <Alert severity='success'>{settingData.successAlert}</Alert>
                </Snackbar>
                    <Grid item xs='12' sm='6'>
                        <div 
                        style={{
                            backgroundColor: '#fff',
                            alignItems: 'center' ,
                            textAlign: 'center' ,
                            borderRadius: '5px'
                        }}
                        >
                            <Typography>
                                UserName:<TextField 
                                value={settingData.userName}
                                name='userName'
                                onChange={handleChange}
                                helperText={settingData.userNameError}
                                error={errorOpen.userNameOpen}
                                />
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs='12' sm='6'>
                        <div
                        style={{
                            backgroundColor: '#fff',
                            alignItems: 'center' ,
                            textAlign: 'center' ,
                            borderRadius: '5px'
                        }}
                        >
                            <Typography>
                                Password:<TextField  
                                value={settingData.password}
                                name='password'
                                onChange={handleChange}
                                helperText={settingData.passwordError}
                                error={errorOpen.passwordOpen}
                                />
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs='12' sm='12'>
                        {editable.edited? 
                        <div 
                        style={{
                            textAlign: 'center'
                        }}
                        >
                            <Button
                            onClick={handleDiscardChanges}
                            >
                                Discard
                            </Button>
                            <Button 
                            onClick={handleSaveChanges}
                            >
                                Apply
                            </Button>
                        </div>
                        :
                        <div></div>
                        }
                    </Grid>
                </Grid>
            </Empty>    
        </ResponsiveDrawer>
        </div>
        
    )
};

export default withRouter(Settings);