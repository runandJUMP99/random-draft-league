import React from "react";

import classes from "./Footer.module.css";

const Footer = () => {
    return (
        <p className={classes.Footer}>
            Copyright © {new Date().getFullYear()} Random Draft Leage | Designed By
            <a target="_blank" rel="noopener noreferrer" href="https://mycv-bdfa2.web.app/"> runandJUMP</a>
        </p>
    );
}

export default Footer;