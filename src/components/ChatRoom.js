import React, { useEffect, useState } from 'react'
import {over} from 'stompjs';
import SockJS from 'sockjs-client';

var stompClient =null;
const ChatRoom = () => {
    const [personalChats, setPersonalChats] = useState(new Map());
    const [openChats, setOpenChats] = useState([]);
    const [box,setBox] =useState("CHATROOM");
    const [userModel, setUserModel] = useState({
        username: '',
        receivername: '',
        connected: false,
        message: ''
    });
    useEffect(() => {
    }, [userModel]);

    const connect =()=>{
        let Sock = new SockJS('http://localhost:8081/ws');
        stompClient = over(Sock);
        stompClient.connect({},onConnected, onError);
    }

    const onConnected = () => {
        setUserModel({...userModel,"connected": true});
        stompClient.subscribe('/chatroom/public', onMessageReceived);
        stompClient.subscribe('/user/'+userModel.username+'/private', onPrivateMessage);
        userJoin();
    }

    const userJoin=()=>{
        var chatMessage = {
            senderName: userModel.username,
            status:"JOIN"
        };
        stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    }

    const onMessageReceived = (payload)=>{
        var payloadData = JSON.parse(payload.body);
        switch(payloadData.status){
            case "JOIN":
                if(!personalChats.get(payloadData.senderName)){
                    personalChats.set(payloadData.senderName,[]);
                    setPersonalChats(new Map(personalChats));
                }
                break;
            case "MESSAGE":
                openChats.push(payloadData);
                setOpenChats([...openChats]);
                break;
        }
    }

    const onPrivateMessage = (payload)=>{
        console.log(payload);
        var payloadData = JSON.parse(payload.body);
        if(personalChats.get(payloadData.senderName)){
            personalChats.get(payloadData.senderName).push(payloadData);
            setPersonalChats(new Map(personalChats));
        }else{
            let list =[];
            list.push(payloadData);
            personalChats.set(payloadData.senderName,list);
            setPersonalChats(new Map(personalChats));
        }
    }

    const onError = (err) => {
        console.log(err);

    }

    const handleMessage =(event)=>{
        const {value}=event.target;
        setUserModel({...userModel,"message": value});
    }
    const sendValue=()=>{
        if (stompClient) {
            var chatMessage = {
                senderName: userModel.username,
                message: userModel.message,
                status:"MESSAGE"
            };
            console.log(chatMessage);
            stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
            setUserModel({...userModel,"message": ""});
        }
    }

    const sendPrivateValue=()=>{
        if (stompClient) {
            var chatMessage = {
                senderName: userModel.username,
                receiverName:box,
                message: userModel.message,
                status:"MESSAGE"
            };

            if(userModel.username !== box){
                personalChats.get(box).push(chatMessage);
                setPersonalChats(new Map(personalChats));
            }
            stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
            setUserModel({...userModel,"message": ""});
        }
    }

    const handleUsername=(event)=>{
        const {value}=event.target;
        setUserModel({...userModel,"username": value});
    }

    const registerUser=()=>{
        connect();
    }
    return (
        <div className="container">
            {userModel.connected?
                <div className="chat-box">
                    <div className="member-list">
                        <ul>
                            <li onClick={()=>{setBox("CHATROOM")}} className={`member ${box==="CHATROOM" && "active"}`}>Chatroom</li>
                            {[...personalChats.keys()].map((name,index)=>(
                                <li onClick={()=>{setBox(name)}} className={`member ${box===name && "active"}`} key={index}>{name}</li>
                            ))}
                        </ul>
                    </div>
                    {box==="CHATROOM" && <div className="chat-content">
                        <ul className="chat-messages">
                            {openChats.map((chat,index)=>(
                                <li className={`message ${chat.senderName === userModel.username && "self"}`} key={index}>
                                    {chat.senderName !== userModel.username && <div className="avatar">{chat.senderName}</div>}
                                    <div className="message-data">{chat.message}</div>
                                    {chat.senderName === userModel.username && <div className="avatar self">{chat.senderName}</div>}
                                </li>
                            ))}
                        </ul>

                        <div className="send-message">
                            <input type="text" className="input-message" placeholder="enter the message" value={userModel.message} onChange={handleMessage} />
                            <button type="button" className="send-button" onClick={sendValue}>send</button>
                        </div>
                    </div>}
                    {box!=="CHATROOM" && <div className="chat-content">
                        <ul className="chat-messages">
                            {[...personalChats.get(box)].map((chat,index)=>(
                                <li className={`message ${chat.senderName === userModel.username && "self"}`} key={index}>
                                    {chat.senderName !== userModel.username && <div className="avatar">{chat.senderName}</div>}
                                    <div className="message-data">{chat.message}</div>
                                    {chat.senderName === userModel.username && <div className="avatar self">{chat.senderName}</div>}
                                </li>
                            ))}
                        </ul>

                        <div className="send-message">
                            <input type="text" className="input-message" placeholder="enter the message" value={userModel.message} onChange={handleMessage} />
                            <button type="button" className="send-button" onClick={sendPrivateValue}>send</button>
                        </div>
                    </div>}
                </div>
                :
                <div className="register">
                    <input
                        id="user-name"
                        placeholder="Enter your name"
                        name="userName"
                        value={userModel.username}
                        onChange={handleUsername}
                        margin="normal"
                    />
                    <button type="button" onClick={registerUser}>
                        connect
                    </button>
                </div>}
        </div>
    )
}

export default ChatRoom
