import React, {useState, lazy, Suspense} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NavBarSI from "./components/NavBarSignedIn";
import NavBarGL from "./components/NavBarGeneral";
import AppContext from "./components/AppContext";
const Date = lazy(() => import("./Dating.js"));
const ChatRoom = lazy(() => import("./components/ChatRoom.js"));
const RegisterForm = lazy(() => import("./components/RegisterForm.js"));
const Home = lazy(() => import('./Home.js'));

//App.js
const App = () => {
    const [authenticatedvalue, setAuthenticatedvalue] = useState(false);
    const [notificationvalue, setNotificationvalue] = useState(0);
    const userSettings = {
        authenticated: authenticatedvalue,
        setAuthenticatedvalue,
        notificationname : notificationvalue,
        setNotificationvalue
    };
    const navbar = authenticatedvalue ?
        <NavBarSI id="navbarSI"/> : <NavBarGL id="navbarGL"/>

    return (
        <AppContext.Provider value={userSettings}>
            <Router>
                {navbar}
                <div>
                    <Suspense>
                    <Routes>
                        <Route exact path="/" element={<Home/>}/>
                        <Route exact path="/date" element={<Date/>}/>
                        <Route exact path="/chat" element={<ChatRoom/>}/>
                        <Route exact path="/register" element={<RegisterForm/>}/>
                    </Routes>
                    </Suspense>
                </div>
            </Router>
        </AppContext.Provider>
    );
}

export default App;
