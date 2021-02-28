import React, {useState} from "react";
import {Redirect} from "react-router-dom";
import {useSelector} from "react-redux";

import AccountHeader from "./AccountHeader/AccountHeader";
import Notifications from "./Notifications/Notifications";
import Profile from "./Profile/Profile";
import SideMenu from "./SideMenu/SideMenu";

import classes from "./Account.module.css";

const Account = () => {
    const [currentDisplay, setCurrentDisplay] = useState(0);
    const token = useSelector(state => state.auth.token);
    const display = [<Notifications />, <Profile />];

    return (
        <div className={classes.AccountContainer}>
            {!token && <Redirect to="/" />}
            <div className={classes.Account}>
                <AccountHeader />
                <div className={classes.AccountDisplay}>
                    <SideMenu setCurrentDisplay={setCurrentDisplay} />
                    <div className={classes.Display}>
                        {display[currentDisplay]}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Account;