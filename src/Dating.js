import {useCookies} from "react-cookie";
import React, {useContext, useEffect, useState} from "react";
import CircularProgress from "@mui/material/CircularProgress";
import {Navigate, useNavigate} from "react-router-dom";
import AppContext from "./components/AppContext";
import axios from "axios";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Man from "./Styling/IMG/man.jpg";
import Woman from "./Styling/IMG/woman.jpg";


const Dating = () => {
    const globalcontext = useContext(AppContext);
    const [cookies] = useCookies(['XRSF-TOKEN']);
    const [loading, setloading] = useState(false);
    const [users, setusers] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        fetchotherusers().catch(console.error);
    }, [loading])

    const fetchotherusers = async () => {
        setloading(true);
        fetch("/user/allotherusers", {credentials: "include"})
            .then(r => {
                    r.text().then(data => {
                            if (r.status >= 200 && r.status < 300) {
                                setusers(JSON.parse(data));
                            } else {
                                navigate("/")
                            }
                        }
                    )
                }
            );
        setloading(false);
    }
    const cardpicture = (gender) => {
        if(gender === "male")
        {
            return (
                <CardMedia
                    component="img"
                    height="140"
                    image={Man}
                    alt="profile picture"/>

            )
        }
        else {
            return (
                <CardMedia
                    component="img"
                    height="140"
                    image={Woman}
                    alt="profile picture"/>
            )
        }

    }

    const userlist = users.map(user => {
        return (
            <Box alignItems="center" key={user.id}
                 sx={{
                     minWidth: 275,
                     flexWrap: 'wrap',
                     flexDirection: "row",
                     justifyContent: 'flex-start',
                     display: 'inline-flex'
                 }}>
                <Card variant="outlined" sx={{alignItems: "center"}}>
                    <React.Fragment>

                        {cardpicture(user.gender)}
                        <CardContent>

                            <p className="center"> Name: {user.firstname} {user.lastname}</p>
                            <p className="center"> Gender: {user.gender}</p>
                            <p className="center"> Genderpreference: {user.genderpreference}</p>

                        </CardContent>
                        <CardActions sx={{justifyContent: "center"}}>
                            <ButtonGroup className="center"
                                         orientation="vertical"
                                         aria-label="vertical contained button group"
                                         variant="contained"
                            >

                                <Button sx={{backgroundColor: "#43a047"}} onClick={() => like(user, false)}
                                        key="like">Like</Button>
                                <Button sx={{backgroundColor: "#e91e63"}} onClick={() => dislike(user)}
                                        key="dislike">Dislike</Button>

                            </ButtonGroup>
                        </CardActions>
                    </React.Fragment>
                </Card>
            <br/>
            </Box>


        )

    });

    const like = async (likeduser, superlike) => {
        const likemodel =
            {
                likeduser: likeduser,
                superlike: superlike
            }

        const response = await axios.post("/like/liked", likemodel, {
            withCredentials: true,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        toast.success(response.data);
        setloading(true);
    }

    const dislike = async (dislikeduser) => {
        const reject = {
            rejecteduser: dislikeduser
        }

        const response = await axios.post("/reject", reject, {
            withCredentials: true,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        toast.warn(response.data);
        setloading(true);
    }


    return (
        <div>
            <Container maxWidth="sm">
                <br/>
                {userlist}
                <ToastContainer/>
            </Container>
        </div>
    );

}
export default Dating;
