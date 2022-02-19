import React from "react";

import classes from "./Over18Message.module.css";

const Over18Message = ({ setOver18Clicked }) => {
  return (
    <div className={classes.Over18Message}>
      <h1>
        By continuing you are agreeing that you are at least 18 years of age
      </h1>
      <div className={classes.Buttons}>
        <button
          className={classes.Agree}
          onClick={() => setOver18Clicked(true)}
        >
          I'm Old Enough!
        </button>
        <a className={classes.Disagree} href="https://www.twitch.tv/heathypoop">
          Get Me Out!
        </a>
      </div>
    </div>
  );
};

export default Over18Message;
