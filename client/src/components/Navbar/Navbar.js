import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

import memoriesLogo from '../../images/memoriesLogo.png';
import memoriesText from '../../images/memoriesText.png';

import useStyles from './styles';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../../constants/actionTypes';
import decode from 'jwt-decode';
const Navbar = () => {
    const classes = useStyles();
    // const user = null;
    const [user, setuser] = useState(JSON.parse(localStorage.getItem('profile')));
    console.log(user);
    const history = useHistory();
    const location = useLocation();

    const dispatch = useDispatch();

    const logout = () => {
        dispatch({ type: LOGOUT });
        history.push('/');
        setuser(null);
    };

    useEffect(() => {
        const token = user?.token;


        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logout();
            }
        }


        setuser(JSON.parse(localStorage.getItem('profile')));
    }, [location])




    return (
        <>
            <AppBar className={classes.appBar} position="static" color="inherit">

                <Link to="/" className={classes.brandContainer}>
                    <img component={Link} to="/" src={memoriesText} alt="icon" height="45px" />
                    <img className={classes.image} src={memoriesLogo} alt="icon" height="40px" />
                </Link>
                <Toolbar className={classes.toolbar}>
                    {user?.result ? (
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
                            <Button variant="contained" className={classes.logout} color="secondary"
                                onClick={logout}
                            >Logout</Button>
                        </div>
                    ) : (
                        <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                    )}
                </Toolbar>

                {/* <Typography className={classes.heading} variant="h2" align="center">Memories</Typography>
                <img className={classes.image} src={memories} alt="icon" height="60" /> */}
            </AppBar>
        </>
    )
}

export default Navbar