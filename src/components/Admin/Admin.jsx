import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SearchBar from "../UI/SearchBar/SearchBar";
import Users from "./Users/Users";

import classes from "./Admin.module.css";
import { getUsers } from "../../store/actions/users";

const Admin = () => {
  const [search, setSearch] = useState("");
  const token = useSelector(state => state.auth.token);
  let users = useSelector(state => state.users).filter(user => !!user.name);
  const order =
    users.sort((a, b) => b.order - a.order).slice(0, 1)[0].order + 1; //sorts users by their order number then slices highest user, targets 'order' then add 1 to assign the next order for franchises
  const dispatch = useDispatch();
  const stylesInput = {
    width: "calc(100% - 45px)",
  };

  useEffect(() => {
    dispatch(getUsers(token));
  }, [dispatch, token]);

  users.sort((a, b) => {
    return a.name.localeCompare(b.name, "en", { sensitivity: "base" });
  });

  if (search.length > 0) {
    users = users.filter(user => {
      return (
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.userId.toLowerCase().includes(search.toLowerCase())
      );
    });
  }

  return (
    <div className={classes.Admin}>
      <div className={classes.SearchBar}>
        <SearchBar
          search={search}
          setSearch={setSearch}
          stylesInput={stylesInput}
        />
      </div>
      <Users order={order} users={users} />
    </div>
  );
};

export default Admin;
