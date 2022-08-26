import React, { useState } from 'react'
import {createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebaseConfig.js';
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import ToastConfig from '../toast-config.js';
import { toast } from 'react-toastify';
import { createProfile } from '../utils/firebase.js';

export default function SignIn() {
    let navigate = useNavigate();
    onAuthStateChanged(auth,user=>{
        user && navigate("/", { replace: true });
    })



    const [email, setEMail] = useState("");
    const [password, setPassword] = useState("");

    const submitHandle = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                //after signin in firebase, create a doc in firestore about new user with user uid
                createProfile(user)
                toast.success("Sign In Success !",ToastConfig)
            })
            .catch((error) => {
                toast.error(error.message,ToastConfig)
            });
    }

    return (

        <main className="form-signin w-100 m-auto">
            <form onSubmit={submitHandle}>
                <div className='d-flex justify-content-center'>
                    <h1 className="h3 mb-3 fw-normal">Please Sign In</h1>
                </div>
                <div className="form-floating">
                    <input type="email" className="form-control" onChange={(e) => setEMail(e.target.value)} required />
                    <label>Email address</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} required/>
                    <label>Password</label>
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Sign In</button>
            </form>
        </main>
    )
}
