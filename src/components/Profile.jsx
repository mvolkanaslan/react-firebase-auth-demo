import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, updateProfile, updateEmail, updatePassword } from "firebase/auth";
import { configUser } from '../utils/firebase';
import ToastConfig from '../toast-config.js';
import { toast } from 'react-toastify';
import ReAuth from './ReAuth';
import { authActions } from '../reducers/authSlice';




export default function Profile() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.currentUser)
    const reAuthModalState = useSelector(state => state.auth.reAuth)

    const [email, setEmail] = useState(null);
    const [displayName, setDisplayName] = useState(null);
    const [password, setPassword] = useState(null);

    const submitHandle = async e => {
        e.preventDefault();

        const auth = getAuth()
        // isUpdateSuccess for active Toast Notification
        let isUpdateSuccess = false;

        if (displayName) {
            displayName && await updateProfile(auth.currentUser, { displayName: displayName }).then()
            .catch(error => { isUpdateSuccess = true; toast.error(error.message, ToastConfig) });

            if (!isUpdateSuccess) {
                //After Update the Current User, set User Info in Store
                await configUser(auth)
                e.target.reset()
                toast.success("Update Successful !", ToastConfig)
                setDisplayName(null)
            }
        }

        if (email || password) {
            email && await updateEmail(auth.currentUser, email).then().catch(error => {
                isUpdateSuccess = true;
                toast.error(error.message, ToastConfig);
                // when update email or password, must be recent login if not set the reauthState of store for active reauth component
                error.code === "auth/requires-recent-login" && dispatch(authActions.reAuthState(true))
            });

            password && await updatePassword(auth.currentUser, password).then()
                .catch(error => {
                    isUpdateSuccess = true;
                    toast.error(error.message, ToastConfig)
                    // when update email or password, must be recent login if not set the reauthState of store for active reauth component
                    error.code === "auth/requires-recent-login" && dispatch(authActions.reAuthState(true))
                });

            if (!isUpdateSuccess) {
                await configUser(auth)
                e.target.reset()
                toast.success("Update Successful !", ToastConfig)
                setEmail(null);
                setPassword(null)
            }
        }
    }

    return (
        <>
            <div className='container col-lg-4'>
                <div className='card mt-3'>
                    <div className='card-body'>
                        <form onSubmit={submitHandle}>
                            <div className="mb-3">
                                <label className="form-label">Your Name</label>
                                <input type="text" className="form-control" placeholder={user.displayName ? user.displayName : ""} onChange={(e) => { setDisplayName(e.target.value) }} />
                            </div>
                            <button type="submit" className="btn btn-primary" disabled={!displayName}>Update</button>
                        </form>
                    </div>
                </div>
                <div className='card mt-3'>
                    <div className='card-body'>
                        <form onSubmit={submitHandle}>
                            <div className="mb-3">
                                <label className="form-label">Email address</label>
                                <input type="email" className="form-control" placeholder={user.email ? user.email : "Enter your e-mail"} onChange={(e) => { setEmail(e.target.value) }} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input type="password" className="form-control" placeholder='**********' onChange={(e) => { setPassword(e.target.value) }} />
                            </div>
                            {/* <button type="submit" className="btn btn-primary" disabled={!email && !password}>Update</button> */}
                            <button type="submit" className="btn btn-primary" disabled={!email && !password}>Update</button>
                        </form>
                    </div>
                </div>
            </div>
            {/* if reAuthModalState true on store active ReAuth Componenet */}
            {reAuthModalState && <ReAuth />}
        </>
    )
}
