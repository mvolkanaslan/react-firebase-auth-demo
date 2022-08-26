import './App.css';
import SignIn from './components/SignIn';
import { Routes, Route, Navigate } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import { configUser } from './utils/firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Profile from './components/Profile';
import NotFound from './components/NotFound';
import { useEffect, useState } from 'react';
import ResetPassword from './components/ResetPassword';

function App() {
  const [isLoggedin, setIsLoggedin] = useState(false);

  const auth = getAuth()
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      await configUser()
      setIsLoggedin(true)
    } else {
      setIsLoggedin(false)
    }
  });


  useEffect(() => {
  }, [auth])

  return (
      <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/profile" element={isLoggedin ? <Profile /> : <Navigate to="/login" />} />
          </Route>
          <Route path='/signin' element={<SignIn />} />
          <Route path='/login' element={<Login />} />
          <Route path='/reset_password' element={<ResetPassword />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

  );
}

export default App;
