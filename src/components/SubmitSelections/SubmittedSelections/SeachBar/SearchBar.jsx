import React from "react";

import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';

import classes from "./SearchBar.module.css";

const SearchBar = () => {
    return (
        <div className={classes.SearhBar}>
            <SearchIcon /><CloseIcon />Searchbar
        </div>
    );
}

export default SearchBar;