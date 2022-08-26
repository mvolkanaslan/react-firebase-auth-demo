import React, { useState } from 'react'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from 'react-toastify';
import ToastConfig from '../toast-config';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
    let navigate = useNavigate();
    const [email, setEmail] = useState();
    const auth = getAuth();

    const sendResetMail = (e) => {
        e.preventDefault()
        sendPasswordResetEmail(auth, email)
            .then(() => {
               toast.success("Reset Password Mail Sent !",ToastConfig)
               navigate("/login")
            })
            .catch((error) => {
               toast.error(error.message,ToastConfig)
            });
    }

    return (
        <div className="modal show" tabIndex="-1" style={{ display: "block" }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">
                        <h6>Enter your user account's verified email address and we will send you a password reset link.</h6>
                        <main className="form">
                            <form onSubmit={sendResetMail}>
                                <div className="form-floating mb-3 mt-3">
                                    <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} required />
                                    <label>E-Mail</label>
                                </div>
                                <button disabled={!email} className="w-100 btn btn-lg btn-primary" type="submit">Send Password Reset Mail</button>
                            </form>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
}
