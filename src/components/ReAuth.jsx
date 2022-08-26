import React, {  useRef } from 'react'
import { getAuth, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux/';
import { authActions } from '../reducers/authSlice.jsx';
import { toast } from 'react-toastify';
import ToastConfig from '../toast-config.js';
import Modal from 'react-bootstrap/Modal';


export default function ReAuth() {
    const dispatch = useDispatch();
    const reAuthModalState = useSelector(state => state.auth.reAuth)
    const auth = getAuth();

    const hideModal = () => {
        dispatch(authActions.reAuthState(false))
    }

    const passwordRef = useRef(null);

    const submitHandle = async (e) => {
        e.preventDefault();
        let password = passwordRef.current.value;
        const credential = EmailAuthProvider.credential(auth.currentUser.email, password);
        await reauthenticateWithCredential(auth.currentUser, credential)
            .then(() => {
                dispatch(authActions.reAuthState(true));
                toast.success("User Confirmed !", ToastConfig)
                hideModal()
            })
            .catch(err => {
                toast.error(err.message, ToastConfig)
            })
    }

    return (
        <Modal show={reAuthModalState} onHide={hideModal} size="sm">
            <Modal.Header>
                <Modal.Title>Confirm Access</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <main className="form">
                    <form onSubmit={submitHandle}>
                        <div className="form-floating mb-3">
                            <input type="password" ref={passwordRef} className="form-control" required />
                            <label>Password</label>
                        </div>
                        <button className="w-100 btn btn-lg btn-primary" type="submit">Confirm</button>
                    </form>
                </main>
            </Modal.Body>
        </Modal>
    )
}
