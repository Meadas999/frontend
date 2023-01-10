import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useState} from "react";
import MenuItem from '@mui/material/MenuItem';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from "axios";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";



function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href={window.location.origin}>
                Spicer
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const RegisterForm = () => {
    const [user, setUser] = useState({
        firstname: "",
        insertion: null,
        lastname: "",
        birthdate: "",
        gender: "-",
        genderpreference: "-"
    });
    const theme = createTheme();
    const [cookies] = useCookies(['XSRF-TOKEN']);
    const [currentdate, setCurrentDate] = useState("01/01/2002");
    const navigate = useNavigate();
    const handleValue = (e) => {

        const {id, value, name} = e.target;
        if (id === "firstName") {
            setUser({...user, firstname: value});
        }
        if (id === "insertion") {
            setUser({...user, insertion: value});
        }
        if (id === "lastName") {
            setUser({...user, lastname: value});
        }
        if (name === "gender") {
            setUser({...user, gender: value});
        }
        if (name === "genderPreference") {
            setUser({...user, genderpreference: value});
        }
    }
    const handleDateChange = (newValue)=> {
        if(newValue.$M < 10)
        {
            if(newValue.$D < 10)
            {
                const newSelectedDate =`0${newValue.$D }-0${newValue.$M + 1}-${newValue.$y}`;
                setCurrentDate(newValue.toString());
                setUser({...user, "birthdate" : newSelectedDate});
            }
            else
            {
                const newSelectedDate =`${newValue.$D }-0${newValue.$M + 1}-${newValue.$y}`;
                setCurrentDate(newValue.toString());
                setUser({...user, "birthdate" : newSelectedDate});
            }

        }
        else
        {
            if(newValue.$D < 10)
            {
                const newSelectedDate =`0${newValue.$D }-${newValue.$M + 1}-${newValue.$y}`;
                setCurrentDate(newValue.toString());
                setUser({...user, "birthdate" : newSelectedDate});
            }
            else {
                const newSelectedDate = `${newValue.$D}-${newValue.$M + 1}-${newValue.$y}`;
                setCurrentDate(newValue.toString());
                setUser({...user, "birthdate": newSelectedDate});
            }
        }

    }
    const handleSubmit = async (user) => {
        await axios.post("/user", user, { withCredentials: true,
            headers: {
                'X-XSRF-TOKEN': cookies['XSRF-TOKEN'],
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        navigate("/");
    }



    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box  Validate onSubmit={() => {handleSubmit(user)}}  sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    onChange={(e) => {handleValue(e)}}
                                    label="First Name"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="insertion"
                                    label="Insertion"
                                    name="insertion"
                                    autoComplete="family-name"
                                    onChange={(e) => {handleValue(e)}}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    onChange={(e) => {handleValue(e)}}
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        id="birthdate"
                                        label="Birthdate"
                                        inputFormat="DD/MM/YYYY"
                                        minDate="01/01/1990"
                                        maxDate="01/01/2005"
                                        value={currentdate}
                                        onChange={handleDateChange}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    id="gender"
                                    select
                                    fullWidth
                                    required
                                    name="gender"
                                    label="Gender"
                                    defaultValue={user.gender}
                                    onChange={(e) => {handleValue(e)}}
                                >

                                    <MenuItem value={"male"}> Male </MenuItem>
                                    <MenuItem value={"female"}> Female </MenuItem>

                                </TextField>
                            </Grid>
                            <Grid item xs={5}>
                                <TextField
                                    id="genderPreference"
                                    select
                                    fullWidth
                                    required
                                    name="genderPreference"
                                    label="GenderPreference"
                                    defaultValue={user.genderpreference}
                                    onChange={(e) => {handleValue(e)}}
                                >

                                    <MenuItem value={"male"}> Male </MenuItem>
                                    <MenuItem value={"female"}> Female </MenuItem>

                                </TextField>
                            </Grid>
                        </Grid>


                    </Box>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        type="submit"

                    >
                        Sign Up
                    </Button>
                </Box>
                <Copyright sx={{mt: 5}}/>
            </Container>
        </ThemeProvider>
    );
}


export default RegisterForm;

