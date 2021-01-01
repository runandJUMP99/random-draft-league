import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import classes from "./Header.module.css";
import {getSelectionSubject, setSelectionSubject} from "../../../store/actions/selections";

const Header = () => {
    const [subject, setSubject] = useState({name: "Click to Enter Subject"});
    const [updating, setUpdating] = useState(false);
    const currentSubject = useSelector(state => state.selections.subject);
    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSelectionSubject());
    }, [dispatch]);
    
    function handleClick() {
        if (token) {
            setUpdating(true);
            
            if (currentSubject) {
                setSubject({name: currentSubject.name});
            }
        }
    }

    function handleSubmit(event) {
        let id = null;

        if (currentSubject) {
            id = currentSubject.id;
        }

        if (event.key === "Enter") {
            let updatedSubject = {
                ...subject,
                id: id
            }
            setUpdating(false);
            dispatch(setSelectionSubject(id, updatedSubject, token));
        }
    }

    return (
        <div className={classes.Header}>
            <h1>Random Draft League</h1>
            <h2>This Week's Subject: 
                {updating
                    ? <input 
                        autoComplete="off"
                        id="input"
                        type="text" 
                        placeholder="Enter Subject" 
                        onChange={(event) => setSubject({name: event.target.value})} value={subject.name}
                        onKeyPress={(event) => handleSubmit(event)} 
                    /> 
                    : <span className={classes.Subject}onClick={handleClick}>{currentSubject ? currentSubject.name : subject.name}</span>
                }
            </h2>
            <p>Follow us on Twitch and Twitter for updates on the next draft!</p>
            <div className={classes.Socials}>
                <p className={classes.Twitch}><a target="_blank" rel="noopener noreferrer" href="https://twitch.com/heathypoop"><i className="fab fa-twitch"></i>Twitch</a></p>
                <p className={classes.Twitter}><a target="_blank" rel="noopener noreferrer" href="https://twitter.com/draft_random"><i className="fab fa-twitter"></i>Twitter</a></p>
            </div>
        </div>
    );
}

export default Header;