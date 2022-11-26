import { Avatar, Button, Container, Grid, Paper, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import Icon from './icon';
import { GoogleLogin } from 'react-google-login';
import { GOOGLE_ID } from '../../constants/envConstants';
import { useDispatch } from 'react-redux';
import { AUTH } from '../../constants/actionTypes';
import { useHistory } from 'react-router-dom';
import { gapi } from "gapi-script";
import { signin, signup } from '../../actions/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {

    const [formData, setformData] = useState(initialState);

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: "36481876266-0kv5ke9gp302qpbk21am6i6lq3vk6b33.apps.googleusercontent.com",
                scope: 'email',
            });
        }

        gapi.load('client:auth2', start);
    }, []);

    const dispatch = useDispatch();
    const classes = useStyles();
    // const isSignUp = true;
    const history = useHistory();
    const [isSignUp, setisSignUp] = useState(false);

    const [showPassword, setshowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        if (isSignUp) {
            dispatch(signup(formData, history));
        } else {
            dispatch(signin(formData, history));
        }



    };

    const handleChange = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleShowPassword = () => {
        setshowPassword((prevShowPass) => !prevShowPass);
    };

    const switchMode = () => {
        setisSignUp((prev) => !prev);
    }


    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: AUTH, data: { result, token } });

            history.push('/');
        } catch (error) {
            console.log(error);
        }
    };
    const googleError = (error) => {
        console.log(error);
        console.log('Google Sign In was unsuccessful. Try again later');
    }
    return (
        <>
            <Container component='main' maxWidth="xs">

                <Paper className={classes.paper} elevation={3}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>

                    <Typography variant="h5">
                        {isSignUp ? 'SIgn Up' : 'Sign In'}</Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2} >
                            {
                                isSignUp && (
                                    <>
                                        <Input name='firstName' label="First Name" handleChange={handleChange} autoFocus half />
                                        <Input name='lastName' label="Last Name" handleChange={handleChange} half />
                                    </>
                                )
                            }
                            <Input name="email" label={"Email"} handleChange={handleChange} type="email" />
                            <Input name="password" label={"Password"} handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                            {
                                isSignUp && <Input name="confirmPassword" label={"Repeat Password"} handleChange={handleChange} type="password" />

                            }
                        </Grid>



                        <Button type="Submit" fullWidth variant="contained" color="primary" className={classes.submit} >
                            {isSignUp ? "Sign Up" : "Sign In"}
                        </Button>

                        <GoogleLogin
                            clientId='36481876266-0kv5ke9gp302qpbk21am6i6lq3vk6b33.apps.googleusercontent.com'
                            render={(renderProps) => (
                                <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                                    Google Sign In
                                </Button>
                            )}
                            onSuccess={googleSuccess}
                            onFailure={googleError}
                            cookiePolicy="single_host_origin"
                        />

                        <Grid container justify="flex-end">
                            <Grid item>
                                <Button onClick={switchMode}>
                                    {isSignUp ? 'Already have an account? Sign In' : "Don't have an acoount. Sign Up"}
                                </Button>
                            </Grid>
                        </Grid>

                    </form>
                </Paper>

            </Container>


        </>
    )
}

export default Auth