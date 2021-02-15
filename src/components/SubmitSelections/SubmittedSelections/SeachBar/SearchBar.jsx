import React, {useState} from "react";

import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';

import classes from "./SearchBar.module.css";

const SearchBar = ({search, setSearch}) => {
    const [hasTyped, setHasTyped] = useState(false);
    
    if (search.length > 0 && !hasTyped) {
        setHasTyped(true);
    } else if (search.length === 0 && hasTyped) {
        setHasTyped(false);
    }

    return (
        <div className={classes.SearchBar}>
            <label htmlFor="search">
                {!hasTyped ? <SearchIcon /> : <CloseIcon onClick={() => setSearch("")} />}
            </label>
            <input
                id="search"
                name="search"
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search"
                type="text"
                value={search}
            />
        </div>
    );
}

export default SearchBar;