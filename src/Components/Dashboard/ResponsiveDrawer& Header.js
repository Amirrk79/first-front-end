import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import { NavLink , withRouter } from 'react-router-dom';
import CssBaseline from "@material-ui/core/CssBaseline";
import HomeIcon from '@material-ui/icons/Home';
import { settings , dashboard , login } from '../routePaths';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Slide from '@material-ui/core/Slide';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import history from '../history';
import store from '../../Redux/store';
import setActiveUser from '../../Redux/Actions/setActiveUserAction';
import { connect } from "react-redux";

const drawerWidth = 240;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = theme => ({
  root: {
    // display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    [theme.breakpoints.up("sm")]: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`
    }
  } ,
link : {
    textDecoration: "none" ,
    color: theme.palette.text.primary
} ,
userName :{
    color: '#3f51b5'
} ,
greenbtn : {
    backgroundColor: '#7CFC00' ,
    '&:hover': {
        backgroundColor: '#32CD32'
    }
} ,
redbtn : {
    backgroundColor: '#ff2d44' ,
    '&:hover': {
        backgroundColor: '#FF0000'
    }
}
});

class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false ,
    dialogOpen: false 
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };
  handleDialogToggle = () => {
    this.setState(state => ({ dialogOpen: !state.dialogOpen}));
    this.setState(state => ({ mobileOpen: false }));
  };
  handleLogOut = () => {
    localStorage.removeItem('user')
    history.push({login}) 
    history.go(0)
  }

  render() {
    const { classes, theme } = this.props;
    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
        <ListItem>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText 
                        className={classes.userName}
                        primary={this.props.userName}
                        />
                    </ListItem>
                    <NavLink exact to={dashboard} className={classes.link}>
                    <ListItem button selected={this.props.selectedDashboard}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText 
                        primary={'Home'}
                        />
                    </ListItem>
                    </NavLink>
                    <NavLink exact to={settings} className={classes.link}>
                    <ListItem button selected={this.props.selectedSettings}>
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText 
                        primary={'Settings'} 
                        />
                    </ListItem>
                    </NavLink>
                    <ListItem button onClick={this.handleDialogToggle}>
                        <ListItemIcon>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText>
                            Logout
                        </ListItemText>
                    </ListItem>
        </List>
        <Divider />
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" color='primary' className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              {this.props.title}
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.props.children}
            <Dialog
            open={this.state.dialogOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.handleDialogToggle}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id='alert-dialog-slide-title'>{'Logout?'}</DialogTitle>
                <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
              Are you sure about Logout? 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={this.handleDialogToggle} className={classes.greenbtn}>
                No
            </Button>
            <Button onClick={this.handleLogOut} className={classes.redbtn}>
                Yes
            </Button>
        </DialogActions>

            </Dialog>
        </main>
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
  theme: PropTypes.object.isRequired
};

export default withRouter( withStyles(styles, { withTheme: true })(ResponsiveDrawer));

