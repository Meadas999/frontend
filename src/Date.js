import {useCookies} from "react-cookie";
import React, {useContext, useEffect, useState} from "react";
import CircularProgress from "@mui/material/CircularProgress";
import {Navigate} from "react-router-dom";
import AppContext from "./components/AppContext";
import axios from "axios";

const Date = () => {
    const globalcontext = useContext(AppContext);
    const [cookies] = useCookies(['XRSF-TOKEN']);
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState(false);
    const [users, setusers] = useState([]);

    useEffect(() => {
        setloading(true);
        fetch("/user/allotherusers", {credentials: "include"})
            .then(response => response.text())
            .then(body => {
                if (body === "") {
                    return <Navigate to="/"/>
                } else {
                    setusers(JSON.parse(body));
                }
                setloading(false);
            });
    }, [])

    const userlist = users.map(user => {
        return (
            <div key={user.id}>
                <p> {user.firstname}</p>
                <button onClick={() => like(user, false)}>Like</button>
            </div>
        )
    });

    const like =  async (likeduser, superlike) => {
        const likemodel =
            {
                likeduser: likeduser,
                superlike: superlike

            }

        await axios.post("/like/liked", likemodel, {withCredentials: true,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }


    return (
        <div>
            {userlist}
        </div>
    );

}
export default Date;
