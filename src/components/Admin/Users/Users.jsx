import React from "react";

import User from "./User/User";

import classes from "./Users.module.css";

const Users = ({users}) => {
    return (
        <div className={classes.Users}>
            {users.map(user => (
                <User 
                    email={user.email}
                    key={user.userId}
                    name={user.name}
                    userId={user.userId}
                />
            ))}
        </div>
    );
}

export default Users;