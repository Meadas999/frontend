import React, {useState} from 'react';
import './App.css';
import Home from './Home';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import User from "./User";
import NavBarSI from "./components/NavBarSignedIn";
import NavBarGL from "./components/NavBarGeneral";
import AppContext from "./components/AppContext";
import Date from "./Date";

//App.js
const App = () => {
    const [setting2value, setSetting2value] = useState(false);
    const [notificationvalue, setNotificationvalue] = useState(0);
    const userSettings = {
        setting2name: setting2value,
        setSetting2value,
        notificationname : notificationvalue,
        setNotificationvalue
    };



    const navbar = setting2value ?
        <NavBarSI/> : <NavBarGL/>

    return (
        <AppContext.Provider value={userSettings}>
        <Router>
                {navbar}
                <div>
                    <Routes>
                        <Route exact path="/" element={<Home/>}/>
                        <Route exact path="/user" element={<User/>}/>
                        <Route exact path="/date" element={<Date/>}/>
                    </Routes>
                </div>
        </Router>
        </AppContext.Provider>
    );


}

export default App;
