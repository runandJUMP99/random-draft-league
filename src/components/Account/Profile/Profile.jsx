import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import ConfirmDelete from "./ConfirmDelete/ConfirmDelete";
import Spinner from "../../UI/Spinner/Spinner";

import classes from "./Profile.module.css";
import logo from "../../../assets/images/logo.png";
import {updateProfile} from "../../../store/actions/auth";

const Profile = () => {
    const [deleting, setDeleting] = useState(false);
    const [updatedUser, setUpdatedUser] = useState({
        email: "",
        img: "",
        imgValue: "",
        name: "",
        password: ""
    });
    const [updating, setUpdating] = useState(false);
    const currentUser = useSelector(state => state.auth);
    const error = currentUser.error;
    const loading = currentUser.loading;
    const dispatch = useDispatch();

    function handleUpdating() {
        setUpdatedUser({
            email: currentUser.email,
            img: "",
            imgValue: "",
            name: currentUser.name,
            password: "",
            userId: currentUser.userId            
        });
        setDeleting(false);
        setUpdating(true);
    }

    function handleImageUpload(event) {
        setUpdatedUser( {
            ...updatedUser,
            img: event.target.files[0],
            imgValue: event.target.value
        });
    }

    function handleSubmit() {
        dispatch(updateProfile(updatedUser, currentUser.token));
        setUpdating(false);
    }

    return (
        <div className={classes.Profile}>
            {(deleting && !error) ? <ConfirmDelete setDeleting={setDeleting} /> : loading ? <Spinner /> : 
                <>
                    <img src={currentUser.img ? currentUser.img : logo} alt="Avatar" />
                    {updating && <div className={classes.FileInput}>
                        <input
                            accept="image/*"
                            onChange={(event) => handleImageUpload(event)}
                            type="file"
                            value={updatedUser.imgValue}
                        />
                    </div>}
                    <p className={classes.Error}>{error}</p>
                    <p>
                        <strong>Username: </strong> 
                        {updating ? <input onChange={(event) => setUpdatedUser({...updatedUser, name: event.target.value})} placeholder="Username" type="text" value={updatedUser.name} /> : currentUser.name}
                    </p>
                    <p>
                        <strong>Email: </strong> 
                        {updating ? <input onChange={(event) => setUpdatedUser({...updatedUser, email: event.target.value})} placeholder="Email" type="email" value={updatedUser.email} /> : currentUser.email}
                    </p>
                    <p>
                        <strong>Password: </strong> 
                        {updating ? <input onChange={(event) => setUpdatedUser({...updatedUser, password: event.target.value})} placeholder="Password" type="password" value={updatedUser.password} /> : "•••••••••"}
                    </p>
                    {updating && <p className={classes.PasswordCaption}>(Leave blank to not update password)</p>}
                    <button className={classes.Update} onClick={updating ? handleSubmit : handleUpdating}>
                        {updating ? "Save" : "Update Profile"}
                    </button>
                    {!updating && <button className={classes.Delete} onClick={() => setDeleting(true)}>Delete Profile</button>}
                </>
            }
        </div>
    );
}

export default Profile;