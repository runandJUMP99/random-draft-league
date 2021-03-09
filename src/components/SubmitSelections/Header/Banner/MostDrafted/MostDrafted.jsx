import React from "react";

import classes from "./MostDrafted.module.css";

const MostDrafted = ({pickLeaders}) => {
    return (
        <div className={classes.MostDrafted}>
            {pickLeaders.length > 0
                && <h4>Most Picked Drafters:
                    <div className={classes.AnimationContainer}> 
                        <div className={classes.Animation}>
                            <span>
                                {pickLeaders[0].name.substring(0, 10)} - {pickLeaders[0].pickTotal}
                            </span>
                            <span>
                                {pickLeaders[1].name.substring(0, 10)} - {pickLeaders[1].pickTotal}
                            </span>
                            <span>
                                {pickLeaders[2].name.substring(0, 10)} - {pickLeaders[2].pickTotal}
                            </span>
                            <span>
                                {pickLeaders[3].name.substring(0, 10)} - {pickLeaders[3].pickTotal}
                            </span>
                            <span>
                                {pickLeaders[4].name.substring(0, 10)} - {pickLeaders[4].pickTotal}
                            </span>
                        </div>
                    </div>
                </h4>}
        </div>
    );
}

export default MostDrafted;