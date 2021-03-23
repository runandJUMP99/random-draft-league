import React from "react";

import classes from "./MostDrafted.module.css";

const MostDrafted = ({darkMode, pickLeaders}) => {
    return (
        <div className={classes.MostDrafted}>
            {pickLeaders.length > 0
                && <h4 style={{color: darkMode && "lightblue"}}>Most Picked Drafters:
                    <div className={classes.AnimationContainer}> 
                        <div className={classes.Animation}>
                            {pickLeaders.map(pickLeader => (
                                <span key={pickLeader.userId} style={{color: darkMode && "lightgreen"}}>
                                    {pickLeader.name.substring(0, 10)} - {pickLeader.pickTotal}
                                </span>
                            ))}
                        </div>
                    </div>
                </h4>}
        </div>
    );
}

export default MostDrafted;