import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import SearchBar from "../UI/SeachBar/SearchBar";
import Users from "./Users/Users";

import classes from "./Admin.module.css";
import {getUsers} from "../../store/actions/users";

const Admin = () => {
    const [search, setSearch] = useState("");
    const token = useSelector(state => state.auth.token);
    let users = useSelector(state => state.users);
    const dispatch = useDispatch();
    const stylesContainer = {
        margin: 0
    };
    const stylesInput = {
        width: "calc(100% - 45px)"
    };

    useEffect(() => {
        dispatch(getUsers(token));
    }, [dispatch]);
    
    users.sort((a, b) => a.name.localeCompare(b.name, "en", {'sensitivity': 'base'}))

    if (search.length > 0) {
        users = users.filter(user => {
            return user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase());
        });
    }

    return (
        <div className={classes.Admin}>
            <div className={classes.SearchBar}>
                <SearchBar search={search} setSearch={setSearch} stylesContainer={stylesContainer} stylesInput={stylesInput} />
            </div>
            <Users users={users} />
        </div>
    );
}

export default Admin;