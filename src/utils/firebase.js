import { authActions } from "../reducers/authSlice";
import { store } from "../store";
import { getAuth } from "firebase/auth";
import { db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore"; 



export const configUser = async (auth) => {
    const _auth = await auth ? auth :  getAuth();
    const currentUser = _auth.currentUser;
    if (currentUser !== null) {
        const user = {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            emailVerified: currentUser.emailVerified,
            photoURL: currentUser.photoURL,
            email: currentUser.email
        }
        store.dispatch(authActions.setCurrentUser(user));
    }
}

export const createProfile = async (user)=>{
    await setDoc(doc(db, "profiles", user.uid), {
        //we can configure whatever we want in this user properties object
        fname: "",
        lname: "",
        country: ""
      });
}