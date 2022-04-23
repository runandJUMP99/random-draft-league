import React from "react";

import classes from "./Webcam.module.css";

const Webcam = ({ children }) => {
  return <div className={classes.Webcam}>{children}</div>;
};

export default Webcam;
