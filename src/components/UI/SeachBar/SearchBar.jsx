import React, {useState} from "react";

import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';

import classes from "./SearchBar.module.css";

const SearchBar = ({search, setSearch, stylesContainer, stylesIcon, stylesInput}) => {
    const [hasTyped, setHasTyped] = useState(false);
    
    if (search.length > 0 && !hasTyped) {
        setHasTyped(true);
    } else if (search.length === 0 && hasTyped) {
        setHasTyped(false);
    }

    return (
        <div className={classes.SearchBar} style={stylesContainer}>
            <label htmlFor="search">
                {!hasTyped ? <SearchIcon style={stylesIcon} /> : <CloseIcon onClick={() => setSearch("")} style={stylesIcon} />}
            </label>
            <input
                autoComplete="off"
                id="search"
                name="search"
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search"
                type="text"
                value={search}
                style={stylesInput}
            />
        </div>
    );
}

export default SearchBar;