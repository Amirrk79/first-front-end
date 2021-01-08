import React from 'react';
import { AppBar , Toolbar , Grid , Typography } from '@material-ui/core';

function Header(props) {
    return (
        <div>
            <AppBar position="static" alignitems="center" color="primary">
        <Toolbar>
    <Grid container justify="center" wrap="wrap">
        <Grid item>
            {props.children}
            <Typography variant="h6">{props.title}</Typography>
        </Grid>
    </Grid>
        </Toolbar>
    </AppBar>
        </div>
    )
};

export default Header;