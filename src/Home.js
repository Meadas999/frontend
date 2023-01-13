import React, {useContext, useEffect, useState} from 'react';
import './App.css';
import {Button, Container} from 'reactstrap';
import {useCookies} from 'react-cookie';
import AppContext from "./components/AppContext";
import CircularProgress from "@mui/material/CircularProgress";
import {useNavigate} from "react-router-dom";

// Home.js

const Home = () => {

    const globalcontext = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(undefined);
    const [cookies] = useCookies(['XSRF-TOKEN']);
    const navigate = useNavigate();

    useEffect(() => {
        fetchuser()
            .catch(console.error);

    }, [])

    const fetchuser = async () => {
        setLoading(true);
        await fetch('/user', {credentials: 'include'})
            .then(r => {
                r.text().then(data => {
                    if (r.status >= 200 && r.status < 300) {
                        globalcontext.setAuthenticatedvalue(true);
                        if (data === '') {
                            navigate("/register");
                        } else {
                            setUser(JSON.parse(data));
                        }
                    }
                })
            });
        setLoading(false);
    };

    const message = user ?
        <h2>Welcome, {user.firstname}</h2> :
        <h2 className="center">Register now and start dating</h2>;
    

    if (loading) {
        return (
            <CircularProgress/>
        )
    }

    return (
        <div >
            <div className="homescreen-image"></div>
            <Container fluid>
                {message}
            </Container>
        </div>
    );
}


export default Home;
