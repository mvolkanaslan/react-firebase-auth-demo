import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { auth } from '../firebaseConfig.js'
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { authActions } from '../reducers/authSlice.jsx';
import { useDispatch } from 'react-redux/';
import avatar from "../user.png"
import ToastConfig from '../toast-config.js';
import { toast } from 'react-toastify';

export default function Navbar() {
    const user = useSelector(state => state.auth.currentUser)
    const [currentUser, setCurrentUser] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
        setCurrentUser(user)
    }, [user])

    const navigate = useNavigate();

    const signOutHandle = async () => {
        await signOut(auth).then(() => {
            navigate("/")
            dispatch(authActions.setCurrentUser(false))
            toast.success("Logout !", ToastConfig)
        }).catch((error) => {
            toast.error(error.message, ToastConfig)
        });
    }

    return (
        <div>
            <nav className="py-2 bg-light border-bottom">
                <div className="container d-flex flex-wrap">
                    <ul className="nav me-auto">
                        <li className="nav-item"><span className="nav-link link-dark px-2 active" aria-current="page"><Link to="/" style={{ textDecoration: "none", color: "black" }}>Home</Link></span></li>
                    </ul>
                    {
                        !currentUser && (<ul className="nav">
                            <li className="nav-item"><span className="nav-link link-dark px-2"><Link to="/login" style={{ textDecoration: "none", color: "black" }}>Login</Link></span></li>
                            <li className="nav-item"><span className="nav-link link-dark px-2"><Link to="/signin" style={{ textDecoration: "none", color: "black" }}>Sign Up</Link></span></li>
                        </ul>)}
                    {currentUser && (<div className="dropdown text-end">
                        <a className="d-block link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src={avatar} width="32" height="32" className="rounded-circle" />
                        </a>

                        <ul className="dropdown-menu dropdown-menu-end text-small" >
                            <li><span className="dropdown-item">{currentUser.displayName ? currentUser.displayName : currentUser.email}</span></li>
                            <li><Link to="/profile" style={{ textDecoration: "none", color: "black" }} className="dropdown-item">Profile</Link></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><span className="dropdown-item" onClick={signOutHandle}>Logout</span></li>
                        </ul>
                    </div>)}
                </div>
            </nav>
        </div>
    )
}
