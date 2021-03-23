import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import Banner from "./Banner/Banner";
import Form from "../Form/Form";

import classes from "./Header.module.css";
import {getSelectionSubject, setSelectionSubject} from "../../../store/actions/selections";

const Header = ({darkMode, setDarkMode}) => {
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
            };

            setUpdating(false);
            dispatch(setSelectionSubject(id, updatedSubject, token));
        }
    }

    return (
        <div className={classes.Header}>
            <div className={classes.Background}>
                <div className={classes.Bg}></div>
                <div className={classes.Bg2}></div>
                <div className={classes.Bg3}></div>
            </div>
            <Banner darkMode={darkMode} setDarkMode={setDarkMode} />
            <div className={classes.Text}>
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
                <p>Entries must be submitted by 11:59 pm on Thursday or they may not be added to the board!</p>
                <p className={classes.SocialsHeader}>Follow us on Twitch, Twitter, and Facebook for updates on the next draft!</p>
                <div className={classes.Socials}>
                    <p className={classes.Twitch}><a target="_blank" rel="noopener noreferrer" href="https://twitch.com/heathypoop"><i className="fab fa-twitch"></i>Twitch</a></p>
                    <p className={classes.Twitter}><a target="_blank" rel="noopener noreferrer" href="https://twitter.com/draft_random"><i className="fab fa-twitter"></i>Twitter</a></p>
                    <p className={classes.Facebook}><a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/RandomDraftLeague"><i className="fab fa-facebook"></i>Facebook</a></p>
                </div>
            </div>
            <Form darkMode={darkMode}/>
        </div>
    );
}

export default Header;