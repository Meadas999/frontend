import React, { useEffect, useState } from 'react';
import './App.css';
import { useCookies } from 'react-cookie';
import {Navigate} from 'react-router-dom';



const User = () => {

    const [authenticated, setAuthenticated] = useState('authenticated');
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(undefined);
    const [cookies] = useCookies(['XSRF-TOKEN']);

    useEffect(() => {
        setLoading(true);
        fetch('/user/userpage', {credentials: 'include'})
            .then(response => response.text())
            .then(body => {
                if (body === '') {
                   return <Navigate to="/" />

                } else {
                    setUser(JSON.parse(body));
                }
                setLoading(false);
            });
    }, [setAuthenticated, setLoading, setUser])

    if (loading) {
        return (
            <p>Loading...</p>
        );
    }
        return (
            <div>

                <p>{user.birthdate}</p>
            </div>
        );

}

export default User;
