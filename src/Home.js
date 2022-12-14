import React, {useContext, useEffect, useState} from 'react';
import './App.css';
import { Button, Container } from 'reactstrap';
import { useCookies } from 'react-cookie';
import AppContext from "./components/AppContext";
import LoadingCircle from "./components/LoadingCircle";
import CircularProgress from "@mui/material/CircularProgress";


// Home.js
const Home = () => {

    const globalcontext = useContext(AppContext);
    const [authenticated, setAuthenticated] = useState("authenticated");
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(undefined);
    const [cookies] = useCookies(['XSRF-TOKEN']);



    useEffect(() => {
        setLoading(true);
            fetch('/user', { credentials: 'include' })
            .then(response => response.text())
            .then(body => {
                if (body === '') {
                    setAuthenticated(false);
                } else {
                    setUser(JSON.parse(body));
                    setAuthenticated(true);
                    globalcontext.setSetting2value(true);
                }
                setLoading(false);
            });
    }, [setAuthenticated, setLoading, setUser, globalcontext])



    const message = user ?
        <h2>Welcome, {user.lastname}</h2> :
        <p>Homepage login please.</p>;





    if (loading) {
        return(
            <CircularProgress/>
        )
    }


    return (
        <div>
            <Container fluid>
                {message}
                {/*{button}*/}
            </Container>
        </div>
    );
}


export default Home;
