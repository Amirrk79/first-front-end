import React , { useEffect , useState } from 'react';
import ResponsiveDrawer from './ResponsiveDrawer& Header';
import Empty from './emptyDashboard';
import store from '../../Redux/store';
import stylesLess from './stylesLess.less';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));




 


function UserDashboard() {
    const classes = useStyles();
    const [user , setUser] = useState({

    });
    useEffect(() => {
      const state = store.getState();
      const user = state.user;
      setUser( user );
    } , [])
   
    return(
        <div className={classes.root}>
           <ResponsiveDrawer selectedDashboard='true' title='Dashboard' userName={user.userName}>
            <Empty>
            <Grid container spacing={3}>
                <Grid item xs='12' sm='12'>
                  <h2>Wellcome {user.userName}</h2>
                  <Grid item xs='12' sm='3'>  
                </Grid>
                </Grid>
            </Grid>
            </Empty>
            </ResponsiveDrawer>
        </div>
         
    )
};

export default UserDashboard;