import React, { useRef } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { configUser } from '../utils/firebase.js';
import ToastConfig from '../toast-config.js';
import { toast } from 'react-toastify';

export default function Login() {
    let navigate = useNavigate();
    const auth = getAuth()
    onAuthStateChanged(auth, user => {
        user && navigate("/", { replace: true });
    })

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const submitHandle = (e) => {
        e.preventDefault();
        let email = emailRef.current.value;
        let password = passwordRef.current.value;
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                configUser()
                toast.success("Login Success !", ToastConfig)
            })
            .catch((error) => {
                toast.error(error.message, ToastConfig)
            });
    }

    return (

        <main className="form-signin w-100 m-auto">
            <form onSubmit={submitHandle}>
                <div className='d-flex justify-content-center'>
                    <h1 className="h3 mb-3 fw-normal">Login</h1>
                </div>
                <div className="form-floating">
                    <input type="email" ref={emailRef} className="form-control" required />
                    <label>Email address</label>
                </div>
                <div className="form-floating">
                    <input type="password" ref={passwordRef} className="form-control" required />
                    <label>Password</label>
                </div>
                <div className='d-flex justify-content-center mb-2'>
                    <label>
                        <Link style={{textDecoration:"none"}} to="/reset_password">Forgot password?</Link>
                    </label>
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Login</button>
            </form>
        </main>
    )
}
